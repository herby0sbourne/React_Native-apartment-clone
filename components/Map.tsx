import { useRef, useState } from "react";
import MapView, { MarkerPressEvent, Region } from "react-native-maps";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/core";
import Animated, { FadeOut, SlideInDown } from "react-native-reanimated";

import MapMarker from "@/components/MapMarker";
import PropertyCard from "@/components/PropertyCard";

import Colors from "@/constants/Colors";
import { Property } from "@/types/property";

type RouteParams = {
  params: {
    properties: Property[];
    lat: number;
    lng: number;
  };
};

interface MapProps {
  properties: Property[];
  // mapRef: MapView | null
  // lat: +route?.params?.lat,
  // lng: +route?.params?.lng,
  initialRegion?: Region | undefined;
}

const Map = ({ properties }: MapProps) => {
  const markPressRef = useRef(false);
  const mapRef = useRef<MapView | null>(null);
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  // const properties = route.params?.properties;

  const INITIAL_REGION = {
    latitude: route.params?.lat || 25.80913,
    longitude: route.params?.lng || -80.186363,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
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

  // useEffect(() => {
  //   if (route.params?.lat && route.params?.lng) {
  //
  //   }
  //   console.log(route.params);
  // }, []);

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
