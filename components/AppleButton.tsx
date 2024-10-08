import * as AppleAuthentication from "expo-apple-authentication";
import { AppleAuthenticationButtonStyle } from "expo-apple-authentication";
import { Platform, StyleSheet } from "react-native";

interface AppleAuthProps {
  type: "sign-in" | "sign-up";
  onPress: () => void;
}

const AppleButton = ({ type, onPress }: AppleAuthProps) => {
  if (Platform.OS !== "ios") return null;
  if (!AppleAuthentication.isAvailableAsync()) return null;

  const buttonType = {
    "sign-in": AppleAuthentication.AppleAuthenticationButtonType.CONTINUE,
    "sign-up": AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP,
  };

  return (
    <AppleAuthentication.AppleAuthenticationButton
      onPress={onPress}
      buttonType={buttonType[type]}
      buttonStyle={AppleAuthenticationButtonStyle.WHITE_OUTLINE}
      cornerRadius={5}
      style={styles.btn}
    />
  );
};

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    height: 50,
  },
});
export default AppleButton;
