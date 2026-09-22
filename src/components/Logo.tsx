import { Dimensions, Image, ImageProps, StyleSheet } from "react-native";

interface LogoProps extends Omit<ImageProps, "source"> {
  loginStyled?: boolean;
}

const Logo = ({ loginStyled = false, style, ...props }: LogoProps) => {
  return (
    <Image
      style={styles.logo}
      {...props}
      source={require("@/assets/images/logo.png")}
    />
  );
};

const screenW = Dimensions.get("window").width;
const logoW = screenW * 0.5;
const LOGO_RATIO = 933 / 266;

const styles = StyleSheet.create({
  logo: {
    width: logoW,
    height: logoW / LOGO_RATIO,
    resizeMode: "contain",
    padding: 0,
  },
});

export default Logo;
