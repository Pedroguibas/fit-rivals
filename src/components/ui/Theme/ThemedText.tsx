import Colors from "@/constants/Colors";
import { Text, type TextProps } from "react-native";

export interface ThemedTextProps extends TextProps {
  variant?: "primary" | "secondary" | "tertiary";
  fontSize?: number;
}

const ThemedText = ({
  variant = "primary",
  fontSize = 16,
  style,
  ...props
}: ThemedTextProps) => {
  return (
    <Text
      style={[
        {
          color:
            variant == "primary"
              ? Colors.foreground
              : variant == "secondary"
                ? Colors.foregroundSecondary
                : Colors.foregroundTertiary,
          fontSize: fontSize,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedText;
