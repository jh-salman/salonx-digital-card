import React, { useMemo, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from '@/context/ThemeContext';
import { useCardCreate } from '@/context/CardCreateContext';
import { MaterialCommunityIcons, Feather, FontAwesome5 } from '@expo/vector-icons';

const SocialMedia = () => {
  const { colors } = useTheme();
  const { selectedColor, cardData, setSocial, removeSocial } = useCardCreate();

  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [activeLabel, setActiveLabel] = useState<string>('');
  const [inputValue, setInputValue] = useState('');

  const savedSocials = cardData.socials || {}; // ✅ context socials

  const socialOptions = useMemo(
    () => [
      { key: 'phone', label: 'Phone' },
      { key: 'email', label: 'Email' },
      { key: 'link', label: 'Link' },
      { key: 'address', label: 'Address' },
      { key: 'website', label: 'Company Website' },
      { key: 'linkedin', label: 'LinkedIn' },
      { key: 'instagram', label: 'Instagram' },
      { key: 'calendly', label: 'Calendly' },
      { key: 'x', label: 'X' },
      { key: 'facebook', label: 'Facebook' },
      { key: 'threads', label: 'Threads' },
      { key: 'snapchat', label: 'SnapChat' },
      { key: 'tiktok', label: 'TikTok' },
      { key: 'youtube', label: 'YouTube' },
      { key: 'github', label: 'GitHub' },
      { key: 'yelp', label: 'Yelp' },
      { key: 'venmo', label: 'Venmo' },
      { key: 'paypal', label: 'PayPal' },
      { key: 'cashapp', label: 'CashApp' },
      { key: 'discord', label: 'Discord' },
      { key: 'signal', label: 'Signal' },
      { key: 'skype', label: 'Skype' },
      { key: 'telegram', label: 'Telegram' },
      { key: 'twitch', label: 'Twitch' },
      { key: 'whatsapp', label: 'WhatsApp' },
    ],
    []
  );

  const iconMap: Record<string, { lib: 'mci' | 'feather' | 'fa5'; name: string }> = {
    phone: { lib: 'feather', name: 'phone' },
    email: { lib: 'feather', name: 'mail' },
    link: { lib: 'feather', name: 'link' },
    address: { lib: 'feather', name: 'map-pin' },
    website: { lib: 'feather', name: 'globe' },

    linkedin: { lib: 'mci', name: 'linkedin' },
    instagram: { lib: 'mci', name: 'instagram' },
    calendly: { lib: 'mci', name: 'calendar-clock' },
    x: { lib: 'mci', name: 'twitter' },
    facebook: { lib: 'mci', name: 'facebook' },
    threads: { lib: 'mci', name: 'at' },

    snapchat: { lib: 'mci', name: 'snapchat' },
    tiktok: { lib: 'mci', name: 'music-note' },
    youtube: { lib: 'mci', name: 'youtube' },
    github: { lib: 'mci', name: 'github' },
    yelp: { lib: 'mci', name: 'yelp' },

    venmo: { lib: 'mci', name: 'cash' },
    paypal: { lib: 'mci', name: 'paypal' },
    cashapp: { lib: 'mci', name: 'cash-multiple' },

    discord: { lib: 'mci', name: 'discord' },
    signal: { lib: 'mci', name: 'message-processing' },
    skype: { lib: 'mci', name: 'skype' },
    telegram: { lib: 'mci', name: 'telegram' },
    twitch: { lib: 'mci', name: 'twitch' },
    whatsapp: { lib: 'mci', name: 'whatsapp' },
  };

  const renderIcon = (key: string) => {
    const icon = iconMap[key];
    const size = wp(5);
    const color = selectedColor || colors.primary;

    if (!icon) return <Feather name="plus" size={size} color={color} />;

    if (icon.lib === 'feather') {
      return <Feather name={icon.name as any} size={size} color={color} />;
    }
    if (icon.lib === 'fa5') {
      return <FontAwesome5 name={icon.name as any} size={size} color={color} />;
    }
    return <MaterialCommunityIcons name={icon.name as any} size={size} color={color} />;
  };

  const handleAddSocial = (key: string, label: string) => {
    setActiveKey(key);
    setActiveLabel(label);
    setInputValue((savedSocials as any)[key] || '');
    setModalVisible(true);
  };

  const handleSaveSocial = () => {
    if (!activeKey) return;
    const trimmed = inputValue.trim();
    setSocial(activeKey as any, trimmed); // ✅ save to context
    setModalVisible(false);
  };

  const handleRemoveSocial = () => {
    if (!activeKey) return;
    removeSocial(activeKey as any); // ✅ remove from context
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Social Media</Text>

      <View style={styles.grid}>
        {socialOptions.map(item => (
          <TouchableOpacity
            key={item.key}
            onPress={() => handleAddSocial(item.key, item.label)}
            style={[styles.gridItem, { borderColor: colors.text }]}
            activeOpacity={0.8}
          >
            <View style={styles.iconWrap}>{renderIcon(item.key)}</View>

            <Text style={{ color: colors.text, fontSize: wp(3.5), fontWeight: '600', marginTop: 4 }}>
              {item.label}
            </Text>

            {(savedSocials as any)[item.key] ? (
              <Text
                style={{ color: colors.mutedText || '#999', fontSize: wp(2.8), marginTop: 2 }}
                numberOfLines={1}
              >
                {(savedSocials as any)[item.key]}
              </Text>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>

      {/* bottom modal */}
      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Add {activeLabel}</Text>

            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              placeholder={`Enter your ${activeLabel.toLowerCase()}`}
              placeholderTextColor={colors.mutedText || '#999'}
              style={[styles.modalInput, { borderColor: colors.text, color: colors.text }]}
              autoCapitalize="none"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalBtn}>
                <Text style={{ color: colors.text }}>Cancel</Text>
              </TouchableOpacity>

              {activeKey && (savedSocials as any)[activeKey] ? (
                <TouchableOpacity onPress={handleRemoveSocial} style={styles.modalBtn}>
                  <Text style={{ color: 'red' }}>Remove</Text>
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity onPress={handleSaveSocial} style={[styles.modalBtn, styles.modalPrimaryBtn]}>
                <Text style={{ color: '#fff' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SocialMedia;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(3),
  },
  sectionTitle: {
    fontSize: wp(5),
    fontWeight: '700',
    marginTop: hp(1),
    marginBottom: hp(1.5),
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: wp(2),
  },

  gridItem: {
    width: '31%',
    height: hp('6%'),
    minHeight: 58,
    maxHeight: 76,
    borderWidth: 1,
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(1),
    marginBottom: wp(2),
  },

  iconWrap: {
    width: wp(8),
    height: wp(8),
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    paddingHorizontal: wp(5),
    paddingTop: hp('2%'),
    paddingBottom: hp('3%'),
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
  },
  modalTitle: {
    fontSize: wp(4.5),
    fontWeight: '700',
    marginBottom: hp('1%'),
  },
  modalInput: {
    width: '100%',
    height: hp('5.5%'),
    minHeight: 40,
    maxHeight: 52,
    borderWidth: 1,
    borderRadius: wp(2.5),
    paddingHorizontal: wp(3),
    fontSize: wp(3.6),
    marginBottom: hp('1.5%'),
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: wp(2.5),
  },
  modalBtn: {
    paddingHorizontal: wp(3.5),
    paddingVertical: hp('0.8%'),
    borderRadius: wp(2),
  },
  modalPrimaryBtn: {
    backgroundColor: '#000',
  },
});