import { View } from "react-native";
import Loading, { LoadingProps } from "./Loading";

const DimmerLoading = ({ gap = 8, size = 8, ...props }: LoadingProps) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 10,
        backgroundColor: "#00000080",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loading gap={gap} size={size} {...props} />
    </View>
  );
};

export default DimmerLoading;
