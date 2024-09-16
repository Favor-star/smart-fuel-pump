import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="refill" options={{ headerShown: false }} />
      <Tabs.Screen name="wallet" options={{ headerShown: false }} />
      <Tabs.Screen name="history" options={{ headerShown: false }} />
      <Tabs.Screen name="profile" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default TabsLayout;
