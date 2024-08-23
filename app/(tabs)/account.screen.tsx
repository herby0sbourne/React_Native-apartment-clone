import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "expo-router";

import SafeArea from "@/components/SafeArea";
import SignUpAndSignInBtn from "@/components/SignUpAndSignInBtn";
import ButtonList from "@/components/ButtonList";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";

const firstSignedOutBtns = [
  { label: "Add property", onPress: () => console.log("navigate to add property") },
  {
    label: "View My Property",
    onPress: () => console.log("navigate to View My Property"),
  },
];

const supportBtns = [
  { label: "Help Center", onPress: () => console.log("navigate to Help Center") },
  {
    label: "Terms and Condition",
    onPress: () => console.log("navigate to Terms and Condition"),
  },
];

const rentingBtns = [
  {
    label: "Favorite Properties",
    onPress: () => console.log("navigate to Favorite Properties"),
  },
  {
    label: "Rental Applications",
    onPress: () => console.log("navigate to Rental Applications"),
  },
  { label: "My Residences", onPress: () => console.log("navigate to My Residences") },
  { label: "Rent Payments", onPress: () => console.log("navigate to Rent Payments") },
];

const accountBtns = [
  {
    label: "Account Settings",
    onPress: () => console.log("navigate to Account Settings"),
  },
  { label: "Billing History", onPress: () => console.log("navigate to Billing History") },
  { label: "Banks and Cards", onPress: () => console.log("navigate to Banks and Cards") },
];

const rentalManagementBtns = [
  { label: "add a Property", onPress: () => console.log("navigate to AddProperty") },
  {
    label: "add apartment to property",
    onPress: () => console.log("navigate to MyProperties"),
  },
  { label: "View My Property", onPress: () => console.log("navigate to ViewProperties") },
];

const Page = () => {
  const user = true;
  const navigation = useNavigation();
  return (
    <SafeArea>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 10 }}>
          {user ? (
            <>
              <Text style={styles.userName}>Welcome, user's FirstName</Text>
              <Text style={styles.email}>user@example.com</Text>
            </>
          ) : (
            <>
              <Text style={styles.header}>Renting has never been easier!</Text>
              <SignUpAndSignInBtn />
              <View style={styles.detailsWrapper}>
                <Text style={styles.title}>Are you a property owner or manager?</Text>
                <Text style={styles.bodyText}>
                  Visit our website to access our full suite of rental management tools
                  and start receiving application in minutes
                </Text>
              </View>
            </>
          )}
        </View>
        {user ? (
          <>
            <ButtonList data={rentingBtns} header="Rental Made Easy" />
            <ButtonList data={accountBtns} header="My Account" />
            <ButtonList data={rentalManagementBtns} header="Rental Management Tools" />
            <ButtonList data={supportBtns} header="Support" />
            <ButtonList data={supportBtns} header="Support" />
            <View style={styles.wrapper}>
              <Button
                title={"Sign Out"}
                ghostBtn
                // extraStyle={styles.button}
                onPress={() => console.log("log user out")}
              />
            </View>
          </>
        ) : (
          <>
            <ButtonList data={firstSignedOutBtns} borderTop />
            <ButtonList data={supportBtns} header={"Support"} marginTop />
            <Text style={styles.brandText}>Clone Version 1.0.0</Text>
          </>
        )}
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  userName: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 5,
    textTransform: "capitalize",
  },
  email: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 20,
  },
  header: {
    fontSize: 25,
    textAlign: "center",
    marginVertical: 25,
    fontWeight: "bold",
  },
  detailsWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 50,
    borderTopColor: "gray",
    borderTopWidth: 1,
    marginTop: 12,
  },
  title: {},
  bodyText: {
    marginTop: 10,
    textAlign: "center",
    marginHorizontal: 15,
  },
  wrapper: {
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  button: {
    marginBottom: 15,
    borderColor: Colors.primary,
  },
  brandText: {
    color: "#bdbdbd",
    textAlign: "center",
  },
});

export default Page;
