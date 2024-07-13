import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import SafeArea from "@/components/SafeArea";
import Colors from "@/constants/Colors";
import { getSuggestedLocations } from "@/services/location.service";
import { Location } from "@/types/locationIQ";
import { useNavigation } from "expo-router";
import { autocomplete } from "@/data/autocomplete";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { UtilStyles } from "@/constants/UtilStyles";
import CurrentLocationBtn from "@/components/CurrentLocationBtn";

const getFormattedLocationText = (item: Location) => {
  let location = item.address.name;

  if (item.type === "city" && item.address.state) {
    location += `, ${item.address.state}`;
  }
  return location;
};

interface IndexParam {
  index: {
    location: string;
    lat: string;
    lng: string;
    boundingBox: string[];
  };
  // other routes...
}

const FindLocationScreen = () => {
  const navigation = useNavigation<NavigationProp<IndexParam>>();
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<Location[] | []>([]);

  const handleChangeText = async (text: string) => {
    setText(text);

    if (text.length < 3) {
      return setSuggestions([]);
    }

    const fetchLocations = await getSuggestedLocations(text);

    if (fetchLocations.length > 0) return setSuggestions(fetchLocations);
  };

  const handleSubmit = async () => {
    const fetchLocations = await getSuggestedLocations(text);
    if (fetchLocations.length !== 0) {
      handleNavigate(fetchLocations[0]);
    }
  };

  const handleNavigate = (location: Location) => {
    navigation.navigate("index", {
      location: getFormattedLocationText(location),
      lat: location.lat,
      lng: location.lon,
      boundingBox: location.boundingbox,
    });
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={[UtilStyles.flex, styles.inputWrapper]}>
          <TextInput
            value={text}
            autoFocus
            keyboardType={"default"}
            onChangeText={handleChangeText}
            onSubmitEditing={handleSubmit}
            selectionColor={Colors.primary}
            placeholder={"Location or Point of interest"}
            style={styles.textInput}
          />
          {Platform.OS === "android" && (
            <View style={[UtilStyles.row, { gap: 10 }]}>
              <View style={styles.line} />
              <TouchableOpacity onPress={navigateBack}>
                <Text style={{ color: Colors.info }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <ScrollView style={{ marginTop: 10 }} bounces={false}>
          {suggestions.map((location) => {
            return (
              <View key={Math.random().toString()} style={styles.locationText}>
                <TouchableOpacity
                  style={styles.locationBtn}
                  onPress={() => handleNavigate(location)}
                >
                  <Text style={{ color: "black" }}>
                    {getFormattedLocationText(location)}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
          {suggestions.length === 0 && (
            <View>
              <CurrentLocationBtn />
            </View>
          )}
        </ScrollView>
        <View style={styles.backBtn}>
          <TouchableOpacity style={styles.exitBtn} onPress={navigateBack}>
            <Ionicons name={"arrow-back"} size={24} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "green",
    flex: 1,
    padding: 10,
    position: "relative",
  },
  locationText: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  locationBtn: {
    padding: 15,
    // backgroundColor: "green",
  },
  inputWrapper: {
    borderRadius: 6,
    borderColor: "lightgray",
    borderWidth: 1,
    paddingRight: 10,
  },
  line: {
    height: 25,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: Colors.info,
  },
  textInput: {
    // borderRadius: 6,
    // borderColor: "lightgray",
    // borderWidth: 1,
    padding: 10,
    fontSize: 16,
    flex: 1,
  },
  backBtn: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
  exitBtn: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FindLocationScreen;

// if (text.length > 3) {
//   const fetchLocations = await getSuggestedLocations(text);
//
//   if (fetchLocations.length > 0) {
//     setSuggestions(fetchLocations);
//   }
// }
