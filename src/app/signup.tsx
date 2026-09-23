import { createUser, emailExists, usernameExists } from "@/api/users";
import GoogleButton from "@/components/GoogleButton";
import Loading from "@/components/Loading";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ThemedKeyboardAwareScrollView from "@/components/ui/Theme/ThemedKeyboardAwareScrollView";
import ThemedLink from "@/components/ui/Theme/ThemedLink";
import ThemedText from "@/components/ui/Theme/ThemedText";
import { useToast } from "@/contexts/ToastContext";
import { CreateUserRequest } from "@/types/requests/CreateUserRequest";
import { router } from "expo-router";
import { Lock, Mail, User } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const callToast = useToast();

  const handleChange = (key: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateData = async (): Promise<CreateUserRequest | null> => {
    const trimmed = {
      name: data.name.trim(),
      username: data.username.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
      confirm: data.confirm.trim(),
    };

    if (
      !(
        trimmed.password &&
        trimmed.confirm &&
        trimmed.email &&
        trimmed.name &&
        trimmed.username
      )
    ) {
      callToast({
        variant: "danger",
        title: "Erro ao criar conta",
        message: "Preencha todos os campos",
      });
      return null;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(trimmed.email)) {
      callToast({
        variant: "danger",
        title: "Erro ao criar conta",
        message: "Email inválido",
      });
      return null;
    }

    const emailInUse = await emailExists(trimmed.email);
    if (emailInUse) {
      callToast({
        variant: "danger",
        title: "Erro ao criar conta",
        message: "Email já cadastrado",
      });
      return null;
    }

    const usernameInUse = await usernameExists(trimmed.username);
    if (usernameInUse) {
      callToast({
        variant: "danger",
        title: "Erro ao criar conta",
        message: "Username já cadastrado",
      });
      return null;
    }

    if (trimmed.password.length < 8) {
      callToast({
        variant: "danger",
        title: "Erro ao criar conta",
        message: "A senha deve conter ao menos 8 caractéres.",
      });
      return null;
    }

    if (trimmed.password != trimmed.confirm) {
      callToast({
        variant: "danger",
        title: "Erro ao criar conta",
        message: "As senhas não coincidem",
      });
      return null;
    }
    return {
      name: trimmed.name,
      username: trimmed.username,
      email: trimmed.email,
      password: trimmed.password,
    };
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const validated = await validateData();
      if (!validated) return;

      await createUser({
        name: validated.name,
        username: validated.username,
        email: validated.email,
        password: validated.password,
      });

      router.replace({
        pathname: "/login",
        params: { email: validated.email },
      });
    } catch (e) {
      callToast({
        variant: "danger",
        title: "Erro ao criar conta",
        message: "Tente novamente mais tarde",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedKeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Logo loginStyled />
      <ThemedText fontSize={20} style={{ fontWeight: 700 }}>
        Cadastre-se
      </ThemedText>
      <View style={styles.form}>
        <Input
          value={data.name}
          onChangeText={(text) => handleChange("name", text)}
          icon={User}
          placeholder="Nome"
        />
        <Input
          value={data.username}
          onChangeText={(text) => handleChange("username", text)}
          icon={User}
          placeholder="Username"
        />
        <Input
          value={data.email}
          onChangeText={(text) => handleChange("email", text)}
          icon={Mail}
          type="email"
          placeholder="Email"
        />
        <Input
          value={data.password}
          onChangeText={(text) => handleChange("password", text)}
          icon={Lock}
          type="password"
          placeholder="Senha"
        />
        <View>
          <Input
            value={data.confirm}
            onChangeText={(text) => handleChange("confirm", text)}
            icon={Lock}
            type="password"
            placeholder="Confirme sua Senha"
          />
          <ThemedLink replace href={"/login"} fontSize={12} style={styles.link}>
            Entre com sua conta
          </ThemedLink>
        </View>
        <View style={styles.buttonsContainer}>
          <GoogleButton iconOnly style={styles.button} />
          <Button style={styles.button} onPress={handleSubmit}>
            {loading ? <Loading /> : <ThemedText>Criar conta</ThemedText>}
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
    paddingVertical: 80,
    gap: 32,
  },
  form: {
    width: "100%",
    gap: 24,
    paddingHorizontal: 16,
  },
  link: {
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

export default Signup;
