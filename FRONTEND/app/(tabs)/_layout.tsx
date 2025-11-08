import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none", // Hide the tab bar completely
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          // You can remove the icon if the bar is hidden
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "camera" : "camera-outline"}
              color={color}
            />
          ),
        }}
      />
      {/* You can add other screens here if needed, they just won't have a tab button */}
    </Tabs>
  );
}
