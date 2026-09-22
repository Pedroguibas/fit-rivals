import GoogleButton from "@/components/GoogleButton";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ThemedKeyboardAwareScrollView from "@/components/ui/Theme/ThemedKeyboardAwareScrollView";
import ThemedLink from "@/components/ui/Theme/ThemedLink";
import ThemedText from "@/components/ui/Theme/ThemedText";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { router } from "expo-router";
import { CircleX, Lock, User } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const Login = () => {
  const [data, setData] = useState({
    user: "",
    password: "",
  });
  const callToast = useToast();
  let lastSubmitTryData: { user: string; password: string } | undefined =
    undefined;

  const { login } = useAuth();

  const handleChange = (name: "user" | "password", value: string) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (data == lastSubmitTryData) return;

    lastSubmitTryData = data;

    if (data.user == "" || data.password == "") {
      callToast({
        variant: "danger",
        icon: CircleX,
        title: "Erro no Login",
        message: "Os campos Usuário e Senha são obrigatórios.",
        activeTime: 3000,
      });

      return;
    }

    try {
      await login(data.user, data.password);

      router.replace("/app/");
    } catch {
      callToast({
        variant: "danger",
        icon: CircleX,
        title: "Erro no Login",
        message: "Credenciais inválidas.",
      });
    }
  };

  return (
    <ThemedKeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Logo loginStyled />
      <ThemedText fontSize={20} style={{ fontWeight: 700 }}>
        Login
      </ThemedText>
      <View style={styles.form}>
        <Input
          placeholder="Username ou Email"
          icon={User}
          value={data.user}
          onChangeText={(text) => handleChange("user", text)}
        />
        <View>
          <Input
            placeholder="Senha"
            type="password"
            icon={Lock}
            value={data.password}
            onChangeText={(text) => handleChange("password", text)}
          />
          <View style={styles.links}>
            <ThemedLink replace href="/signup" fontSize={12}>
              cadastre-se
            </ThemedLink>
            <ThemedLink href="/restorePassword/sendEmail" fontSize={12}>
              esqueceu sua senha?
            </ThemedLink>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <GoogleButton iconOnly style={styles.button} />
          <Button style={styles.button} onPress={handleSubmit}>
            <ThemedText>Login</ThemedText>
          </Button>
        </View>
      </View>
    </ThemedKeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
  },
  form: {
    width: "100%",
    gap: 24,
    paddingHorizontal: 16,
  },
  links: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    flexBasis: 0,
    paddingVertical: 6,
  },
});

export default Login;
