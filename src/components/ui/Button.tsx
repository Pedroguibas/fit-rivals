import { Pressable, StyleSheet, type PressableProps } from "react-native";

export interface ButtonProps extends PressableProps {
  variant?: "primary" | "danger" | "confirm";
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
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  children: {
    color: "#FFFFFF",
  },
  primary: {
    backgroundColor: "#F03100",
  },
  danger: {
    backgroundColor: "#DC3545",
  },
  confirm: {
    backgroundColor: "#008000",
  },
});
