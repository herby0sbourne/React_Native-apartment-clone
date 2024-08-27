import { Text, ViewStyle, StyleSheet, TouchableOpacity, TextStyle } from "react-native";
import * as WebBrowser from "expo-web-browser";

import GoogleLogo from "../assets/logos/google.svg";
import { UtilStyles } from "@/constants/UtilStyles";

export interface AuthButtonProps {
  text: string;
  extraStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
}

WebBrowser.maybeCompleteAuthSession();

const GoogleButton = ({ text, extraStyle, onPress, textStyle }: AuthButtonProps) => {
  return (
    <TouchableOpacity style={[UtilStyles.authBtn, extraStyle]} onPress={onPress}>
      <GoogleLogo width={24} height={24} />
      <Text style={[UtilStyles.authText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
export default GoogleButton;
