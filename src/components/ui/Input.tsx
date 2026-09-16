import { ReactNode, useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export interface InputProps extends Omit<
  Omit<TextInputProps, "children">,
  "style"
> {
  type?: "text" | "number" | "email" | "password";
  icon?: ReactNode;
  style?: ViewStyle;
}

export default function Input({
  type = "text",
  icon,
  style,
  onChangeText,
  ...props
}: InputProps) {
  const [focus, setFocus] = useState(false);

  const handleChangeNumber = onChangeText
    ? (text: string) => {
        if (/^\d*$/.test(text)) onChangeText(text);
      }
    : () => {};

  return (
    <View style={[styles.container, focus ? styles.focus : styles.blur, style]}>
      {icon}
      <TextInput
        secureTextEntry={type == "password"}
        style={styles.input}
        placeholderTextColor="#999"
        onChangeText={type == "number" ? handleChangeNumber : onChangeText}
        keyboardType={
          type == "number"
            ? "numeric"
            : type == "email"
              ? "email-address"
              : "default"
        }
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  input: {
    color: "#fff",
    flex: 1,
  },
  focus: {
    borderColor: "#F03100",
  },
  blur: {
    borderColor: "#999",
  },
});
