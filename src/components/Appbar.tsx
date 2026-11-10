import Colors from "@/constants/Colors";
import { Href, router, usePathname } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ThemedText from "./ui/Theme/ThemedText";

export type AppbarProps = {
  hideBackButton?: boolean;
  title?: string;
  actions?: ReactNode;
  dismissTo?: Href;
};

const Appbar = ({ hideBackButton, title, actions, dismissTo }: AppbarProps) => {
  const pathname = usePathname();

  const handleBack = () => {
    if (dismissTo) {
      router.dismissTo(dismissTo);
      return;
    }

    router.back();
  };

  return (
    <View style={styles.appbar}>
      <View style={{ flexDirection: "row", gap: 12 }}>
        {hideBackButton || (
          <Pressable onPress={handleBack}>
            <ArrowLeft color={Colors.foregroundSecondary} />
          </Pressable>
        )}
        <ThemedText fontSize={20}>{title ? title : pathname}</ThemedText>
      </View>
      {actions}
    </View>
  );
};

const styles = StyleSheet.create({
  appbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 12,
  },
});

export default Appbar;
