import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import Button from "@/components/CustomButton";
import QrCode from "react-native-qrcode-svg";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext, GlobalProvider } from "@/context/GlobalProvider";
import { useRouter } from "expo-router";

const SuccessPage = () => {
  const router = useRouter();
  const { isLoggedIn } = useGlobalContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        router.replace("/(tabs)/refill");
      } else {
        router.replace("/");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoggedIn]);
  const navigation = useNavigation();
  createUser();
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center space-y-20">
        <View className="items-center pt-5">
          <Text className="text-2xl font-bold text-green-normal">Success!</Text>
          <Text>Your token has been successfully generated</Text>
        </View>

        <View className="justify-center items-center space-y-5 ">
          <View className="items-center p-3">
            <Text className="text-lg font-semibold">Scan QR Code</Text>
            <View className="w-48 h-48 bg-inherit rounded-lg mt-3 border-2 border-black p-2 items-center justify-center">
              <QrCode value="1234-3456-7890" size={140} />
            </View>
          </View>

          <Text className="text-sm">or</Text>

          <View className="w-full max-w-[400px] items-center">
            <Text className="text-lg font-semibold">Copy Token</Text>
            <View className="flex-row items-center mt-2 bg-gray-active rounded-lg overflow-hidden">
              <Text className="p-2 text-lg font-medium">1234-3456-7890</Text>
              <View className="bg-black p-2">
                <Image
                  source={icons.copy}
                  style={{
                    height: 30,
                    width: 30,
                    objectFit: "contain",
                  }}
                  tintColor={"white"}
                />
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row space-x-5 justify-between items-center max-w-[350px] ">
          <TouchableOpacity
           className="flex-row items-center justify-center space-x-2 rounded-lg bg-gray-active textblack p-3 flex-1"
            onPress={() => navigation.goBack()}
          >
            <Image source={icons.arrowLeft} tintColor={"black"} />
            <Text className="text-black font-medium">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-center space-x-2 rounded-lg bg-green-normal textblack p-3 flex-1">
            <Text className="text-white font-medium">Download QR</Text>
            <Image source={icons.download} tintColor={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default function SuccessPageProvider() {
  return (
    <GlobalProvider>
      <SuccessPage />
    </GlobalProvider>
  );
}
