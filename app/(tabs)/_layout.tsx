import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import PrivateRoute from "@/shared/PrivateRoute";

export default function Layout() {
  const { colors } = useTheme();

  return (
    <PrivateRoute>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            borderTopWidth: wp(0.3),
            paddingTop: hp(1),
            paddingBottom: hp(2),
            height: hp(9),
          },
          tabBarLabelStyle: {
            fontSize: wp(3.2),
            fontWeight: "500",
          },
        }}
      >
        <Tabs.Screen
          name="card"
          options={{
            title: "Card",
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="credit-card"
                size={wp(5.5)}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="contacts"
          options={{
            title: "Contacts",
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="people"
                size={wp(5.5)}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </PrivateRoute>
  );
}

const styles = StyleSheet.create({});