import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
import utilStyles from "@/constants/UtilStyles";
import UtilStyles from "@/constants/UtilStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { filterBtn } from "@/constants/filterBtn";
import SearchFilter from "@/components/SearchFilter";

interface SearchHeaderProps {
  scrollOffset: SharedValue<number>;
}

const SearchHeader = ({ scrollOffset }: SearchHeaderProps) => {
  const previousScrollOffset = useSharedValue(0);
  const accumulatedScrollUp = useSharedValue(0);
  const headerYPosition = useSharedValue(0);
  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    scrollOffset.value = 0; // Start with the scroll offset at 0
    previousScrollOffset.value = 0; // No previous scroll offset initially
    accumulatedScrollUp.value = 0; // No accumulated scroll up initially
    headerYPosition.value = 0; // Header is initially in view
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
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

  return (
    <Animated.View style={[styles.container, iosStyles, headerAnimatedStyle]}>
      <View style={{ marginHorizontal: 10, paddingTop: 10, gap: 15 }}>
        <TouchableOpacity onPress={() => console.log("go to input screen pressed")}>
          <View style={styles.searchBar}>
            <Ionicons name={"search-outline"} size={28} color={Colors.primary} />
            <Text style={styles.searchText}>Find Location</Text>
          </View>
        </TouchableOpacity>
        <SearchFilter />
        <View>
          <View style={[styles.divider]} />
          <View style={[utilStyles.row, { marginTop: 8 }]}>
            <View style={[UtilStyles.flex, { gap: 5 }]}>
              <FontAwesome name="map-marker" size={18} color={Colors.primary} />
              <Text style={{ color: "gray" }}>12 Available</Text>
              <TouchableOpacity onPress={() => console.log("save pressed")}>
                <Text style={styles.btnTitle}>Save</Text>
              </TouchableOpacity>
            </View>
            <View style={[utilStyles.flex, { gap: 20 }]}>
              <TouchableOpacity
                onPress={() => console.log("save pressed")}
                style={[utilStyles.flex, { gap: 5 }]}
              >
                <Ionicons name={"map-outline"} size={20} color={Colors.info} />
                <Text style={styles.btnTitle}>Sort</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log("save pressed")}
                style={[utilStyles.flex, { gap: 5 }]}
              >
                <Ionicons name={"map-outline"} size={20} color={Colors.info} />
                <Text style={styles.btnTitle}>Map</Text>
              </TouchableOpacity>
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
    zIndex: 3,
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
  btnTitle: { color: Colors.info, fontWeight: "600" },
});
export default SearchHeader;
