import { Text, StyleSheet, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";

import { AuthButtonProps } from "@/components/GoogleButton";

import FacebookLogo from "../assets/logos/facebook-white.svg";
import { UtilStyles } from "@/constants/UtilStyles";

WebBrowser.maybeCompleteAuthSession();

const FacebookButton = ({ text, extraStyle, onPress, textStyle }: AuthButtonProps) => {
  return (
    <TouchableOpacity style={[UtilStyles.authBtn, extraStyle]} onPress={onPress}>
      <FacebookLogo width={24} height={24} />
      <Text style={[UtilStyles.authText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default FacebookButton;
