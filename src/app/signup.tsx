import GoogleButton from "@/components/GoogleButton";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ThemedLink from "@/components/ui/Theme/ThemedLink";
import ThemedText from "@/components/ui/Theme/ThemedText";
import Colors from "@/constants/Colors";
import { Lock, Mail, User } from "lucide-react-native";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Signup = () => {
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
    </KeyboardAwareScrollView>
  );
};

const screenW = Dimensions.get("window").width;
const logoW = screenW * 0.5;
const LOGO_RATIO = 933 / 266;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
    gap: 32,
  },
  logo: {
    width: logoW,
    height: logoW / LOGO_RATIO,
    resizeMode: "contain",
    padding: 0,
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
