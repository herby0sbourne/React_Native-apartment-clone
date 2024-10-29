import { router } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";

import PropertyCard from "@/components/PropertyCard";
import EmptyContent from "@/components/EmptyContent";
import SignUpAndSignInBtn from "@/components/SignUpAndSignInBtn";

export interface TopTabProps {
  properties?: Property[];
  user: any;
}

const Favorites = ({ properties: likeProperty, user }: TopTabProps) => {
  if (!likeProperty) {
    return (
      <View style={styles.lottieWrapper}>
        <EmptyContent
          filePath={require("@/assets/lotties/favorites.json")}
          title={"You do not have any favorites saved"}
          subTitle={"Tap the heart icon on rentals to add favorites"}
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
      data={likeProperty}
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

export default Favorites;
