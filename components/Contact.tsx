import { FlatList, StyleSheet, Text, View } from "react-native";
import EmptyContent from "@/components/EmptyContent";
import SignUpAndSignInBtn from "@/components/SignUpAndSignInBtn";
import PropertyCard from "@/components/PropertyCard";

const Contact = ({ contactProperty, user }) => {
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

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={contactProperty}
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

export default Contact;
