import Button from "@/components/ui/Button";
import ThemedText from "@/components/ui/Theme/ThemedText";
import Colors from "@/constants/Colors";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundImageContainer}>
        <Image
          style={styles.backgroundImage}
          source={require("@/assets/images/landing_bg.png")}
        />
      </View>
      <Button style={styles.button}>
        <ThemedText fontSize={18}>Get Started</ThemedText>
      </Button>
      <Button style={[styles.button, styles.googleButton]}>
        <Image
          style={styles.googleIcon}
          source={require("@/assets/icons/google.png")}
        />
        <Text style={{ fontSize: 18 }}>Join with Google</Text>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  backgroundImageContainer: {
    position: "absolute",
    zIndex: -1,
    top: 0,
    bottom: 0,
  },
  backgroundImage: {
    resizeMode: "contain",
    height: "100%",
  },
  chipContainer: {
    flexDirection: "row",
    gap: 4,
  },
  button: {
    width: "100%",
    paddingVertical: 10,
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    gap: 8,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
});
