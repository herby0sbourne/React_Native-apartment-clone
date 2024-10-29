import { router } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";

import EmptyContent from "@/components/EmptyContent";
import { TopTabProps } from "@/components/Favorites";
import PropertyCard from "@/components/PropertyCard";
import SignUpAndSignInBtn from "@/components/SignUpAndSignInBtn";

const Contact = ({ properties: contactProperty, user }: TopTabProps) => {
  if (!contactProperty) {
    return (
      <View style={styles.lottieWrapper}>
        <EmptyContent
          filePath={require("@/assets/lotties/contacted.json")}
          title={"You have not contacted any properties yet"}
          subTitle={"Contacted properties will show here"}
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
      data={contactProperty}
      contentContainerStyle={{ paddingVertical: 10, gap: 10 }}
      renderItem={({ item }) => (
        <PropertyCard property={item} onPress={() => navigateToPropertyDetails} />
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

export default Contact;
