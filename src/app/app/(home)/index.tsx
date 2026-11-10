import ActivityPost from "@/components/ActivityPost";
import LoadingScreen from "@/components/LoadingScreen";
import ThemedText from "@/components/ui/Theme/ThemedText";
import useFeed from "@/hooks/useFeed";
import { ScrollView, View } from "react-native";

const Home = () => {
  const { data: feed, isLoading } = useFeed();

  if (isLoading) return <LoadingScreen />;

  if (!feed || feed.length == 0)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText>Nada a mostrar :/</ThemedText>
      </View>
    );

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        alignItems: "center",
        gap: 16,
        paddingBottom: 120,
      }}
    >
      {feed.map((a) => (
        <ActivityPost activity={a} key={a.id} />
      ))}
      <ThemedText style={{ paddingTop: 24 }} fontSize={20} variant="secondary">
        Isso é tudo :/
      </ThemedText>
    </ScrollView>
  );
};

export default Home;
