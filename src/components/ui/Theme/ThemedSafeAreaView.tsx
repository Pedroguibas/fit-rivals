import Colors from "@/constants/Colors";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

const ThemedSafeAreaView = ({ style, ...props }: SafeAreaViewProps) => {
  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: Colors.background,
          paddingHorizontal: 16,
          paddingVertical: 8,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedSafeAreaView;
