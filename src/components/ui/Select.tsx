import Colors from "@/constants/Colors";
import { ChevronDown } from "lucide-react-native";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ThemedText from "./Theme/ThemedText";

type SelectProps<T> = {
  title?: string;
  data: T[];
  selected: T | null;
  setSelected: Dispatch<SetStateAction<T | null>>;
  renderSelected?: (props: T) => ReactNode;
  renderItem: (props: T) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
};

export default function Select<T>({
  title = "Selecione um Item",
  data,
  selected,
  setSelected,
  renderItem,
  renderSelected,
  keyExtractor,
}: SelectProps<T>) {
  const [selecting, setSelecting] = useState(false);

  const toggleSelecting = () => setSelecting((prev) => !prev);

  const selectHeight = useSharedValue(0);

  const handleSelect = (item: T) => {
    setSelected(item);
    setSelecting(false);
  };

  useEffect(() => {
    selectHeight.value = withTiming(selecting ? 180 : 0, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
  }, [selecting]);

  const animatedStyle = useAnimatedStyle(() => ({
    maxHeight: selectHeight.value,
  }));

  return (
    <>
      <View style={{ gap: 4 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={toggleSelecting}
        >
          {selected ? (
            renderSelected ? (
              renderSelected(selected)
            ) : (
              renderItem(selected)
            )
          ) : (
            <ThemedText variant="secondary">{title}</ThemedText>
          )}
          <ChevronDown color={Colors.foregroundSecondary} />
        </TouchableOpacity>

        <Animated.ScrollView nestedScrollEnabled style={animatedStyle}>
          {data?.map((d, idx) => (
            <TouchableOpacity
              key={keyExtractor(d, idx)}
              onPress={() => handleSelect(d)}
            >
              {renderItem(d)}
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </View>
    </>
  );
}
