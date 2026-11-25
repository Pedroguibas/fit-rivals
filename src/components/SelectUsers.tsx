import Colors from "@/constants/Colors";
import { toImageUrl } from "@/helpers/toImageUrl";
import useFriends from "@/hooks/useFriends";
import { Friend } from "@/types/Friend";
import { User } from "@/types/User";
import { Search, X } from "lucide-react-native";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import FriendListItem from "./FriendListItem";
import LoadingScreen from "./LoadingScreen";
import Input from "./ui/Input";
import ThemedText from "./ui/Theme/ThemedText";

export type SelectUsersProps = {
  omitUsers?: User[];
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
};

type SelectedUserProps = {
  user: User;
  handleRemove: (user: User) => void;
};

const SelectedUser = ({ user, handleRemove }: SelectedUserProps) => {
  const source = user.picture
    ? { uri: toImageUrl(user.picture) }
    : require("@/assets/images/user_pic.png");

  return (
    <TouchableOpacity
      style={{ alignItems: "center" }}
      onPress={() => handleRemove(user)}
    >
      <View style={styles.selectedUserRemoveIndicator}>
        <X size={14} color={Colors.foregroundSecondary} />
      </View>
      <Image
        source={source}
        width={16}
        height={16}
        style={styles.selectedUserImage}
      />
      <ThemedText
        fontSize={14}
        numberOfLines={1}
        style={styles.selectedUserName}
      >
        {user.name}
      </ThemedText>
    </TouchableOpacity>
  );
};

const SelectUsers = ({ users, setUsers, omitUsers }: SelectUsersProps) => {
  const { data: friends, isLoading: isLoadingFriends } = useFriends();
  const [userList, setUserList] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!friends) {
      return setLoading(true);
    }

    if (!omitUsers) {
      setUserList(friends);
      setLoading(false);
      return;
    }
    const omitIds = omitUsers?.map((u) => u.id);

    const u: Friend[] = [];

    friends.map((f) => {
      if (!omitIds.includes(f.friend.id)) u.push(f);
    });

    setUserList(u);
    setLoading(false);
  }, [friends]);

  if (isLoadingFriends || loading) return <LoadingScreen />;

  const handleSearch = (s: string) => {
    setSearch(s);
  };

  const handleSelect = (u: User) => {
    setUsers((prev) => [...prev, u]);
  };

  const handleRemove = (user: User) => {
    const idx = users.findIndex((u) => u.id == user.id);

    if (idx == -1) return;

    setUsers((prev) => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
  };

  const filter = (u: User): boolean => {
    const upperSearch = search.toUpperCase();

    return (
      u.email.toUpperCase().includes(upperSearch) ||
      u.username.toUpperCase().includes(upperSearch) ||
      u.name.toUpperCase().includes(upperSearch)
    );
  };

  const isSelected = (u: User) => users.some((s) => s.id === u.id);

  return (
    <KeyboardAwareScrollView>
      <Input
        icon={Search}
        placeholder="Buscar por nome, email ou username"
        value={search}
        onChangeText={handleSearch}
      />
      {users.length > 0 && (
        <ScrollView
          horizontal
          nestedScrollEnabled
          contentContainerStyle={styles.selectedUsersContainer}
        >
          {users.map((u) => (
            <SelectedUser key={u.id} user={u} handleRemove={handleRemove} />
          ))}
        </ScrollView>
      )}
      <ScrollView nestedScrollEnabled>
        {userList && userList.length > 0 ? (
          userList
            .filter((f) => filter(f.friend))
            .map((f) => (
              <FriendListItem
                key={f.id}
                friend={f}
                variant="select"
                onPress={() =>
                  isSelected(f.friend)
                    ? handleRemove(f.friend)
                    : handleSelect(f.friend)
                }
                selected={users.includes(f.friend)}
              />
            ))
        ) : (
          <View>
            <ThemedText>Sem amigos para convidar :(</ThemedText>
          </View>
        )}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  selectedUsersContainer: {
    paddingVertical: 12,
    gap: 8,
  },
  selectedUserImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  selectedUserName: {
    width: 72,
    textAlign: "center",
  },
  selectedUserRemoveIndicator: {
    padding: 4,
    borderRadius: 1000,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: Colors.backgroundTertiary,
    zIndex: 10,
  },
  noFriendsMessageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SelectUsers;
