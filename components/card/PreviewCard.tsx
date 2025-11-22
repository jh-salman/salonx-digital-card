import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from '@/context/ThemeContext';

const PreviewCard = ({ onPress }: { onPress?: () => void }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container} pointerEvents="box-none">
      {/* Preview Card button fixed at bottom */}
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={[styles.previewCardButton, { backgroundColor: colors.buttonColor }]}
      >
        <Text style={[styles.previewCardButtonText, { color: colors.background }]}>
          Preview Card
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PreviewCard;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(5),
    zIndex: 50,
  },

  previewCardButton: {
    width: '100%',
    height: hp('6.5%'),
    minHeight: 46,
    maxHeight: 58,
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',

    // shadow (iOS + Android)
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  previewCardButtonText: {
    fontSize: wp(4.2),
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});