import { acceptFriendRequest, denyFriendRequest } from "@/api/social";
import Colors from "@/constants/Colors";
import { useToast } from "@/contexts/ToastContext";
import { FriendRequest } from "@/types/FriendRequest";
import { useQueryClient } from "@tanstack/react-query";
import { Check, EllipsisVertical, X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Loading from "./Loading";
import UserHeader from "./UserHeader";

export type FriendRequestListItemProps = {
  request: FriendRequest;
};

const FriendRequestListItem = ({ request }: FriendRequestListItemProps) => {
  const callToast = useToast();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["friends"] });
    queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
  };

  const handleAccept = async () => {
    setLoading(true);
    try {
      await acceptFriendRequest(request.id);

      callToast({
        variant: "success",
        message: "Pedido de amizade aceito com sucesso",
      });
    } catch {
      callToast({
        variant: "danger",
        title: "Erro ao aceitar pedido",
        message: "Tente novamente mais tarde",
      });
    } finally {
      setLoading(false);
      refetch();
    }
  };

  const handleDeny = async () => {
    setLoading(true);
    try {
      await denyFriendRequest(request.id);

      callToast({
        variant: "success",
        message: "Pedido de amizade recusado",
      });
    } catch {
      callToast({
        variant: "danger",
        title: "Erro ao recusar pedido",
        message: "Tente novamente mais tarde",
      });
    } finally {
      setLoading(false);
      refetch();
    }
  };

  return (
    <Pressable style={styles.container}>
      <UserHeader user={request.requester} />
      {loading ? (
        <Loading color={Colors.foregroundSecondary} />
      ) : (
        <View style={styles.actions}>
          <Pressable disabled={loading} onPress={handleDeny}>
            <X color={Colors.danger} />
          </Pressable>
          <Pressable disabled={loading} onPress={handleAccept}>
            <Check color={Colors.success} />
          </Pressable>
          <Pressable disabled={loading}>
            <EllipsisVertical color={Colors.foregroundSecondary} />
          </Pressable>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 12,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
});

export default FriendRequestListItem;
