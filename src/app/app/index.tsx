import Button from "@/components/ui/Button";
import ThemedSafeAreaView from "@/components/ui/Theme/ThemedSafeAreaView";
import ThemedText from "@/components/ui/Theme/ThemedText";
import { useAuth } from "@/contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const Home = () => {
  const { user, logout } = useAuth();
  const [tokens, setTokens] = useState("");

  useEffect(() => {
    const getTokens = async () => {
      const t = await AsyncStorage.getItem("tokens");
      setTokens(t ?? "nao logado");
    };
    getTokens();
  }, []);

  return (
    <ThemedSafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ThemedText>{tokens}</ThemedText>
      <Button
        onPress={async () => {
          await logout();
          router.replace("/");
        }}
        variant="danger"
      >
        <ThemedText>logout</ThemedText>
      </Button>
    </ThemedSafeAreaView>
  );
};

export default Home;
