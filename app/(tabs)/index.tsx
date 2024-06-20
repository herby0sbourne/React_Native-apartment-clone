import SafeArea from "@/components/SafeArea";
import { Dimensions, FlatList, StyleSheet } from "react-native";

import PropertyCard from "@/components/PropertyCard";
import SearchHeader from "@/components/SearchHeader";
import { properties } from "@/data/properties";
import React, { useEffect, useLayoutEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const headerHeight = 250;
const deviceHeight = Dimensions.get("window").height;
const threshold = deviceHeight * 0.1;
const transitionThreshold = 100;

const Page = () => {
  const flatListRef = useAnimatedRef<Animated.FlatList>();
  const scrollOffset = useScrollViewOffset(flatListRef);
  const previousScrollOffset = useSharedValue(0);
  const accumulatedScrollUp = useSharedValue(0);
  const headerYPosition = useSharedValue(0);

  useLayoutEffect(() => {
    scrollOffset.value = 0; // Start with the scroll offset at 0
    previousScrollOffset.value = 0; // No previous scroll offset initially
    accumulatedScrollUp.value = 0; // No accumulated scroll up initially
    headerYPosition.value = 0; // Header is initially in view
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const scrollDiff = scrollOffset.value - previousScrollOffset.value;

    if (scrollOffset.value === 0) {
      // User is at the top
      headerYPosition.value = withTiming(0, { duration: 300 });
    } else if (scrollDiff > 0) {
      // Scrolling down
      accumulatedScrollUp.value = 0;
      headerYPosition.value = withTiming(-headerHeight, { duration: 300 });
    } else {
      // Scrolling up
      accumulatedScrollUp.value -= scrollDiff;
      if (accumulatedScrollUp.value >= transitionThreshold) {
        headerYPosition.value = withTiming(0, { duration: 300 });
        accumulatedScrollUp.value = 0; // Reset accumulated scroll up after showing header
      }
    }

    previousScrollOffset.value = scrollOffset.value;

    return {
      transform: [{ translateY: headerYPosition.value }],
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
        bounces={false}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({});

export default Page;
