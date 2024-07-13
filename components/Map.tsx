import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/core";
import MapView, { MarkerPressEvent, Region } from "react-native-maps";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import Animated, { FadeOut, SlideInDown } from "react-native-reanimated";

import MapMarker from "@/components/MapMarker";
import PropertyCard from "@/components/PropertyCard";

import Colors from "@/constants/Colors";
import { useFocusEffect } from "expo-router";

type RouteParams = {
  params: {
    properties: Property[];
    lat: number;
    lng: number;
  };
};

interface MapProps {
  properties: Property[];
  mapRef: MutableRefObject<MapView | null>;
  initialRegion?: Region | undefined;
  isMap: boolean;
}

const Map = ({ properties, mapRef, isMap }: MapProps) => {
  const markPressRef = useRef(false);
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  const INITIAL_REGION = {
    latitude: route.params?.lat || 25.80913,
    longitude: route.params?.lng || -80.186363,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const handleMarkerPress = (event: MarkerPressEvent, index: number) => {
    if (Platform.OS === "ios") {
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
        { duration: 500 },
      );
    }
    setActiveMarker(index);
  };

  const handleMapPress = () => {
    if (Platform.OS === "ios" && markPressRef.current) {
      markPressRef.current = false;
      return;
    }

    setActiveMarker(null);
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setActiveMarker(null);
      };
    }, [isMap]),
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        // provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        ref={mapRef}
        onPress={handleMapPress}
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
          <PropertyCard property={properties[activeMarker]} extraStyle={styles.mapCard} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: "relative",
    ...(Platform.OS === "android" && StyleSheet.absoluteFillObject),
  },
  mapStyle: {
    width: "100%",
    height: "100%",
    // ...StyleSheet.absoluteFillObject,
  },
  mapCard: {
    position: "absolute",
    bottom: 10,
    marginHorizontal: 10,
  },
});

export default Map;
