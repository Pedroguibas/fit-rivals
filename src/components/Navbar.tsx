import Colors from "@/constants/Colors";
import { Href, router, usePathname } from "expo-router";
import { LucideIcon, Plus } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Button from "./ui/Button";

export type PageType = {
  page: string;
  route: Href;
  icon: LucideIcon;
  actionButtonIcon: LucideIcon | undefined;
  actionButtonAction: undefined | (() => void);
};

export type NavbarProps = {
  pages: PageType[];
};

const Navbar = ({ pages }: NavbarProps) => {
  const pathname = usePathname();

  const [current, setCurrent] = useState(
    pages.find((p) => p.route == pathname),
  );

  useEffect(() => {
    setCurrent(pages.find((p) => p.route == pathname));
  }, [pathname]);

  return (
    <View>
      <View style={styles.navbar}>
        <View style={styles.nav}>
          {pages.map((p, idx) => (
            <NavButton page={p} key={idx} active={p.route == pathname} />
          ))}
        </View>
        <Button
          onPress={current?.actionButtonAction}
          variant="action"
          style={{ height: "100%" }}
        >
          {current && current.actionButtonIcon ? (
            <current.actionButtonIcon color={Colors.foregroundSecondary} />
          ) : (
            <Plus color={Colors.foregroundSecondary} />
          )}
        </Button>
      </View>
    </View>
  );
};

const BUTTON_ANIMATION_DURATION = 200;

const NavButton = ({ active, page }: { active: boolean; page: PageType }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.3);

  const focus = () => {
    opacity.value = withTiming(1, { duration: BUTTON_ANIMATION_DURATION });
    scale.value = withTiming(1, { duration: BUTTON_ANIMATION_DURATION });
  };

  const blur = () => {
    opacity.value = withTiming(0, { duration: BUTTON_ANIMATION_DURATION });
    scale.value = withTiming(0.3, { duration: BUTTON_ANIMATION_DURATION });
  };

  useEffect(() => {
    if (active) focus();
    else blur();
  }, [active]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      disabled={active}
      onPress={() => router.replace(page.route)}
      style={styles.button}
    >
      <page.icon color={Colors.foregroundSecondary} />
      <Animated.View style={[styles.active, animatedStyle]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "visible",
  },
  navbar: {
    position: "absolute",
    bottom: 8,
    left: -8,
    right: -8,
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  nav: {
    backgroundColor: Colors.backgroundSecondary,
    flexDirection: "row",
    padding: 6,
    gap: 8,
    borderRadius: 1000,
    flex: 1,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 1000,
    overflow: "hidden",
  },
  active: {
    backgroundColor: Colors.backgroundTertiary,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    borderRadius: 1000,
  },
});

export default Navbar;
