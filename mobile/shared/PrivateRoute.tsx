import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  // Optional loading state (for when user data is being checked)
  if (user === undefined) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // Redirect to login if no user
  if (!user) {
    return <Redirect href="/login" />;
  }

  // If logged in, show content
  return <>{children}</>;
};

export default PrivateRoute;

