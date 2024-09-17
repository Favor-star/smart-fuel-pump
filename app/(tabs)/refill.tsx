import React, { useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import FormField from "@/components/FormField";
import Button from "@/components/CustomButton";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useEffect } from "react";
const RefillPage = () => {
  const [isUsingL, setIsUsingL] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { isLoading, isLoggedIn } = useGlobalContext();
  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
    console.log("isLoading", isLoading);
  }, [isLoading, isLoggedIn]);
  const priceInfo = useMemo(() => {
    const numValue = Number(value);
    return {
      price: 1200,
      amount: isUsingL ? 0 : numValue,
      liters: isUsingL ? numValue : 0,
      total: numValue * 1000,
    };
  }, [isUsingL, value]);

  const handleRefillComplete = useCallback(() => {
    router.push("/success");
  }, []);

  const handleValueInput = useCallback(
    (newValue: string) => {
      setValue(newValue);
      console.log(newValue, `${isUsingL ? "Liters" : "RWF"}`);
    },
    [isUsingL]
  );

  const toggleIsUsingL = useCallback(() => {
    setIsUsingL((prev) => !prev);
    setValue("");
  }, []);

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
            onPress={toggleIsUsingL}
          >
            <Text
              className={`${
                isUsingL ? "text-black" : "text-green-normal"
              } font-pSemiBold`}
            >
              Enter Amount
            </Text>
            {!isUsingL ? (
              <Image
                source={icons.checked}
                resizeMode="contain"
                className="w-4 h-4"
                tintColor={"#00B341"}
              />
            ) : (
              <Image
                source={icons.unchecked}
                resizeMode="contain"
                className="w-3 h-3"
              />
            )}
          </TouchableOpacity>
          <Text className="font-pRegular ">or</Text>
          <TouchableOpacity
            className={`p-3 rounded-md w-fit flex space-x-3 flex-row items-center justify-center ${
              isUsingL ? "bg-green-light-active " : "bg-gray-300"
            }`}
            onPress={toggleIsUsingL}
          >
            <Text
              className={`${
                isUsingL ? "text-green-normal" : "text-black"
              } font-pSemiBold`}
            >
              Enter Amount
            </Text>
            {isUsingL ? (
              <Image
                source={icons.checked}
                resizeMode="contain"
                className="w-4 h-4"
                tintColor={"#00B341"}
              />
            ) : (
              <Image
                source={icons.unchecked}
                resizeMode="contain"
                className="w-3 h-3"
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
              <Text className="font-pRegular">1000.00 RWF</Text>
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
