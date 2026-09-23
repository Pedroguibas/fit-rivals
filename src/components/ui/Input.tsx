import { Eye, EyeOff, LucideIcon } from "lucide-react-native";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export interface InputProps extends Omit<
  Omit<TextInputProps, "children">,
  "style"
> {
  type?: "text" | "number" | "email" | "password";
  icon?: LucideIcon;
  style?: ViewStyle;
  fontSize?: number;
}

export default function Input({
  type = "text",
  icon: Icon,
  style,
  fontSize = 16,
  onChangeText,
  ...props
}: InputProps) {
  const [focus, setFocus] = useState(false);
  const [showingPassword, setShowingPassword] = useState(true);

  const handleChangeNumber = onChangeText
    ? (text: string) => {
        if (/^\d*$/.test(text)) onChangeText(text);
      }
    : () => {};

  return (
    <View style={[styles.container, focus ? styles.focus : styles.blur, style]}>
      {Icon && <Icon color="#CCCCCC" size={fontSize + 4} />}
      <TextInput
        secureTextEntry={type == "password" && showingPassword}
        style={[styles.input, { fontSize }]}
        placeholderTextColor="#999"
        onChangeText={type == "number" ? handleChangeNumber : onChangeText}
        keyboardType={
          type == "number"
            ? "numeric"
            : type == "email"
              ? "email-address"
              : "default"
        }
        autoCapitalize="none"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...props}
      />
      {type == "password" && (
        <Pressable
          style={{ padding: 8 }}
          onPress={() => setShowingPassword((prev) => !prev)}
        >
          {showingPassword ? (
            <EyeOff color="#CCCCCC" size={16} />
          ) : (
            <Eye color="#CCCCCC" size={16} />
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 8,
    width: "100%",
    alignItems: "center",
  },
  input: {
    color: "#fff",
    width: "100%",
    flex: 1,
    paddingVertical: 8,
  },
  focus: {
    borderColor: "#F03100",
  },
  blur: {
    borderColor: "#CCCCCC",
  },
});
