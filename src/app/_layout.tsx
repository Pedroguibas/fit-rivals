import Colors from "@/constants/Colors";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  return (
    <AuthProvider>
      <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
        <ToastProvider>
          <SafeAreaProvider>
            <StatusBar style="light" />
            <RootNav />
          </SafeAreaProvider>
        </ToastProvider>
      </KeyboardProvider>
    </AuthProvider>
  );
};

const RootNav = () => {
  const { user, initRefreshing } = useAuth();

  useEffect(() => {
    if (!initRefreshing) SplashScreen.hideAsync();
  }, [initRefreshing]);

  if (initRefreshing) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="app" />
      </Stack.Protected>

      <Stack.Protected guard={!user}>
        <Stack.Screen name="index" />
        <Stack.Screen name="restorePassword/confirmCode" />
        <Stack.Screen name="restorePassword/sendEmail" />
        <Stack.Screen name="restorePassword/restorePasswordForm" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  );
};

export default RootLayout;
