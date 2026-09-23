import Button from "@/components/ui/Button";
import ThemedSafeAreaView from "@/components/ui/Theme/ThemedSafeAreaView";
import ThemedText from "@/components/ui/Theme/ThemedText";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <ThemedSafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ThemedText>{user ? user.name : "não logado"}</ThemedText>
      <Button
        onPress={async () => {
          await logout();
        }}
        variant="danger"
      >
        <ThemedText>logout</ThemedText>
      </Button>
    </ThemedSafeAreaView>
  );
};

export default Home;
