import Colors from "@/constants/Colors";
import { LucideIcon } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import ThemedText from "./Theme/ThemedText";

export type ToastProps = {
  message: string;
  variant?: "primary" | "danger" | "success";
  title?: string;
  icon?: LucideIcon;
};

export const Toast = ({
  message,
  variant = "primary",
  title,
  icon: Icon,
}: ToastProps) => {
  return (
    <View style={[styles.toast, styles[variant]]}>
      {Icon && (
        <Icon
          color={
            variant == "danger"
              ? Colors.danger
              : variant == "success"
                ? Colors.success
                : Colors.primary
          }
        />
      )}
      <View style={styles.toastContent}>
        {title && (
          <ThemedText style={[{ fontWeight: 700 }, styles[`title_${variant}`]]}>
            {title}
          </ThemedText>
        )}
        <ThemedText fontSize={12}>{message}</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    width: "100%",
    flexDirection: "row",
    borderLeftWidth: 3,
    borderRadius: 12,
    padding: 12,
    backgroundColor: Colors.backgroundSecondary,
    boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.5)",
    shadowColor: "#000",
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowOpacity: 70,
    gap: 12,
    alignItems: "center",
  },
  active: {
    bottom: 32,
  },
  inactive: {
    top: "100%",
  },
  toastContent: {
    gap: 4,
  },
  primary: {
    borderColor: Colors.primary,
  },
  danger: {
    borderColor: Colors.danger,
  },
  success: {
    borderColor: Colors.success,
  },
  title_primary: {
    color: Colors.primary,
  },
  title_danger: {
    color: Colors.danger,
  },
  title_success: {
    color: Colors.success,
  },
});
