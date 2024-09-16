import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { router } from "expo-router";
import FormField from "@/components/FormField";
import Button from "@/components/CustomButton";
import icons from "@/constants/icons";

const RefillPage = () => {
  const handleRefillComplete = () => {
    router.push("/success");
  };

  const [amount, setAmount] = useState(0);
  const handleChange = (text: string) => {
    setAmount(parseInt(text) || 0);
  };
  return (
    <SafeAreaView className="h-screen p-3 w-full bg-background">
      <View className="w-full">
        <Text className="text-2xl font-semibold">Refill your tank</Text>
        <Text className="text-sm">
          Be able to buy a fuel using this following input
        </Text>
      </View>
      <View className=" w-full ">
        <Text className="text-lg font-semibold mt-3">Choose:</Text>
        <View className=" w-full flex-row space-2 justify-between pt-2">
          <TouchableOpacity className="p-3 rounded-md w-fit bg-gray-300">
            <Text className="font-medium">Enter Amount</Text>
          </TouchableOpacity>
          <Text className="text-sm italic ">or</Text>
          <TouchableOpacity className="flex flex-row p-3 w-fit bg-gray-300 rounded-md">
            <Text className="font-medium">Enter Liters</Text>
          </TouchableOpacity>
        </View>
        <View className="pt-5">
          <FormField
            label="Amount"
            value={amount.toString()}
            placeholder="Amount"
            handleChange={handleChange}
            otherStyles="w-full"
            inputStyles="bg-white border border-gray-active"
          />
        </View>

        <View className="w-full bg-background ">
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
        </View>
      </View>
      <View className="w-full align-baseline flex-1 justify-center items-center ">
        <Button
          title="Proces Payment"
          onPress={handleRefillComplete}
          icon={icons.arrowRight}
        />
        <Text className="text-xs mt-2">
          By continuing, you agree to the{" "}
          <Text className="text-accent ">terms and coniditions</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RefillPage;
