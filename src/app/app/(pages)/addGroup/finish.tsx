import { createGroup } from "@/api/groups";
import { uploadImage } from "@/api/r2";
import DimmerLoading from "@/components/DimmerLoading";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Input from "@/components/ui/Input";
import ThemedText from "@/components/ui/Theme/ThemedText";
import Colors from "@/constants/Colors";
import { useAppbar } from "@/contexts/AppbarContext";
import { useToast } from "@/contexts/ToastContext";
import { useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { Camera, Check, Trash } from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const Finish = () => {
  const pathname = usePathname();
  const setAppbar = useAppbar();
  const callToast = useToast();
  setAppbar(pathname, { title: "Criar Grupo", dismissTo: "/app/addGroup" });
  const [isSubmitting, setSubmitting] = useState(false);
  const { friends }: { friends: string } = useLocalSearchParams();
  console.log(typeof friends);
  const [name, setName] = useState("");
  const [pic, setPic] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const queryClient = useQueryClient();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [3, 2],
      quality: 0.7,
    });

    if (result.canceled) return;

    setPic(result.assets[0]);
    console.log(result.assets[0]);
  };

  const handleSubmit = async () => {
    if (name.length == 0) {
      callToast({
        variant: "danger",
        title: "Campo Obrigatório",
        message: "Nome do Grupo é um campo obrigatório.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const members = friends ? friends.split(",") : null;
      const picUri = pic ? await uploadImage(pic.uri) : null;

      const body = {
        name: name,
        picture: picUri,
        members: members,
      };

      await createGroup(body);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      router.dismissTo("/app/groups");
    } catch (e) {
      console.log(e);
      callToast({
        variant: "danger",
        title: "Erro ao criar grupo",
        message: "Algo deu errado, tente novamente mais tarde.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting && <DimmerLoading />}
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Pressable style={styles.selectCover} onPress={pickImage}>
          {pic ? (
            <>
              <TouchableOpacity
                style={styles.removeImageBtn}
                onPress={() => setPic(null)}
              >
                <Trash color={Colors.danger} />
              </TouchableOpacity>
              <Image
                source={{ uri: pic.uri }}
                style={{ width: "100%", aspectRatio: 1.5 }}
              />
            </>
          ) : (
            <>
              <Camera size={40} color={Colors.foregroundTertiary} />
              <ThemedText variant="secondary" fontSize={20}>
                Selecionar capa do grupo
              </ThemedText>
            </>
          )}
        </Pressable>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Nome do Grupo"
        />
      </KeyboardAwareScrollView>
      <FloatingActionButton icon={Check} onPress={handleSubmit} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  selectCover: {
    borderRadius: 15,
    aspectRatio: 1.5,
    width: "100%",
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  removeImageBtn: {
    position: "absolute",
    top: 2,
    left: 2,
    padding: 8,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 1000,
    zIndex: 10,
  },
});

export default Finish;
