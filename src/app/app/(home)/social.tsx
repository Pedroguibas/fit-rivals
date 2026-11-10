import FriendListItem from "@/components/FriendListItem";
import FriendRequestListItem from "@/components/FriendRequestListItem";
import LoadingScreen from "@/components/LoadingScreen";
import Chip from "@/components/ui/Chip";
import ThemedText from "@/components/ui/Theme/ThemedText";
import useFriendRequests from "@/hooks/useFriendRequests";
import useFriends from "@/hooks/useFriends";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const PendingTab = () => {
  const { data, isLoading } = useFriendRequests();

  if (isLoading) return <LoadingScreen />;

  if (!data || data.length == 0)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText>Nada por aqui...</ThemedText>
      </View>
    );

  return (
    <ScrollView>
      {data.map((d) => (
        <FriendRequestListItem key={d.id} request={d} />
      ))}
    </ScrollView>
  );
};

const FriendTab = () => {
  const { data, isLoading } = useFriends();

  if (isLoading) return <LoadingScreen />;

  if (!data || data.length == 0)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText>Lista de amigos vazia :(</ThemedText>
      </View>
    );

  return (
    <ScrollView>
      {data.map((d) => (
        <FriendListItem friend={d} key={d.id} />
      ))}
    </ScrollView>
  );
};

const renderTab = (tab: "friends" | "pending") => {
  if (tab == "friends") return <FriendTab />;

  return <PendingTab />;
};

const Social = () => {
  const [tab, setTab] = useState<"friends" | "pending">("friends");

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.chipsContainer}>
        <Chip
          onPress={() => setTab("friends")}
          value={tab == "friends"}
          label="Amigos"
          style={styles.chip}
        />
        <Chip
          onPress={() => setTab("pending")}
          value={tab == "pending"}
          label="Pendentes"
          style={styles.chip}
        />
      </View>
      {renderTab(tab)}
    </View>
  );
};

const styles = StyleSheet.create({
  chipsContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 8,
  },
  chip: {
    flex: 1,
  },
});

export default Social;
