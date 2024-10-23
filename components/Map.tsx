import { router, useFocusEffect } from "expo-router";
import { MutableRefObject, useRef, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/core";
import Animated, { FadeOut, SlideInDown } from "react-native-reanimated";
import MapView, { MarkerPressEvent, PROVIDER_GOOGLE, Region } from "react-native-maps";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MapMarker from "@/components/MapMarker";
import PropertyCard from "@/components/PropertyCard";

import Colors from "@/constants/Colors";
import { getPropertiesInArea } from "@/data/properties";

type RouteParams = {
  params: {
    properties: Property[];
    lat: number;
    lng: number;
  };
};

interface MapProps {
  initialRegion?: Region | undefined;
  isMap: boolean;
  mapRef: MutableRefObject<MapView | null>;
  properties: Property[];
  location: string;
  setLocation: (location: string) => void;
  setProperties: (properties: Property[]) => void;
}

let mapRegion: Region | undefined = undefined;

const MapComponent = ({
  properties,
  mapRef,
  isMap,
  setLocation,
  setProperties,
}: MapProps) => {
  const markPressRef = useRef(false);
  const isCardPressedRef = useRef(false);
  const isPropertyScreen = useRef(false);
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [isSearchAreaBtn, setIsSearchAreaBtn] = useState(false);
  const [boundingBox, setBoundingBox] = useState<number[]>([]);
  const [region, setRegion] = useState<Region | undefined>(mapRegion);

  const INITIAL_REGION = {
    latitude: route.params?.lat || 25.80913,
    longitude: route.params?.lng || -80.186363,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const handleMarkerPress = (event: MarkerPressEvent, index: number) => {
    console.log("marker pressed");

    const { lat, lng } = properties[index];

    if (event.nativeEvent?.action === "marker-press") {
      markPressRef.current = true;
    }

    // Get the current region of the map
    const currentRegion = mapRef.current?.props.region || INITIAL_REGION;

    // Get the dimensions of the map view
    const { width, height } = Dimensions.get("window");

    // Calculate the latitude and longitude deltas based on the map view dimensions
    const latitudeDelta = (80 / height) * currentRegion.latitudeDelta;
    const longitudeDelta = (50 / width) * currentRegion.longitudeDelta;

    // Apply the deltas to the target coordinates
    const offsetLat = lat - latitudeDelta;
    const offsetLng = lng;

    mapRef.current?.animateCamera(
      {
        center: {
          latitude: offsetLat,
          longitude: offsetLng,
          // latitude: lat,
          // longitude: lng,
        },
      },
      // { duration: 500 },
    );

    setTimeout(() => {
      const newRegion: Region = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: region?.latitudeDelta || 0.4,
        longitudeDelta: region?.longitudeDelta || 0.4,
      };

      setRegion(newRegion);
    }, 600);
    setActiveMarker(index);
  };

  const onMapDrag = () => {
    if (activeMarker === null) return;
    setActiveMarker(null);
  };

  const handleMapPress = () => {
    console.log("map clicked");

    if (Platform.OS === "ios" && markPressRef.current) {
      markPressRef.current = false;
      return;
    }

    if (isCardPressedRef.current) {
      isCardPressedRef.current = false;
      return;
    }

    setActiveMarker(null);
  };

  const handleSearchBtn = () => {
    setProperties(getPropertiesInArea(boundingBox));
    setLocation("Map Area");
    mapRegion = region;
    setIsSearchAreaBtn(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isPropertyScreen.current) {
        isPropertyScreen.current = false;
        return;
      }

      setActiveMarker(null);
    }, [isMap]),
  );

  return (
    <View style={[styles.container, { display: !isMap ? "none" : "flex" }]}>
      <MapView
        ref={mapRef}
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={region || INITIAL_REGION}
        onPress={handleMapPress}
        onPanDrag={onMapDrag}
        onRegionChangeComplete={(region, details) => {
          if (details?.isGesture) {
            // console.log("i ran");
            if (!isSearchAreaBtn) setIsSearchAreaBtn(true);

            const newBoundingBox = [
              region.latitude - region.latitudeDelta / 2,
              region.latitude + region.latitudeDelta / 2,
              region.longitude - region.longitudeDelta / 2,
              region.longitude + region.longitudeDelta / 2,
            ];

            setBoundingBox(newBoundingBox);
            setRegion(region);
          }
        }}
      >
        {properties.map((property, index) => {
          return (
            <MapMarker
              key={index}
              lat={property.lat}
              lng={property.lng}
              onPress={(event) => handleMarkerPress(event, index)}
              color={activeMarker === index ? Colors.info : Colors.primary}
            />
          );
        })}
      </MapView>

      {activeMarker !== null && (
        <Animated.View entering={SlideInDown} exiting={FadeOut}>
          <PropertyCard
            property={properties[activeMarker]}
            extraStyle={styles.mapCard}
            onPress={() => {
              isCardPressedRef.current = true;
              isPropertyScreen.current = true;
              router.push(`/property/${properties[activeMarker].id}`);
            }}
          />
        </Animated.View>
      )}

      {isSearchAreaBtn && activeMarker === null && (
        <TouchableOpacity style={styles.searchAreaBtn} onPress={handleSearchBtn}>
          <Text style={styles.searchText}>Search Area</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    ...Platform.select({
      android: {
        ...StyleSheet.absoluteFillObject,
      },
      ios: {},
    }),
  },
  mapStyle: {
    // width,
    // height,
    width: "100%",
    height: "100%",
    // ...StyleSheet.absoluteFillObject,
  },
  mapCard: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 30 : 10,
    marginHorizontal: 10,
  },
  searchAreaBtn: {
    position: "absolute",
    bottom: 30,
    zIndex: 4,
    borderRadius: 30,
    backgroundColor: "white",
    borderColor: "gray",
    alignSelf: "center",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchText: {
    color: Colors.info,
    fontWeight: "600",
  },
});

export default MapComponent;
