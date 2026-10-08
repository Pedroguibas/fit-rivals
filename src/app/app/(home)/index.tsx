import Button from "@/components/ui/Button";
import ThemedText from "@/components/ui/Theme/ThemedText";
import { useAuth } from "@/contexts/AuthContext";
import { View } from "react-native";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ThemedText>{user ? user.name : "não logado"}</ThemedText>
      <Button
        style={{ width: "100%" }}
        onPress={async () => {
          await logout();
        }}
        variant="danger"
      >
        <ThemedText>logout</ThemedText>
      </Button>
    </View>
  );
};

export default Home;
