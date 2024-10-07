import { Tabs } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import Button from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { Link, useRouter } from "expo-router";
import icons from "@/constants/icons";
import {} from "react-native";
import { useState } from "react";
import { Alert } from "react-native";
import { signin } from "@/lib/appwrite";
import { Camera, LogIn } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleEmailInputChange = (text: string) => {
    setLoginData({ ...loginData, email: text.trim() });
  };
  const handlePasswordInputChange = (text: string) => {
    setLoginData({ ...loginData, password: text.trim() });
  };
  const handleLogin = async () => {
    if (loginData.email === "" || loginData.password === "") {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await signin(loginData.email, loginData.password);
      if (loginData.email === "favoureliab@gmail.com") {
        router.replace("/(tabs)/profile");
        return;
      }
      router.replace("/(tabs)/refill");
    } catch (error) {
      console.error(error);
      const newError = error as any;
      Alert.alert("Error", newError.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <ScrollView>
      <SafeAreaView className="h-screen flex flex-1 bg-white justify-center items-center space-2 ">
        <View className=" justify-self-start  pt-10">
          <Text className=" text-3xl text-green-normal text-center font-pMedium">
            Smart Fuel Pump
          </Text>
          <Text className="text-center max-w-[300px] font-pRegular">
            Welcome again to making the world a better place with less cost
          </Text>
        </View>
        <View className="w-full max-w-[400px] items-center justify-center flex-1">
          <Text className="uppercase text-2xl font-pSemiBold">Login</Text>
          <FormField
            label="Email"
            handleChange={handleEmailInputChange}
            value={loginData.email}
            placeholder="Email"
            inputStyles="bg-gray-hover border border-gray-active"
          />
          <FormField
            label="Password"
            handleChange={handlePasswordInputChange}
            value={loginData.password}
            placeholder="Password"
            otherStyles="mt-3"
            inputStyles="bg-gray-hover border border-gray-active"
          />
          <View className="w-full mt-5 items-center justify-center">
            <Button
              onPress={handleLogin}
              title="Login"
              icon={icons.LogIn}
              disabled={isSubmitting}
            >
              {isSubmitting && <ActivityIndicator size="small" color="#fff" />}
            </Button>
          </View>
          <View className="space-y-2 self-center">
            {/* <Text className="text-xs font-pRegular text-center self-center mt-1 text-red-500 ">
              this is error section
            </Text> */}

            <Text className="font-pRegular mt-5">
              Don't have an account?{" "}
              <Link href="/register" className="text-green-600 font-semibold">
                Register
              </Link>
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <StatusBar style="dark" />
    </ScrollView>
  );
}
