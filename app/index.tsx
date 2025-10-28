import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "expo-router";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Index() {
  const { theme, colors } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome to Blinq Clone
        </Text>
        <Text style={[styles.subtitle, { color: colors.text, opacity: 0.7 }]}>
          Your digital business card, simplified
        </Text>
      </View>
      
      {/* Buttons Container */}
      <View style={styles.buttonContainer}>
        {/* Create Card Button */}
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push("/(tabs)/card")}
        >
          <Text style={styles.primaryButtonText}>Create Card</Text>
        </TouchableOpacity>
        
        {/* Sign In Button */}
        <TouchableOpacity
          style={[
            styles.secondaryButton,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
            Sign In
          </Text>
        </TouchableOpacity>

        {/* Settings Link */}
        <TouchableOpacity
          style={styles.settingsLink}
          onPress={() => router.push("/settings")}
        >
          <Text style={[styles.settingsLinkText, { color: colors.primary }]}>
            Go to Settings
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer Info */}
      <View style={styles.footerContainer}>
        <Text style={[styles.footerText, { color: colors.text, opacity: 0.5 }]}>
          Create and share your digital business card instantly
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(6),
    paddingTop: hp(15),
    paddingBottom: hp(10),
  },
  headerContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: wp(9),
    fontWeight: 'bold',
    marginBottom: hp(1.5),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: wp(4.5),
    textAlign: 'center',
    marginBottom: hp(2),
    paddingHorizontal: wp(4),
  },
  buttonContainer: {
    width: '100%',
    maxWidth: wp(85),
  },
  primaryButton: {
    paddingVertical: hp(2.2),
    paddingHorizontal: wp(8),
    borderRadius: wp(3),
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: wp(5),
    fontWeight: '700',
    textAlign: 'center',
  },
  secondaryButton: {
    paddingVertical: hp(2.2),
    paddingHorizontal: wp(8),
    borderRadius: wp(3),
    borderWidth: 2,
    marginBottom: hp(1.5),
  },
  secondaryButtonText: {
    fontSize: wp(5),
    fontWeight: '600',
    textAlign: 'center',
  },
  settingsLink: {
    paddingVertical: hp(1.5),
    alignItems: 'center',
  },
  settingsLinkText: {
    fontSize: wp(3.8),
    fontWeight: '500',
  },
  footerContainer: {
    alignItems: 'center',
    paddingHorizontal: wp(8),
  },
  footerText: {
    fontSize: wp(3.5),
    textAlign: 'center',
    lineHeight: wp(5),
  },
});