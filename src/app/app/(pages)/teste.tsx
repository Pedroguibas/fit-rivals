import ThemedText from "@/components/ui/Theme/ThemedText";
import { useAppbar } from "@/contexts/AppbarContext";
import { usePathname } from "expo-router";
import { View } from "react-native";

const Teste = () => {
  const setAppbar = useAppbar();
  const pathname = usePathname();
  setAppbar(pathname, { title: "Teste" });

  return (
    <View>
      <ThemedText>Teste</ThemedText>
    </View>
  );
};

export default Teste;
