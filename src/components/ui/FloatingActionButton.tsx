import Colors from "@/constants/Colors";
import { LucideIcon, Plus } from "lucide-react-native";
import { PressableProps, StyleSheet } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import Button from "./Button";

interface FloatingActionButtonProps extends Omit<PressableProps, "children"> {
  icon?: LucideIcon;
}

const FloatingActionButton = ({
  icon: Icon = Plus,
  style,
  ...props
}: FloatingActionButtonProps) => {
  return (
    <KeyboardStickyView>
      <Button
        variant="neutral"
        style={(state) => [
          styles.button,
          typeof style == "function" ? style(state) : style,
        ]}
        {...props}
      >
        <Icon size={28} color={Colors.foreground} />
      </Button>
    </KeyboardStickyView>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 16,
    right: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 1000,
  },
});

export default FloatingActionButton;
