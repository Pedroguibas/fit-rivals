import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ThemedLink from "@/components/ui/Theme/ThemedLink";
import ThemedSafeAreaView from "@/components/ui/Theme/ThemedSafeAreaView";
import ThemedText from "@/components/ui/Theme/ThemedText";
import Logo from "@/contexts/Logo";
import { useToast } from "@/contexts/ToastContext";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const RestorePassword = () => {
  const [email, setEmail] = useState("");
  const callToast = useToast();

  const handleSubmit = () => {
    const trimmed = email.trim();
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(trimmed)) {
      callToast({
        title: "Email inválido",
        message: "Digire um email válido para continuar",
        variant: "danger",
      });
      return;
    }

    router.push({
      pathname: "/restorePassword/confirmCode",
      params: { email: trimmed },
    });
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
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
        <Button style={styles.button} onPress={handleSubmit}>
          <ThemedText>Enviar Email</ThemedText>
        </Button>
        <ThemedLink fontSize={12} href={".."}>
          cancelar
        </ThemedLink>
      </View>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
