import { createActivity } from "@/api/activities";
import { uploadImage } from "@/api/r2";
import DimmerLoading from "@/components/DimmerLoading";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Input from "@/components/ui/Input";
import ThemedKeyboardAwareScrollView from "@/components/ui/Theme/ThemedKeyboardAwareScrollView";
import ThemedText from "@/components/ui/Theme/ThemedText";
import Colors from "@/constants/Colors";
import { useAppbar } from "@/contexts/AppbarContext";
import { useToast } from "@/contexts/ToastContext";
import useActivityTypes from "@/hooks/useActivityTypes";
import { ActivityType } from "@/types/ActivityType";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, usePathname } from "expo-router";
import { dismissTo } from "expo-router/build/global-state/router.js";
import { Check, ChevronDown } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const FinishPost = () => {
  const pathname = usePathname();
  const setAppbar = useAppbar();
  setAppbar(pathname, { title: "Postar", dismissTo: "/app/addPost" });
  const { pic } = useLocalSearchParams<{ pic: string }>();
  const [submitting, setSubmitting] = useState(false);
  const callToast = useToast();
  const { data: activityTypes } = useActivityTypes();
  const [selectedActivityType, selectActivityType] =
    useState<ActivityType | null>(null);
  const [selectingActivityType, setSelectingActivityType] = useState(false);
  const [caption, setCaption] = useState("");

  const activityTypeSelectHeight = useSharedValue(0);

  const queryClient = useQueryClient();

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
        group: null,
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

  useEffect(() => {
    activityTypeSelectHeight.value = withTiming(
      selectingActivityType ? 180 : 0,
      {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      },
    );
  }, [selectingActivityType]);

  const toggleSelectingActivityType = () => {
    setSelectingActivityType((prev) => !prev);
  };

  const handleSelectActivityType = (type: ActivityType) => {
    selectActivityType(type);
    setSelectingActivityType(false);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    maxHeight: activityTypeSelectHeight.value,
  }));

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

          <View style={{ gap: 4 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={toggleSelectingActivityType}
            >
              {selectedActivityType ? (
                <View style={[styles.activityType, { width: "auto" }]}>
                  <Image
                    style={styles.activityTypeImage}
                    source={{
                      uri: selectedActivityType.picture
                        ? selectedActivityType.picture
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMzEtm8ebcp-qRvpULrTksKR7TOo_UZ4Q0bRDFFcq1gTp00mQOR3x-9Nk&s=10",
                    }}
                    width={32}
                    height={32}
                  />
                  <ThemedText>{selectedActivityType.name}</ThemedText>
                </View>
              ) : (
                <ThemedText variant="secondary">Tipo de atividade</ThemedText>
              )}
              <ChevronDown color={Colors.foregroundSecondary} />
            </TouchableOpacity>
          </View>

          <Animated.ScrollView nestedScrollEnabled style={animatedStyle}>
            {activityTypes?.map((t) => (
              <TouchableOpacity
                style={styles.activityType}
                key={t.id}
                onPress={() => handleSelectActivityType(t)}
              >
                <Image
                  style={styles.activityTypeImage}
                  source={{
                    uri: t.picture
                      ? t.picture
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMzEtm8ebcp-qRvpULrTksKR7TOo_UZ4Q0bRDFFcq1gTp00mQOR3x-9Nk&s=10",
                  }}
                  width={32}
                  height={32}
                />
                <ThemedText>{t.name}</ThemedText>
              </TouchableOpacity>
            ))}
          </Animated.ScrollView>
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
  activityType: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4,
  },
  activityTypeImage: {
    objectFit: "cover",
    aspectRatio: 1,
    borderRadius: 1000,
  },
});

export default FinishPost;
