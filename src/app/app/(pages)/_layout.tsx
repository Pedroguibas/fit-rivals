import ThemedSafeAreaView from "@/components/ui/Theme/ThemedSafeAreaView";
import ThemedStack from "@/components/ui/Theme/ThemedStack";
import { AppbarProvider } from "@/contexts/AppbarContext";

const PagesLayout = () => {
  return (
    <ThemedSafeAreaView>
      <AppbarProvider>
        <ThemedStack />
      </AppbarProvider>
    </ThemedSafeAreaView>
  );
};

export default PagesLayout;
