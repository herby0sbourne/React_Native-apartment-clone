import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLayoutEffect } from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { HEADER_HEIGHT, TRANSITION_THRESHOLD } from "@/constants/variable";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";

import { UtilStyles } from "@/constants/UtilStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchFilter from "@/components/SearchFilter";
import SearchBtnOption from "@/components/SearchBtnOption";
import { useNavigation } from "expo-router";

interface SearchHeaderProps {
  scrollOffset?: SharedValue<number>;
  mapBtn: () => void;
  isMap: boolean;
}

const SearchHeader = ({ scrollOffset, mapBtn, isMap }: SearchHeaderProps) => {
  const previousScrollOffset = useSharedValue(0);
  const accumulatedScrollUp = useSharedValue(0);
  const headerYPosition = useSharedValue(0);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    if (scrollOffset) {
      scrollOffset.value = 0;
    }
    // scrollOffset.value = 0; // Start with the scroll offset at 0
    previousScrollOffset.value = 0; // No previous scroll offset initially
    accumulatedScrollUp.value = 0; // No accumulated scroll up initially
    headerYPosition.value = 0; // Header is initially in view
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    if (!scrollOffset) return {};

    const scrollDiff = scrollOffset.value - previousScrollOffset.value;
    if (scrollOffset.value === 0) {
      // User is at the top
      headerYPosition.value = withTiming(0, { duration: 300 });
    } else if (scrollDiff > 0) {
      // Scrolling down
      accumulatedScrollUp.value = 0;
      headerYPosition.value = withTiming(-HEADER_HEIGHT, { duration: 300 });
    } else {
      // Scrolling up
      accumulatedScrollUp.value -= scrollDiff;
      if (accumulatedScrollUp.value >= TRANSITION_THRESHOLD) {
        headerYPosition.value = withTiming(0, { duration: 300 });
        accumulatedScrollUp.value = 0; // Reset accumulated scroll up after showing header
      }
    }

    previousScrollOffset.value = scrollOffset.value;

    return {
      transform: [{ translateY: headerYPosition.value }],
    };
  });

  const iosStyles = Platform.select({
    ios: { top: insets.top, height: HEADER_HEIGHT - insets.top },
  });

  const handleSearchNavigation = () => {
    navigation.navigate("index");
  };

  return (
    <Animated.View style={[styles.container, iosStyles, headerAnimatedStyle]}>
      <View style={{ marginHorizontal: 10, paddingTop: 10, gap: 15 }}>
        {/*SEARCH INPUT*/}
        <TouchableOpacity onPress={() => console.log("go to input screen pressed")}>
          <View style={styles.searchBar}>
            <Ionicons name={"search-outline"} size={28} color={Colors.primary} />
            <Text style={styles.searchText}>Find Location</Text>
          </View>
        </TouchableOpacity>
        {/*  FILTER BUTTON*/}
        <SearchFilter />
        <View>
          <View style={[styles.divider]} />
          <View style={[UtilStyles.row, { marginTop: 8 }]}>
            <View style={[UtilStyles.flex, { gap: 5 }]}>
              <FontAwesome name="map-marker" size={18} color={Colors.primary} />
              <Text style={{ color: "gray" }}>12 Available</Text>
              <SearchBtnOption onPress={() => console.log("save")} title="Save" />
            </View>
            <View style={[UtilStyles.flex, { gap: 14 }]}>
              <SearchBtnOption
                onPress={() => console.log("sort")}
                title="Sort"
                iconName={"chevron-expand-outline"}
              />
              {isMap ? (
                <SearchBtnOption
                  onPress={handleSearchNavigation}
                  title="List"
                  iconName={"list-outline"}
                />
              ) : (
                <SearchBtnOption onPress={mapBtn} title="Map" iconName={"map-outline"} />
              )}
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    // height: HEADER_HEIGHT,
    // height: 200,
    zIndex: 10,
    // backgroundColor: "pink",
    backgroundColor: "white",
    paddingBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 20,
    padding: 7,
  },
  searchText: {
    fontWeight: "400",
    fontSize: 16,
  },
  btnOutline: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,
  },
  filterText: {
    fontWeight: "600",
    color: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    width: "100%",
  },
});
export default SearchHeader;
