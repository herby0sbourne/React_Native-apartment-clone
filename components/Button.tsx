import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";

interface ButtonProps {
  title: string;
  ghostBtn?: boolean;
}

const Button = ({ title, ghostBtn = true }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => console.log(`${title} clicked`)}
      style={[styles.btn, !ghostBtn && { backgroundColor: Colors.primary }]}
    >
      <Text style={[styles.btnTitle, !ghostBtn && { color: "white" }]}>{title}</Text>
    </TouchableOpacity>
  );
};

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
  },
});

export default Button;
