import ThemedText from "@/components/ui/Theme/ThemedText";
import { useAppbar } from "@/contexts/AppbarContext";
import { Link, usePathname } from "expo-router";
import { View } from "react-native";

const AddPost = () => {
  const setAppbar = useAppbar();
  const pathname = usePathname();
  setAppbar(pathname, { title: "Postar" });

  return (
    <View>
      <ThemedText>Adicionar Post</ThemedText>
      <Link href="/app/teste">
        <ThemedText>teste</ThemedText>
      </Link>
    </View>
  );
};

export default AddPost;
