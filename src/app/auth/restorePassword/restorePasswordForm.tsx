import { restorePassword } from "@/api/auth";
import Loading from "@/components/Loading";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ThemedKeyboardAwareScrollView from "@/components/ui/Theme/ThemedKeyboardAwareScrollView";
import ThemedLink from "@/components/ui/Theme/ThemedLink";
import ThemedText from "@/components/ui/Theme/ThemedText";
import { useToast } from "@/contexts/ToastContext";
import { router, useLocalSearchParams } from "expo-router";
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (data.password.length < 8) {
      callToast({
        icon: CircleX,
        message: "A senha deve conter ao menos 8 caractéres",
        variant: "danger",
      });
      setLoading(false);
      return;
    }

    if (data.password != data.confirm) {
      callToast({
        icon: CircleX,
        message: "As senhas não coincidem",
        variant: "danger",
      });
      setLoading(false);
      return;
    }

    try {
      await restorePassword(email, data.password);

      router.replace({ pathname: "/login", params: { email } });
    } catch {
      callToast({
        variant: "danger",
        title: "Erro ao atualizar a senha",
        message: "tente novamente",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: "password" | "confirm", value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <ThemedKeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Logo loginStyled />
      <Input
        type="password"
        value={data.password}
        placeholder="Nova senha"
        onChangeText={(text) => handleChange("password", text)}
      />
      <Input
        type="password"
        value={data.confirm}
        placeholder="Confirme a nova senha"
        onChangeText={(text) => handleChange("confirm", text)}
      />
      <View style={{ width: "100%", gap: 8 }}>
        <Button style={styles.button} onPress={handleSubmit} disabled={loading}>
          {loading ? <Loading /> : <ThemedText>Confirmar</ThemedText>}
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
