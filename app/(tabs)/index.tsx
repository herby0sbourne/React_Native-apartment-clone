import { useNavigation } from "expo-router";
import { RouteProp } from "@react-navigation/core";
import { StatusBar, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Animated, { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated";

import SafeArea from "@/components/SafeArea";
import PropertyCard from "@/components/PropertyCard";
import SearchHeader from "@/components/SearchHeader";

import { properties } from "@/data/properties";
import { Property } from "@/types/property";

type RootStackParamList = {
  "map.screen": { properties: Property[] };
};

type MapScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "map.screen"
>;
type MapScreenRouteProp = RouteProp<RootStackParamList, "map.screen">;

const Page = () => {
  const flatListRef = useAnimatedRef<Animated.FlatList>();
  const scrollOffset = useScrollViewOffset(flatListRef);
  const navigation = useNavigation<MapScreenNavigationProp>();

  const handleMapNavigation = () => {
    navigation.navigate("map.screen", { properties });
  };

  return (
    <>
      <SafeArea>
        <StatusBar translucent={false} barStyle={"dark-content"} />
        <SearchHeader
          scrollOffset={scrollOffset}
          mapBtn={handleMapNavigation}
          isMap={false}
        />

        <Animated.FlatList
          ref={flatListRef}
          data={properties}
          style={{ backgroundColor: "white" }}
          renderItem={({ item }) => <PropertyCard property={item} />}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={[{ gap: 10, paddingHorizontal: 10 }]}
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
