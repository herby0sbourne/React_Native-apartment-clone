import { StyleSheet, View } from "react-native";

import SocialAuthButton from "@/components/SocialAuthButton";
import AppleButton from "@/components/AppleButton";
import { useNavigation } from "expo-router";
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";

import { apiFacebookLogin } from "@/services/user.service";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";

const SocialAuth = () => {
  const navigation = useNavigation();
  const { login } = useAuth();

  const facebookLogin = useMutation({
    mutationFn: async () => {
      const res = await LoginManager.logInWithPermissions(["public_profile", "email"]);

      if (res.isCancelled) return;

      const token = await AccessToken.getCurrentAccessToken();

      const user = await apiFacebookLogin(token!.accessToken);

      if (!user) return;

      login(user);
      navigation.goBack();
    },
  });

  return (
    <View style={{ gap: 10 }}>
      <SocialAuthButton
        type={"google"}
        text={"Continue with Google"}
        onPress={() => console.log("sign up with google")}
        textStyle={{ color: "#36454f" }}
      />

      <SocialAuthButton
        type={"facebook"}
        text={"Continue with Facebook"}
        onPress={() => facebookLogin.mutate()}
        extraStyle={{
          backgroundColor: "#3b5998",
          borderWidth: 0,
        }}
        textStyle={{ marginRight: -16 }}
        isLoading={facebookLogin.isPending}
      />

      <AppleButton type={"sign-up"} onPress={() => console.log("sign up with apple")} />
    </View>
  );
};
export default SocialAuth;
const styles = StyleSheet.create({});
