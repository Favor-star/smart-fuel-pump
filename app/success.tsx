import React, { useRef } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QrCode from "react-native-qrcode-svg";
import { useRouter, useLocalSearchParams } from "expo-router";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import icons from "@/constants/icons";

import { ImageIcon } from "@/components/CustomButton";

const SuccessPage = () => {
  const router = useRouter();

  const { token } = useLocalSearchParams<{ token: string; liters: string }>();
  const formattedToken = token || "0000-0.00";
  const viewShotRef = useRef<ViewShot | null>(null);

  const captureAndSave = async () => {
    try {
      const capture = viewShotRef.current?.capture;
      if (capture) {
        const uri = await capture();
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync("Fuel QR Codes", asset, false);
        Alert.alert("Success", "Fuel QR Code token saved to gallery!");
      } else {
        throw new Error("ViewShot ref or capture method is null");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save QR Code");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
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
            <Text>Your token has been successfully generated</Text>
          </View>

          <View className="justify-center items-center space-y-5 ">
            <View className="items-center p-3">
              <Text className="text-lg font-semibold">Scan QR Code</Text>
              <View className="w-48 h-48 bg-inherit rounded-lg mt-3 border-2 border-black p-2 items-center justify-center">
                <QrCode value={formattedToken} size={140} />
              </View>
            </View>

            <Text className="text-sm">or</Text>

            <View className="w-full max-w-[400px] items-center">
              <Text className="text-lg font-semibold">Copy Token</Text>
              <View className="flex-row items-center mt-2 bg-gray-active rounded-lg overflow-hidden">
                <Text className="p-2 text-lg font-medium">
                  {formattedToken}
                </Text>
                <View className="bg-black p-2">
                  <ImageIcon
                    icon={icons.Copy}
                   
                    tintColor={"white"}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className="flex-row space-x-5 justify-between items-center max-w-[350px] ">
            <TouchableOpacity
              className="flex-row items-center justify-center space-x-2 rounded-lg bg-gray-active textblack p-3 flex-1"
              onPress={() => router.push("/refill")}
            >
              <ImageIcon icon={icons.MoveLeft} tintColor={"black"} />
              <Text className="text-black font-medium">Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center justify-center space-x-2 rounded-lg bg-green-normal textblack p-3 flex-1"
              onPress={captureAndSave}
            >
              <Text className="text-white font-medium">Download QR</Text>
              <ImageIcon icon={icons.Download} tintColor={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      </ViewShot>
    </SafeAreaView>
  );
};

export default SuccessPage;
