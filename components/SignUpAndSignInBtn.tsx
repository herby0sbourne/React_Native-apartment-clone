import { StyleSheet, View, ViewStyle } from "react-native";
import Button from "@/components/Button";
import { Link } from "expo-router";

interface SignUpAndSignInProps {
  extraStyle?: ViewStyle;
}

const SignUpAndSignInBtn = ({ extraStyle }: SignUpAndSignInProps) => {
  return (
    <View style={[extraStyle, { width: "100%", gap: 10 }]}>
      <Link href={"auth/signin-screen"} asChild>
        <Button title={"Sign in"} extraStyle={{ flex: 0 }} ghostBtn={false} />
      </Link>
      <Link href={"auth/signup-screen"} asChild>
        <Button title={"Create Account"} extraStyle={{ flex: 0 }} />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SignUpAndSignInBtn;
