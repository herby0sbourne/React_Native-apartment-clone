import { forwardRef } from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import Colors from "@/constants/Colors";

interface ButtonProps {
  title: string;
  ghostBtn?: boolean;
  onPress?: () => void;
  extraStyle?: StyleProp<ViewStyle>;
}

const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ title, ghostBtn = true, extraStyle, onPress }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        style={[styles.btn, extraStyle, !ghostBtn && { backgroundColor: Colors.primary }]}
      >
        <Text style={[styles.btnTitle, !ghostBtn && { color: "white" }]}>{title}</Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  btn: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 10,
    flex: 1,
  },
  btnTitle: {
    textAlign: "center",
    color: Colors.primary,
    fontWeight: "bold",
  },
});

export default Button;
