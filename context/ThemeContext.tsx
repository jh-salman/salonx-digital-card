import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

type ThemeMode = "light" | "dark" | "auto";
type ThemeValue = "light" | "dark";

interface ThemeContextType {
  theme: ThemeValue;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  colors: {
    background: string;
    text: string;
    buttonColor: string;
    card: string;
    border: string;
    primary: string;
    secondary: string;
    accent: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_STORAGE_KEY = "@app_theme_mode";

const lightColors = {
  background: "#ffffff",
  text: "#1a1a1a",
  card: "#f9f9f9",
  buttonColor: "#000000",
  border: "#e5e5e5",
  primary: "blue",
  secondary: "#151312",
  accent: "#AB8BFF",
};

const darkColors = {
  background: "#000",
  text: "#f5f5f5",
  buttonColor: "#ffffff",
  card: "#1a1a2a",
  border: "#2a2a40",
  primary: "red",
  secondary: "#ffffff",
  accent: "#AB8BFF",
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>("auto");
  const [theme, setTheme] = useState<ThemeValue>(
    systemColorScheme === "dark" ? "dark" : "light"
  );

  // Load saved theme preference on mount
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Update theme based on mode
  useEffect(() => {
    if (mode === "auto") {
      const system = systemColorScheme === "dark" ? "dark" : "light";
      setTheme(system);
    } else {
      setTheme(mode);
    }
  }, [mode, systemColorScheme]);

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

  const colors = theme === "dark" ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

