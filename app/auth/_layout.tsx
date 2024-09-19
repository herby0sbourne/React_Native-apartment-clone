import { Stack } from "expo-router";
import HeaderIcon from "@/components/HeaderIcon";

const closeIcon = () => {
  return () => <HeaderIcon />;
};

const Layout = () => {
  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="signin-screen"
        options={{
          title: "Sign In",
          headerLeft: closeIcon(),
        }}
      />
      <Stack.Screen
        name="signup-screen"
        options={{ title: "Sign Up", headerLeft: closeIcon() }}
      />
      <Stack.Screen name="forgot-password" options={{ title: "Forgot Password" }} />
      <Stack.Screen name="reset-password" options={{ title: "Reset Password" }} />
    </Stack>
  );
};

export default Layout;
