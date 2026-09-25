import GoogleButton from "@/components/GoogleButton";
import Button from "@/components/ui/Button";
import ThemedSafeAreaView from "@/components/ui/Theme/ThemedSafeAreaView";
import ThemedText from "@/components/ui/Theme/ThemedText";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ThemedSafeAreaView style={styles.container}>
      <View style={styles.backgroundImageContainer}>
        <Image
          style={styles.backgroundImage}
          source={require("@/assets/images/landing_bg.png")}
        />
      </View>
      <Button onPress={() => router.push("/login")} style={styles.button}>
        <ThemedText fontSize={18}>Get Started</ThemedText>
      </Button>
      <GoogleButton style={styles.button} />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
  },
  backgroundImageContainer: {
    backgroundColor: Colors.background,
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
});
