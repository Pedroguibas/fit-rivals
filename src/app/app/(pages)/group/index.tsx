import { getGroupActivities } from "@/api/groups";
import ActivityPost from "@/components/ActivityPost";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar, { PageType } from "@/components/ui/Navbar";
import ThemedText from "@/components/ui/Theme/ThemedText";
import { useAppbar } from "@/contexts/AppbarContext";
import { useToast } from "@/contexts/ToastContext";
import useGroups from "@/hooks/useGroups";
import { Activity } from "@/types/Activity";
import { Group } from "@/types/Group";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { Home, MessageCircle, Trophy } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const GroupIndex = () => {
  const { groupId } = useLocalSearchParams();
  const { data: groups, isLoading: loadingGroups } = useGroups();
  const pathname = usePathname();
  const setAppbar = useAppbar();
  const [group, setGroup] = useState<Group | undefined>(undefined);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const callToast = useToast();

  const configureAppbar = (g: Group) => {
    setAppbar(pathname, {
      title: g.name,
      dismissTo: "/app/groups",
      onPress: () =>
        router.push({
          pathname: "/app/group/group_info",
          params: { group: JSON.stringify(g) },
        }),
    });
  };

  useEffect(() => {
    const foundGroup = groups?.find((g) => g.id == groupId);
    if (foundGroup) {
      configureAppbar(foundGroup);
      setGroup(foundGroup);
    }
  }, [groups]);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!group) return;

      setLoadingActivities(true);
      try {
        const data = await getGroupActivities(group.id);
        setActivities(data);
      } catch (e) {
        callToast({
          variant: "danger",
          title: "Algo deu errado",
          message: "Erro ao carregar atividades, tente novamente mais tarde.",
        });
      } finally {
        setLoadingActivities(false);
      }
    };
    fetchActivities();
  }, [group]);

  if (loadingGroups) return <LoadingScreen />;

  if (!group || !groups) {
    setAppbar(pathname, {
      title: "Grupo",
      dismissTo: "/app/groups",
    });

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText>Grupo não encontrado</ThemedText>
      </View>
    );
  }

  configureAppbar(group);

  const pages: PageType[] = [
    {
      page: "chat",
      route: "/app/group/chat",
      params: { groupId: groupId, groupName: group.name },
      icon: MessageCircle,
      actionButtonAction: () => {},
      actionButtonIcon: undefined,
    },
    {
      page: "index",
      route: "/app/group",
      icon: Home,
      actionButtonAction: () =>
        router.push({ pathname: "/app/addPost", params: { groupId } }),
      actionButtonIcon: undefined,
    },
    {
      page: "leaderboard",
      route: "/app/leaderboard",
      params: { groupId },
      icon: Trophy,
      actionButtonAction: () => {},
      actionButtonIcon: undefined,
    },
  ];

  return (
    <View style={styles.container}>
      {loadingActivities ? (
        <LoadingScreen />
      ) : activities.length == 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ThemedText>Nenhum post no grupo</ThemedText>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.activitiesContainer}>
          {activities.map((a) => (
            <ActivityPost activity={a} key={a.id} />
          ))}
        </ScrollView>
      )}
      <Navbar pages={pages} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activitiesContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default GroupIndex;
