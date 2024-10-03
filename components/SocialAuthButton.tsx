import {
  ActivityIndicator,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { UtilStyles } from "@/constants/UtilStyles";

import GoogleLogo from "@/assets/logos/google.svg";
import FacebookLogo from "@/assets/logos/facebook-white.svg";

export interface AuthButtonProps {
  text: string;
  extraStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
  isLoading?: boolean;
  type: "facebook" | "google";
}

const SocialAuthButton = ({
  text,
  extraStyle,
  onPress,
  textStyle,
  isLoading,
  type,
}: AuthButtonProps) => {
  const authLogo = {
    facebook: <FacebookLogo width={24} height={24} />,
    google: <GoogleLogo width={24} height={24} />,
  };

  return (
    <TouchableOpacity style={[UtilStyles.authBtn, extraStyle]} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size={25} color="white" />
      ) : (
        <>
          {authLogo[type]}
          <Text style={[UtilStyles.authText, textStyle]}>{text}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default SocialAuthButton;
