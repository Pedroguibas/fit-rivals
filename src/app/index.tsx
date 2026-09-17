import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import Input from "@/components/ui/Input";
import { Lock } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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
    <ScrollView contentContainerStyle={styles.body}>
      <View style={styles.container}>
        <Input
          icon={Lock}
          type="password"
          style={{ width: 250 }}
          placeholder="Senha"
          value={text}
          onChangeText={setText}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#121316",
  },
  text: {
    color: "#FFFFFF",
  },
  chipContainer: {
    flexDirection: "row",
    gap: 4,
  },
});
