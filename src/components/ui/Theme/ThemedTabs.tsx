import Colors from "@/constants/Colors";
import { Tabs } from "expo-router";
import { ComponentProps } from "react";

const ThemedTabs = ({
  screenOptions,
  ...props
}: ComponentProps<typeof Tabs>) => {
  return (
    <Tabs
      screenOptions={(navProps) => {
        const custom =
          typeof screenOptions == "function"
            ? screenOptions(navProps)
            : screenOptions;

        return {
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
          ...custom,
          sceneStyle: [
            {
              backgroundColor: Colors.background,
              paddingHorizontal: 16,
            },
            custom?.sceneStyle,
          ],
        };
      }}
      {...props}
    />
  );
};

export default ThemedTabs;
