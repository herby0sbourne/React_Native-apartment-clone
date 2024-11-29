import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color?: string;
  focused?: boolean;
  size?: number;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

const TabBarIconComponent =
  (name: string) =>
  ({ color }: { color: string }) =>
    (
      <TabBarIcon
        name={name as React.ComponentProps<typeof Ionicons>["name"]}
        color={color}
      />
    );

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: TabBarIconComponent("search-outline"),
          tabBarStyle: { position: "absolute", transform: [{ translateY: 0 }] },
        }}
      />
      <Tabs.Screen
        name="save"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: TabBarIconComponent("heart-outline"),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          headerShown: false,
          tabBarIcon: TabBarIconComponent("person-circle-outline"),
        }}
      />
    </Tabs>
  );
};

export default Layout;
