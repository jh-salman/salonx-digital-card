import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreen() {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden /> 
      {/* Optional gradient background */}
      <LinearGradient
        colors={[colors.primary, colors.background]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.container}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Animated Logo */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                transform: [{ scale: pulseAnim }, { rotate: spin }],
              },
            ]}
          >
            <View style={styles.logoInner}>
              <Text style={styles.logo}>X</Text>
            </View>
          </Animated.View>

          <Animated.Text
            style={[
              styles.title,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: Animated.multiply(fadeAnim, -10) },
                ],
              },
            ]}
          >
            SalonX
          </Animated.Text>

          <Text style={styles.subtitle}>Your Digital Identity</Text>

          {/* Loading dots */}
          <View style={styles.loadingContainer}>
            {[0, 1, 2].map((index) => {
              const dotAnim = useRef(new Animated.Value(0)).current;

              useEffect(() => {
                Animated.loop(
                  Animated.sequence([
                    Animated.delay(index * 200),
                    Animated.timing(dotAnim, {
                      toValue: 1,
                      duration: 600,
                      useNativeDriver: true,
                    }),
                    Animated.timing(dotAnim, {
                      toValue: 0,
                      duration: 600,
                      useNativeDriver: true,
                    }),
                  ])
                ).start();
              }, []);

              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.loadingDot,
                    {
                      opacity: dotAnim,
                      transform: [
                        {
                          translateY: dotAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -10],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              );
            })}
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent", // background handled by gradient
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  logoContainer: {
    width: wp(30),
    height: wp(30),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(4),
  },
  logoInner: {
    width: wp(25),
    height: wp(25),
    borderRadius: wp(12.5),
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  logo: {
    fontSize: wp(12),
    fontWeight: "bold",
    color: "#ffffff",
  },
  title: {
    fontSize: wp(9),
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: hp(1),
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: wp(4),
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: hp(6),
    fontWeight: "300",
  },
  loadingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: hp(4),
  },
  loadingDot: {
    width: wp(3),
    height: wp(3),
    borderRadius: wp(1.5),
    backgroundColor: "#ffffff",
    marginHorizontal: wp(1.5),
  },
});