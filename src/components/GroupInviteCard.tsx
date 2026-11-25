import { acceptGroupInvite, denyGroupInvite } from "@/api/groups";
import Colors from "@/constants/Colors";
import { useToast } from "@/contexts/ToastContext";
import { toImageUrl } from "@/helpers/toImageUrl";
import { GroupInvite } from "@/types/GroupInvite";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Check, X } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Loading from "./Loading";
import Button from "./ui/Button";
import ThemedText from "./ui/Theme/ThemedText";
import UserHeader from "./UserHeader";

type GrouopInviteCardProps = {
  invite: GroupInvite;
};

const GroupInviteCard = ({ invite }: GrouopInviteCardProps) => {
  const [loading, setLoading] = useState(false);
  const callToast = useToast();
  const queryClient = useQueryClient();
  const source = invite.group.picture
    ? toImageUrl(invite.group.picture)
    : require("@/assets/images/group_pic.png");

  const handleAccept = async () => {
    setLoading(true);

    try {
      await acceptGroupInvite(invite.id);
    } catch {
      callToast({
        variant: "danger",
        title: "Algo deu errado",
        message: "Erro ao aceitar convite. Tente novamente mais tarde.",
      });
    } finally {
      queryClient.invalidateQueries({ queryKey: ["groupInvites"] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      setLoading(false);
    }
  };

  const handleDeny = async () => {
    setLoading(true);

    try {
      await denyGroupInvite(invite.id);
    } catch {
      callToast({
        variant: "danger",
        title: "Algo deu errado",
        message: "Erro ao recusar convite. Tente novamente mais tarde.",
      });
    } finally {
      queryClient.invalidateQueries({ queryKey: ["groupInvites"] });
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userHeader}>
        <UserHeader user={invite.inviter} />
        <ThemedText>te convidou</ThemedText>
      </View>
      <View style={styles.card}>
        <Image source={source} style={styles.picture} />
        <View style={styles.cardHeader}>
          <ThemedText fontSize={18}>{invite.group.name}</ThemedText>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Button
              onPress={handleAccept}
              style={styles.button}
              variant="success"
            >
              <Check color={Colors.foreground} size={16} />
              <ThemedText>Aceitar</ThemedText>
            </Button>
            <Button onPress={handleDeny} style={styles.button} variant="danger">
              <X color={Colors.foreground} size={16} />
              <ThemedText>Recusar</ThemedText>
            </Button>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  userHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
  },
  card: {
    borderRadius: 15,
    overflow: "hidden",
  },
  cardHeader: {
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  picture: {
    width: "100%",
    aspectRatio: 1.5,
  },
  buttonContainer: {
    width: "100%",
    gap: 4,
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 8,
  },
  button: {
    flex: 1,
  },
});

export default GroupInviteCard;
