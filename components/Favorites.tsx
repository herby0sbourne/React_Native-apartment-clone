import { FlatList, StyleSheet, Text, View } from "react-native";
import PropertyCard from "@/components/PropertyCard";
import EmptyContent from "@/components/EmptyContent";
import SignUpAndSignInBtn from "@/components/SignUpAndSignInBtn";

const Favorites = ({ likeProperty, user }) => {
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

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={likeProperty}
      contentContainerStyle={{ paddingVertical: 10, gap: 10 }}
      renderItem={({ item }) => <PropertyCard property={item} />}
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
