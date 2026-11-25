import ThemedText from "@/components/ui/Theme/ThemedText";
import { useAppbar } from "@/contexts/AppbarContext";
import { useLocalSearchParams, usePathname } from "expo-router";
import { View } from "react-native";

const Chat = () => {
  const pathname = usePathname();
  const setAppbar = useAppbar();
  const { groupId, groupName } = useLocalSearchParams();

  setAppbar(pathname, {
    title: groupName as string,
    dismissTo: `/app/group`,
    dismissParams: { groupId },
  });

  return (
    <View>
      <ThemedText>Chat</ThemedText>
    </View>
  );
};

export default Chat;
