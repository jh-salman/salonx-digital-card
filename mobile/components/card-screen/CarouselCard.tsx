import React from "react";
import { Text, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const { width } = Dimensions.get("window");

export default function CarouselCard({ item, index, scrollX }: { item: any, index: number, scrollX: SharedValue<number> }) {
  const inputRange = [
    (index - 1) * (width * 0.9 + wp("5%")),
    index * (width * 0.9 + wp("5%")),
    (index + 1) * (width * 0.9 + wp("5%")),
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollX.value, inputRange, [0.9, 1, 0.9], Extrapolate.CLAMP);
    const opacity = interpolate(scrollX.value, inputRange, [0.6, 1, 0.6], Extrapolate.CLAMP);
    return { transform: [{ scale }], opacity };
  });

  return (
    <Animated.View
      style={[
        {
          width: width * 0.9,
          height: hp("50%"),
          marginRight: wp("3%"),
        },
        animatedStyle,
      ]}
      className={`rounded-2xl ${item.color} justify-center items-center shadow-md shadow-black/20`}
    >
      <Text className="text-white text-lg font-semibold">{item.label}</Text>
    </Animated.View>
  );
}