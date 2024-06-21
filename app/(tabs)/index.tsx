import SafeArea from "@/components/SafeArea";
import { StatusBar, StyleSheet, View } from "react-native";
// import { StatusBar } from "expo-status-bar";

import PropertyCard from "@/components/PropertyCard";
import SearchHeader from "@/components/SearchHeader";
import { properties } from "@/data/properties";

import Animated, { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated";

const Page = () => {
  const flatListRef = useAnimatedRef<Animated.FlatList>();
  const scrollOffset = useScrollViewOffset(flatListRef);

  return (
    <>
      <StatusBar translucent={false} barStyle={"dark-content"} />
      <SafeArea style={{ paddingHorizontal: 10 }}>
        <SearchHeader scrollOffset={scrollOffset} />

        <Animated.FlatList
          ref={flatListRef}
          data={properties}
          renderItem={({ item }) => <PropertyCard property={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={[{ gap: 10 }]}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
        />
      </SafeArea>
    </>
  );
};

const styles = StyleSheet.create({});

export default Page;
