import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { router } from "expo-router";
import FormField from "@/components/FormField";
import Button from "@/components/CustomButton";
import icons from "@/constants/icons";
import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
const RefillPage = () => {
  const handleRefillComplete = () => {
    router.push("/success");
  };

  const [amount, setAmount] = useState(0);
  const handleChange = (text: string) => {
    setAmount(parseInt(text) || 0);
  };
  return (
    <SafeAreaView className="h-screen px-3 pt-1 w-full bg-background">
      <ScrollView className="w-full">
        <View className="w-full">
          <Text className="text-2xl font-pSemiBold mt-1">
            Manage your payments
          </Text>
          <Text className="text-xs font-pRegular">
            You can manage the payments here
          </Text>
        </View>
        <View className=" w-full ">
          <View className="w-full bg-background ">
            <Text className="text-lg font-semibold mt-3">
              Account Information:
            </Text>
            <View className="w-full p-4 bg-white rounded-xl  h-fit items-center justify-center">
              <View className="w-full justify-between flex-row mb-2">
                <Text>Balance:</Text>
                <Text className="font-semibold">5000.00 RWF</Text>
              </View>
              <View className="w-full justify-between flex-row mb-2">
                <Text>Credits</Text>
                <Text className="font-semibold">50 Cr</Text>
              </View>
              <View className="self-start">
                <Text className="text-xs self-start justify-self-start text-red-500">
                  N.B: Minimum 500 credits can be converted into payables{" "}
                </Text>
              </View>
            </View>
          </View>
          <Text className="text-sm font-pSemiBold mt-3">Choose:</Text>
          <View className=" w-full flex-row space-2 justify-between items-center pt-2">
            <TouchableOpacity className="p-3 rounded-md w-fit bg-gray-300">
              <Text className="font-pMedium">MTN momo</Text>
            </TouchableOpacity>
            <Text className="text-sm font-pRegular">or</Text>
            <TouchableOpacity className="flex flex-row p-3 w-fit bg-gray-300 rounded-md">
              <Text className="font-pMedium">Bank Account</Text>
            </TouchableOpacity>
          </View>
          <View className="pt-5 ">
            <FormField
              label="Amount"
              value={amount.toString()}
              placeholder="Amount"
              handleChange={handleChange}
              otherStyles="w-full mb-5"
              inputStyles="bg-white border border-gray-active"
            />
            <FormField
              label="Phone Number"
              value={amount.toString()}
              placeholder="Phone Number"
              handleChange={handleChange}
              otherStyles="w-full"
              inputStyles="bg-white border border-gray-active"
            />
            <Button
              title="Process Deposit"
              onPress={() => console.log("Payment processes")}
              otherStyles="mt-5"
              icon={icons.HandCoins}
            />
            <Text className="text-xs mt-1 text-center">
              By continuing, you agree to the
              <Text className="text-accent"> terms & conditions</Text>
            </Text>
          </View>

          {/* <View className="w-full bg-background ">
            <Text className="text-lg font-semibold mt-3">
              Pricing Information:
            </Text>
            <View className="w-full p-4 bg-white rounded-xl  h-fit items-center justify-center">
              <View className="w-full justify-between flex-row mb-2">
                <Text>Amount entered</Text>
                <Text className="font-semibold">5000.00 RWF</Text>
              </View>
              <View className="w-full justify-between flex-row mb-2">
                <Text>Price per liter</Text>
                <Text className="font-semibold">1000.00 RWF</Text>
              </View>
              <View className="w-full justify-between flex-row mb-2">
                <Text>Discount: (0%)</Text>
                <Text className="font-semibold">0.00 RWF</Text>
              </View>
              <View className="w-full justify-between flex-row mb-2">
                <Text>Total</Text>
                <Text className="font-semibold">5000.00 RWF</Text>
              </View>
            </View>
          </View> */}
        </View>
        <View>
          <Text className="text-base font-pSemiBold mt-5">
            Convert Credits to Payables
          </Text>
          <Text className="text-xs font-pRegular ">
            Whenever you buy, you receive credits, equivalent to how many liters
            you have bought.
          </Text>
        </View>
        <FormField
          label="Convert Credits"
          value=""
          handleChange={() => console.log("First")}
          placeholder=""
          otherStyles="mt-5"
          inputStyles="bg-gray-hover border border-gray-active"
        />
        <Pressable
          className="bg-green-light-hover w-fit p-3 rounded-lg text-center mt-2 flex-row items-center justify-center"
          disabled
        >
          <Text className="text-green-light-active text-lg">Convert</Text>
        </Pressable>
        <Text className="text-xs mt-1 text-center text-red-500 mb-14">
          Minimum of 500 credits can be converted
        </Text>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default RefillPage;
