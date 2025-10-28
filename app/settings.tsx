import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Settings() {
  const { theme, mode, setMode, colors } = useTheme();
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const modes: ("light" | "dark" | "auto")[] = ["light", "dark", "auto"];

  const getModeIcon = (m: string) => {
    if (m === "light") return "☀️";
    if (m === "dark") return "🌙";
    return "⚙️";
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace("/");
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Theme Settings Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Theme Settings
          </Text>
          <Text style={[styles.subtitle, { color: colors.text, opacity: 0.7 }]}>
            Current theme: <Text style={{ fontWeight: "bold" }}>{theme}</Text>
          </Text>

          {modes.map((m) => (
            <TouchableOpacity
              key={m}
              style={[
                styles.modeButton,
                {
                  backgroundColor: mode === m ? colors.primary : colors.card,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => setMode(m)}
            >
              <View style={styles.modeContent}>
                <View style={styles.modeRow}>
                  <Text style={styles.modeIcon}>{getModeIcon(m)}</Text>
                  <Text
                    style={[
                      styles.modeText,
                      { color: mode === m ? "#ffffff" : colors.text },
                    ]}
                  >
                    {m === "auto" ? "Auto (System)" : m.charAt(0).toUpperCase() + m.slice(1)}
                  </Text>
                </View>
                {mode === m && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Account Section */}
        {user && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Account
            </Text>
            
            {/* User Info */}
            <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.infoLabel, { color: colors.text, opacity: 0.6 }]}>
                Email
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {user.email}
              </Text>
            </View>

            {/* Logout Button */}
            <TouchableOpacity
              style={[styles.logoutButton, { borderColor: '#ff4444' }]}
              onPress={handleLogout}
              disabled={loading}
            >
              <Text style={styles.logoutIcon}>🚪</Text>
              <Text style={styles.logoutText}>
                {loading ? "Logging out..." : "Logout"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Not Logged In */}
        {!user && (
          <View style={styles.section}>
            <TouchableOpacity
              style={[styles.loginButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push("/(auth)/login")}
            >
              <Text style={styles.loginText}>Login / Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: wp(5),
    paddingTop: hp(3),
  },
  section: {
    marginBottom: hp(4),
  },
  sectionTitle: {
    fontSize: wp(7),
    fontWeight: "bold",
    marginBottom: hp(1),
  },
  subtitle: {
    fontSize: wp(4),
    marginBottom: hp(3),
  },
  modeButton: {
    padding: wp(4),
    borderRadius: wp(3),
    marginBottom: hp(1.5),
    borderWidth: 1,
  },
  modeContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  modeIcon: {
    fontSize: wp(6),
    marginRight: wp(3),
  },
  modeText: {
    fontSize: wp(4.5),
    fontWeight: "600",
  },
  checkmark: {
    color: "#ffffff",
    fontSize: wp(5),
  },
  infoCard: {
    padding: wp(4),
    borderRadius: wp(3),
    marginBottom: hp(2),
  },
  infoLabel: {
    fontSize: wp(3.5),
    marginBottom: hp(0.5),
  },
  infoValue: {
    fontSize: wp(4.5),
    fontWeight: "600",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: wp(4),
    borderRadius: wp(3),
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  logoutIcon: {
    fontSize: wp(5),
    marginRight: wp(2),
  },
  logoutText: {
    fontSize: wp(4.5),
    fontWeight: "600",
    color: '#ff4444',
  },
  loginButton: {
    padding: wp(4),
    borderRadius: wp(3),
    alignItems: 'center',
  },
  loginText: {
    fontSize: wp(4.5),
    fontWeight: "600",
    color: '#ffffff',
  },
});