import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SafeAreaProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const SafeArea = ({ children, style }: SafeAreaProps) => {
  return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default SafeArea;
