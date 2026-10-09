import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import { ComponentProps } from "react";

const ThemedStack = ({
  screenOptions,
  ...props
}: ComponentProps<typeof Stack>) => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.background,
          paddingVertical: 8,
          paddingHorizontal: 16,
        },
        ...screenOptions,
      }}
      {...props}
    />
  );
};

export default ThemedStack;
