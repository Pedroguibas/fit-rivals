import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function HomeScreen() {
  const [chipState, setChipState] = useState({
    first: false,
    second: true,
    third: false,
  });
  const [text, setText] = useState("");

  const changeChipState = (name: "first" | "second" | "third") => {
    setChipState({
      first: false,
      second: false,
      third: false,
      [name]: true,
    });
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Input
          icon={<Text>🔒</Text>}
          style={{ width: 250 }}
          placeholder="digite algo ai capeta"
          value={text}
          onChangeText={(txt: string) => setText(txt)}
        />
        <Button>
          <Text style={styles.text}>Primary</Text>
        </Button>
        <Button variant="danger">
          <Text style={styles.text}>Danger</Text>
        </Button>
        <Button variant="confirm">
          <Text style={styles.text}>Confirm</Text>
        </Button>
        <View style={styles.chipContainer}>
          <Chip
            label="first"
            onPress={() => changeChipState("first")}
            value={chipState.first}
          />
          <Chip
            label="second"
            onPress={() => changeChipState("second")}
            value={chipState.second}
          />
          <Chip
            label="third"
            onPress={() => changeChipState("third")}
            value={chipState.third}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#121316",
    paddingVertical: 600,
  },
  text: {
    color: "#FFFFFF",
  },
  chipContainer: {
    flexDirection: "row",
    gap: 4,
  },
});
