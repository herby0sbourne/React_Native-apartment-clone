import { StyleSheet, View, ViewStyle } from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

interface SignUpAndSignInProps {
  extraStyle?: ViewStyle;
}

const SignUpAndSignInBtn = ({ extraStyle }: SignUpAndSignInProps) => {
  const route = useRouter();

  return (
    <View style={[extraStyle, { width: "100%", gap: 10 }]}>
      <Button
        title={"Sign in"}
        onPress={() => route.push("/(auth)/signin-screen")}
        extraStyle={{ flex: 0 }}
        ghostBtn={false}
      />
      <Button
        title={"Create Account"}
        onPress={() => route.push("/(auth)/signup-screen")}
        extraStyle={{ flex: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SignUpAndSignInBtn;


// const navigation = useNavigation();
// navigation.navigate("auth", { name: "signin-screen" });
