import { View } from "react-native";
import { Marker, MarkerPressEvent } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

interface MapMarkerProps {
  lat: number;
  lng: number;
  onPress: (event: MarkerPressEvent) => void;
  color: string;
}

const MapMarker = ({ lat, lng, onPress, color }: MapMarkerProps) => {
  return (
    <Marker coordinate={{ latitude: lat, longitude: lng }} onPress={onPress}>
      <View>
        <Ionicons name="location-sharp" size={32} color={color} />
      </View>
    </Marker>
  );
};

export default MapMarker;
