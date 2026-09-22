import GoogleButton from "@/components/GoogleButton";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ThemedKeyboardAwareScrollView from "@/components/ui/Theme/ThemedKeyboardAwareScrollView";
import ThemedLink from "@/components/ui/Theme/ThemedLink";
import ThemedText from "@/components/ui/Theme/ThemedText";
import Logo from "@/contexts/Logo";
import { Lock, Mail, User } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

const Signup = () => {
  return (
    <ThemedKeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Logo loginStyled />
      <ThemedText fontSize={20} style={{ fontWeight: 700 }}>
        Cadastre-se
      </ThemedText>
      <View style={styles.form}>
        <Input icon={User} placeholder="Nome" />
        <Input icon={User} placeholder="Username" />
        <Input icon={Mail} type="email" placeholder="Email" />
        <Input icon={Lock} type="password" placeholder="Senha" />
        <View>
          <Input icon={Lock} type="password" placeholder="Confirme sua Senha" />
          <ThemedLink replace href={"/login"} fontSize={12} style={styles.link}>
            Entre com sua conta
          </ThemedLink>
        </View>
        <View style={styles.buttonsContainer}>
          <GoogleButton iconOnly style={styles.button} />
          <Button style={styles.button}>
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
