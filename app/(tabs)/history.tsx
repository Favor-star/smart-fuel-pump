import React, { useEffect, useMemo, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFuel } from "@/lib/appwrite";
import icons from "@/constants/icons";
import { ImageIcon } from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { StatusBar } from "expo-status-bar";

const HistoryPage = () => {
  const [fuelData, setFuelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [latest, setLatest] = useState<{ amount?: number; liters?: number }>(
    {}
  );
  const [error, setError] = useState(null);
  const { user } = useGlobalContext();

  const fetchFuelData = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const result = (await getFuel()).reverse();
      setLatest({ amount: result[0]?.amount, liters: result[0]?.liters });
      setFuelData(result as never[]);
    } catch (err) {
      const newError = err as any;
      setError(newError.message as any);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFuelData();
  }, [fetchFuelData]);

  const memoizedFuelList = useMemo(() => {
    return fuelData.map(({ amount, liters, $createdAt }, index) => ({
      amount,
      liters,
      date: new Date($createdAt).toLocaleDateString(),
      key: index.toString(),
    }));
  }, [fuelData]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00B341" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-3 bg-background">
      <View className="mb-5">
        <Text className="text-2xl font-pSemiBold">Payment history</Text>
        <Text className="text-sm font-pRegular">
          You can manage your payments here
        </Text>
      </View>
      <View className="w-full bg-background ">
        <Text className="text-lg font-pSemiBold mt-3 ">Quick Info:</Text>
        <View className="w-full p-4 bg-white rounded-xl  h-fit items-center justify-center">
          <View className="w-full justify-between flex-row mb-2">
            <Text className="font-pRegular">Amount:</Text>
            <Text className="font-pSemiBold">{latest.amount}</Text>
          </View>
          <View className="w-full justify-between flex-row mb-2">
            <Text className="font-pRegular">Eq. litters</Text>
            <Text className="font-pSemiBold">{latest.liters} </Text>
          </View>
          <View className="self-start">
            <Text className="text-xs self-start justify-self-start font-pRegular">
              N.B: This is the last refill you have made
            </Text>
          </View>
        </View>
      </View>
      <View className="w-full mb-4">
        <Text className="text-lg font-pSemiBold mt-3">Full History</Text>
        <Text className="text-sm font-pRegular">
          This contains the full list of all payments tha was done throught
          lifetime
        </Text>
      </View>
      <FlatList
        data={memoizedFuelList}
        renderItem={({ item }) => (
          <HistoryItem
            no={parseInt(item.key) + 1}
            liters={item.liters as number}
            date={item.date}
            amount={item.amount as number}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex-row justify-between mb-3">
            <Text className="font-pSemiBold flex-1">No:</Text>
            <Text className="font-pSemiBold flex-1">Amount(RWF)</Text>
            <Text className="font-pSemiBold flex-1">Date</Text>
            <Text className="font-pSemiBold flex-1">Liters</Text>
            <Text className="font-pSemiBold">{""}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text className="text-center mt-5">No fuel history available.</Text>
        )}
      />
      {/* <View className="mt-5">
        <Text className="text-lg font-semibold mb-3">Actions:</Text>
        <View className="flex-row space-x-3">
          <TouchableOpacity className="flex-row flex-1 items-center justify-center space-x-1 p-3 bg-green-normal rounded-lg">
            <Text className="text-white font-pMedium">Export to Excel</Text>
            <ImageIcon icon={icons.FileSpreadsheet} />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row flex-1 items-center justify-center space-x-1 p-3 bg-red-500 rounded-lg">
            <Text className="text-white font-pMedium">Clear All</Text>
            <ImageIcon icon={icons.Delete} tintColor="white" />
          </TouchableOpacity>
        </View>
      </View> */}
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

const HistoryItem = ({ no, amount, date, liters }: historyItemProps) => (
  <View className="flex-row justify-between mb-2 items-center">
    <Text className="flex-1 font-pRegular">{no}</Text>
    <Text className="flex-1 font-pRegular">{amount}</Text>
    <Text className="flex-1 font-pRegular">{date}</Text>
    <Text className="flex-1 font-pRegular">{liters}</Text>
    <ImageIcon
      icon={icons.Trash2}
      tintColor="black"
      style={{ width: 20, height: 20 }}
    />
  </View>
);

export default HistoryPage;

interface historyItemProps {
  no: number;
  amount: number;
  date: string;
  liters: number;
}
