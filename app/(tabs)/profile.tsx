import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { router, Redirect } from "expo-router";
import FormField from "@/components/FormField";
import Button from "@/components/CustomButton";
import { logout } from "@/lib/appwrite";
import icons from "@/constants/icons";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
const RefillPage = () => {
  const {setIsLoggedIn } = useGlobalContext();
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const handleRefillComplete = () => {
    router.push("/success");
  };
  const [amount, setAmount] = useState(0);
  const handleChange = (text: string) => {
    setAmount(parseInt(text) || 0);
  };
  const handleLogout = async () => {
    await logout();
    router.replace("/");
    setIsLoggedOut(true);
    setIsLoggedIn(false);
  };

  return (
    <ScrollView>
      <SafeAreaView className="h-screen p-3 w-full bg-background">
        <View className="w-full">
          <Text className="text-2xl font-pSemiBold">User Management</Text>
          <Text className="text-sm font-pRegular">
            You can manage your account here
          </Text>
        </View>
        <View className=" w-full">
          <View className="w-full bg-background ">
            <Text className="text-lg  mt-3 font-pSemiBold">Account Owner</Text>
            <View className="w-full p-4 bg-white rounded-xl  h-fit items-center justify-center">
              <View className="w-full justify-between flex-row mb-2">
                <Text className="font-pRegular">Name:</Text>
                <Text className="font-pSemiBold">John Doe</Text>
              </View>
              <View className="w-full justify-between flex-row mb-2">
                <Text className="font-pRegular">Email:</Text>
                <Text className="font-pSemiBold">johndoe@gmail.com</Text>
              </View>
            </View>
          </View>
          <Text className="text-lg font-pSemiBold mt-3">Edit your info:</Text>
          <Text className="font-pRegular">Edit your account details here</Text>
          <View className="pt-5 ">
            <FormField
              label="Full Name"
              value={""}
              placeholder="name"
              handleChange={handleChange}
              otherStyles="w-full mb-5"
              inputStyles="bg-white border border-gray-active"
            />
            <FormField
              label="Email"
              value={""}
              placeholder="Email"
              handleChange={handleChange}
              otherStyles="w-full mb-5"
              inputStyles="bg-white border border-gray-active"
            />
            <FormField
              label="Password"
              value={""}
              placeholder="Password"
              handleChange={handleChange}
              otherStyles="w-full"
              inputStyles="bg-white border border-gray-active"
            />
          </View>
          <View className="w-full items-center justify-center self-center flex-row space-x-3 mt-5">
            <TouchableOpacity className=" p-3 flex-1 bg-gray-active rounded-xl flex flex-row spacex-2 justify-center items-center ">
              <Text className="text-black text-center font-pSemiBold">
                Discard
              </Text>
              <Image source={icons.backspace} tintColor={"black"} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 p-3 bg-green-normal rounded-xl flex flex-row space-x-2 justify-center items-center">
              <Text className="text-white text-center font-pSemiBold">
                Save
              </Text>
              <Image source={icons.save} tintColor={"white"} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full mt-10">
          <Text className=" font-pSemiBold"> Actions</Text>
          <Text className="font-pRegular">
            Manage actions related to deleting, or logging out here
          </Text>
          <View className="flex-row space-x-3 mt-5">
            <TouchableOpacity className="w-fit flex-1 bg-red-100 p-3 rounded-xl">
              <Text
                className="text-red-500 font-pMedium text-center "
                onPress={handleLogout}
              >
                Logout
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-fit flex-1 bg-red-500 p-3 rounded-xl justify-center items-center">
              <Text className="text-white font-pMedium">Delete account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default RefillPage;
