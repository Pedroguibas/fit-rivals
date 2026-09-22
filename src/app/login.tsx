import GoogleButton from "@/components/GoogleButton";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ThemedLink from "@/components/ui/Theme/ThemedLink";
import ThemedText from "@/components/ui/Theme/ThemedText";
import Colors from "@/constants/Colors";
import { useToast } from "@/contexts/ToastContext";
import { CircleX, Lock, User } from "lucide-react-native";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login = () => {
  const [data, setData] = useState({
    user: "",
    password: "",
  });
  const callToast = useToast();
  const [showFailMessage, setShowFailMessage] = useState(true);

  const handleChange = (name: "user" | "password", value: string) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      style={{ flex: 1, backgroundColor: Colors.background }}
      contentContainerStyle={styles.container}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <Image style={styles.logo} source={require("@/assets/images/logo.png")} />
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
            <ThemedLink replace href="/" fontSize={12}>
              cadastre-se
            </ThemedLink>
            <ThemedLink replace href="/" fontSize={12}>
              esqueceu sua senha?
            </ThemedLink>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <GoogleButton iconOnly style={styles.button} />
          <Button
            style={styles.button}
            onPress={() => {
              callToast({
                variant: "danger",
                icon: CircleX,
                title: "Erro no Login",
                message: "Credenciais inválidas",
              });
            }}
          >
            <ThemedText>Login</ThemedText>
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
  },
  logo: {
    width: "50%",
    height: "10%",
    resizeMode: "contain",
    padding: 0,
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
