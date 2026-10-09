import Appbar, { AppbarProps } from "@/components/Appbar";
import { usePathname } from "expo-router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { View } from "react-native";

type AppbarContextType = (path: string, settings: AppbarProps) => void;

const AppbarContext = createContext<AppbarContextType | undefined>(undefined);

export const AppbarProvider = ({ children }: PropsWithChildren) => {
  const [appbarProps, setAppbarProps] = useState<AppbarProps>({});
  const pathname = usePathname();
  const settingsMap = new Map<string, AppbarProps>();

  useEffect(() => {
    setAppbarProps(settingsMap.get(pathname) || {});
  }, [pathname]);

  const appendSettings = (path: string, settings: AppbarProps) => {
    settingsMap.set(path, settings);
  };

  return (
    <AppbarContext.Provider value={appendSettings}>
      <View style={{ flex: 1 }}>
        <Appbar {...appbarProps} />
        {children}
      </View>
    </AppbarContext.Provider>
  );
};

export const useAppbar = () => {
  const ctxt = useContext(AppbarContext);

  if (!ctxt) throw new Error("useAppbar must be called within AppbarProvider");

  return ctxt;
};
