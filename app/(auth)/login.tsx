import { Tabs } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import Button from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { Link, useRouter } from "expo-router";
import icons from "@/constants/icons";

export default function Login() {
  const router = useRouter();
  const handleChange = () => {};
  const handleLogin = () => {
    router.push("/(tabs)/refill");
  };
  return (
    <SafeAreaView className="h-screen flex flex-1 bg-white justify-center items-center space-2 ">
      <View className=" justify-self-start  pt-10">
        <Text className="font-bold text-3xl text-green-normal text-center">
          Smart Fuel Pump
        </Text>
        <Text className="text-center max-w-[300px]">
          Welcome again to making the world a better place with less cost
        </Text>
      </View>
      <View className="w-full max-w-[400px] items-center justify-center flex-1">
        <Text className="uppercase font-bold text-2xl">Login</Text>
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
          otherStyles="mt-3"
        />
        <View className="w-full mt-5 items-center justify-center">
          <Button onPress={handleLogin} title="Login" icon={icons.login} />
        </View>
        <View className="flex flex-row space-1 mt-2">
          <Text>Don't have an account?</Text>
          <Link href={"/register"} className="text-green-normal font-semibold ">
            Register
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
