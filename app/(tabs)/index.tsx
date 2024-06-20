import SafeArea from "@/components/SafeArea";
import { StatusBar, StyleSheet } from "react-native";

import PropertyCard from "@/components/PropertyCard";
import SearchHeader from "@/components/SearchHeader";
import { properties } from "@/data/properties";

import Animated, { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated";

const Page = () => {
  const flatListRef = useAnimatedRef<Animated.FlatList>();
  const scrollOffset = useScrollViewOffset(flatListRef);

  return (
    <SafeArea style={{ paddingHorizontal: 10 }}>
      <StatusBar translucent={false} />
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
  );
};

const styles = StyleSheet.create({});

export default Page;
