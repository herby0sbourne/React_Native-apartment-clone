import { StyleSheet, Text, View } from "react-native";
import NoProperty from "@/components/NoProperty";
import PropertyCard from "@/components/PropertyCard";
import ReAnimated, { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated";
import SafeArea from "@/components/SafeArea";
import { router } from "expo-router";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useCallback } from "react";
import { RouteProp } from "@react-navigation/core";

interface PropertyListProps {
  isMap: boolean;
  route: any;
  setScroll: any;
  properties: Property[];
}

const PropertyList = ({ properties, isMap, route, setScroll }: PropertyListProps) => {
  const bottomHeight = useBottomTabBarHeight();

  const flatListRef = useAnimatedRef<ReAnimated.FlatList>();
  const scrollOffset = useScrollViewOffset(flatListRef);

  const navigateToProperty = (propertyId: number) => {
    router.push(`/property/${propertyId}`);
  };

  // const handleScroll = (scrollValue) => {
  //   setScroll(scrollValue);
  //   console.log(" you scrolled ", scrollValue.value);
  // };

  // const handleScroll = (event) => {
  //   const offset = event.nativeEvent.contentOffset.y;
  //   setScroll(offset); // Call setScroll with the new offset
  // };
  const handleScroll = () => {
    setScroll(scrollOffset);
  };

  return (
    <SafeArea>
      <ReAnimated.FlatList
        onScroll={handleScroll}
        // onScroll={() => handleScroll(scrollOffset)}
        ref={flatListRef}
        data={properties}
        scrollEnabled={!!properties.length}
        ListEmptyComponent={<NoProperty isSearch={!!route.params} />}
        style={{
          backgroundColor: "white",
          // zIndex: 5,
          // display: isMap ? "none" : "flex",
        }}
        renderItem={({ item }) => (
          <PropertyCard property={item} onPress={() => navigateToProperty(item.id)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          { gap: 10, paddingHorizontal: 10, paddingBottom: bottomHeight },
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
