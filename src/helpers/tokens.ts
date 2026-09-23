import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async (t: "refresh" | "access"): Promise<string> => {
  const token = await AsyncStorage.getItem(`${t}_token`);

  if (!token) throw new Error(`No ${t}_token stored`);
  return token;
};

export const storeToken = async (t: "refresh" | "access", token: string) => {
  await AsyncStorage.setItem(`${t}_token`, token);
};

export const resetTokens = async () => {
  await AsyncStorage.removeItem("refresh_token");
  await AsyncStorage.removeItem("access_token");
};
