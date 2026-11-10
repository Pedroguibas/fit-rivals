import HomeAppbar from "@/components/HomeAppbar";
import Navbar, { PageType } from "@/components/ui/Navbar";
import ThemedSafeAreaView from "@/components/ui/Theme/ThemedSafeAreaView";
import ThemedTabs from "@/components/ui/Theme/ThemedTabs";
import { useAuth } from "@/contexts/AuthContext";
import { router, Tabs } from "expo-router";
import { Home, User, UserGroup, UserPlus, Users } from "lucide-react-native";

const HomeLayout = () => {
  const { user } = useAuth();

  const pages: PageType[] = [
    {
      page: "Profile",
      route: "/app/profile",
      icon: user?.picture ? user.picture : User,
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
      actionButtonAction: () => router.push("/app/add_post"),
    },
    {
      page: "Social",
      route: "/app/social",
      icon: Users,
      actionButtonIcon: UserPlus,
      actionButtonAction: () =>
        router.push({
          pathname: "/app/add_friend",
          params: { from: "/app/social" },
        }),
    },
  ];
  return (
    <ThemedSafeAreaView>
      <HomeAppbar />
      <ThemedTabs>
        <Tabs.Screen name="profile" />
        <Tabs.Screen name="index" />
        <Tabs.Screen name="social" />
        <Tabs.Screen name="groups" />
      </ThemedTabs>
      <Navbar pages={pages} />
    </ThemedSafeAreaView>
  );
};

export default HomeLayout;
