import { StyleSheet, View, ViewStyle } from "react-native";
import Button from "@/components/Button";

interface SignUpAndSignInProps {
  extraStyle?: ViewStyle;
}

const SignUpAndSignInBtn = ({ extraStyle }: SignUpAndSignInProps) => {
  return (
    <View style={[extraStyle, { width: "100%", gap: 10 }]}>
      <Button
        title={"Sign in"}
        onPress={() => console.log("SignIn Btn")}
        extraStyle={{ flex: 0 }}
        ghostBtn={false}
      />
      <Button
        title={"Create Account"}
        onPress={() => console.log("SignUp Btn")}
        extraStyle={{ flex: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SignUpAndSignInBtn;
