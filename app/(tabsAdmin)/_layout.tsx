import React from "react";
import { Tabs } from "expo-router";
import { TabBarIcon } from "../(tabs)/_layout";
import icons from "@/constants/icons";
const AdminLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#00B341",

        tabBarStyle: {
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name="scanCode"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              icon={icons.ScanQrCode}
              color={color}
              focused={focused}
              name="Scan"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="manage"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              icon={icons.SlidersHorizontal}
              color={color}
              focused={focused}
              name="Manage"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default AdminLayout;
