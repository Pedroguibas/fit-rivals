import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [chipState, setChipState] = useState({
    first: false,
    second: true,
    third: false,
  });

  const changeChipState = (name: "first" | "second" | "third") => {
    setChipState({
      first: false,
      second: false,
      third: false,
      [name]: true,
    });
  };

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
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
