import SafeArea from "@/components/SafeArea";
import { Dimensions, FlatList, StyleSheet } from "react-native";

import PropertyCard from "@/components/PropertyCard";
import SearchHeader from "@/components/SearchHeader";
import { properties } from "@/data/properties";
import React, { useLayoutEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
} from "react-native-reanimated";

const headerHeight = 250;
const deviceHeight = Dimensions.get("window").height;
const threshold = deviceHeight * 0.1;

const Page = () => {
  const flatListRef = useAnimatedRef<Animated.FlatList>();
  const scrollOffset = useScrollViewOffset(flatListRef);
  const maxScrollOffset = useSharedValue(0);

  useLayoutEffect(() => {
    scrollOffset.value = 0; // Start with the scroll offset at 0
    maxScrollOffset.value = 0; // No maximum scroll offset initially
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    maxScrollOffset.value = Math.max(maxScrollOffset.value, scrollOffset.value);
    const startComingBack = maxScrollOffset.value - threshold;

    const translateY = interpolate(
      scrollOffset.value,
      [0, 250],
      [0, -headerHeight],
      "clamp",
    );

    const height =
      scrollOffset.value < startComingBack
        ? interpolate(
            scrollOffset.value,
            [0, 250],
            [headerHeight, headerHeight - headerHeight * 0.5],
            "clamp",
          )
        : headerHeight * 0.5;

    return {
      transform: [{ translateY }],
      height,
    };
  });

  return (
    <SafeArea style={{ paddingHorizontal: 10 }}>
      <SearchHeader style={headerAnimatedStyle} />

      <Animated.FlatList
        ref={flatListRef}
        data={properties}
        renderItem={({ item }) => <PropertyCard property={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ gap: 10 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({});

export default Page;

// [0, HeaderHeight],
//     [HeaderHeight / 2, 0, -HeaderHeight * 0.75],
//     "clamp",
