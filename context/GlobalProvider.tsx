import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/appwrite";
import { Models } from "react-native-appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
}

// Create the context with a default value
const GlobalContext = createContext<GlobalContextType>({
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
  }, []);

  const value: GlobalContextType = {
    ipAddress,
    setIpAddress,
    isLoading,
    isLoggedIn,
    user,
    setUser,
    setIsLoggedIn,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
