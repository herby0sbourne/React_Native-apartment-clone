import MapView from "react-native-maps";
import { router, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, StatusBar } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/core";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SharedValue } from "react-native-reanimated";

import MapComponent from "@/components/Map";
import SearchHeader from "@/components/SearchHeader";
import PropertyList from "@/components/PropertyList";

import { Property } from "@/types/property";
import { getPropertiesInArea } from "@/data/properties";

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

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Page = () => {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const navigation = useNavigation();
  const [isMap, setIsMap] = useState(true);
  const mapRef = useRef<MapView | null>(null);
  const bottomHeight = useBottomTabBarHeight();
  const [scrollOffset, setScrollOffset] = useState<SharedValue<number>>();

  const isInitialRender = useRef(true);
  const translateY = useRef(new Animated.Value(50)).current;

  const [properties, setProperties] = useState<Property[]>([]);
  const [location, setLocation] = useState<string | undefined>();

  const navigateToProperty = (propertyId: number) => {
    router.push(`/property/${propertyId}`);
  };

  useEffect(() => {
    if (route.params) {
      const { lat, lng, boundingBox, location } = route.params;
      const numBoundingBox = boundingBox.map((num) => +num);

      setLocation(location);
      setProperties(getPropertiesInArea(numBoundingBox));

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

    const animation = Animated.timing(translateY, {
      toValue: !isMap ? 0 : bottomHeight,
      duration: 500,
      useNativeDriver: true,
    });
    animation.start();

    navigation.setOptions({
      tabBarStyle: {
        position: "absolute",
        transform: [{ translateY }],
      },
    });

    return () => animation.stop();
  }, [isMap, navigation]);

  return (
    <>
      <StatusBar translucent={false} barStyle={"dark-content"} />
      <SearchHeader
        // scrollOffset={test}
        scrollOffset={scrollOffset}
        isMap={isMap}
        setIsMap={setIsMap}
        searchQuery={location}
        totalProperty={properties.length}
      />

      {isMap ? (
        <MapComponent
          properties={properties}
          mapRef={mapRef}
          isMap={isMap}
          location={location || ""}
          setLocation={setLocation}
          setProperties={setProperties}
          // initialRegion={{
          //   latitude: +route.params.lat,
          //   longitude: +route.params.lng,
          // }}
        />
      ) : (
        <PropertyList
          properties={properties}
          isMap={isMap}
          route={route}
          setScroll={setScrollOffset}
        />
      )}
    </>
  );
};

export default Page;
