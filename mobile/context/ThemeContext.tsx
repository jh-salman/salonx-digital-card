import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useColorScheme } from "nativewind";

type ThemeMode = "light" | "dark" | "auto";
type ThemeValue = "light" | "dark";

interface ThemeContextType {
  theme: ThemeValue;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_STORAGE_KEY = "@app_theme_mode";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>("auto");
  const [theme, setTheme] = useState<ThemeValue>(
    colorScheme === "dark" ? "dark" : "light"
  );

  // Load saved theme preference on mount
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Update theme and NativeWind scheme
  useEffect(() => {
    if (mode === "auto") {
      const system = colorScheme === "dark" ? "dark" : "light";
      setTheme(system);
      setColorScheme(system);
    } else {
      setTheme(mode);
      setColorScheme(mode);
    }
  }, [mode, colorScheme]);

  const loadThemePreference = async () => {
    try {
      const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedMode && (savedMode === "light" || savedMode === "dark" || savedMode === "auto")) {
        setModeState(savedMode as ThemeMode);
      }
    } catch (error) {
      console.error("Failed to load theme preference:", error);
    }
  };

  const setMode = async (newMode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode);
      setModeState(newMode);
    } catch (error) {
      console.error("Failed to save theme preference:", error);
      setModeState(newMode);
    }
  };

  const toggleTheme = () => {
    setMode(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};