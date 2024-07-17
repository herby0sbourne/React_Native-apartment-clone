import { Dimensions, StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const NoProperty = ({ isSearch }: { isSearch: boolean }) => {
  return (
    <View style={styles.container}>
      {!isSearch && (
        <LottieView
          loop
          autoPlay
          style={styles.lottieStyle}
          source={require("../assets/lotties/map_search.json")}
        />
      )}
      <Text style={{ fontWeight: "bold", fontSize: 22 }}>
        {isSearch ? "No Properties Found" : "Begin Your Search"}
      </Text>
      <Text style={{ color: "gray", fontSize: 18 }}>
        {isSearch
          ? "Please search in a different location"
          : "Find apartments anytime and anywhere"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: SCREEN_HEIGHT,
  },
  lottieStyle: {
    width: "100%",
    // width:300,
    height: 250,
  },
});

export default NoProperty;
