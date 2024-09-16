import { Link, Tabs } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import Button from "@/components/CustomButton";
export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView className="h-screen flex flex-1 bg-white">
      <View className="flex flex-1  items-center justify-center">
        <Text className="text-lg ">Welcome to</Text>
        <Text className="text-[60px] font-bold text-green-normal text-center">
          Smart Fuel Pump
        </Text>
        <Text className="text-lg">where innovation meets money-saving</Text>
      </View>
      <View className="min-h-[300px] flex items-center justify-center">
        <Text className="text-center mx-3 mb-5">
          This is the number one app for managing your fuel related cost, and
          save money just with an ease
        </Text>
        <Button
          title={"Proceed"}
          onPress={() => router.push("/login")}
          otherStyles="max-w-[400px]"
        />
      </View>
    </SafeAreaView>
  );
}
