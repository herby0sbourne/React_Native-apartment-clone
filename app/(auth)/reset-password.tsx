import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRoute } from "@react-navigation/core";

const ResetPassword = () => {
  const params = useLocalSearchParams();

  console.log("Reset token:", params?.token);
  return (
    <View>
      <Text>ResetPassword</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ResetPassword;
