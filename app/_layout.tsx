import { Stack, Redirect } from "expo-router";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import SplashScreen from "@/components/SplashScreen";
import { useEffect, useState } from "react";
import * as ExpoSplashScreen from 'expo-splash-screen';

// Prevent native splash screen from auto-hiding
ExpoSplashScreen.preventAutoHideAsync();

function AppContent() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Show splash for minimum duration (2.5 seconds)
        await new Promise(resolve => setTimeout(resolve, 2500));
      } catch (e) {
        console.warn('Error during app initialization:', e);
      } finally {
        setAppIsReady(true);
        await ExpoSplashScreen.hideAsync();
      }
    }

    if (!loading) {
      prepare();
    }
  }, [loading]);

  // Show full-page splash screen while loading
  if (loading || !appIsReady) {
    return (
      <>
        <StatusBar style="light" />
        <SplashScreen />
      </>
    );
  }

  // Show main app after splash is done
  return (
    <>
      <StatusBar 
        style={theme === 'dark' ? 'light' : 'dark'} 
        backgroundColor="transparent"
        translucent
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(cards)" />
      </Stack>
      {/* Redirect based on auth state */}
      {user ? <Redirect href="/(tabs)/card" /> : <Redirect href="/" />}
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}