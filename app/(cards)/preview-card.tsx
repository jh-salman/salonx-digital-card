import React, { useMemo } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useTheme } from "@/context/ThemeContext";
import { useCardCreate } from "@/context/CardCreateContext";
import { MaterialCommunityIcons, Feather, FontAwesome5 } from "@expo/vector-icons";

const CardPreviewScreen = () => {
  const { colors } = useTheme();
  const { cardData } = useCardCreate();

  const {
    selectedColor,
    selectedLayoutId,
    selectedProfileImage,
    selectedCompanyLogo,
    selectedBannerImage,
    personal,
    socials,
    whereWeMetEnabled,
    whereWeMetText,
  } = cardData;

  // ✅ Build full name safely
  const fullName = useMemo(() => {
    const parts = [
      personal.prefix,
      personal.firstName,
      personal.middleName,
      personal.lastName,
      personal.suffix,
    ]
      .map(p => (p || "").trim())
      .filter(Boolean);

    return parts.join(" ");
  }, [personal]);

  // ✅ Icon mapping for preview
  const iconMap: Record<string, { lib: "mci" | "feather" | "fa5"; name: string }> = {
    phone: { lib: "feather", name: "phone" },
    email: { lib: "feather", name: "mail" },
    link: { lib: "feather", name: "link" },
    address: { lib: "feather", name: "map-pin" },
    website: { lib: "feather", name: "globe" },

    linkedin: { lib: "mci", name: "linkedin" },
    instagram: { lib: "mci", name: "instagram" },
    calendly: { lib: "mci", name: "calendar-clock" },
    x: { lib: "mci", name: "twitter" },
    facebook: { lib: "mci", name: "facebook" },
    threads: { lib: "mci", name: "at" },

    snapchat: { lib: "mci", name: "snapchat" },
    tiktok: { lib: "mci", name: "music-note" },
    youtube: { lib: "mci", name: "youtube" },
    github: { lib: "mci", name: "github" },
    yelp: { lib: "mci", name: "yelp" },

    venmo: { lib: "mci", name: "cash" },
    paypal: { lib: "mci", name: "paypal" },
    cashapp: { lib: "mci", name: "cash-multiple" },

    discord: { lib: "mci", name: "discord" },
    signal: { lib: "mci", name: "message-processing" },
    skype: { lib: "mci", name: "skype" },
    telegram: { lib: "mci", name: "telegram" },
    twitch: { lib: "mci", name: "twitch" },
    whatsapp: { lib: "mci", name: "whatsapp" },
  };

  const renderIcon = (key: string) => {
    const icon = iconMap[key];
    const size = wp(4.8);
    const color = selectedColor || colors.primary;

    if (!icon) return <Feather name="link" size={size} color={color} />;

    if (icon.lib === "feather") {
      return <Feather name={icon.name as any} size={size} color={color} />;
    }
    if (icon.lib === "fa5") {
      return <FontAwesome5 name={icon.name as any} size={size} color={color} />;
    }
    return <MaterialCommunityIcons name={icon.name as any} size={size} color={color} />;
  };

  // ✅ Reusable UI blocks
  const Banner = ({ heightPct = 18 }: { heightPct?: number }) =>
    selectedBannerImage ? (
      <Image
        source={{ uri: selectedBannerImage }}
        style={[styles.banner, { height: hp(`${heightPct}%`) }]}
      />
    ) : (
      <View
        style={[
          styles.banner,
          { height: hp(`${heightPct}%`), backgroundColor: selectedColor },
        ]}
      />
    );

  const Profile = ({ style = {} }: { style?: any }) =>
    selectedProfileImage ? (
      <Image source={{ uri: selectedProfileImage }} style={[styles.profile, style]} />
    ) : (
      <View style={[styles.profile, styles.placeholder, style]}>
        <Text style={{ color: colors.text, fontWeight: "700" }}>P</Text>
      </View>
    );

  const Logo = ({ style = {} }: { style?: any }) =>
    selectedCompanyLogo ? (
      <Image source={{ uri: selectedCompanyLogo }} style={[styles.logo, style]} />
    ) : null;

  const SocialList = () => {
    const entries = socials ? Object.entries(socials).filter(([, v]) => !!v) : [];
    if (!entries.length) return null;

    return (
      <View style={styles.socialGrid}>
        {entries.map(([key, val]) => (
          <View key={key} style={styles.socialItemRow}>
            {renderIcon(key)}
            <Text
              style={[styles.socialText, { color: colors.text }]}
              numberOfLines={1}
            >
              {val as string}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const InfoBlock = () => (
    <View style={styles.infoBlock}>
      <Text style={[styles.name, { color: colors.text }]}>
        {fullName || "Your name"}
      </Text>

      {personal.jobTitle ? (
        <Text style={[styles.sub, { color: colors.text }]}>{personal.jobTitle}</Text>
      ) : null}

      {personal.company ? (
        <Text style={[styles.sub, { color: colors.text }]}>{personal.company}</Text>
      ) : null}

      {personal.headline ? (
        <Text style={[styles.headline, { color: colors.text }]}>{personal.headline}</Text>
      ) : null}

      {whereWeMetEnabled && whereWeMetText ? (
        <Text style={[styles.whereWeMet, { color: colors.text }]}>
          Where we met: {whereWeMetText}
        </Text>
      ) : null}

      <SocialList />
    </View>
  );

  // ✅ Layout renderer (1–8 exact)
  const renderLayout = () => {
    switch (selectedLayoutId) {
      case 1: // Only profile top half
        return (
          <View style={[styles.card, { backgroundColor: selectedColor }]}>
            <View style={{ height: "50%", justifyContent: "center" }}>
              <Profile style={{ alignSelf: "center", position: "relative", top: 0, left: 0 }} />
            </View>
            <InfoBlock />
          </View>
        );

      case 2: // Only logo (2/5)
        return (
          <View style={[styles.card, { backgroundColor: selectedColor }]}>
            <View style={{ height: "40%", justifyContent: "center" }}>
              <Logo style={{ alignSelf: "center", position: "relative" }} />
            </View>
            <InfoBlock />
          </View>
        );

      case 3: // Only banner (2/5)
        return (
          <View style={[styles.card, { backgroundColor: selectedColor }]}>
            <Banner heightPct={40} />
            <InfoBlock />
          </View>
        );

      case 4: // Half profile + bottom-left logo
        return (
          <View style={[styles.card, { backgroundColor: selectedColor }]}>
            <View style={{ height: "50%", justifyContent: "center" }}>
              <Profile style={{ alignSelf: "center", position: "relative", top: 0, left: 0 }} />
            </View>
            <Logo style={{ position: "absolute", bottom: hp(2), left: wp(4) }} />
            <InfoBlock />
          </View>
        );

      case 5: // Half logo bg + bottom-left profile
        return (
          <View style={[styles.card, { backgroundColor: selectedColor }]}>
            <View style={{ height: "50%", justifyContent: "center" }}>
              <Logo style={{ alignSelf: "center", position: "relative" }} />
            </View>
            <Profile style={{ position: "absolute", bottom: hp(2), left: wp(4) }} />
            <InfoBlock />
          </View>
        );

      case 6: // Half banner + bottom-left profile
        return (
          <View style={[styles.card, { backgroundColor: selectedColor }]}>
            <Banner heightPct={50} />
            <Profile style={{ position: "absolute", bottom: hp(2), left: wp(4) }} />
            <InfoBlock />
          </View>
        );

      case 7: // Half banner + bottom-left logo
        return (
          <View style={[styles.card, { backgroundColor: selectedColor }]}>
            <Banner heightPct={50} />
            <Logo style={{ position: "absolute", bottom: hp(2), left: wp(4) }} />
            <InfoBlock />
          </View>
        );

      case 8: // Full banner + bottom-left profile + bottom-right logo
        return (
          <View style={[styles.card, { backgroundColor: selectedColor }]}>
            <Banner heightPct={100} />
            <Profile style={{ position: "absolute", bottom: hp(2), left: wp(4) }} />
            <Logo style={{ position: "absolute", bottom: hp(2), right: wp(4) }} />

            <View style={styles.infoOverlay}>
              <Text style={[styles.name, { color: colors.text }]}>
                {fullName || "Your name"}
              </Text>
              {personal.jobTitle ? (
                <Text style={[styles.sub, { color: colors.text }]}>{personal.jobTitle}</Text>
              ) : null}
              <SocialList />
            </View>
          </View>
        );

      default: // fallback
        return (
          <View style={[styles.card, { backgroundColor: selectedColor }]}>
            <Banner />
            <Profile />
            <Logo />
            <InfoBlock />
          </View>
        );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>Card Preview</Text>
      {renderLayout()}
    </ScrollView>
  );
};

export default CardPreviewScreen;

// ✅ responsive styles
const styles = StyleSheet.create({
  container: {
    padding: wp(5),
    paddingBottom: hp(5),
    flexGrow: 1,
  },

  title: {
    fontSize: wp(5),
    fontWeight: "700",
    marginBottom: hp(2),
  },

  card: {
    width: "100%",
    borderRadius: wp(4),
    overflow: "hidden",
    minHeight: hp(45),
  },

  banner: {
    width: "100%",
    resizeMode: "cover",
  },

  profile: {
    width: wp(24),
    height: wp(24),
    borderRadius: wp(12),
    position: "absolute",
    top: hp(12),
    left: wp(5),
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: wp(18),
    height: wp(8),
    resizeMode: "contain",
    position: "absolute",
    bottom: hp(2),
    right: wp(4),
  },

  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },

  infoBlock: {
    marginTop: hp(8),
    padding: wp(5),
  },

  infoOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: hp(20),
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  name: {
    fontSize: wp(5),
    fontWeight: "700",
  },

  sub: {
    fontSize: wp(3.8),
    marginTop: 2,
  },

  headline: {
    fontSize: wp(3.5),
    marginTop: hp(0.5),
  },

  whereWeMet: {
    marginTop: hp(1),
    fontSize: wp(3.4),
    fontWeight: "600",
  },

  // ✅ Socials with icons
  socialGrid: {
    marginTop: hp(1),
    gap: hp(0.8),
  },

  socialItemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(2),
  },

  socialText: {
    fontSize: wp(3.4),
    flexShrink: 1,
  },
});