import { Toast } from "@/components/ui/Toast";
import { LucideIcon } from "lucide-react-native";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { StyleSheet } from "react-native";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

export type toastOptions = {
  message: string;
  activeTime?: number;
  title?: string;
  icon?: LucideIcon;
  variant?: "primary" | "danger" | "success";
};

export type callToast = (options: toastOptions) => void;

const ToastContext = createContext<callToast | undefined>(undefined);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [queue, setQueue] = useState<toastOptions[]>([]);
  const [current, setCurrent] = useState<toastOptions | null>(null);

  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);
  const { height: keyboardHeight } = useReanimatedKeyboardAnimation();

  useEffect(() => {
    if (!current && queue.length > 0) {
      setCurrent(queue[0]);
      setQueue((prev) => prev.slice(1));
    }
  }, [current, queue]);

  useEffect(() => {
    if (!current) return;

    translateY.value = withTiming(0, {
      duration: 250,
      easing: Easing.out(Easing.ease),
    });
    opacity.value = withTiming(1, { duration: 250 });

    const timer = setTimeout(hideCurrent, current.activeTime || 3000);
    return () => clearTimeout(timer);
  }, [current]);

  const hideCurrent = () => {
    translateY.value = withTiming(100, { duration: 250 });
    opacity.value = withTiming(0, { duration: 250 }, (finished) => {
      if (finished) scheduleOnRN(setCurrent, null);
    });
  };

  const callToast = (options: toastOptions) => {
    setQueue((prev) => [...prev, options]);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
    bottom:
      24 +
      Math.abs(keyboardHeight.value) +
      (keyboardHeight.value !== 0 ? 16 : 0),
  }));

  return (
    <ToastContext.Provider value={callToast}>
      {children}

      {current && (
        <Animated.View style={[styles.toast, animatedStyle]}>
          <Toast
            title={current.title}
            icon={current.icon}
            variant={current.variant}
            message={current.message}
          />
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    left: 16,
    right: 16,
  },
});

export const useToast = () => {
  const ctxt = useContext(ToastContext);
  if (!ctxt) throw new Error("useToast must be called inside ToastProvider");

  return ctxt;
};
