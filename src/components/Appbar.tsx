import Colors from "@/constants/Colors";
import { router, usePathname } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ThemedText from "./ui/Theme/ThemedText";

export type AppbarProps = {
  hideBackButton?: boolean;
  title?: string;
  actions?: ReactNode;
};

const Appbar = ({ hideBackButton, title, actions }: AppbarProps) => {
  const pathname = usePathname();

  return (
    <View style={styles.appbar}>
      <View style={{ flexDirection: "row", gap: 12 }}>
        {hideBackButton || (
          <Pressable onPress={router.back}>
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
