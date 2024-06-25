import { StyleSheet, Text, View } from "react-native";
import { Property } from "@/constants/types";
import MapMarker from "@/components/MapMarker";
import Colors from "@/constants/Colors";
import MapView from "react-native-maps";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useRoute } from "@react-navigation/core";
import { properties } from "@/data/properties";
import SearchHeader from "@/components/SearchHeader";
import SafeArea from "@/components/SafeArea";

interface MapProps {
  properties: Property[];
}

const INITIAL_REGION = {
  latitude: 25.80913,
  longitude: -80.186363,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapScreen = ({}: MapProps) => {
  const [activeMarker, setActiveMarker] = useState<null | number>(null);
  const route = useRoute();
  const properties = route.params?.properties;

  const handleMarkerPress = (index: number) => {
    setActiveMarker(index);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          header: () => <SearchHeader mapBtn={() => {}} isMap={true} />,
        }}
      />
      <MapView style={styles.mapStyle} initialRegion={INITIAL_REGION}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // ...StyleSheet.absoluteFillObject,
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
});
export default MapScreen;
