import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function Signup() {
  const { signup } = useAuth();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await signup(email, password);
      Alert.alert("Account Created", "Please check your email to confirm your account.");
      router.replace("/card"); // redirect to app after signup
    } catch (error) {
      console.error(error);
      Alert.alert("Signup failed", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-lightTheme-background dark:bg-darkTheme-background">
      <Text
        style={{ fontSize: wp(6) }}
        className="text-center font-bold text-lightTheme-text dark:text-darkTheme-text mb-6"
      >
        Create Your Account
      </Text>

      {/* Email Input */}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor={theme === "dark" ? "#aaa" : "#666"}
        autoCapitalize="none"
        keyboardType="email-address"
        className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-lightTheme-text dark:text-darkTheme-text mb-4"
      />

      {/* Password Input */}
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        placeholderTextColor={theme === "dark" ? "#aaa" : "#666"}
        secureTextEntry
        className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-lightTheme-text dark:text-darkTheme-text mb-6"
      />

      {/* Signup Button */}
      <TouchableOpacity
        onPress={handleSignup}
        disabled={loading}
        style={{
          paddingVertical: hp("1.8%"),
          opacity: loading ? 0.7 : 1,
        }}
        className="bg-primary rounded-xl"
      >
        <Text
          style={{ fontSize: wp(4) }}
          className="text-center text-white font-semibold"
        >
          {loading ? "Creating..." : "Sign Up"}
        </Text>
      </TouchableOpacity>

      {/* Redirect to Login */}
      <TouchableOpacity
        onPress={() => router.push("/login")}
        className="mt-5"
      >
        <Text
          style={{ fontSize: wp(3.8) }}
          className="text-center text-primary font-semibold"
        >
          Already have an account? Log in
        </Text>
      </TouchableOpacity>
    </View>
  );
}