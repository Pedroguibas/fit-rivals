import Colors from "@/constants/Colors";
import { Link, type LinkProps } from "expo-router";

export interface ThemedLinkProps extends LinkProps {
  fontSize?: number;
}

const ThemedLink = ({ fontSize = 16, style, ...props }: ThemedLinkProps) => {
  return (
    <Link
      style={[
        { color: Colors.primary, textDecorationLine: "underline", fontSize },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedLink;
