import { deleteGroup, leaveGroup } from "@/api/groups";
import DimmerLoading from "@/components/DimmerLoading";
import GroupCard from "@/components/GroupCard";
import LoadingScreen from "@/components/LoadingScreen";
import Button from "@/components/ui/Button";
import ThemedModal from "@/components/ui/Theme/ThemedModal";
import ThemedText from "@/components/ui/Theme/ThemedText";
import Colors from "@/constants/Colors";
import { useToast } from "@/contexts/ToastContext";
import useGroups from "@/hooks/useGroups";
import { Group } from "@/types/Group";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Trash } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

const Groups = () => {
  const { data: groups, isLoading } = useGroups();
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const callToast = useToast();

  if (isLoading) return <LoadingScreen />;

  const callModal = (group: Group) => {
    setCurrentGroup(group);
    setSettingsVisible(true);
  };

  const dismissModal = () => {
    setCurrentGroup(null);
    setSettingsVisible(false);
  };

  const handleDelete = async () => {
    if (!currentGroup) return;

    dismissModal();
    setLoading(true);
    try {
      await deleteGroup(currentGroup.id);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
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
    if (!currentGroup) return;

    dismissModal();
    setLoading(true);
    try {
      await leaveGroup(currentGroup.id);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
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

  return (
    <>
      {loading && <DimmerLoading />}
      <ScrollView contentContainerStyle={{ gap: 20, paddingBottom: 120 }}>
        {groups?.map((g) => (
          <GroupCard key={g.id} group={g} openSettings={callModal} />
        ))}
        <ThemedModal visible={settingsVisible} dismiss={dismissModal}>
          {currentGroup && (
            <>
              <ThemedText fontSize={20}>{currentGroup.name}</ThemedText>
              {currentGroup.admin && (
                <Button
                  style={styles.modalButton}
                  variant="danger"
                  onPress={handleDelete}
                >
                  <Trash size={20} color={Colors.foreground} />
                  <ThemedText fontSize={18}>Deletar grupo</ThemedText>
                </Button>
              )}
              <Button
                style={styles.modalButton}
                variant="danger"
                onPress={handleLeave}
              >
                <LogOut size={20} color={Colors.foreground} />
                <ThemedText fontSize={18}>Sair do grupo</ThemedText>
              </Button>
              <Button
                style={[
                  styles.modalButton,
                  { backgroundColor: Colors.backgroundTertiary },
                ]}
                variant="neutral"
                onPress={dismissModal}
              >
                <ThemedText fontSize={18}>Cancelar</ThemedText>
              </Button>
            </>
          )}
        </ThemedModal>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  modalButton: {
    width: "100%",
    gap: 8,
  },
});

export default Groups;
