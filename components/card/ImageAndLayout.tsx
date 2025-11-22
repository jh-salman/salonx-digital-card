import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from '@/context/ThemeContext';
import { useCardCreate } from '@/context/CardCreateContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { imageLayoutOptions } from '@/lib/imageLayoutOptions';

type ImageType = 'profile' | 'logo' | 'banner';

const ImageAndLayout = () => {
  const { colors } = useTheme();

  const {
    selectedColor,
    selectedLayoutId,
    setSelectedColor, // currently unused, but kept for future use
    setSelectedLayoutId,
    selectedProfileImage,
    setSelectedProfileImage,
    selectedCompanyLogo,
    setSelectedCompanyLogo,
    selectedBannerImage,
    setSelectedBannerImage,
  } = useCardCreate();

  const [open, setOpen] = useState(false);

  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [activeImageType, setActiveImageType] = useState<ImageType | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUploadFromDevice = async () => {
    if (!activeImageType) return;

    try {
      setUploading(true);

      const { data: userData, error: userError } = await supabase.auth.getUser();
      console.log('current user from getUser:', userData?.user);
      console.log('getUser error:', userError);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.8,
      });

      if (result.canceled) {
        setUploading(false);
        return;
      }

      const asset = result.assets[0];
      const uri = asset.uri;
      const fileExt = uri.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `${activeImageType}-${Date.now()}.${fileExt}`;
      const filePath = `card-images/${fileName}`;

      const response = await fetch(uri);
      const arrayBuffer = await response.arrayBuffer();
      const fileData = new Uint8Array(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from('card-images')
        .upload(filePath, fileData, {
          contentType: asset.mimeType || `image/${fileExt}`,
          upsert: true,
        });

      if (uploadError) {
        console.error('Supabase upload error OBJECT:', uploadError);
        setUploading(false);
        return;
      }

      const { data: publicData } = supabase.storage.from('card-images').getPublicUrl(filePath);
      const publicUrl = publicData?.publicUrl;

      if (!publicUrl) {
        console.error('Failed to get public URL');
        setUploading(false);
        return;
      }

      if (activeImageType === 'profile') {
        setSelectedProfileImage(publicUrl);
      } else if (activeImageType === 'logo') {
        setSelectedCompanyLogo(publicUrl);
      } else if (activeImageType === 'banner') {
        setSelectedBannerImage(publicUrl);
      }
    } catch (err) {
      console.error('Unexpected upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const imagePickOptions: { id: ImageType; label: string }[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'logo', label: 'Company Logo' },
    { id: 'banner', label: 'Banner Image' },
  ];

  const handleSelectImage = (type: ImageType) => {
    setActiveImageType(type);
    setUploadModalVisible(true);
  };

  const getActiveImageUrl = () => {
    if (activeImageType === 'profile') return selectedProfileImage;
    if (activeImageType === 'logo') return selectedCompanyLogo;
    if (activeImageType === 'banner') return selectedBannerImage;
    return null;
  };

  const handleRemoveImage = () => {
    if (!activeImageType) return;

    if (activeImageType === 'profile') {
      setSelectedProfileImage('');
    } else if (activeImageType === 'logo') {
      setSelectedCompanyLogo('');
    } else if (activeImageType === 'banner') {
      setSelectedBannerImage('');
    }
  };

  const handleSelectLayout = (id: number) => {
    setSelectedLayoutId(id);
    setOpen(false);
    console.log(id);
  };

  // ✅ Layout demo renderer (profile/logo/banner based)
  const renderLayoutPreview = (id: number) => {
    const profileUrl = selectedProfileImage;
    const logoUrl = selectedCompanyLogo;
    const bannerUrl = selectedBannerImage;

    const ProfileCircle = ({ style = {} }: { style?: any }) =>
      profileUrl ? (
        <Image source={{ uri: profileUrl }} style={[styles.demoProfileCircle, style]} />
      ) : (
        <View style={[styles.demoProfileCircle, styles.demoPlaceholder, style]}>
          <Text style={styles.demoText}>P</Text>
        </View>
      );

    const LogoRect = ({ style = {} }: { style?: any }) =>
      logoUrl ? (
        <Image source={{ uri: logoUrl }} style={[styles.demoLogoRect, style]} />
      ) : (
        <View style={[styles.demoLogoRect, styles.demoPlaceholder, style]}>
          <Text style={styles.demoText}>L</Text>
        </View>
      );

    const BannerBg = ({ style = {} }: { style?: any }) =>
      bannerUrl ? (
        <Image source={{ uri: bannerUrl }} style={[styles.demoBannerBg, style]} />
      ) : (
        <View style={[styles.demoBannerBg, { backgroundColor: selectedColor }, style]}>
          <Text style={styles.demoText}>B</Text>
        </View>
      );

    return (
      <View style={styles.demoRoot}>
        {/* 1) only profile (top half) */}
        {id === 1 && (
          <View style={{ height: '50%' }}>
            <ProfileCircle style={{ alignSelf: 'center', marginTop: 6 }} />
          </View>
        )}

        {/* 2) only logo 2/5 height */}
        {id === 2 && (
          <View style={{ height: '40%', justifyContent: 'center' }}>
            <LogoRect style={{ alignSelf: 'center' }} />
          </View>
        )}

        {/* 3) only banner 2/5 height */}
        {id === 3 && (
          <View style={{ height: '40%' }}>
            <BannerBg />
          </View>
        )}

        {/* 4) half profile + left bottom logo */}
        {id === 4 && (
          <>
            <View style={{ height: '50%', justifyContent: 'center' }}>
              <ProfileCircle style={{ alignSelf: 'center' }} />
            </View>
            <LogoRect style={{ position: 'absolute', bottom: 6, left: 6 }} />
          </>
        )}

        {/* 5) half bg logo + bottom left profile */}
        {id === 5 && (
          <>
            <View style={{ height: '50%', justifyContent: 'center' }}>
              <LogoRect style={{ alignSelf: 'center', transform: [{ scale: 1.1 }] }} />
            </View>
            <ProfileCircle style={{ position: 'absolute', bottom: 6, left: 6 }} />
          </>
        )}

        {/* 6) half banner + bottom left profile */}
        {id === 6 && (
          <>
            <View style={{ height: '50%' }}>
              <BannerBg />
            </View>
            <ProfileCircle style={{ position: 'absolute', bottom: 6, left: 6 }} />
          </>
        )}

        {/* 7) half banner + bottom left logo */}
        {id === 7 && (
          <>
            <View style={{ height: '50%' }}>
              <BannerBg />
            </View>
            <LogoRect style={{ position: 'absolute', bottom: 6, left: 6 }} />
          </>
        )}

        {/* 8) full banner + bottom left profile + bottom right logo */}
        {id === 8 && (
          <>
            <BannerBg style={{ height: '100%' }} />
            <ProfileCircle style={{ position: 'absolute', bottom: 6, left: 6 }} />
            <LogoRect style={{ position: 'absolute', bottom: 6, right: 6 }} />
          </>
        )}
      </View>
    );
  };

  return (
    <>
      <View style={[styles.imageAndLayoutContainer]}>
        <View style={styles.imageAndLayoutHeader}>
          <Text
            style={[
              {
                color: colors.text,
                fontSize: wp(5),
                fontWeight: 'bold',
                paddingHorizontal: wp(5),
              },
            ]}
          >
            Image and Layout
          </Text>
          <></>
        </View>

        <View style={[styles.imageAndLayoutBannerContainer]}>
          {selectedBannerImage ? (
            <Image source={{ uri: selectedBannerImage }} style={{ width: '100%', height: '100%' }} />
          ) : (
            <View style={[styles.imageAndLayoutBannerImage, { backgroundColor: selectedColor }]}>
              <View
                style={[
                  styles.imageAndLayoutBannerImageInner,
                  { backgroundColor: selectedColor },
                ]}
              >
                <Text>SalonX Logo</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.imageSelectionContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {imagePickOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleSelectImage(option.id)}
                style={[styles.imageSelectionItem, { borderColor: colors.text }]}
              >
                <Text style={{ color: colors.text }}>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: wp(4),
                      fontWeight: 'bold',
                    }}
                  >
                    +
                  </Text>{' '}
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.changeImageLayoutButtonContainer}>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={[styles.changeImageLayoutButton, { borderColor: colors.text }]}
          >
            <Text style={{ color: colors.text }}>Change Image Layout</Text>
          </TouchableOpacity>
        </View>

        {/* Layout selection modal */}
        <Modal
          visible={open}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setOpen(false)}
        >
          <SafeAreaView style={{ backgroundColor: colors.background }}>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: wp(5),
                paddingVertical: hp(0),
                flexDirection: 'row',
              }}
            >
              <Text style={{ fontSize: 20, color: colors.text }}>Choose Image Layout</Text>

              <TouchableOpacity onPress={() => setOpen(false)}>
                <Text style={{ marginTop: 20, color: 'red' }}>Close</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={{ padding: wp(10) }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {imageLayoutOptions.map(layout => (
                <TouchableOpacity
                  onPress={() => handleSelectLayout(layout.id)}
                  key={layout.id}
                  style={[
                    styles.layoutOption,
                    selectedLayoutId === layout.id
                      ? { borderColor: 'green', borderWidth: 5 }
                      : { borderColor: colors.text },
                  ]}
                >
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {/* ✅ DEMO PREVIEW TOP HALF */}
                    <View style={{ width: '100%', height: '50%' }}>
                      {renderLayoutPreview(layout.id)}
                    </View>

                    {/* TEXT BOTTOM HALF */}
                    <View style={{ width: '100%', height: '50%', padding: 8 }}>
                      <Text style={{ color: colors.text, fontWeight: '600' }}>
                        {layout.title}
                      </Text>
                      <Text style={{ color: colors.text, fontSize: 12 }}>
                        {layout.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </View>

      {/* Upload modal */}
      <Modal
        visible={uploadModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setUploadModalVisible(false)}
      >
        <View style={styles.uploadModalOverlay}>
          <View style={[styles.uploadModalContent, { backgroundColor: colors.background }]}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: colors.text,
                marginBottom: 10,
              }}
            >
              {activeImageType === 'profile'
                ? 'Upload Profile Image'
                : activeImageType === 'logo'
                ? 'Upload Company Logo'
                : activeImageType === 'banner'
                ? 'Upload Banner Image'
                : 'Upload Image'}
            </Text>

            <TouchableOpacity
              onPress={handleUploadFromDevice}
              style={styles.uploadFromDeviceButton}
              disabled={uploading || !!getActiveImageUrl()}
            >
              <Text style={{ color: colors.text }}>
                {uploading
                  ? 'Uploading...'
                  : getActiveImageUrl()
                  ? 'Image uploaded'
                  : 'Pick from device & upload'}
              </Text>
            </TouchableOpacity>

            {getActiveImageUrl() && (
              <View style={styles.previewContainer}>
                <Image
                  source={{ uri: getActiveImageUrl() as string }}
                  style={styles.previewImage}
                />
                <TouchableOpacity onPress={handleRemoveImage} style={styles.removeButton}>
                  <Text style={{ color: 'red' }}>Remove image</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.uploadActionsRow}>
              <TouchableOpacity
                onPress={() => setUploadModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={{ color: colors.text }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ImageAndLayout;

const styles = StyleSheet.create({
  imageAndLayoutContainer: {
    flex: 1,
    flexDirection: 'column',
    width: wp('100%'),
    paddingBottom: hp('1%'),
  },

  imageAndLayoutHeader: {
    paddingVertical: hp('1%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('100%'),
  },

  imageAndLayoutBannerContainer: {
    width: wp('100%'),
    height: hp('14%'),
    minHeight: 90,
    maxHeight: 160,
    overflow: 'hidden',
    borderRadius: wp('2%'),
  },

  imageAndLayoutBannerImage: {
    width: wp('100%'),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageAndLayoutBannerImageInner: {
    width: wp('50%'),
    height: '100%',
    alignSelf: 'center',
    borderRadius: wp('25%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageAndLayoutBannerImageInnerText: {
    fontSize: wp(4),
    fontWeight: '600',
  },

  imageSelectionContainer: {
    width: wp('100%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1%'),
  },

  imageSelectionItem: {
    width: wp('42%'),
    height: hp('5%'),
    minHeight: 36,
    maxHeight: 48,
    borderWidth: 1,
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(4),
    paddingHorizontal: wp(2),
  },

  changeImageLayoutButtonContainer: {
    width: wp('100%'),
    paddingVertical: hp('1%'),
  },

  changeImageLayoutButton: {
    width: wp('55%'),
    height: hp('5.5%'),
    minHeight: 40,
    maxHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(10),
    borderWidth: 1,
    alignSelf: 'center',
  },

  layoutOption: {
    width: wp('70%'),
    height: hp('50%'),
    minHeight: 280,
    maxHeight: 520,
    borderWidth: 1,
    borderRadius: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(5),
    overflow: 'hidden',
  },

  uploadModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  uploadModalContent: {
    paddingHorizontal: wp(5),
    paddingTop: hp('2%'),
    paddingBottom: hp('3%'),
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
  },

  uploadActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },

  uploadFromDeviceButton: {
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp(3),
    borderRadius: wp(2),
    borderWidth: 1,
    marginBottom: hp('1.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  previewContainer: {
    marginTop: hp('1%'),
    marginBottom: hp('1.5%'),
    alignItems: 'center',
  },

  previewImage: {
    width: wp('70%'),
    height: hp('22%'),
    minHeight: 120,
    maxHeight: 220,
    borderRadius: wp(2),
    resizeMode: 'cover',
  },

  removeButton: {
    marginTop: hp('1%'),
  },

  cancelButton: {
    paddingHorizontal: wp(4),
    paddingVertical: hp('1%'),
  },

  saveButton: {
    paddingHorizontal: wp(4),
    paddingVertical: hp('1%'),
    borderRadius: wp(2),
    backgroundColor: 'black',
  },

  // ✅ DEMO PREVIEW STYLES
  demoRoot: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#111',
    borderRadius: wp(2),
    overflow: 'hidden',
  },

  demoBannerBg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },

  demoProfileCircle: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(9),
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },

  demoLogoRect: {
    width: wp(20),
    height: wp(10),
    borderRadius: wp(2),
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },

  demoPlaceholder: {
    borderWidth: 1,
    borderColor: '#666',
  },

  demoText: {
    color: '#aaa',
    fontSize: 12,
    fontWeight: '700',
  },
});