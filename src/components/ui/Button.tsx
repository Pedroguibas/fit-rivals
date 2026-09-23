import Colors from "@/constants/Colors";
import { Pressable, StyleSheet, type PressableProps } from "react-native";

export interface ButtonProps extends PressableProps {
  variant?: "primary" | "danger" | "success" | "neutral";
}

export default function Button({
  children,
  variant = "primary",
  style,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      style={(state) => [
        styles.button,
        styles[variant],
        typeof style == "function" ? style(state) : style,
        props.disabled && { opacity: 0.8 },
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  children: {
    color: "#FFFFFF",
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  danger: {
    backgroundColor: Colors.danger,
  },
  success: {
    backgroundColor: Colors.success,
  },
  neutral: {
    backgroundColor: Colors.backgroundSecondary,
  },
});
