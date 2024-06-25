import { StyleSheet, View } from "react-native";
import { Property } from "@/constants/types";
import MapMarker from "@/components/MapMarker";
import Colors from "@/constants/Colors";
import MapView from "react-native-maps";
import { useState } from "react";

interface MapProps {
  properties: Property[];
}

const INITIAL_REGION = {
  latitude: 25.80913,
  longitude: -80.186363,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const Map = ({ properties }: MapProps) => {
  const [activeMarker, setActiveMarker] = useState<null | number>(null);

  const handleMarkerPress = (index: number) => {
    setActiveMarker(index);
  };

  return (
    <View style={styles.container}>
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
    ...StyleSheet.absoluteFillObject,
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
});
export default Map;
