import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import debounce from "lodash/debounce";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios, { CancelTokenSource } from "axios";
import { useCallback, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { NavigationProp } from "@react-navigation/native";

import SafeArea from "@/components/SafeArea";
import RecentSearchList from "@/components/RecentSearchList";
import CurrentLocationBtn from "@/components/CurrentLocationBtn";

import Colors from "@/constants/Colors";
import { Location } from "@/types/locationIQ";
import { UtilStyles } from "@/constants/UtilStyles";
import { getSuggestedLocations } from "@/services/location.service";
import getFormattedLocationText from "@/utils/getFormattedLocationText";

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
  const queryClient = useQueryClient();
  const navigation = useNavigation<NavigationProp<IndexParam>>();
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<Location[] | []>([]);
  const cancelTokenRef = useRef<CancelTokenSource | null>(null);
  const recentSearches: Location[] | undefined = queryClient.getQueryData([
    "recentSearches",
  ]);

  const setRecentSearch = (location: Location) => {
    queryClient.setQueryData(["recentSearches"], (oldData: Location[] | undefined) => {
      if (!oldData) {
        return [location];
      }

      const isAlreadyInRecentSearches = oldData.some(
        (item) => item.lat === location.lat && item.lon === location.lon,
      );

      if (isAlreadyInRecentSearches) {
        return oldData;
      }

      return [location, ...oldData];
    });
  };

  const fetchSuggestions = async (text: string) => {
    if (text.length < 3) {
      return setSuggestions([]);
    }

    // Cancel previous request
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel("New search initiated");
    }

    cancelTokenRef.current = axios.CancelToken.source();

    try {
      // const token = cancelTokenRef.current?.token;
      const fetchLocations = await getSuggestedLocations(
        text,
        cancelTokenRef.current?.token,
      );
      setSuggestions(fetchLocations);
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error("Error fetching locations:", err);
        // setError('Failed to fetch locations. Please try again.');
      }
    }
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

  const handleChangeText = (text: string) => {
    setText(text);
    debouncedFetchSuggestions(text);
  };

  const handleSubmit = async () => {
    const fetchLocations = await getSuggestedLocations(text);
    if (fetchLocations.length !== 0) {
      handleNavigate(fetchLocations[0]);
    }
  };

  const handleNavigate = (location: Location) => {
    setRecentSearch(location);

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
              <View key={location.lat + location.lon} style={styles.locationText}>
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
            <>
              <CurrentLocationBtn />
              <RecentSearchList recentSearches={recentSearches} />
            </>
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
