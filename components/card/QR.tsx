import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from '@/context/ThemeContext';
import { useCardCreate } from '@/context/CardCreateContext';

const QR = () => {
  const { colors } = useTheme();
  const {
    selectedProfileImage,
    selectedCompanyLogo,
    selectedBannerImage,
    selectedLayoutId,
  } = useCardCreate();

  // ✅ later: ekhane real card/profile URL dibo
  const qrValue = useMemo(() => {
    return JSON.stringify({
      layoutId: selectedLayoutId,
      profile: selectedProfileImage || null,
      logo: selectedCompanyLogo || null,
      banner: selectedBannerImage || null,
      createdAt: Date.now(),
    });
  }, [selectedLayoutId, selectedProfileImage, selectedCompanyLogo, selectedBannerImage]);

  // ✅ responsive size (phone/tablet safe)
  const size = Math.min(wp('70%'), 260);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>QR Code</Text>

      {/* QR shown in center */}
      <View style={styles.qrWrap}>
        <QRCode
          value={qrValue}
          size={size}
          color={colors.text}
          backgroundColor="transparent"
          // ✅ Premium feature (logo in middle) enable later:
          // logo={{ uri: selectedCompanyLogo }}
          // logoSize={size * 0.22}
          // logoBackgroundColor="transparent"
        />

        {/* Premium badge (demo / placeholder) */}
        {false && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>Premium</Text>
          </View>
        )}
      </View>

      <Text style={[styles.helper, { color: colors.mutedText || '#999' }]}>
        Scan to open this card
      </Text>

      {/* Premium-only UI placeholder */}
      <View style={[styles.premiumBox, { borderColor: colors.text }]}>
        <Text style={[styles.premiumTitle, { color: colors.text }]}>
          Add Logo in QR (Premium)
        </Text>
        <Text style={{ color: colors.mutedText || '#999', fontSize: wp(3.2) }}>
          Upgrade to place your logo inside the QR code.
        </Text>
      </View>
    </View>
  );
};

export default QR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: hp(2),
  },
  title: {
    fontSize: wp(5.2),
    fontWeight: '700',
  },
  qrWrap: {
    marginTop: hp(2),
    width: wp('80%'),
    minWidth: 220,
    maxWidth: 320,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(4),
  },
  helper: {
    fontSize: wp(3.4),
  },
  premiumBox: {
    width: '100%',
    borderWidth: 1,
    borderRadius: wp(3),
    padding: wp(4),
    marginTop: hp(2),
    gap: hp(0.6),
  },
  premiumTitle: {
    fontSize: wp(4),
    fontWeight: '700',
  },
  premiumBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  premiumText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
});