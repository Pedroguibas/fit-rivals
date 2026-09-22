import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ThemedKeyboardAwareScrollView from "@/components/ui/Theme/ThemedKeyboardAwareScrollView";
import ThemedLink from "@/components/ui/Theme/ThemedLink";
import ThemedText from "@/components/ui/Theme/ThemedText";
import { useToast } from "@/contexts/ToastContext";
import { useLocalSearchParams } from "expo-router";
import { CircleX } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const RestorePasswordForm = () => {
  const { email } = useLocalSearchParams<{
    email: string;
  }>();
  const [data, setData] = useState({
    password: "",
    confirm: "",
  });
  const callToast = useToast();

  const handleSubmit = () => {
    if (data.password.length < 8) {
      callToast({
        icon: CircleX,
        message: "A senha deve ter ao menos 8 dígitos",
        variant: "danger",
        activeTime: 3000,
      });
      return;
    }

    if (data.password != data.confirm) {
      callToast({
        icon: CircleX,
        message: "As senhas não coincidem",
        variant: "danger",
        activeTime: 3000,
      });
      return;
    }
  };

  return (
    <ThemedKeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Logo loginStyled />
      <Input type="password" value={data.password} placeholder="Nova senha" />
      <Input
        type="password"
        value={data.confirm}
        placeholder="Confirme a nova senha"
      />
      <View style={{ width: "100%", gap: 8 }}>
        <Button style={styles.button}>
          <ThemedText>Confirmar</ThemedText>
        </Button>
        <ThemedLink href="/login" fontSize={12}>
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
    width: "100%",
    paddingVertical: 6,
  },
});

export default RestorePasswordForm;
