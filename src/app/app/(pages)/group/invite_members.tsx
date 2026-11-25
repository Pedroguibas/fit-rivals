import { inviteToGroup } from "@/api/groups";
import DimmerLoading from "@/components/DimmerLoading";
import SelectUsers from "@/components/SelectUsers";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import { useAppbar } from "@/contexts/AppbarContext";
import { useToast } from "@/contexts/ToastContext";
import { Group } from "@/types/Group";
import { GroupMember } from "@/types/GroupMember";
import { User } from "@/types/User";
import { useLocalSearchParams, usePathname } from "expo-router";
import { dismissTo } from "expo-router/build/global-state/router.js";
import { Check } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

const InviteMembers = () => {
  const pathname = usePathname();
  const setAppbar = useAppbar();
  const callToast = useToast();
  const { members: membersString, group: groupString } = useLocalSearchParams();
  const members: GroupMember[] = JSON.parse(membersString as string);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const group: Group = JSON.parse(groupString as string);

  setAppbar(pathname, {
    dismissTo: "/app/(pages)/group/group_info",
    dismissParams: { group: groupString },
  });

  const handleSubmit = async () => {
    if (users.length == 0) return;

    setLoading(true);
    try {
      const userIds = users.map((u) => u.id);

      await inviteToGroup(group.id, userIds);
      dismissTo({
        pathname: "/app/group/group_info",
        params: { group: groupString },
      });
    } catch (e) {
      console.log(e);
      callToast({
        variant: "danger",
        title: "Algo deu errado",
        message: "Erro ao convidar usuário. Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <DimmerLoading />}
      <View style={{ padding: 16, flex: 1 }}>
        <SelectUsers omitUsers={members} users={users} setUsers={setUsers} />
      </View>
      <FloatingActionButton icon={Check} onPress={handleSubmit} />
    </>
  );
};

export default InviteMembers;
