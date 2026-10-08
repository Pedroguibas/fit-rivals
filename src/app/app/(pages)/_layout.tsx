import ThemedSafeAreaView from "@/components/ui/Theme/ThemedSafeAreaView";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router";

const AppLayout = () => {
  return (
    <ThemedSafeAreaView>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: Colors.background,
          },
        }}
      />
    </ThemedSafeAreaView>
  );
};

export default AppLayout;
