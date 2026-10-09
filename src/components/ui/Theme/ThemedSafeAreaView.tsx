import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

const ThemedSafeAreaView = ({ style, ...props }: SafeAreaViewProps) => {
  return (
    <SafeAreaView
      style={[
        {
          position: "relative",
          flex: 1,
          overflow: "visible",
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedSafeAreaView;
