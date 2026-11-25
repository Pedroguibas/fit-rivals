import SelectUsers from "@/components/SelectUsers";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import ThemedText from "@/components/ui/Theme/ThemedText";
import { useAppbar } from "@/contexts/AppbarContext";
import { User } from "@/types/User";
import { router, usePathname } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const SelectGroupMembers = () => {
  const pathname = usePathname();
  const setAppbar = useAppbar();
  setAppbar(pathname, {
    title: "Criar Grupo",
    dismissTo: "/app/groups",
  });
  const [friends, setFriends] = useState<User[]>([]);

  const handlePress = () => {
    const friendsToInvite: string[] = [];
    friends.map((f) => friendsToInvite.push(f.id));

    router.push({
      pathname: "/app/(pages)/addGroup/finish",
      params: { friends: friendsToInvite },
    });
  };

  return (
    <>
      <View style={styles.container}>
        <ThemedText>Convide seus amigos</ThemedText>
        <SelectUsers users={friends} setUsers={setFriends} />
      </View>
      <FloatingActionButton icon={ArrowRight} onPress={handlePress} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default SelectGroupMembers;
