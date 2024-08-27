import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { UtilStyles } from "@/constants/UtilStyles";
import { ReactNode } from "react";

interface DividerProps {
  children?: ReactNode;
  style?: ViewStyle;
}

const Divider = ({ children, style }: DividerProps) => {
  return (
    <View style={[styles.container, UtilStyles.flex, style]}>
      <View style={styles.line} />
      <Text style={{ paddingHorizontal: 10 }}>{children}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    borderWidth: 0.5,
    flex: 1,
    borderColor: "#6b6b6b",
    // marginLeft: 10,
    // marginRight: 10,
  },
});
export default Divider;
