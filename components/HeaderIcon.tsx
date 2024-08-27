import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const HeaderIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name={"close"} size={26} color={"black"} />
    </TouchableOpacity>
  );
};
export default HeaderIcon;
const styles = StyleSheet.create({});
