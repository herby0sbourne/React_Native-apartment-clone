import { useNavigation } from "expo-router";
import MapView from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import { Animated, StatusBar } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/core";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ReAnimated, { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated";

import Map from "@/components/Map";
import SafeArea from "@/components/SafeArea";
import PropertyCard from "@/components/PropertyCard";
import SearchHeader from "@/components/SearchHeader";

import { Property } from "@/types/property";
import { properties } from "@/data/properties";

type RootStackParamList = {
  "map.screen": { properties: Property[] };
};

type MapScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "map.screen"
>;
type MapScreenRouteProp = RouteProp<RootStackParamList, "map.screen">;

type RouteParams = {
  params: {
    location: string;
    lat: string;
    lng: string;
    boundingBox: string[];
  };
};

const Page = () => {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const navigation = useNavigation();
  const [isMap, setIsMap] = useState(false);
  const mapRef = useRef<MapView | null>(null);
  const bottomHeight = useBottomTabBarHeight();

  const flatListRef = useAnimatedRef<ReAnimated.FlatList>();
  const scrollOffset = useScrollViewOffset(flatListRef);

  const isInitialRender = useRef(true);
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (route.params) {
      const { lat, lng } = route.params;
      mapRef.current?.animateCamera({
        center: {
          latitude: +lat,
          longitude: +lng,
        },
      });
    }
  }, [route]);

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
        transform: [{ translateY }],
      },
    });
  }, [isMap, navigation]);

  return (
    <SafeArea>
      <StatusBar translucent={false} barStyle={"dark-content"} />
      <SearchHeader
        scrollOffset={scrollOffset}
        isMap={isMap}
        setIsMap={setIsMap}
        searchQuery={route?.params?.location}
      />

      <ReAnimated.FlatList
        ref={flatListRef}
        data={properties}
        style={{
          backgroundColor: "white",
          zIndex: 5,
          display: isMap ? "none" : "flex",
        }}
        renderItem={({ item }) => <PropertyCard property={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          { gap: 10, paddingHorizontal: 10, paddingBottom: bottomHeight },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={false}
      />
      <Map
        properties={properties}
        mapRef={mapRef}
        isMap={isMap}
        // initialRegion={{
        //   latitude: +route.params.lat,
        //   longitude: +route.params.lng,
        // }}
      />
    </SafeArea>
  );
};

export default Page;

// const handleMapNavigation = () => {
//   navigation.navigate("map.screen", {
//     properties,
//     lat: +route?.params?.lat,
//     lng: +route?.params?.lng,
//   });
// };
