import { createActivity } from "@/api/activities";
import { uploadImage } from "@/api/r2";
import DimmerLoading from "@/components/DimmerLoading";
import LoadingScreen from "@/components/LoadingScreen";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import ThemedKeyboardAwareScrollView from "@/components/ui/Theme/ThemedKeyboardAwareScrollView";
import ThemedText from "@/components/ui/Theme/ThemedText";
import { useAppbar } from "@/contexts/AppbarContext";
import { useToast } from "@/contexts/ToastContext";
import { toImageUrl } from "@/helpers/toImageUrl";
import useActivityTypes from "@/hooks/useActivityTypes";
import useGroups from "@/hooks/useGroups";
import { ActivityType } from "@/types/ActivityType";
import { Group } from "@/types/Group";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, usePathname } from "expo-router";
import { dismissTo } from "expo-router/build/global-state/router.js";
import { Check } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

const FinishPost = () => {
  const pathname = usePathname();
  const setAppbar = useAppbar();
  const { pic, groupId } = useLocalSearchParams<{
    pic: string;
    groupId: string;
  }>();
  setAppbar(pathname, {
    title: "Postar",
    dismissTo: "/app/addPost",
    dismissParams: { groupId },
  });
  const [submitting, setSubmitting] = useState(false);
  const callToast = useToast();
  const { data: activityTypes } = useActivityTypes();
  const [selectedActivityType, selectActivityType] =
    useState<ActivityType | null>(null);
  const [caption, setCaption] = useState("");
  const { data: groups } = useGroups();
  const [selectedGroup, selectGroup] = useState<Group | null>(null);

  useEffect(() => {
    const foundGroup = groups?.find((g) => g.id == groupId);

    if (foundGroup) {
      selectGroup(foundGroup);
    }
  }, [groups]);

  const queryClient = useQueryClient();

  if (!activityTypes || !groups) {
    queryClient.invalidateQueries({ queryKey: ["activityTypes"] });
    queryClient.invalidateQueries({ queryKey: ["groups"] });
    return <LoadingScreen />;
  }

  const handleSubmit = async () => {
    if (!selectedActivityType) {
      callToast({
        variant: "danger",
        title: "Campo obrigatório",
        message: "Selecione um tipo de atividade!",
      });
      return;
    }

    setSubmitting(true);
    try {
      const imageKey = await uploadImage(pic);
      await createActivity({
        type: selectedActivityType.id,
        caption: caption,
        picture: imageKey,
        group: selectedGroup ? selectedGroup.id : null,
        participants: null,
      });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      dismissTo("/app");
    } catch (e) {
      console.log(e);
      callToast({
        variant: "danger",
        title: "Erro ao postar",
        message: "Algo deu errado. Tente novamente mais tarde.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {submitting && <DimmerLoading />}
      <ThemedKeyboardAwareScrollView
        contentContainerStyle={{ paddingVertical: 8 }}
      >
        <Image source={{ uri: pic }} style={styles.pic} />
        <View style={styles.formContainer}>
          <Input
            placeholder="Adicione uma legenda..."
            value={caption}
            onChangeText={setCaption}
          />

          <Select<ActivityType>
            data={activityTypes}
            selected={selectedActivityType}
            setSelected={selectActivityType}
            keyExtractor={(item, idx) => item.id.toString()}
            title="Tipo de atividade"
            renderItem={(item) => (
              <View style={styles.listItem}>
                <Image
                  style={styles.listItemImage}
                  source={{
                    uri: item.picture
                      ? toImageUrl(item.picture)
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMzEtm8ebcp-qRvpULrTksKR7TOo_UZ4Q0bRDFFcq1gTp00mQOR3x-9Nk&s=10",
                  }}
                  width={32}
                  height={32}
                />
                <ThemedText>{item.name}</ThemedText>
              </View>
            )}
          />
          <Select<Group>
            data={groups}
            selected={selectedGroup}
            setSelected={selectGroup}
            keyExtractor={(item, idx) => item.id}
            title="Selecione um grupo"
            renderItem={(item) => (
              <View style={styles.listItem}>
                <Image
                  style={styles.listItemImage}
                  source={
                    item.picture
                      ? { uri: toImageUrl(item.picture) }
                      : require("@/assets/images/group_pic.png")
                  }
                  width={32}
                  height={32}
                />
                <ThemedText>{item.name}</ThemedText>
              </View>
            )}
          />
        </View>
      </ThemedKeyboardAwareScrollView>
      <FloatingActionButton icon={Check} onPress={handleSubmit} />
    </>
  );
};

const styles = StyleSheet.create({
  pic: {
    aspectRatio: 1,
    width: "100%",
  },
  formContainer: {
    padding: 16,
    gap: 16,
  },
  listItem: {
    width: "max",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4,
  },
  listItemImage: {
    objectFit: "cover",
    aspectRatio: 1,
    borderRadius: 1000,
    width: 32,
    height: 32,
  },
});

export default FinishPost;
