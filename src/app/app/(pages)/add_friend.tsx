import { createFriendRequest } from "@/api/social";
import Loading from "@/components/Loading";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ThemedKeyboardAwareScrollView from "@/components/ui/Theme/ThemedKeyboardAwareScrollView";
import ThemedText from "@/components/ui/Theme/ThemedText";
import Colors from "@/constants/Colors";
import { useAppbar } from "@/contexts/AppbarContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import * as Clipboard from "expo-clipboard";
import { router, usePathname } from "expo-router";
import { Copy, UserPlus } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const AddFriend = () => {
  const [friend, setFriend] = useState("");
  const [loading, setLoading] = useState(false);
  const setAppbar = useAppbar();
  const callToast = useToast();
  setAppbar(usePathname(), {
    title: "Adicionar Amigo",
    dismissTo: "/app/social",
  });
  const { user } = useAuth();

  const handleSubmit = async () => {
    const friendCode = friend.trim();

    if (friendCode.length == 0) {
      callToast({
        variant: "danger",
        title: "Erro ao enviar pedido de amizade",
        message: "Campo obrigatório.",
      });
      return;
    }

    setLoading(true);
    try {
      await createFriendRequest(friend.trim());

      callToast({
        variant: "success",
        message: "Pedido de amizade enviado!",
      });
      router.back();
    } catch (e) {
      callToast({
        variant: "danger",
        title: "Erro ao enviar pedido de amizade",
        message: "Verifique as informações e tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = async () => {
    await Clipboard.setStringAsync(user?.friendCode ?? "");

    callToast({
      variant: "success",
      message: "Código copiado!",
    });
  };

  return (
    <ThemedKeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Input
        value={friend}
        placeholder="Username, Email ou código de amizade"
        onChangeText={(txt) => setFriend(txt)}
      />
      <View style={{ width: "100%", alignItems: "center", gap: 12 }}>
        <ThemedText fontSize={24} style={{ fontWeight: 700 }}>
          {user?.friendCode}
        </ThemedText>
        <Button
          variant="neutral"
          style={styles.copyButton}
          onPress={handleCopyCode}
        >
          <Copy size={16} color={Colors.foreground} />
          <ThemedText>Copiar</ThemedText>
        </Button>
      </View>
      <Button
        onPress={handleSubmit}
        disabled={loading}
        style={styles.submitButton}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            <UserPlus color={Colors.foreground} />
            <ThemedText fontSize={20}>Adicionar Amigo</ThemedText>
          </>
        )}
      </Button>
    </ThemedKeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  submitButton: {
    width: "100%",
    paddingVertical: 8,
    gap: 8,
  },
  copyButton: {
    width: "100%",
    gap: 8,
  },
});

export default AddFriend;
