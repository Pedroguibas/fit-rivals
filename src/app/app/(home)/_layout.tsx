import Navbar, { PageType } from "@/components/Navbar";
import ThemedSafeAreaView from "@/components/ui/Theme/ThemedSafeAreaView";
import ThemedStack from "@/components/ui/Theme/ThemedStack";
import { router } from "expo-router";
import { Home, User, UserGroup, Users } from "lucide-react-native";

const HomeLayout = () => {
  const pages: PageType[] = [
    {
      page: "Profile",
      route: "/app/profile",
      icon: User,
      actionButtonIcon: undefined,
      actionButtonAction: () => {
        router.push("/app/add_post");
      },
    },
    {
      page: "Groups",
      route: "/app/groups",
      icon: UserGroup,
      actionButtonIcon: undefined,
      actionButtonAction: undefined,
    },
    {
      page: "Home",
      route: "/app",
      icon: Home,
      actionButtonIcon: undefined,
      actionButtonAction: () => {
        router.push("/app/add_post");
      },
    },
    {
      page: "Social",
      route: "/app/social",
      icon: Users,
      actionButtonIcon: undefined,
      actionButtonAction: undefined,
    },
  ];
  return (
    <ThemedSafeAreaView>
      <ThemedStack />
      <Navbar pages={pages} />
    </ThemedSafeAreaView>
  );
};

export default HomeLayout;
