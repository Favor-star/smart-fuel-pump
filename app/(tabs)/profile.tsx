import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Redirect } from "expo-router";
import FormField from "@/components/FormField";

import { logout } from "@/lib/appwrite";
import icons from "@/constants/icons";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { ImageIcon } from "@/components/CustomButton";

import { Models } from "react-native-appwrite";

interface CustomUser extends Models.User<Models.Preferences> {
  names?: string;
}
const RefillPage = () => {
  const { setIsLoggedIn, user } = useGlobalContext();
  const { names: userName, email: userEmail } = user as CustomUser;
  const handleChange = (text: string) => {};
  const handleLogout = async () => {
    await logout();
    router.replace("/");
    setIsLoggedIn(false);
  };

  return (
    <SafeAreaView className="h-screen px-3 pt-1 w-full bg-background">
      <ScrollView className="w-full ">
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
                <Text className="font-pSemiBold">{userName}</Text>
              </View>
              <View className="w-full justify-between flex-row mb-2">
                <Text className="font-pRegular">Email:</Text>
                <Text className="font-pSemiBold">{userEmail}</Text>
              </View>
              {userEmail === "favoureliab@gmail.com" && (
                <View>
                  <TouchableOpacity
                    className=" w-full flex items-center justify-center py-3 rounded-xl bg-gray-hover border border-gray-active px-7 "
                    onPress={() => router.push("/(tabsAdmin)/scanCode")}
                  >
                    <Text className="font-pSemiBold">Admin</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <Text className="text-lg font-pSemiBold mt-3">Edit your info:</Text>
          <Text className="font-pRegular">Edit your account details here</Text>
          <View className="pt-5 ">
            <FormField
              label="Full Name"
              value={""}
              placeholder={userName || ""}
              handleChange={handleChange}
              otherStyles="w-full mb-5"
              inputStyles="bg-white border border-gray-active"
            />
            <FormField
              label="Email"
              value={""}
              placeholder={userEmail || ""}
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
            <TouchableOpacity className=" p-3 flex-1 bg-gray-active rounded-xl flex flex-row spacex-2 justify-center items-center space-x-3 ">
              <Text className="text-black text-center font-pSemiBold ">
                Discard
              </Text>
              <ImageIcon icon={icons.Delete} tintColor={"black"} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 p-3 bg-green-normal rounded-xl flex flex-row space-x-2 justify-center items-center">
              <Text className="text-white text-center font-pSemiBold">
                Save
              </Text>
              <ImageIcon icon={icons.Save} tintColor={"white"} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full mt-10 mb-14">
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
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default RefillPage;
