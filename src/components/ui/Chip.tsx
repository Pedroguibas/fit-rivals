import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

export interface ChipProps extends Omit<PressableProps, "children"> {
  value: boolean;
  label: string;
}

export default function Chip({ value, label, style, ...props }: ChipProps) {
  return (
    <Pressable
      style={(state) => [
        styles.chip,
        value ? styles.active : styles.inactive,
        typeof style == "function" ? style(state) : style,
      ]}
      {...props}
    >
      <Text style={value ? styles.activeText : styles.inactiveText}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 0.5,
  },
  activeText: {
    color: "#FF967B",
  },
  inactiveText: {
    color: "#FFFFFF",
  },
  active: {
    borderColor: "#FF967B",
    backgroundColor: "#F0310038",
  },
  inactive: {
    borderColor: "#D9D9D9",
  },
});
