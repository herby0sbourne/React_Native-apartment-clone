import { FlatList, StyleSheet, Text, View } from "react-native";
import EmptyContent from "@/components/EmptyContent";
import SignUpAndSignInBtn from "@/components/SignUpAndSignInBtn";
import PropertyCard from "@/components/PropertyCard";

const Application = ({ applicationProperty, user }) => {
  if (!applicationProperty) {
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

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={applicationProperty}
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

export default Application;
