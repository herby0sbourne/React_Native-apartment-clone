import { useNavigation } from "expo-router";
import { RouteProp } from "@react-navigation/core";
import { Animated, StatusBar, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import SafeArea from "@/components/SafeArea";

import { properties } from "@/data/properties";
import { Property } from "@/types/property";
import { useEffect, useRef, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Map from "@/components/Map";
import ReAnimated, { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated";
import PropertyCard from "@/components/PropertyCard";
import SearchHeader from "@/components/SearchHeader";

type RootStackParamList = {
  "map.screen": { properties: Property[] };
};

type MapScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "map.screen"
>;
type MapScreenRouteProp = RouteProp<RootStackParamList, "map.screen">;

const Page = () => {
  const navigation = useNavigation();
  const [isMap, setIsMap] = useState(false);
  const bottomHeight = useBottomTabBarHeight();

  const flatListRef = useAnimatedRef<ReAnimated.FlatList>();
  const scrollOffset = useScrollViewOffset(flatListRef);

  const translateY = useRef(new Animated.Value(50)).current;
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    Animated.timing(translateY, {
      toValue: !isMap ? 0 : bottomHeight,
      duration: 500,
      useNativeDriver: true,
    }).start();

    navigation.setOptions({
      tabBarStyle: {
        position: "absolute",
        // height: 50,
        transform: [{ translateY }],
      },
    });
  }, [isMap, navigation]);
  // console.log(bottomHeight);

  return (
    <>
      <SafeArea>
        <StatusBar translucent={false} barStyle={"dark-content"} />
        <SearchHeader scrollOffset={scrollOffset} isMap={isMap} setIsMap={setIsMap} />

        <ReAnimated.FlatList
          ref={flatListRef}
          data={properties}
          style={{
            backgroundColor: "white",
            zIndex: 5,
            display: isMap ? "none" : "flex",
          }}
          renderItem={({ item }) => <PropertyCard property={item} />}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={[
            { gap: 10, paddingHorizontal: 10, paddingBottom: bottomHeight },
          ]}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
        />
        <Map properties={properties} />
      </SafeArea>
    </>
  );
};

const styles = StyleSheet.create({
  listStyle: {},
});

export default Page;

// const handleMapNavigation = () => {
//   navigation.navigate("map.screen", {
//     properties,
//     lat: +route?.params?.lat,
//     lng: +route?.params?.lng,
//   });
// };
