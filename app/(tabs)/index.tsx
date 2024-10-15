import MapView from "react-native-maps";
import { router, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, StatusBar, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/core";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ReAnimated, { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated";

import MapComponent from "@/components/Map";
import NoProperty from "@/components/NoProperty";
import PropertyCard from "@/components/PropertyCard";
import SearchHeader from "@/components/SearchHeader";

import { Property } from "@/types/property";
import { getPropertiesInArea } from "@/data/properties";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

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
  const inserts = useSafeAreaInsets();

  const flatListRef = useAnimatedRef<ReAnimated.FlatList>();
  const scrollOffset = useScrollViewOffset(flatListRef);

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
<<<<<<< HEAD
=======

>>>>>>> 42e1b443f1e4167fdde0c4289e203aceb44e1b15
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
        scrollOffset={scrollOffset}
        isMap={isMap}
        setIsMap={setIsMap}
        searchQuery={location}
        totalProperty={properties.length}
      />

      <SafeAreaView
        edges={{ top: "additive", bottom: "additive" }}
        style={{ padding: 0, margin: 0 }}
      >
        <ReAnimated.FlatList
          ref={flatListRef}
          data={properties}
          scrollEnabled={!!properties.length}
          ListEmptyComponent={<NoProperty isSearch={!!route.params} />}
          style={{
            // backgroundColor: "white",
            // zIndex: 5,
            display: isMap ? "none" : "flex",
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
      </SafeAreaView>
      <View
        style={{
          flex: 1,
          // top: -inserts.top,
        }}
      >
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
      </View>
    </>
  );
};

export default Page;
