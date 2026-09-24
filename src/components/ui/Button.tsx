import Colors from "@/constants/Colors";
import { ReactNode, useEffect, useRef } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const BUTTON_EFFECT_RADIUS = 10;
export interface ButtonProps extends Omit<PressableProps, "children"> {
  variant?: "primary" | "danger" | "success" | "neutral";
  children?: ReactNode;
  clickAnimationDuration?: number;
}

export default function Button({
  children,
  variant = "primary",
  style,
  onPress,
  clickAnimationDuration = 600,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<View>(null);

  const effectOpacity = useSharedValue(0);
  const effectScale = useSharedValue(1);
  const effectTop = useSharedValue(0);
  const effectLeft = useSharedValue(0);

  const pressAnimation = async (event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent;

    buttonRef?.current?.measure(
      (x, y, width, height, pageXOffset, pageYOffset) => {
        effectTop.value = pageY - pageYOffset - BUTTON_EFFECT_RADIUS;
        effectLeft.value = pageX - pageXOffset - BUTTON_EFFECT_RADIUS;

        const scaleY = (height / BUTTON_EFFECT_RADIUS) * 2 + 1;
        const scaleX = (width / BUTTON_EFFECT_RADIUS) * 2 + 1;

        effectScale.value = 1;
        effectScale.value = withTiming(scaleY > scaleX ? scaleY : scaleX, {
          duration: clickAnimationDuration * 1.2,
          easing: Easing.out(Easing.ease),
        });

        effectOpacity.value = 1;
        effectOpacity.value = withTiming(0, {
          duration: clickAnimationDuration,
        });
      },
    );
  };

  useEffect(() => {
    if (props.disabled) {
      effectOpacity.value = 1;
      effectScale.value = 99999999;
    } else {
      effectOpacity.value = 0;
      effectScale.value = 1;
    }
  }, [props.disabled]);

  const handlePress = (event: GestureResponderEvent) => {
    if (props.disabled) return;

    pressAnimation(event);
    if (onPress) onPress(event);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    top: effectTop.value,
    left: effectLeft.value,
    transform: [{ scale: effectScale.value }],
    opacity: effectOpacity.value,
  }));

  return (
    <Pressable
      ref={buttonRef}
      style={(state) => [
        styles.button,
        styles[variant],
        typeof style == "function" ? style(state) : style,
      ]}
      onPress={handlePress}
      {...props}
    >
      {children}
      <Animated.View
        style={[styles.clickEffect, animatedStyle]}
      ></Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  clickEffect: {
    position: "absolute",
    width: BUTTON_EFFECT_RADIUS * 2,
    height: BUTTON_EFFECT_RADIUS * 2,
    borderRadius: 1000,
    backgroundColor: "#00000044",
    padding: 0,
  },
  children: {
    color: "#FFFFFF",
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  danger: {
    backgroundColor: Colors.danger,
  },
  success: {
    backgroundColor: Colors.success,
  },
  neutral: {
    backgroundColor: Colors.backgroundSecondary,
  },
});
