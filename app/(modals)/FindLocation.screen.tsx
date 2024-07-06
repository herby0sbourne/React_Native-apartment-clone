import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import SafeArea from "@/components/SafeArea";
import Colors from "@/constants/Colors";
import { getSuggestedLocations } from "@/services/location.service";
import { Location } from "@/types/locationIQ";
import { useNavigation } from "expo-router";
import { autocomplete } from "@/data/autocomplete";
import { Ionicons } from "@expo/vector-icons";

const getFormattedLocationText = (item: Location) => {
  let location = item.address.name;

  if (item.type === "city" && item.address.state) {
    location += `, ${item.address.state}`;
  }
  return location;
};

const FindLocationScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<Location[] | []>([]);

  const handleChangeText = async (text: string) => {
    setText(text);

    if (text.length < 3) {
      return;
    }

    const fetchLocations = await getSuggestedLocations(text);

    if (fetchLocations.length > 0) {
      return setSuggestions(fetchLocations);
    }

    if (text.length === 0) {
      setSuggestions([]);
    }
  };

  const handleSubmit = async () => {
    const fetchLocations = await getSuggestedLocations(text);
    if (fetchLocations.length !== 0) {
      console.log("navigate to search screen passing location", fetchLocations[0]);
    }
  };

  return (
    <SafeArea>
      <View style={styles.container}>
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

        <ScrollView style={{ backgroundColor: "pink", marginTop: 10 }}>
          {autocomplete.map(location => {
            return (
              <View key={Math.random().toString()} style={styles.locationText}>
                <TouchableOpacity style={styles.locationBtn}>
                  <Text style={{ color: "black" }}>
                    {getFormattedLocationText(location)}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
          {autocomplete.map(location => {
            return (
              <View key={Math.random().toString()} style={styles.locationText}>
                <TouchableOpacity style={styles.locationBtn}>
                  <Text style={{ color: "black" }}>
                    {getFormattedLocationText(location)}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.backBtn}>
          <TouchableOpacity style={styles.exitBtn}>
            <Ionicons name={"exit"} size={24} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    flex: 1,
    padding: 10,
    position: "relative",
  },
  locationText: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  locationBtn: {
    padding: 15,
  },
  textInput: {
    borderRadius: 6,
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    // height: 100,
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