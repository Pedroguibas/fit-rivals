import * as auth from "@/api/auth";
import { getSelf } from "@/api/users";
import { getToken, resetTokens, storeToken } from "@/helpers/tokens";
import { User } from "@/types/User";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export type AuthContextType = {
  user: User | null;
  refresh: () => Promise<void>;
  login: (user: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  initRefreshing: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initRefreshing, setInitRefreshing] = useState(true);

  useEffect(() => {
    const firstRefresh = async () => {
      setInitRefreshing(true);
      try {
        const token = await getToken("refresh");
        if (!token) {
          setInitRefreshing(false);
          setUser(null);
          return;
        }

        const newTokens = await auth.refresh(token);

        await storeToken("refresh", newTokens.refresh_token);
        await storeToken("access", newTokens.access_token);

        const u = await getSelf();

        setUser(u);
      } catch (e) {
        await resetTokens();
        console.log(e);
      } finally {
        setInitRefreshing(false);
      }
    };
    firstRefresh();
  }, []);

  const login = async (user: string, password: string) => {
    setLoading(true);
    try {
      const tokens = await auth.login(user, password);

      await storeToken("refresh", tokens.refresh_token);
      await storeToken("access", tokens.access_token);

      const u = await getSelf();

      setUser(u);
    } catch (e) {
      console.error(e);
      throw new Error("invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const refresh_token = await getToken("refresh");

      await auth.logout(refresh_token);
    } catch (e) {
      console.log(e);
    } finally {
      await resetTokens();
      setUser(null);
      setLoading(false);
    }
  };

  const refresh = async () => {
    setLoading(true);
    try {
      const refresh_token = await getToken("refresh");

      const tokens = await auth.refresh(refresh_token);

      await storeToken("refresh", tokens.refresh_token);
      await storeToken("access", tokens.access_token);
    } catch (e) {
      setUser(null);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, refresh, initRefreshing }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const ctxt = useContext(AuthContext);
  if (!ctxt) throw new Error("useAuth must be called inside AuthProvider");

  return ctxt;
};
