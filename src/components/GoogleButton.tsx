import { Image, StyleSheet, Text } from "react-native";
import Button, { ButtonProps } from "./ui/Button";

export interface GoogleButtonProps extends ButtonProps {
  iconOnly?: boolean;
}

const GoogleButton = ({
  style,
  iconOnly = false,
  ...props
}: GoogleButtonProps) => {
  return (
    <Button
      style={(state) => [
        styles.button,
        typeof style == "function" ? style(state) : style,
      ]}
      {...props}
    >
      <Image
        style={styles.icon}
        source={require("@/assets/icons/google.png")}
      />
      {!iconOnly && <Text style={{ fontSize: 18 }}>Join with Google</Text>}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFFFFF",
    gap: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default GoogleButton;
