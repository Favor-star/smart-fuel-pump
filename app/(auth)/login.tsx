import { Tabs } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import Button from "@/components/CustomButton";
import FormField from "@/components/FormField";

export default function Login() {
  const handleChange = () => {};
  return (
    <SafeAreaView className="h-screen flex flex-1 bg-white justify-center items-center ">
      <View className=" justify-self-start border border-black">
        <Text>Smart Fuel Pump</Text>
        <Text>
          Welcome again to making the world a better place with less cost
        </Text>
      </View>
      <View className="w-full items-center ">
        <Text className="uppercase font-semibold ">Login</Text>
        <FormField
          label="Email"
          handleChange={handleChange}
          value={""}
          placeholder="Email"
        />
        <FormField
          label="Password"
          handleChange={handleChange}
          value={""}
          placeholder="Password"
        />
        <Button onPress={() => console.log("Preseesd")} title="Login"></Button>
      </View>
    </SafeAreaView>
  );
}
