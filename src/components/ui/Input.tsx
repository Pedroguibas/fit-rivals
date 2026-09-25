import { Eye, EyeOff, LucideIcon } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export interface InputProps extends Omit<TextInputProps, "children" | "style"> {
  type?: "text" | "number" | "email" | "password";
  icon?: LucideIcon;
  style?: ViewStyle;
  fontSize?: number;
  focusAnimationDuration?: number;
}

export default function Input({
  type = "text",
  icon: Icon,
  style,
  fontSize = 16,
  onChangeText,
  focusAnimationDuration = 300,
  ...props
}: InputProps) {
  const containerRef = useRef<View | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [showingPassword, setShowingPassword] = useState(true);
  const handleChangeNumber = onChangeText
    ? (text: string) => {
        if (/^\d*$/.test(text)) onChangeText(text);
      }
    : () => {};

  const focusWidth = useSharedValue(0);

  useEffect(() => {
    containerRef?.current?.measure((x, y, width, height, pageX, pageY) => {
      setContainerWidth(width);
    });
  }, []);

  const handleFocus = () => {
    containerRef?.current?.measure((x, y, width, height, pageX, pageY) => {
      focusWidth.value = withTiming(width, {
        duration: focusAnimationDuration,
      });
      setContainerWidth(width);
    });
  };

  const handleBlur = () => {
    focusWidth.value = withTiming(0, {
      duration: focusAnimationDuration,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    width: focusWidth.value,
    left: (containerWidth - focusWidth.value) / 2,
  }));

  return (
    <View ref={containerRef} style={[styles.container, style]}>
      <Animated.View style={[styles.focus, animatedStyle]} />
      {Icon && <Icon color="#CCCCCC" size={fontSize + 4} />}
      <TextInput
        secureTextEntry={type == "password" && showingPassword}
        style={[styles.input, { fontSize }]}
        placeholderTextColor="#999"
        onChangeText={type == "number" ? handleChangeNumber : onChangeText}
        keyboardType={
          type == "number"
            ? "numeric"
            : type == "email"
              ? "email-address"
              : "default"
        }
        autoCapitalize="none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {type == "password" && (
        <Pressable
          style={{ padding: 8 }}
          onPress={() => setShowingPassword((prev) => !prev)}
        >
          {showingPassword ? (
            <EyeOff color="#CCCCCC" size={16} />
          ) : (
            <Eye color="#CCCCCC" size={16} />
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 8,
    width: "100%",
    alignItems: "center",
    borderColor: "#CCCCCC",
  },
  input: {
    color: "#fff",
    width: "100%",
    flex: 1,
    paddingVertical: 8,
  },
  focus: {
    position: "absolute",
    borderColor: "#F03100",
    bottom: -1,
    borderBottomWidth: 1,
  },
});
