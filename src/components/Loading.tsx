import Colors from "@/constants/Colors";
import { useEffect } from "react";
import { View, ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type LoadingProps = {
  size?: number;
  color?: string;
  pacing?: number;
  scale?: number;
  gap?: number;
  style?: ViewStyle;
};

const Loading = ({
  size = 6,
  color = Colors.foreground,
  pacing = 1,
  scale = 1.5,
  gap = 8,
  style,
}: LoadingProps) => {
  const dot1Scale = useSharedValue(1);
  const dot2Scale = useSharedValue(1);
  const dot3Scale = useSharedValue(1);
  const duration = 200 * pacing;
  const interval = 400 * pacing;

  const dot1AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dot1Scale.value }],
  }));
  const dot2AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dot2Scale.value }],
  }));
  const dot3AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dot3Scale.value }],
  }));

  const sleep = async () =>
    await new Promise((r) => setTimeout(r, interval + duration));

  const animate = async () => {
    while (true) {
      dot3Scale.value = withTiming(1, {
        duration,
        easing: Easing.inOut(Easing.ease),
      });

      dot1Scale.value = withTiming(scale, {
        duration,
        easing: Easing.inOut(Easing.ease),
      });

      await sleep();

      dot1Scale.value = withTiming(1, {
        duration,
        easing: Easing.inOut(Easing.ease),
      });

      dot2Scale.value = withTiming(scale, {
        duration,
        easing: Easing.inOut(Easing.ease),
      });

      await sleep();

      dot2Scale.value = withTiming(1, {
        duration,
        easing: Easing.inOut(Easing.ease),
      });

      dot3Scale.value = withTiming(scale, {
        duration,
        easing: Easing.inOut(Easing.ease),
      });

      await sleep();
    }
  };

  useEffect(() => {
    animate();
  }, []);

  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: gap,
          height: scale > 1 ? size * scale : size,
          paddingVertical: 12,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          {
            height: scale >= 1 ? size * scale : size,
            aspectRatio: 1,
            backgroundColor: color,
            borderRadius: 1000,
          },
          dot1AnimatedStyle,
        ]}
      ></Animated.View>
      <Animated.View
        style={[
          {
            height: scale >= 1 ? size * scale : size,
            aspectRatio: 1,
            backgroundColor: color,
            borderRadius: 1000,
          },
          dot2AnimatedStyle,
        ]}
      ></Animated.View>
      <Animated.View
        style={[
          {
            height: scale >= 1 ? size * scale : size,
            aspectRatio: 1,
            backgroundColor: color,
            borderRadius: 1000,
          },
          dot3AnimatedStyle,
        ]}
      ></Animated.View>
    </View>
  );
};

export default Loading;
