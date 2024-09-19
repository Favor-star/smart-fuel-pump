import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "@/constants/icons";

import { ImageIcon } from "@/components/CustomButton";
const TabsLayout = () => {
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
        name="refill"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              icon={icons.Fuel}
              color={color}
              focused={focused}
              name="Refill"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              icon={icons.Wallet}
              color={color}
              focused={focused}
              name="Wallet"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              icon={icons.ChartNoAxesCombined}
              color={color}
              focused={focused}
              name="History"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              icon={icons.User}
              color={color}
              focused={focused}
              name="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

interface TabBarIconProps {
  icon: any;
  color: string;
  focused: boolean;
  name: string;
}

const TabBarIcon = ({ icon, color, focused, name }: TabBarIconProps) => {
  return (
    <View className="flex items-center justify-center">
      <ImageIcon icon={icon} tintColor={color} />
      <Text
        className={`${
          focused
            ? "font-pSemiBold text-accent"
            : "font-medium text-gray-normal"
        } text-xs font-pRegular`}
      >
        {name}
      </Text>
    </View>
  );
};
