import { Link, useRouter, Redirect } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {} from "expo-router";
import { Text, View } from "react-native";
import Button from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Index() {
  const router = useRouter();
  const { isLoading, isLoggedIn } = useGlobalContext();
  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
    console.log("isLoading", isLoading);
  }, [isLoading, isLoggedIn]);
  if (!isLoading && isLoggedIn) return <Redirect href="/(tabs)/refill" />;
  return (
    <SafeAreaView className="h-screen flex flex-1 bg-white">
      <View className="flex flex-1  items-center justify-center">
        <Text className="text-lg font-pRegular">Welcome to</Text>
        <Text
          className="text-[60px]  text-green-normal text-center "
          style={{ fontFamily: "Poppins-Bold" }}
              >
 
                  
          Smart Fuel Pump
        </Text>
        <Text className="text-lg font-pRegular">
          where innovation meets money-saving
        </Text>
      </View>
      <View className="min-h-[300px] flex items-center justify-center">
        <Text className="text-center mx-3 mb-5 font-pRegular">
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
