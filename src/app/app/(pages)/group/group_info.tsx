import {
  deleteGroup,
  demoteMember,
  getGroupMembers,
  leaveGroup,
  promoteMember,
} from "@/api/groups";
import DimmerLoading from "@/components/DimmerLoading";
import LoadingScreen from "@/components/LoadingScreen";
import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import ThemedModal from "@/components/ui/Theme/ThemedModal";
import ThemedText from "@/components/ui/Theme/ThemedText";
import UserHeader from "@/components/UserHeader";
import Colors from "@/constants/Colors";
import { useAppbar } from "@/contexts/AppbarContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { toImageUrl } from "@/helpers/toImageUrl";
import { Group } from "@/types/Group";
import { GroupMember } from "@/types/GroupMember";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { dismissTo } from "expo-router/build/global-state/router.js";
import {
  LogOut,
  Plus,
  ShieldBan,
  ShieldCheck,
  Trash,
  UserMinus,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const GroupInfo = () => {
  const { user } = useAuth();
  const setAppbar = useAppbar();
  const pathname = usePathname();
  const callToast = useToast();
  const queryClient = useQueryClient();
  const { group: groupString } = useLocalSearchParams();
  if (!groupString) return;

  const [members, setMembers] = useState<GroupMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMemberActions, setLoadingMemberActions] = useState(false);
  const [refetchController, refetch] = useState(false);
  const [currentMember, setCurrentMember] = useState<GroupMember | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const group: Group = JSON.parse(groupString as string);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const data = await getGroupMembers(group.id);

        setMembers(data);
      } catch (e) {
        console.log(e);
        callToast({
          variant: "danger",
          title: "Algo deu errado.",
          message:
            "Erro ao carregar membros do grupo, tente novamente mais tarde.",
        });
        dismissTo({
          pathname: "/app/(pages)/group",
          params: { groupId: group.id },
        });
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, [refetchController]);

  if (loading) return <LoadingScreen />;

  setAppbar(pathname, {
    title: group.name,
    dismissTo: "/app/(pages)/group",
    dismissParams: { groupId: group.id },
  });

  const source = group.picture
    ? toImageUrl(group.picture)
    : require("@/assets/images/group_pic.png");

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteGroup(group.id);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      dismissTo("/app/groups");
    } catch (e) {
      callToast({
        variant: "danger",
        title: "Algo deu errado",
        message: "Erro ao deletar grupo. Tente novamente mais tarde",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLeave = async () => {
    setLoading(true);
    try {
      await leaveGroup(group.id);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      dismissTo("/app/groups");
    } catch (e) {
      callToast({
        variant: "danger",
        title: "Algo deu errado",
        message: "Erro ao sair do grupo. Tente novamente mais tarde",
      });
    } finally {
      setLoading(false);
    }
  };

  const callModal = (m: GroupMember) => {
    if (group.admin && user?.id != m.id) {
      setCurrentMember(m);
      setModalVisible(true);
    }
  };

  const dismissModal = () => {
    setModalVisible(false);
    setCurrentMember(null);
  };

  const handlePromote = async () => {
    if (!currentMember) return;

    dismissModal();
    setLoadingMemberActions(true);
    try {
      await promoteMember(group.id, [currentMember.id]);
      refetch((prev) => !prev);
    } catch (e) {
      console.log(e);
      callToast({
        variant: "danger",
        title: "Algo deu errado",
        message: "Erro ao promover membro. Tente novamente mais tarde",
      });
    } finally {
      setLoadingMemberActions(false);
    }
  };

  const handleDemote = async () => {
    if (!currentMember) return;

    dismissModal();
    setLoadingMemberActions(true);
    try {
      await demoteMember(group.id, [currentMember.id]);
      refetch((prev) => !prev);
    } catch (e) {
      console.log(e);
      callToast({
        variant: "danger",
        title: "Algo deu errado",
        message: "Erro ao rebaixar membro. Tente novamente mais tarde",
      });
    } finally {
      setLoadingMemberActions(false);
    }
  };

  const handleKick = async () => {};

  return (
    <>
      {loadingMemberActions && <DimmerLoading />}
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={source} style={styles.picture} />
        <View style={styles.header}>
          <ThemedText fontSize={20}>{group.name}</ThemedText>
          <ThemedText variant="secondary" fontSize={12}>
            {members.length} membros
          </ThemedText>
        </View>
        <View style={styles.membersContainer}>
          <ThemedText>Membros</ThemedText>
          {members.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={styles.member}
              onPress={() => callModal(m)}
            >
              <UserHeader user={m} />
              {m.isGroupAdmin && (
                <Chip value={true} label="Admin" fontSize={12} />
              )}
            </TouchableOpacity>
          ))}
          <Button
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: "/app/group/invite_members",
                params: {
                  members: JSON.stringify(members),
                  group: groupString,
                },
              })
            }
          >
            <Plus color={Colors.foreground} />
            <ThemedText>Convidar Amigos</ThemedText>
          </Button>
        </View>
        <View style={styles.buttonsContainer}>
          <Button variant="danger" onPress={handleLeave} style={styles.button}>
            <LogOut size={20} color={Colors.foreground} />
            <ThemedText fontSize={16}>Sair do Grupo</ThemedText>
          </Button>
          {group.admin && (
            <Button
              variant="danger"
              onPress={handleDelete}
              style={styles.button}
            >
              <Trash size={20} color={Colors.foreground} />
              <ThemedText fontSize={16}>Deletar Grupo</ThemedText>
            </Button>
          )}
        </View>
        <ThemedModal visible={modalVisible} dismiss={dismissModal}>
          {currentMember && (
            <>
              <ThemedText fontSize={18}>{currentMember.name}</ThemedText>
              {currentMember.isGroupAdmin ? (
                <Button
                  variant="danger"
                  onPress={handleDemote}
                  style={styles.button}
                >
                  <ShieldBan size={20} color={Colors.foreground} />
                  <ThemedText fontSize={16}>Remover como admin</ThemedText>
                </Button>
              ) : (
                <Button onPress={handlePromote} style={styles.button}>
                  <ShieldCheck size={20} color={Colors.foreground} />
                  <ThemedText fontSize={16}>Promover a admin</ThemedText>
                </Button>
              )}
              <Button
                variant="danger"
                style={styles.button}
                onPress={handleKick}
              >
                <UserMinus size={20} color={Colors.foreground} />
                <ThemedText fontSize={16}>Remover do grupo</ThemedText>
              </Button>
            </>
          )}
        </ThemedModal>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  picture: {
    width: "90%",
    aspectRatio: 1.5,
    borderRadius: 15,
  },
  header: {
    alignItems: "center",
    gap: 2,
  },
  membersContainer: {
    width: "100%",
    gap: 12,
    paddingBottom: 16,
  },
  member: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonsContainer: {
    paddingTop: 32,
    paddingBottom: 16,
    width: "100%",
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.backgroundTertiary,
  },
  button: {
    gap: 4,
    width: "100%",
    paddingVertical: 8,
  },
});

export default GroupInfo;
