import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
  const { mode, setMode, theme } = useTheme();
  const modes: ("light" | "dark" | "auto")[] = ["light", "dark", "auto"];

  const getModeIcon = (m: string) => {
    if (m === "light") return "☀️";
    if (m === "dark") return "🌙";
    return "⚙️";
  };

  return (
    <View className="flex-1 bg-lightTheme-background dark:bg-darkTheme-background p-6">
      <View className="mb-6">
        <Text className="text-2xl font-bold text-lightTheme-text dark:text-darkTheme-text mb-2">
          Theme Settings
        </Text>
        <Text className="text-base text-gray-600 dark:text-gray-400">
          Current theme: <Text className="font-semibold capitalize">{theme}</Text>
        </Text>
      </View>

      {modes.map((m) => (
        <TouchableOpacity
          key={m}
          className={`py-4 px-5 rounded-xl mb-3 border-2 ${
            mode === m 
              ? "bg-primary border-primary" 
              : "bg-lightTheme-card dark:bg-darkTheme-card border-lightTheme-border dark:border-darkTheme-border"
          }`}
          onPress={() => setMode(m)}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">{getModeIcon(m)}</Text>
              <Text
                className={`text-lg font-semibold ${
                  mode === m ? "text-white" : "text-lightTheme-text dark:text-darkTheme-text"
                }`}
              >
                {m === "auto" ? "Auto (System)" : m.charAt(0).toUpperCase() + m.slice(1)}
              </Text>
            </View>
            {mode === m && <Text className="text-white text-xl">✓</Text>}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
