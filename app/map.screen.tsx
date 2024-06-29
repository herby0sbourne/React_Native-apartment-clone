import { Platform, StyleSheet, Text, View } from "react-native";
import { Property } from "@/constants/types";
import MapMarker from "@/components/MapMarker";
import Colors from "@/constants/Colors";
import MapView from "react-native-maps";
import { useRef, useState } from "react";
import { Stack } from "expo-router";
import { useRoute } from "@react-navigation/core";

import SearchHeader from "@/components/SearchHeader";
import PropertyCard from "@/components/PropertyCard";

interface MapProps {
  properties: Property[];
}

const INITIAL_REGION = {
  latitude: 25.80913,
  longitude: -80.186363,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
  // latitudeDelta: 0.0922,
  // longitudeDelta: 0.0421,
};

const MapScreen = ({}: MapProps) => {
  const [activeMarker, setActiveMarker] = useState<null | number>(null);
  const mapRef = useRef<MapView | null>(null);
  const route = useRoute();
  const properties = route.params?.properties;

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

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          header: () => <SearchHeader mapBtn={() => {}} isMap={true} />,
        }}
      />
      <MapView style={styles.mapStyle} initialRegion={INITIAL_REGION} ref={mapRef}>
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
        <PropertyCard property={properties[activeMarker]} extraStyle={styles.mapCard} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    // ...StyleSheet.absoluteFillObject,
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
  mapCard: {
    position: "absolute",
    bottom: 10,
    // height: 250,
    marginHorizontal: 10,
  },
});
export default MapScreen;
