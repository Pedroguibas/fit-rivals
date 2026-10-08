import ThemedSafeAreaView from "@/components/ui/Theme/ThemedSafeAreaView";
import Colors from "@/constants/Colors";
import { AppbarProvider } from "@/contexts/AppbarContext";
import { Stack } from "expo-router";

const AppLayout = () => {
  return (
    <ThemedSafeAreaView style={{ paddingVertical: 0, paddingHorizontal: 0 }}>
      <AppbarProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: Colors.background,
            },
          }}
        />
      </AppbarProvider>
    </ThemedSafeAreaView>
  );
};

export default AppLayout;
