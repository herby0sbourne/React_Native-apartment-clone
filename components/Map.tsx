import { useRef, useState } from "react";
import MapView, { Region } from "react-native-maps";
import { Platform, StyleSheet, View } from "react-native";
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
  const [activeMarker, setActiveMarker] = useState<null | number>(null);
  const mapRef = useRef<MapView | null>(null);
  const route = useRoute<RouteProp<RouteParams, "params">>();
  // const properties = route.params?.properties;

  const INITIAL_REGION = {
    latitude: route.params?.lat || 25.80913,
    longitude: route.params?.lng || -80.186363,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
  };

  const handleMarkerPress = (index: number) => {
    if (Platform.OS === "ios") {
      const { lat, lng } = properties[index];

      mapRef.current?.animateCamera(
        {
          center: {
            latitude: lat,
            longitude: lng,
          },
        },
        { duration: 1000 },
      );
    }
    setActiveMarker(index);
  };

  const handleMapPress = () => {
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
        initialRegion={INITIAL_REGION}
        ref={mapRef}
        onPress={handleMapPress}
      >
        {properties.map((property, index) => {
          return (
            <MapMarker
              key={Math.random().toString()}
              lat={property.lat}
              lng={property.lng}
              onPress={() => handleMarkerPress(index)}
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
    position: "relative",
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

// const INITIAL_REGION = {
//   latitude: 25.80913,
//   longitude: -80.186363,
//   latitudeDelta: 0.1,
//   longitudeDelta: 0.1,
//   // latitudeDelta: 0.0922,
//   // longitudeDelta: 0.0421,
// };
