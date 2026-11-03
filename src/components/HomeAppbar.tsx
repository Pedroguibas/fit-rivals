import Colors from "@/constants/Colors";
import { Link, usePathname } from "expo-router";
import { Bell, Trophy } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import Logo from "./Logo";

const HomeAppbar = () => {
  const pathname = usePathname();

  if (pathname == "/app/profile") return null;

  return (
    <View style={styles.container}>
      <Logo style={{ height: 40 }} />
      <View style={styles.links}>
        <Link asChild href="/app/notifications">
          <Bell color={Colors.foregroundTertiary} />
        </Link>
        {pathname == "/app/social" && (
          <Link asChild href="/app/leaderboard">
            <Trophy color={Colors.foregroundTertiary} />
          </Link>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  links: {
    position: "absolute",
    right: 16,
    top: 0,
    bottom: 0,
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 12,
  },
});

export default HomeAppbar;
