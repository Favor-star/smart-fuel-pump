import { Client, Account, ID, Databases, Query } from "react-native-appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = {
  platformId: "com.favour.smartFuelPump",
  projectId: "66e98ac8002c7a9646d8",
  endpoint: "https://cloud.appwrite.io/v1",
  databaseId: "66e98c30001a06ed92bc",
  usersCollectionId: "66e98d010003962d7388",
  fuelCollectionId: "66e98d8e000f329d2fe3",
  accountCollectionId: "66ec5b460011cbf93574",
  storageId: "66e9907f000357a35dfd",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platformId);

const account = new Account(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("User can't be created. Please try again");

    const newUser = await databases.createDocument(
      config.databaseId,
      config.usersCollectionId,
      ID.unique(),
      {
        userId: newAccount.$id,
        email: email,
        password: password,
        names: username,
      }
    );
    if (!newUser) throw new Error("User can't be created. Please try again");
    await signin(email, password);
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const signin = async (email, password) => {
  try {
    const sessionResult = await checkActiveSession();
    console.log("Session result are: ", sessionResult);

    // If a session exists, just set the user in AsyncStorage
    if (sessionResult) {
      const user = await getCurrentUser();
      await AsyncStorage.setItem("user", JSON.stringify(user));
      console.log("User already signed in:", user);
      return sessionResult; // Return the existing session
    }

    // If no session exists, create a new session
    const session = await account.createEmailPasswordSession(email, password);
    const user = await getCurrentUser();
    await AsyncStorage.setItem("user", JSON.stringify(user));
    console.log("This is the user I need:", user);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  const currentAccount = await account.get();

  const currentUser = await databases.listDocuments(
    config.databaseId,
    config.usersCollectionId,
    [Query.equal("userId", currentAccount.$id)]
  );
  if (!currentUser) throw Error;
  console.log("Current User: ", currentUser.documents[0]);
  return currentUser.documents[0];
};
export const checkActiveSession = async () => {
  try {
    const session = await account.getSession("current");
    return session;
  } catch (error) {
    return null;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
    console.log(AsyncStorage.getItem("user"));
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
export const createFuel = async (amount, liters, unitPrice, userId) => {
  try {
    const result = await databases.createDocument(
      config.databaseId,
      config.fuelCollectionId,
      ID.unique(),
      { amount, liters, unitPrice, userId }
    );
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const getFuel = async () => {
  try {
    const currentAccount = await account.get();
    const result = await databases.listDocuments(
      config.databaseId,
      config.fuelCollectionId,
      [Query.equal("userId", currentAccount.$id)]
    );
    if (!result) throw new Error("Fuel List could not be fetched successfully");
    console.log(result.documents);
    return result.documents;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
