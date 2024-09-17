import { Client, Account, ID, Databases,Query } from "react-native-appwrite";

const config = {
  platformId: "com.favour.smartFuelPump",
  projectId: "66e98ac8002c7a9646d8",
  endpoint: "https://cloud.appwrite.io/v1",
  databaseId: "66e98c30001a06ed92bc",
  usersCollectionId: "66e98d010003962d7388",
  fuelCollectionId: "66e98d8e000f329d2fe3",
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

    await signin(email, password);
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
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const signin = async (email, password) => {
  try {
    const sessionResult = await checkActiveSession();
    if (sessionResult) await logout();
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  const currentAccount = await account.get();
  console.log("currentAccount: ", currentAccount);
  const currentUser = await databases.listDocuments(
    config.databaseId,
    config.usersCollectionId,
    [Query.equal("userId", currentAccount.$id)]
  );
  if (!currentUser) throw Error;
  console.log("currentUser:", currentUser);
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
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
