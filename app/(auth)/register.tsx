import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  EmitterSubscription,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import FormField from "@/components/FormField";
import Button from "@/components/CustomButton";
import { Link } from "expo-router";
import icons from "@/constants/icons";
import { createUser, checkActiveSession, logout } from "@/lib/appwrite";
export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerData, setRegisterData] = useState({
    names: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  const handleInputChange = (text: string, type: string) => {
    setRegisterData({ ...registerData, [type]: text.trim() });
  };

  const handleRegister = async () => {
    if (
      registerData.email === "" ||
      registerData.names === "" ||
      registerData.password === ""
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(
        registerData.email,
        registerData.password,
        registerData.names
      );

      router.replace("/(tabs)/refill");
    } catch (error) {
      console.error("Error in handleRegister:", error);
      const newError = error as any;
      Alert.alert("Error", newError.message || "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    let keyboardDidShowListener: EmitterSubscription;
    let keyboardDidHideListener: EmitterSubscription;

    if (Platform.OS === "ios") {
      keyboardDidShowListener = Keyboard.addListener(
        "keyboardWillShow",
        handleKeyboardShow
      );
      keyboardDidHideListener = Keyboard.addListener(
        "keyboardWillHide",
        handleKeyboardHide
      );
    } else {
      keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        handleKeyboardShow
      );
      keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        handleKeyboardHide
      );
    }

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleKeyboardShow = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const handleKeyboardHide = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-10">
            <Text className="text-3xl text-green-normal text-center font-bold">
              Smart Fuel Pump
            </Text>
            <Text className="text-center mt-2">
              Welcome to making the world a better place with less cost
            </Text>
          </View>

          <Text className="text-2xl font-bold text-center mb-5">REGISTER</Text>

          <FormField
            label="Names"
            handleChange={(e) => handleInputChange(e, "names")}
            value={registerData.names}
            placeholder="Names"
            otherStyles="mb-4"
            inputStyles="bg-gray-100 border border-gray-300"
          />
          <FormField
            label="Email"
            handleChange={(e) => handleInputChange(e, "email")}
            value={registerData.email}
            placeholder="Email"
            otherStyles="mb-4"
            inputStyles="bg-gray-100 border border-gray-300"
          />
          <FormField
            label="Password"
            handleChange={(e) => handleInputChange(e, "password")}
            value={registerData.password}
            placeholder="Password"
            otherStyles="mb-4"
            inputStyles="bg-gray-100 border border-gray-300"
          />
          <FormField
            label="Confirm Password"
            handleChange={(e) => handleInputChange(e, "confirmPassword")}
            value={registerData.confirmPassword}
            placeholder="Confirm Password"
            otherStyles="mb-6"
            inputStyles="bg-gray-100 border border-gray-300"
          />

          <Button
            onPress={handleRegister}
            title="Register"
            otherStyles="mb-4"
            icon={icons.UserRoundPlus}
            disabled={isSubmitting}
          >
            {isSubmitting && <ActivityIndicator size="small" color="#fff" />}
          </Button>

          <View className="space-y-2 self-center">
            {/* <Text className="text-xs font-pRegular text-center self-center -my-1 text-red-500 ">
              This is error section
            </Text> */}
            <Text className="font-pRegular">
              Already have an account?{" "}
              <Link href="/login" className="text-green-600 font-semibold">
                Login
              </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
