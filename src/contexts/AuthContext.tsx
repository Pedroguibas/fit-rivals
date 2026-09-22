import * as auth from "@/api/auth";
import { Payload } from "@/types/Payload";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export type AuthContextType = {
  user: Payload | null;
  refresh: () => Promise<void>;
  login: (user: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  const getTokens = async (): Promise<{
    access_token: String;
    refresh_token: string;
  }> => {
    const tokens = await AsyncStorage.getItem("tokens");

    if (!tokens) throw new Error("No tokens stored");
    return JSON.parse(tokens);
  };

  const storeTokens = async (tokens: {
    access_token: String;
    refresh_token: string;
  }) => {
    await AsyncStorage.setItem("tokens", JSON.stringify(tokens));
  };

  const login = async (user: string, password: string) => {
    setLoading(true);
    try {
      const tokens = await auth.login(user, password);

      await storeTokens(tokens);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const { refresh_token } = await getTokens();

      await auth.logout(refresh_token);

      await AsyncStorage.removeItem("tokens");
    } catch (e) {
      setUser(null);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    setLoading(true);
    try {
      const { refresh_token } = await getTokens();

      const tokens = await auth.refresh(refresh_token);

      await storeTokens(tokens);
    } catch (e) {
      setUser(null);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, refresh }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const ctxt = useContext(AuthContext);
  if (!ctxt) throw new Error("useAuth must be called inside AuthProvider");

  return ctxt;
};
