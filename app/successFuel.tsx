import React, { useRef } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import ViewShot from "react-native-view-shot";
import icons from "@/constants/icons";
import { ImageIcon } from "@/components/CustomButton";
import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

const SuccessPage = () => {
  const router = useRouter();

  const { liters } = useLocalSearchParams<{
    liters: string;
  }>();

  const viewShotRef = useRef<ViewShot | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <ScrollView className="flex-1 bg-white">
        <ViewShot
          ref={viewShotRef}
          options={{ format: "jpg", quality: 0.9 }}
          style={{ flex: 1, backgroundColor: "white" }}
        >
          <View className="flex-1 justify-center items-center space-y-20 bg-white">
            <View className="items-center pt-5">
              <Text className="text-2xl font-bold text-green-normal">
                Success!
              </Text>
              <Text>Your token has been successfully decoded</Text>
            </View>

            <View className="justify-center items-center space-y-5 ">
              <View className="items-center p-3">
                <Text className="text-lg font-semibold">
                  You are about to fill:
                </Text>
                <View className="w-48 h-48 bg-inherit rounded-lg mt-3 border border-green-normal bg-green-light-hover p-2 items-center justify-center">
                  <Text
                    className="text-green-normal text-3xl"
                    style={{ fontFamily: "Poppins-Bold" }}
                  >
                    {liters} L
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex-row space-x-5 justify-between items-center max-w-[350px] ">
              {/* <TouchableOpacity
              className="flex-row items-center justify-center space-x-2 rounded-lg bg-gray-active textblack p-3 flex-1"
              onPress={() => router.push("/refill")}
            >
              <ImageIcon icon={icons.MoveLeft} tintColor={"black"} />
              <Text className="text-black font-medium">Back</Text>
            </TouchableOpacity> */}
              <TouchableOpacity
                className="flex-row items-center justify-center space-x-2 rounded-lg bg-green-normal textblack p-3 flex-1"
                onPress={() => {}}
              >
                <Text className="text-white font-medium">Authorize Pump</Text>
                <ImageIcon icon={icons.Fuel} tintColor={"white"} />
              </TouchableOpacity>
            </View>
          </View>
        </ViewShot>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default SuccessPage;
