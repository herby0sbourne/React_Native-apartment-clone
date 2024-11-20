import { StyleSheet, View, ViewStyle } from "react-native";

interface BlackDotProps {
  extraStyle?: ViewStyle | ViewStyle[];
}

const BlackDot = ({ extraStyle }: BlackDotProps) => {
  return <View style={[styles.dot, extraStyle]} />;
};

const styles = StyleSheet.create({
  dot: {
    padding: 3,
    height: 3,
    width: 3,
    backgroundColor: "black",
    borderRadius: 30,
    marginRight: 10,
  },
});

export default BlackDot;
