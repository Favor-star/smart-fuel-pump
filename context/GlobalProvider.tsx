import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/appwrite";
import { Models } from "react-native-appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// Define the shape of your context
interface GlobalContextType {
  ipAddress: string;
  isLoading: boolean;
  isLoggedIn: boolean;
  user: Models.User<Models.Preferences> | null;
  setUser: React.Dispatch<
    React.SetStateAction<Models.User<Models.Preferences> | null>
  >;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIpAddress: React.Dispatch<React.SetStateAction<string>>;
  accountBalance: number;
  addToAccount: (amount: number) => Promise<void>;
  deductFromAccount: (amount: number) => Promise<void>;
}

// Create the context with a default value
const GlobalContext = createContext<GlobalContextType>({
  accountBalance: 0,
  addToAccount: async (amount = 0) => Promise.resolve(),
  deductFromAccount: async (amount = 0) => Promise.resolve(),
  ipAddress: "",
  isLoading: true,
  isLoggedIn: false,
  user: null,
  setUser: () => {},
  setIsLoggedIn: () => {},
  setIpAddress: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ipAddress, setIpAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [accountBalance, setAccountBalance] = useState(0);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsLoggedIn(true);
        } else {
          const currentUser = await getCurrentUser();
          if (currentUser) {
            setUser(currentUser as unknown as Models.User<Models.Preferences>);
            setIsLoggedIn(true);
            await AsyncStorage.setItem("user", JSON.stringify(currentUser));
          }
        }
      } catch (error) {
        console.error("Error checking user session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserSession();

    const loadAccountBalance = async () => {
      try {
        const balance = await AsyncStorage.getItem("accountBalance");
        if (balance) {
          setAccountBalance(parseFloat(balance));
        }
      } catch (error) {
        console.error("Error loading account balance:", error);
      }
    };
    loadAccountBalance();
  }, []);

  const addToAccount = async (amount: number) => {
    try {
      const newBalance = accountBalance + amount;
      await AsyncStorage.setItem("accountBalance", newBalance.toString());
      setAccountBalance(newBalance);
      Alert.alert("Success", "Amount added to account successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to refill amount. Please try again");
      console.error("Error adding to account:", error);
    }
  };
  const deductFromAccount = async (amount: number) => {
    try {
      const newBalance = accountBalance - amount;
      AsyncStorage.setItem("accountBalance", newBalance.toString());
      setAccountBalance(newBalance);
    } catch (error) {
      Alert.alert("Error", "Failed to deduct amount. Please try again");
      console.error("Error deducting from account:", error);
    }
  };
  const value: GlobalContextType = {
    ipAddress,
    setIpAddress,
    isLoading,
    isLoggedIn,
    user,
    setUser,
    setIsLoggedIn,
    accountBalance,
    addToAccount,
    deductFromAccount,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
