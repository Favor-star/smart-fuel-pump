import { useCallback, useId, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import FormField from "@/components/FormField";
import Button from "@/components/CustomButton";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Alert } from "react-native";
import { useEffect } from "react";
import { createFuel } from "@/lib/appwrite";
import { ActivityIndicator } from "react-native";
import { generateToken } from "@/lib";
import { ImageIcon } from "@/components/CustomButton";

const RefillPage = () => {
  const [isUsingL, setIsUsingL] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [equivalent, setEquivalent] = useState(0);
  const [value, setValue] = useState("");
  const { isLoading, isLoggedIn, user } = useGlobalContext();

  const priceInfo = useMemo(() => {
    const numValue = Number(value);
    return {
      price: 1200,
      amount: isUsingL ? equivalent : numValue,
      liters: isUsingL ? numValue : equivalent,
      total: numValue * 1000,
    };
  }, [isUsingL, value, equivalent]);

  const handleRefillComplete = async () => {
    if (isSubmitting) return;
    const { userId } = user as any;
    if (isUsingL) {
      if (priceInfo.liters <= 0) {
        Alert.alert("Error", "Please enter a valid liters");
        return;
      }
    } else {
      if (priceInfo.amount <= 0) {
        Alert.alert("Error", "Please enter valid amount");
        return;
      }
    }
    setIsSubmitting(true);
    try {
      const result = await createFuel(
        priceInfo.amount,
        priceInfo.liters,
        priceInfo.price,
        userId
      );

      const token = generateToken(priceInfo.liters);
      router.replace({
        pathname: "/success",
        params: { token, liters: priceInfo.liters },
      });
    } catch (error) {
      const newError = error as any;
      Alert.alert("Error", newError.message || "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleValueInput = useCallback(
    (newValue: string) => {
      setValue(newValue);
    },
    [isUsingL, value]
  );

  const toggleIsUsingL = (value: boolean) => {
    setIsUsingL(value);
    setValue("");
  };
  useEffect(() => {
    const amountVal = priceInfo.liters * priceInfo.price;
    const literVal = (priceInfo.amount / priceInfo.price).toFixed(2);
    setEquivalent(
      isUsingL
        ? priceInfo.liters * priceInfo.price
        : Number((priceInfo.amount / priceInfo.price).toFixed(2))
    );
  }, [priceInfo]);

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
        <View className=" w-full flex-row space-2 justify-between items-center pt-2">
          <TouchableOpacity
            className={`p-3 rounded-md w-fit flex space-x-3 flex-row items-center justify-center ${
              isUsingL ? "bg-gray-300" : "bg-green-light-active "
            }`}
            onPress={() => toggleIsUsingL(false)}
          >
            <Text
              className={`${
                isUsingL ? "text-black" : "text-green-normal"
              } font-pSemiBold`}
            >
              Enter Amount
            </Text>
            {!isUsingL ? (
              <ImageIcon
                icon={icons.CircleCheck}
                style={{ width: 12, height: 12 }}
                tintColor="#00B341"
              />
            ) : (
              <ImageIcon
                icon={icons.Circle}
                style={{ width: 12, height: 12 }}
                tintColor="black"
              />
            )}
          </TouchableOpacity>
          <Text className="font-pRegular ">or</Text>
          <TouchableOpacity
            className={`p-3 rounded-md w-fit flex space-x-3  flex-row items-center justify-center ${
              isUsingL ? "bg-green-light-active " : "bg-gray-300"
            }`}
            onPress={() => toggleIsUsingL(true)}
          >
            <Text
              className={`${
                isUsingL ? "text-green-normal" : "text-black"
              } font-pSemiBold`}
            >
              Enter Liters
            </Text>
            {isUsingL ? (
              <ImageIcon
                icon={icons.CircleCheck}
                style={{ width: 12, height: 12 }}
                tintColor="#00B341"
              />
            ) : (
              <ImageIcon
                icon={icons.Circle}
                style={{ width: 8, height: 8 }}
                tintColor="black"
              />
            )}
          </TouchableOpacity>
        </View>
        {!isUsingL && (
          <View className="pt-5">
            <FormField
              label="Amount (RWF)"
              value={value}
              placeholder="Amount"
              handleChange={handleValueInput}
              otherStyles="w-full"
              inputStyles="bg-white border border-gray-active"
              isNumeric={true}
            />
          </View>
        )}
        {isUsingL && (
          <View className="pt-5">
            <FormField
              label="Liters"
              value={value}
              placeholder="Liters"
              handleChange={handleValueInput}
              otherStyles="w-full"
              inputStyles="bg-white border border-gray-active"
              isNumeric={true}
            />
          </View>
        )}

        <View className="w-full bg-background ">
          <Text className="text-lg font-semibold mt-3">
            Pricing Information:
          </Text>
          <View className="w-full p-4 bg-white rounded-xl  h-fit items-center justify-center">
            {!isUsingL && (
              <View className="w-full justify-between flex-row mb-2">
                <Text>Amount entered</Text>
                <Text className="font-semibold">{priceInfo.amount} RWF</Text>
              </View>
            )}
            {isUsingL && (
              <View className="w-full justify-between flex-row mb-2">
                <Text className="font-pRegular">Liters entered</Text>
                <Text className="font-semibold">{priceInfo.liters} L</Text>
              </View>
            )}
            <View className="w-full justify-between flex-row mb-2">
              <Text className="font-pRegular">Price per liter</Text>
              <Text className="font-pRegular">{priceInfo.price} RWF</Text>
            </View>
            <View className="w-full justify-between flex-row mb-2">
              <Text className="font-pRegular">Discount: (0%)</Text>
              <Text className="font-pRegular">0.00 RWF</Text>
            </View>
            {/* <View className="w-full justify-between flex-row mb-2">
              <Text className="font-pRegular">Total</Text>
              <Text className="font-semibold">{priceInfo.total} RWF</Text>
            </View> */}
          </View>
        </View>
        <View className="w-full rounded-xl bg-white mt-5 p-3 justify-between flex-row">
          <Text className="font-pSemiBoldItalic text-green-dark">
            Total equivalent {isUsingL ? " amount " : "liters"}
          </Text>
          <Text
            style={{ fontFamily: "Poppins-Bold" }}
            className="text-green-dark"
          >
            {isUsingL
              ? `${priceInfo.liters * priceInfo.price} RWF`
              : `${(priceInfo.amount / priceInfo.price).toFixed(2)} L`}
          </Text>
        </View>
      </View>
      <View className="w-full align-baseline flex-1 justify-center items-center ">
        <Button
          title="Proces Payment"
          onPress={handleRefillComplete}
          icon={icons.MoveRight}
          disabled={isSubmitting}
        >
          {isSubmitting && <ActivityIndicator size="small" color="#fff" />}
        </Button>
        <Text className="text-xs mt-2">
          By continuing, you agree to the{" "}
          <Text className="text-accent ">terms and coniditions</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RefillPage;
