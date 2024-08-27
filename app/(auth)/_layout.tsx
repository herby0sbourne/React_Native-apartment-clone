import { Stack } from "expo-router";
import HeaderIcon from "@/components/HeaderIcon";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="signin-screen"
        options={{
          title: "Sign In",
          headerTitleAlign: "center",
          headerLeft: () => <HeaderIcon />,
        }}
      />
      <Stack.Screen name="signup-screen" options={{ title: "Sign Up" }} />
      <Stack.Screen name="forgot-password" options={{ title: "Forgot Password" }} />
      <Stack.Screen name="reset-password" options={{ title: "reset Password" }} />
    </Stack>
  );
}
