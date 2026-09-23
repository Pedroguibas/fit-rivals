import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";

const ThemedKeyboardAwareScrollView = ({
  style,
  contentContainerStyle,
  ...props
}: KeyboardAwareScrollViewProps) => {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      style={[{ flex: 1, backgroundColor: Colors.background }, style]}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
});

export default ThemedKeyboardAwareScrollView;
