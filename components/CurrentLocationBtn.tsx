import { UtilStyles } from "@/constants/UtilStyles";
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";

import * as Location from "expo-location";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation";

interface CurrentLocationProps {
  extraStyle?: ViewStyle;
}

const CurrentLocationBtn = ({}: CurrentLocationProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access location was denined");
      return;
    }

    let location = await Location.getCurrentPositionAsync();
    handleNavigate(location);
  };

  const handleNavigate = (myLocation: Location.LocationObject) => {
    const { latitude, longitude } = myLocation.coords;

    const boundingBox = [
      (latitude - 0.048).toString(),
      (latitude + 0.048).toString(),
      (longitude - 0.041).toString(),
      (longitude + 0.041).toString(),
    ];

    navigation.navigate("index", {
      location: "Your Current Location",
      lat: latitude.toString(),
      lng: longitude.toString(),
      boundingBox,
    });
  };

  return (
    <View style={[UtilStyles.flex, { gap: 10 }]}>
      <FontAwesome name="location-arrow" size={24} color={Colors.primary} />
      <TouchableOpacity style={{ paddingVertical: 10 }} onPress={() => userLocation()}>
        <Text style={{ fontWeight: "600", color: Colors.info }}>
          Use my current location
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CurrentLocationBtn;
