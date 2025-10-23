import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { Redirect, Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { Text, View } from "react-native";
import "./global.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";


function RootNavigator() {
  const { theme } = useTheme();
  const { setColorScheme } = useColorScheme();
  const { user } = useAuth();

  useEffect(() => {
    setColorScheme(theme);
  }, [theme]);


  if (user === null) {
    return <Redirect href="/" />;
  }

  if (user) {
    return <Redirect href="/(tabs)/card" />;
  }

  // Optional loading UI while checking auth
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Loading...</Text>
    </View>
  );
}

export default function RootLayout() {
  return (

    <ThemeProvider>
      <AuthProvider>
        <View className="flex-1" style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="settings" options={{ headerShown: true, title: "Settings" }} />
          </Stack>
          <RootNavigator />
        </View>
      </AuthProvider>
    </ThemeProvider>
  );
}
