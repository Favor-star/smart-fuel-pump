import { Tabs } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text, View } from "react-native";
import Button from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { Link } from "expo-router";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function Register() {
  const router = useRouter();
  const handleChange = () => {};
  const handleRegister = () => {
    router.push("/(tabs)/refill");
  };
  return (
    <SafeAreaView className="h-screen bg-white justify-center items-center space-2">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        className="w-full bg-white"
      >
        <View className="pt-10">
          <Text className="font-bold text-3xl text-green-normal text-center">
            Smart Fuel Pump
          </Text>
          <Text className="text-center max-w-[300px]">
            Welcome to making the world a better place with less cost
          </Text>
        </View>
        <View className="w-full max-w-[400px] items-center justify-center flex-1">
          <Text className="uppercase font-bold text-2xl">Register</Text>
          <FormField
            label="Names"
            handleChange={handleChange}
            value={""}
            placeholder="Names"
          />
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
          <FormField
            label="Confirm Password"
            handleChange={handleChange}
            value={""}
            placeholder="Confirm Password"
            otherStyles="mt-3"
          />
          <View className="w-full mt-5 items-center justify-center">
            <Button
              onPress={handleRegister}
              title="Register"
              otherStyles="max-w-[400px]"
            ></Button>
          </View>
          <View className="flex flex-row space-1 mt-3">
            <Text>Already have an account?</Text>
            <Link href={"/login"} className="text-green-normal font-semibold ">
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
