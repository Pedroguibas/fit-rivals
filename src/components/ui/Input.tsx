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
}

export default function Input({
  type = "text",
  icon: Icon,
  style,
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
      {Icon && <Icon color="#CCCCCC" size={16} />}
      <TextInput
        secureTextEntry={type == "password" && showingPassword}
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
    alignItems: "center",
  },
  input: {
    color: "#fff",
    flex: 1,
    paddingVertical: 0,
  },
  focus: {
    borderColor: "#F03100",
  },
  blur: {
    borderColor: "#CCCCCC",
  },
});
