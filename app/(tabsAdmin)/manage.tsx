import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import icons from "@/constants/icons";
import { ImageIcon } from "@/components/CustomButton";
import { useRouter } from "expo-router";
import FormField from "@/components/FormField";
import { StatusBar } from "expo-status-bar";

const manage = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="w-full ">
      <ScrollView className="w-full">
        <View className="w-full h-screen space-x-3 bg-background px-3 pt-1">
          <View className="w-full">
            <Text className="text-2xl font-pSemiBold">User Management</Text>
            <Text className="text-sm font-pRegular">
              You can manage your account here
            </Text>
          </View>
          <View className="bg-background">
            <Text className="text-lg  mt-3 font-pSemiBold">Account Owner</Text>
            <View className="w-full p-4 bg-white rounded-xl  h-fit items-center justify-center">
              <View className="w-full justify-between flex-row mb-2">
                <Text className="font-pRegular">Name:</Text>
                <Text className="font-pSemiBold">Testing</Text>
              </View>
              <View className="w-full justify-between flex-row mb-2">
                <Text className="font-pRegular">Email:</Text>
                <Text className="font-pSemiBold">another testing</Text>
              </View>
            </View>
          </View>
          <Text className="text-lg font-pSemiBold mt-3">Edit your info:</Text>
          <Text className="font-pRegular">Edit your account details here</Text>
          <FormField
            label="IP Address"
            value={""}
            placeholder={"12.198.23432"}
            handleChange={() => {}}
            otherStyles="w-full mb-5"
            inputStyles="bg-white border border-gray-active"
          />
          <View className="flex-row space-x-5 justify-between items-center max-w-[350px] ">
            <TouchableOpacity
              className="flex-row items-center justify-center space-x-2 rounded-lg bg-gray-active textblack p-3 flex-1"
              onPress={() => router.push("/refill")}
            >
              <ImageIcon icon={icons.Delete} tintColor={"black"} />
              <Text className="text-black font-medium">Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center justify-center space-x-2 rounded-lg bg-green-normal textblack p-3 flex-1"
              onPress={() => {}}
            >
              <Text className="text-white font-medium">Save Changes</Text>
              <ImageIcon icon={icons.Save} tintColor={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default manage;
