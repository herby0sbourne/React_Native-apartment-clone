import { StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { HEADER_HEIGHT, TRANSITION_THRESHOLD } from "@/constants/variable";
import { useLayoutEffect } from "react";

const SearchHeader = ({ scrollOffset }) => {
  const previousScrollOffset = useSharedValue(0);
  const accumulatedScrollUp = useSharedValue(0);
  const headerYPosition = useSharedValue(0);

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

  return (
    <Animated.View style={[styles.container, headerAnimatedStyle]}>
      <Text>apple</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: HEADER_HEIGHT - 24,
    zIndex: 10,
    // top: 24,
    backgroundColor: "pink",
  },
});
export default SearchHeader;
// { transform: [{ translateY: -50 }] }
