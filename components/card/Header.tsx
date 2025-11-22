import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useTheme } from "@/context/ThemeContext";
import { useCardCreate } from "@/context/CardCreateContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

type HeaderProps = {
  title?: string;

  // UI actions
  onCancel?: () => void;

  // if you want to override default save behavior
  onSaveOverride?: (newTitle: string) => Promise<void> | void;

  // optional UI control
  disableSave?: boolean;
  editableTitle?: boolean;

  // optional: call after successful save
  onSaved?: (savedCard: any) => void;
};

const Header = ({
  title = "Title",
  onCancel,
  onSaveOverride,
  disableSave = false,
  editableTitle = true,
  onSaved,
}: HeaderProps) => {
  const { colors } = useTheme();
  const router = useRouter();

  const { cardData, setCardData } = useCardCreate();

  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const [saving, setSaving] = useState(false);

  // keep local title synced if parent changes
  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  const handleSavePress = async () => {
    const finalTitle = localTitle.trim() || title;

    setIsEditing(false);

    // ✅ if parent wants custom save logic
    if (onSaveOverride) {
      await onSaveOverride(finalTitle);
      return;
    }

    try {
      setSaving(true);

      // ✅ get current logged in user
      const { data: userRes, error: userErr } = await supabase.auth.getUser();
      if (userErr || !userRes.user) {
        Alert.alert("Error", "User not authenticated");
        return;
      }

      const userId = userRes.user.id;

      // ✅ build payload from context
      const payload = {
        user_id: userId,
        title: finalTitle,

        selected_color: cardData.selectedColor,
        selected_layout_id: cardData.selectedLayoutId,

        profile_image_url: cardData.selectedProfileImage,
        company_logo_url: cardData.selectedCompanyLogo,
        banner_image_url: cardData.selectedBannerImage,

        personal: cardData.personal,
        socials: cardData.socials,

        where_we_met_enabled: cardData.whereWeMetEnabled,
        where_we_met_text: cardData.whereWeMetText,
        remove_branding_enabled: cardData.removeBrandingEnabled,
      };

      let savedCard: any = null;

      // ✅ Update if cardData.id exists else Insert
      if (cardData.id) {
        const { data, error } = await supabase
          .from("cards")
          .update(payload)
          .eq("id", cardData.id)
          .select()
          .single();

        if (error) throw error;
        savedCard = data;
      } else {
        const { data, error } = await supabase
          .from("cards")
          .insert(payload)
          .select()
          .single();

        if (error) throw error;
        savedCard = data;
      }

      // ✅ store saved id back into context (important for next update)
      if (savedCard?.id) {
        setCardData((prev: any) => ({ ...prev, id: savedCard.id }));
      }

      Alert.alert("Success", "Card saved successfully!");
      onSaved?.(savedCard);

      // ✅ back after save (you can remove if you don't want)
      router.back();
    } catch (e: any) {
      console.log("Save error:", e?.message);
      Alert.alert("Save failed", e?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}
    >
      {/* Cancel */}
      <TouchableOpacity
        onPress={onCancel || (() => router.back())}
        activeOpacity={0.75}
        style={styles.sideBtn}
      >
        <Text style={[styles.sideText, { color: colors.text }]}>Cancel</Text>
      </TouchableOpacity>

      {/* Title (editable) */}
      <View style={styles.center}>
        {editableTitle && isEditing ? (
          <TextInput
            value={localTitle}
            onChangeText={setLocalTitle}
            autoFocus
            placeholder="Enter title"
            placeholderTextColor={colors.mutedText || "#999"}
            style={[
              styles.titleInput,
              {
                color: colors.text,
                borderColor: colors.text,
              },
            ]}
            returnKeyType="done"
            onSubmitEditing={() => setIsEditing(false)}
          />
        ) : (
          <TouchableOpacity
            activeOpacity={editableTitle ? 0.7 : 1}
            onPress={() => editableTitle && setIsEditing(true)}
          >
            <Text
              numberOfLines={1}
              style={[styles.headerTitle, { color: colors.text }]}
            >
              {localTitle || title}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Save */}
      <TouchableOpacity
        onPress={handleSavePress}
        disabled={disableSave || saving}
        activeOpacity={0.75}
        style={styles.sideBtn}
      >
        <Text
          style={[
            styles.sideText,
            {
              color:
                disableSave || saving
                  ? (colors.mutedText || "#999")
                  : colors.primary,
            },
          ]}
        >
          {saving ? "Saving..." : "Save"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.2),
    borderBottomWidth: 1,

    ...Platform.select({
      ios: { paddingTop: hp(1.5) },
      android: { paddingTop: hp(1) },
    }),
  },

  sideBtn: {
    minWidth: wp(18),
    paddingVertical: hp(0.6),
  },

  sideText: {
    fontSize: wp(3.8),
    fontWeight: "700",
  },

  center: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: wp(2),
  },

  headerTitle: {
    fontSize: wp(4.4),
    fontWeight: "700",
    maxWidth: wp(55),
  },

  titleInput: {
    width: wp(55),
    fontSize: wp(4),
    fontWeight: "700",
    borderWidth: 1,
    borderRadius: wp(2.5),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
    textAlign: "center",
  },
});