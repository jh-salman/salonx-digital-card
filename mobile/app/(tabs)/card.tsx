import React from "react";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import CarouselCard from "@/components/card-screen/CarouselCard";
// import CarouselCard from "@/components/CarouselCard"; // 👈 নতুন কম্পোনেন্ট ইমপোর্টmo

const { width } = Dimensions.get("window");

const cards = [
  { color: "bg-red-500", label: "Card 1" },
  { color: "bg-teal-400", label: "Card 2" },
  { color: "bg-yellow-400", label: "Card 3" },
  { color: "bg-blue-900", label: "Card 4" },
];

export default function CardCarousel() {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1 bg-lightTheme-background dark:bg-darkTheme-background"
    >
      <Animated.FlatList
        data={cards}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={width * 0.9 + wp("5%")}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: wp("5%") }}
        renderItem={({ item, index }) => (
          <CarouselCard item={item} index={index} scrollX={scrollX} />
        )}
      />
    </SafeAreaView>
  );
}