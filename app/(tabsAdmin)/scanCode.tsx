import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import {} from "react-native";
import { ImageIcon } from "@/components/CustomButton";
import icons from "@/constants/icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const scanCode = () => {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const handleProceed = () => {
    router.push({
      pathname: "/successFuel",
      params: {
        liters: 10,
      },
    });
  };
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);
  const handleBarcodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    router.push({
      pathname: "/successFuel",
      params: {
        liters: data,
      },
    });
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView className="w-full ">
      <ScrollView className="w-full h-full">
        <View className=" w-full  h-[85vh] flex flex-col justify-between items-center bg-background px-3 pt-1">
          <View className="justify-center items-center">
            <Text className="font-pSemiBold text-lg ">Scan QR code</Text>
            <Text className="font-pRegular text-base">
              Scan codes to proceed with authorizing the hardware section
            </Text>
          </View>
          <View className="flex space-y-2 w-full items-center justify-center">
            <CameraView
              className="w-full aspect-square max-w-[2500px] max-h-[250px] border-gray-500 rounded-lg"
              onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ["qr", "pdf417"],
              }}
            />
            <Text className="text-red-500 font-pRegular w-full text-center text-xs">
              N.B: Please remember to grant access to camera
            </Text>
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
              onPress={handleProceed}
            >
              <Text className="text-white font-medium">Proceed</Text>
              <ImageIcon icon={icons.MoveRight} tintColor={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default scanCode;
