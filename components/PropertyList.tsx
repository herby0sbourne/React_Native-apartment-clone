import { router } from "expo-router";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import ReAnimated, { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated";

import SafeArea from "@/components/SafeArea";
import NoProperty from "@/components/NoProperty";
import PropertyCard from "@/components/PropertyCard";

interface PropertyListProps {
  isMap: boolean;
  route: any;
  setScroll: any;
  properties: Property[];
}

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SafeWrapper = Platform.OS === "ios" ? SafeAreaView : SafeArea;

const PropertyList = ({ properties, isMap, route, setScroll }: PropertyListProps) => {
  const bottomHeight = useBottomTabBarHeight();

  const flatListRef = useAnimatedRef<ReAnimated.FlatList>();
  const scrollOffset = useScrollViewOffset(flatListRef);

  const navigateToProperty = (propertyId: number) => {
    router.push(`/property/${propertyId}`);
  };

  const handleScroll = () => {
    setScroll(scrollOffset);
  };

  return (
    <SafeArea>
      <ReAnimated.FlatList
        onScroll={handleScroll}
        ref={flatListRef}
        data={properties}
        scrollEnabled={!!properties.length}
        ListEmptyComponent={<NoProperty isSearch={!!route.params} />}
        style={{
          backgroundColor: "white",
          zIndex: 8,
          display: isMap ? "none" : "flex",
        }}
        renderItem={({ item }) => (
          <PropertyCard property={item} onPress={() => navigateToProperty(item.id)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          {
            gap: 10,
            paddingTop: !!properties.length ? 180 : 0,
            paddingHorizontal: 10,
            paddingBottom: bottomHeight,
            backgroundColor: "white",
          },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={false}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({});

export default PropertyList;
