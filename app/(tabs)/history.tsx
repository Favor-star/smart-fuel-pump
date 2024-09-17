import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { router } from "expo-router";
import FormField from "@/components/FormField";
import { Image } from "react-native";
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
        <Text className="text-2xl font-pSemiBold ">Payment history</Text>
        <Text className="text-sm font-pRegular">
          You can manage your payments here
        </Text>
      </View>
      <View className="w-full bg-background ">
        <Text className="text-lg font-pSemiBold mt-3 ">Quick Info:</Text>
        <View className="w-full p-4 bg-white rounded-xl  h-fit items-center justify-center">
          <View className="w-full justify-between flex-row mb-2">
            <Text className="font-pRegular">Amount:</Text>
            <Text className="font-pSemiBold">2000.00 RWF</Text>
          </View>
          <View className="w-full justify-between flex-row mb-2">
            <Text className="font-pRegular">Eq. litters</Text>
            <Text className="font-pSemiBold">50 </Text>
          </View>
          <View className="self-start">
            <Text className="text-xs self-start justify-self-start font-pRegular">
              N.B: This is the last refill you have made
            </Text>
          </View>
        </View>
      </View>
      <View className="w-full ">
        <Text className="text-lg font-pSemiBold mt-3">Full History</Text>
        <Text className="text-sm font-pRegular">
          This contains the full list of all payments tha was done throught
          lifetime
        </Text>
        <View className="w-full flex-row justify-between mt-5 mb-3">
          <Text className="font-pSemiBold flex-1">No:</Text>
          <Text className="font-pSemiBold  flex-1">Amount(RWF)</Text>
          <Text className="font-pSemiBold flex-1">Date</Text>
          <Text className="font-pSemiBold  flex-1">Liters</Text>
          <Text className="font-pSemiBold ">{""}</Text>
        </View>
        {historyList.map(({ amount, liters, date }, index) => (
          <HistoryItem
            key={index}
            no={index + 1}
            liters={liters}
            date={date}
            amount={amount}
          />
        ))}

        <TouchableOpacity className="text-center bg-green-light-active text-accent w-fit self-center mt-2 rounded-lg p-3">
          <Text className="text-accent font-pMedium">Load More</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full ">
        <Text className="text-lg font-semibold">Actions:</Text>
        <Text className="text-sm mb-3 font-pRegular">Manage actions here</Text>
        <View className="flex-row space-x-3 w-full">
          <TouchableOpacity className="flex-row flex-1 items-center justify-center space-x-1 p-3 bg-green-normal rounded-lg">
            <Text className="text-white font-pMedium ">Export to Excel</Text>
            <Image source={icons.excel} tintColor={"white"} />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row flex-1 items-center justify-center space-x-1 p-3 bg-red-500 rounded-lg">
            <Text className="text-white font-pMedium ">Clear All</Text>
            <Image source={icons.trash} tintColor={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default RefillPage;

interface HistoryItemProps {
  no: number;
  amount: number;
  date: string;
  liters: number;
}

const HistoryItem = ({ no, amount, date, liters }: HistoryItemProps) => {
  return (
    <View className="w-full flex-row justify-between mb-2 font-pRegular">
      <Text className="flex-1 font-pRegular">{no}</Text>
      <Text className="flex-1 font-pRegular">{amount}</Text>
      <Text className="flex-1 font-pRegular">{date}</Text>
      <Text className="flex-1 font-pRegular">{liters}</Text>
      <Image
        source={icons.trash}
        tintColor={"black"}
        style={{
          width: 20,
          height: 20,
          objectFit: "contain",
        }}
      />
    </View>
  );
};
const historyList = [
  {
    amount: 1200.0,
    date: "12/02/2024",
    liters: 50,
  },
  {
    amount: 1200,
    date: "12/02/2024",
    liters: 50,
  },
  {
    amount: 1200,
    date: "12/02/2024",
    liters: 50,
  },
  {
    amount: 1200,
    date: "12/02/2024",
    liters: 50,
  },
  {
    amount: 1200,
    date: "12/02/2024",
    liters: 50,
  },
  {
    amount: 1200,
    date: "12/02/2024",
    liters: 50,
  },
  {
    amount: 1200,
    date: "12/02/2024",
    liters: 50,
  },
  {
    amount: 1200,
    date: "12/02/2024",
    liters: 50,
  },
];
