import { restorePasswordCheck, restorePasswordRequest } from "@/api/auth";
import Loading from "@/components/Loading";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import ThemedKeyboardAwareScrollView from "@/components/ui/Theme/ThemedKeyboardAwareScrollView";
import ThemedLink from "@/components/ui/Theme/ThemedLink";
import ThemedText from "@/components/ui/Theme/ThemedText";
import Colors from "@/constants/Colors";
import { useToast } from "@/contexts/ToastContext";
import { router, useLocalSearchParams } from "expo-router";
import { RefObject, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

const CodeInput = ({
  value,
  changeText,
  prev,
  next,
  ref,
}: {
  value: string;
  changeText: (text: string) => void;
  prev?: RefObject<TextInput | null>;
  next?: RefObject<TextInput | null>;
  ref: RefObject<TextInput | null>;
}) => {
  const [focus, setFocus] = useState(false);
  const handleChange = (text: string) => {
    if (!/^\d*$/.test(text)) return;

    changeText(text);
    if (text == "") {
      if (prev && prev.current) prev.current.focus();
    } else {
      if (next && next.current) next.current.focus();
      else if (ref && ref.current) ref.current.blur();
    }
  };

  return (
    <Pressable
      onPress={() => {
        if (ref.current) ref.current.focus();
      }}
      style={[styles.inputContainer, focus && styles.focusedInputContainer]}
    >
      <TextInput
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") handleChange("");
        }}
        ref={ref}
        value={value}
        keyboardType="numeric"
        style={styles.input}
        onChangeText={handleChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        maxLength={1}
      />
    </Pressable>
  );
};

const ConfirmCode = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
  const callToast = useToast();
  const [nums, setNums] = useState({
    n1: "",
    n2: "",
    n3: "",
    n4: "",
    n5: "",
    n6: "",
  });
  const ref1 = useRef<TextInput>(null);
  const ref2 = useRef<TextInput>(null);
  const ref3 = useRef<TextInput>(null);
  const ref4 = useRef<TextInput>(null);
  const ref5 = useRef<TextInput>(null);
  const ref6 = useRef<TextInput>(null);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [lastCode, setLastCode] = useState<string | undefined>(undefined);

  const handleResend = async () => {
    setResending(true);
    try {
      await restorePasswordRequest(email);

      callToast({
        variant: "success",
        title: "Código reenviado",
        message: "Verifique seu email",
      });
    } catch {
      callToast({
        variant: "danger",
        title: "Erro ao reenviar o código",
        message: "verifique o email e tente novamente",
      });
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const code = nums.n1 + nums.n2 + nums.n3 + nums.n4 + nums.n5 + nums.n6;

    if (code.length < 6) {
      callToast({
        variant: "danger",
        message: "Código inválido",
      });
      setLoading(false);
      return;
    }

    try {
      await restorePasswordCheck(email, code);

      router.replace({
        pathname: "/restorePassword/restorePasswordForm",
        params: { email },
      });
    } catch (e) {
      console.log(e);

      callToast({
        variant: "danger",
        title: "Código inválido",
        message: "Verifique se digitou corretamente",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedKeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Logo loginStyled />
      <View style={styles.inputsContainer}>
        <CodeInput
          ref={ref1}
          next={ref2}
          value={nums.n1}
          changeText={(text: string) =>
            setNums((prev) => ({ ...prev, n1: text }))
          }
        />
        <CodeInput
          prev={ref1}
          next={ref3}
          ref={ref2}
          value={nums.n2}
          changeText={(text: string) =>
            setNums((prev) => ({ ...prev, n2: text }))
          }
        />
        <CodeInput
          next={ref4}
          prev={ref2}
          ref={ref3}
          value={nums.n3}
          changeText={(text: string) =>
            setNums((prev) => ({ ...prev, n3: text }))
          }
        />
        <CodeInput
          prev={ref3}
          next={ref5}
          ref={ref4}
          value={nums.n4}
          changeText={(text: string) =>
            setNums((prev) => ({ ...prev, n4: text }))
          }
        />
        <CodeInput
          prev={ref4}
          next={ref6}
          ref={ref5}
          value={nums.n5}
          changeText={(text: string) =>
            setNums((prev) => ({ ...prev, n5: text }))
          }
        />
        <CodeInput
          prev={ref5}
          ref={ref6}
          value={nums.n6}
          changeText={(text: string) =>
            setNums((prev) => ({ ...prev, n6: text }))
          }
        />
      </View>
      <Button style={styles.button} onPress={handleSubmit}>
        {loading ? <Loading /> : <ThemedText>Confirmar</ThemedText>}
      </Button>
      <ThemedText variant="secondary" style={styles.paragraph}>
        Não recebeu o código? verifique se digitou o e-mail corretamente e envie
        novamente
      </ThemedText>
      <View style={styles.actions}>
        <ThemedLink href="..">voltar</ThemedLink>
        <Button
          onPress={handleResend}
          variant="neutral"
          style={{ paddingVertical: 8 }}
          disabled={resending || loading}
        >
          {resending ? (
            <Loading size={4} style={{ paddingHorizontal: 12 }} />
          ) : (
            <ThemedText>Reenviar</ThemedText>
          )}
        </Button>
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
  inputsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  inputContainer: {
    flex: 1,
    flexBasis: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.foregroundSecondary,
  },
  focusedInputContainer: {
    borderColor: Colors.primary,
  },
  input: {
    color: Colors.foreground,
    fontSize: 28,
  },
  button: {
    width: "100%",
    paddingVertical: 8,
  },
  paragraph: {
    textAlign: "center",
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ConfirmCode;
