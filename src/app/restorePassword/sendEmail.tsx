import { restorePasswordRequest } from "@/api/auth";
import Loading from "@/components/Loading";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ThemedKeyboardAwareScrollView from "@/components/ui/Theme/ThemedKeyboardAwareScrollView";
import ThemedLink from "@/components/ui/Theme/ThemedLink";
import ThemedText from "@/components/ui/Theme/ThemedText";
import { useToast } from "@/contexts/ToastContext";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const RestorePassword = () => {
  const [email, setEmail] = useState("");
  const callToast = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const trimmed = email.trim();
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(trimmed)) {
      callToast({
        title: "Email inválido",
        message: "Digire um email válido para continuar",
        variant: "danger",
      });
      setLoading(false);
      return;
    }

    try {
      await restorePasswordRequest(trimmed);

      router.push({
        pathname: "/restorePassword/confirmCode",
        params: { email: trimmed },
      });
    } catch (e) {
      callToast({
        variant: "danger",
        title: "Erro ao enviar email",
        message: "tente novamente mais tarde",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedKeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Logo loginStyled />
      <ThemedText variant="secondary">
        Um código será enviado para o seu e-mail
      </ThemedText>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.actions}>
        <Button style={styles.button} onPress={handleSubmit} disabled={loading}>
          {loading ? <Loading /> : <ThemedText>Enviar Email</ThemedText>}
        </Button>
        <ThemedLink fontSize={12} href={".."}>
          cancelar
        </ThemedLink>
      </View>
    </ThemedKeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
    gap: 32,
  },
  button: {
    paddingVertical: 6,
    width: "100%",
  },
  actions: {
    width: "100%",
    gap: 8,
  },
});

export default RestorePassword;
