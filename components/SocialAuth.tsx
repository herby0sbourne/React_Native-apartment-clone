import { useNavigation } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import AppleButton from "@/components/AppleButton";
import SocialAuthButton from "@/components/SocialAuthButton";

import useAuth from "@/hooks/useAuth";
import { apiFacebookLogin, apiGoogleLogin } from "@/services/user.service";

const SocialAuth = () => {
  const route = useRoute();
  const { login } = useAuth();
  const navigation = useNavigation();

  const btnType = route.name === "signin-screen" ? "sign-in" : "sign-up";

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

  const googleLogin = useMutation({
    mutationFn: async () => {
      try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signIn();

        const token = await GoogleSignin.getTokens();
        if (!token.accessToken) return;

        const user = await apiGoogleLogin(token.accessToken);
        if (!user) return;

        login(user);
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <View style={{ gap: 10 }}>
      {/* GOOGLE LOGIN BUTTON  */}
      <SocialAuthButton
        type={"google"}
        text={"Continue with Google"}
        onPress={() => googleLogin.mutate()}
        textStyle={{ color: "#36454f" }}
        isLoading={googleLogin.isPending}
      />

      {/*  FACEBOOK LOGIN BUTTON */}
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

      <AppleButton type={btnType} onPress={() => console.log("sign up with apple")} />
    </View>
  );
};
export default SocialAuth;
const styles = StyleSheet.create({});
