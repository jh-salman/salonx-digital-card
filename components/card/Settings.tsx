import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from '@/context/ThemeContext';

const Settings = () => {
  const { colors } = useTheme();

  const [whereWeMetEnabled, setWhereWeMetEnabled] = useState(false);
  const [removeBrandingEnabled, setRemoveBrandingEnabled] = useState(false); // premium toggle

  const handleDeleteCard = () => {
    // later: confirm + delete from supabase/context
    console.log('Delete card pressed');
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>

      {/* Where We Met toggle */}
      <View style={[styles.row, { borderColor: colors.text }]}>
        <View style={styles.rowTextWrap}>
          <Text style={[styles.rowTitle, { color: colors.text }]}>Where We Met</Text>
          <Text style={[styles.rowSub, { color: colors.mutedText || '#999' }]}>
            Show a “Where we met” detail on your card.
          </Text>
        </View>

        <Switch
          value={whereWeMetEnabled}
          onValueChange={setWhereWeMetEnabled}
          thumbColor={whereWeMetEnabled ? colors.primary : '#f4f3f4'}
          trackColor={{
            false: '#767577',
            true: colors.primary || '#0a84ff',
          }}
        />
      </View>

      {/* Remove branding (premium) toggle */}
      <View style={[styles.row, { borderColor: colors.text }]}>
        <View style={styles.rowTextWrap}>
          <Text style={[styles.rowTitle, { color: colors.text }]}>Remove SalonX Branding</Text>
          <Text style={[styles.rowSub, { color: colors.mutedText || '#999' }]}>
            Premium feature: hide SalonX branding on your card.
          </Text>
        </View>

        <Switch
          value={removeBrandingEnabled}
          onValueChange={setRemoveBrandingEnabled}
          thumbColor={removeBrandingEnabled ? colors.primary : '#f4f3f4'}
          trackColor={{
            false: '#767577',
            true: colors.primary || '#0a84ff',
          }}
        />
      </View>

      {/* Delete card button */}
      <View style={styles.deleteWrap}>
        <TouchableOpacity
          onPress={handleDeleteCard}
          style={[styles.deleteBtn, { borderColor: 'red' }]}
          activeOpacity={0.8}
        >
          <Text style={styles.deleteText}>Delete Card</Text>
        </TouchableOpacity>

        <Text style={[styles.deleteHint, { color: colors.mutedText || '#999' }]}>
          This action can&apos;t be undone.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(3),
    gap: hp(1.5),
  },

  sectionTitle: {
    fontSize: wp(5),
    fontWeight: '700',
    marginTop: hp(1),
    marginBottom: hp(1),
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: wp(3),
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.6),
  },

  rowTextWrap: {
    flex: 1,
    paddingRight: wp(3),
    gap: hp(0.4),
  },

  rowTitle: {
    fontSize: wp(4),
    fontWeight: '700',
  },

  rowSub: {
    fontSize: wp(3.1),
    lineHeight: wp(4.2),
  },

  deleteWrap: {
    marginTop: hp(2),
    alignItems: 'center',
    gap: hp(0.7),
    marginBottom: hp(6),
  },

  deleteBtn: {
    width: '100%',
    height: hp('6%'),
    minHeight: 44,
    maxHeight: 56,
    borderWidth: 1.5,
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteText: {
    color: 'red',
    fontSize: wp(4),
    fontWeight: '700',
  },

  deleteHint: {
    fontSize: wp(3),
  },
});