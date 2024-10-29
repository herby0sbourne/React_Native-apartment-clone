import { router } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";

import { TopTabProps } from "@/components/Favorites";
import EmptyContent from "@/components/EmptyContent";
import PropertyCard from "@/components/PropertyCard";
import SignUpAndSignInBtn from "@/components/SignUpAndSignInBtn";

const Application = ({ properties: appliProperty, user }: TopTabProps) => {
  if (!appliProperty) {
    return (
      <View style={styles.lottieWrapper}>
        <EmptyContent
          filePath={require("@/assets/lotties/applications.json")}
          title={"Check the status of your rental applications"}
          subTitle={"Any properties that you have applied to will show here"}
        />
        {!user && <SignUpAndSignInBtn />}
      </View>
    );
  }

  const navigateToPropertyDetails = (id: number) => {
    router.push(`/property/${id}`);
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={appliProperty}
      contentContainerStyle={{ paddingVertical: 10, gap: 10 }}
      renderItem={({ item }) => (
        <PropertyCard
          property={item}
          onPress={() => navigateToPropertyDetails(item.id)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  lottieWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Application;
