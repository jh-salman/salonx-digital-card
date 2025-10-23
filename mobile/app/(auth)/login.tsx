import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function Login() {
  const { login } = useAuth();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);              // AuthContext → Supabase signInWithPassword
      router.replace("/card");            // সফল হলে ট্যাবসে ঢুকবে (home tab)
    } catch (err: any) {
      console.error(err);
      Alert.alert("Login failed", err?.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
    >
      <View className="flex-1 justify-center px-6 bg-lightTheme-background dark:bg-darkTheme-background">
        <Text
          style={{ fontSize: wp(6) }}
          className="text-center font-bold text-lightTheme-text dark:text-darkTheme-text mb-6"
        >
          Welcome Back
        </Text>

        {/* Email */}
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={theme === "dark" ? "#aaa" : "#666"}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{ fontSize: wp(3.8), paddingVertical: hp("1.6%") }}
          className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 text-lightTheme-text dark:text-darkTheme-text mb-4"
        />

        {/* Password */}
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={theme === "dark" ? "#aaa" : "#666"}
          secureTextEntry
          style={{ fontSize: wp(3.8), paddingVertical: hp("1.6%") }}
          className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 text-lightTheme-text dark:text-darkTheme-text mb-2"
        />

        {/* Forgot password (optional) */}
        <TouchableOpacity
          onPress={() => Alert.alert("Forgot Password", "Coming soon")}
          className="self-end mb-6"
        >
          <Text style={{ fontSize: wp(3.2) }} className="text-primary font-semibold">
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Sign In */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          style={{ paddingVertical: hp("1.8%"), opacity: loading ? 0.7 : 1 }}
          className="bg-primary rounded-xl"
        >
          <Text style={{ fontSize: wp(4) }} className="text-center text-white font-semibold">
            {loading ? "Signing in..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        {/* Go to Sign Up */}
        <TouchableOpacity onPress={() => router.push("/signup")} className="mt-5">
          <Text style={{ fontSize: wp(3.8) }} className="text-center text-primary font-semibold">
            New here? Create an account
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
