import { ToastProvider } from "@/contexts/ToastContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
      <ToastProvider>
        <SafeAreaProvider>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </SafeAreaProvider>
      </ToastProvider>
    </KeyboardProvider>
  );
};

export default RootLayout;
