import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/appwrite";
import { Models } from "react-native-appwrite";

// Define the shape of your context
interface GlobalContextType {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: Models.User<Models.Preferences> | null;
  setUser: React.Dispatch<
    React.SetStateAction<Models.User<Models.Preferences> | null>
  >;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value
const GlobalContext = createContext<GlobalContextType>({
  isLoading: true,
  isLoggedIn: false,
  user: null,
  setUser: () => {},
  setIsLoggedIn: () => {},
});


export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res); 
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => console.log('Error fetching user:', error))
      .finally(() => setIsLoading(false));
  }, []);

  const value: GlobalContextType = {
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
