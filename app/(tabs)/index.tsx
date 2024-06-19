import SafeArea from "@/components/SafeArea";
import { FlatList, StyleSheet } from "react-native";

import PropertyCard from "@/components/PropertyCard";
import SearchHeader from "@/components/SearchHeader";
import React, { useLayoutEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
} from "react-native-reanimated";

const properties = [
  {
    id: "1",
    images: [
      "https://www.loans.com.au/dA/9de8aa8d51/what-factors-affect-property-value.png",
      "https://www.bankrate.com/2019/08/27171217/5-tips-for-financing-for-investment-property.jpeg?auto=webp&optimize=high&crop=16:9",
    ],
    rentLow: 3750,
    rentHigh: 31054,
    bedRoomLow: 1,
    bedRoomHigh: 5,
    name: "The Hamilton",
    street: "555 NE 34Th St",
    city: "Miami",
    state: "Florida",
    zip: "33137",
    tags: ["Parking", "Pets", "Wifi"],
  },
  {
    id: "2",
    images: [
      "https://www.loans.com.au/dA/9de8aa8d51/what-factors-affect-property-value.png",
      "https://www.bankrate.com/2019/08/27171217/5-tips-for-financing-for-investment-property.jpeg?auto=webp&optimize=high&crop=16:9",
    ],
    rentLow: 3750,
    rentHigh: 31054,
    bedRoomLow: 1,
    bedRoomHigh: 5,
    name: "The Hamilton",
    street: "555 NE 34Th St",
    city: "Miami",
    state: "Florida",
    zip: "33137",
    tags: ["Parking", "Pets", "Wifi"],
  },
  {
    id: "3",
    images: [
      "https://www.loans.com.au/dA/9de8aa8d51/what-factors-affect-property-value.png",
      "https://www.bankrate.com/2019/08/27171217/5-tips-for-financing-for-investment-property.jpeg?auto=webp&optimize=high&crop=16:9",
    ],
    rentLow: 3750,
    rentHigh: 31054,
    bedRoomLow: 1,
    bedRoomHigh: 5,
    name: "The Hamilton",
    street: "555 NE 34Th St",
    city: "Miami",
    state: "Florida",
    zip: "33137",
    tags: ["Parking", "Pets", "Wifi"],
  },
];
const HeaderHeight = 250;
const threshold = HeaderHeight * 0.1;

const Page = () => {
  const flatListRef = useAnimatedRef<Animated.FlatList>();
  const scrollOffset = useScrollViewOffset(flatListRef);
  const maxScrollOffset = useSharedValue(0);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    maxScrollOffset.value = Math.max(maxScrollOffset.value, scrollOffset.value);

    const startComingBack = maxScrollOffset.value - maxScrollOffset.value * 0.1;

    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [0, startComingBack, maxScrollOffset.value],
            [0, 0, -HeaderHeight],
            "clamp",
          ),
        },
      ],
      height: interpolate(
        scrollOffset.value,
        [0, startComingBack, maxScrollOffset.value],
        [HeaderHeight, HeaderHeight, HeaderHeight * 0.5],
        "clamp",
      ),
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
