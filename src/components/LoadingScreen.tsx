import { View } from "react-native";
import Loading from "./Loading";

const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loading />
    </View>
  );
};

export default LoadingScreen;
