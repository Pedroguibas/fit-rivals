import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default RootLayout;
