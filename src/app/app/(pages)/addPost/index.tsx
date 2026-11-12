import DimmerLoading from "@/components/DimmerLoading";
import Button from "@/components/ui/Button";
import ThemedText from "@/components/ui/Theme/ThemedText";
import Colors from "@/constants/Colors";
import { useAppbar } from "@/contexts/AppbarContext";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { router, usePathname } from "expo-router";
import { RefreshCcw } from "lucide-react-native";
import { useRef, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const TakePostPic = () => {
  const cameraRef = useRef<CameraView>(null);
  const [pic, setPic] = useState<string | null>(null);
  const [shooting, setShooting] = useState(false);
  const [cropping, setCropping] = useState(false);
  const setAppbar = useAppbar();
  const pathname = usePathname();
  setAppbar(pathname, { title: "Postar", dismissTo: "/app" });
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;

  if (!permission.granted)
    return (
      <View>
        <ThemedText>
          Precisamos de permissão para usar a câmera para continuar
        </ThemedText>
        <Button onPress={requestPermission}>
          <ThemedText>Permitir</ThemedText>
        </Button>
      </View>
    );

  const toggleFacing = () => {
    setFacing((current) => (current == "back" ? "front" : "back"));
  };

  const shoot = async () => {
    if (!cameraRef.current || shooting) return;

    setShooting(true);
    try {
      const result = await cameraRef.current.takePictureAsync({
        quality: 0.7,
      });
      setPic(result.uri);

      setCropping(true);
      const size = Math.min(result.width, result.height);
      const context = ImageManipulator.manipulate(result.uri).crop({
        originX: (result.width - size) / 2,
        originY: (result.height - size) / 2,
        width: size,
        height: size,
      });

      const image = await context.renderAsync();
      const cropped = await image.saveAsync({
        compress: 0.7,
        format: SaveFormat.PNG,
      });

      setPic(cropped.uri);
    } finally {
      setCropping(false);
      setShooting(false);
    }
  };

  const confirmPic = () => {
    const aux = pic;
    setPic(null);
    router.push({
      pathname: "/app/addPost/finish",
      params: { pic: aux ? encodeURIComponent(aux) : undefined },
    });
  };

  return (
    <View style={styles.container}>
      {cropping && <DimmerLoading />}
      {pic ? (
        <Image source={{ uri: pic }} style={styles.camera} />
      ) : (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
      )}
      <View
        style={[
          styles.cameraActions,
          pic && { justifyContent: "center", gap: 8 },
        ]}
      >
        {pic ? (
          <>
            <Button
              variant="neutral"
              style={styles.confirmButton}
              onPress={() => setPic(null)}
            >
              <ThemedText>Refazer</ThemedText>
            </Button>
            <Button style={styles.confirmButton} onPress={confirmPic}>
              <ThemedText>Confirmar</ThemedText>
            </Button>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.flipButton} onPress={toggleFacing}>
              <RefreshCcw color={Colors.foregroundSecondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={shoot} style={styles.shootButton} />
            <View style={styles.flipButton}>
              <RefreshCcw color="transparent" />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    flex: 1,
    justifyContent: "space-between",
  },
  camera: {
    aspectRatio: 1,
    width: "100%",
  },
  cameraActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 16,
  },
  shootButton: {
    backgroundColor: "#ccc",
    aspectRatio: 1,
    width: 56,
    borderRadius: 100,
  },
  flipButton: {
    padding: 8,
    borderRadius: 1000,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
  },
});

export default TakePostPic;
