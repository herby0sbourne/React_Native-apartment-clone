import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { UtilStyles } from "@/constants/UtilStyles";
import Colors from "../constants/Colors";

interface SearchBtnOptionProps {
  title: string;
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  // iconName?: string;
  onPress: () => void;
}

const SearchBtnOption = ({ title, iconName, onPress }: SearchBtnOptionProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[UtilStyles.flex, { gap: 5, minWidth: 54 }]}
    >
      {iconName && <Ionicons name={`${iconName}`} size={20} color={Colors.info} />}
      <Text style={styles.btnTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnTitle: {
    color: Colors.info,
    fontWeight: "600",
  },
});
export default SearchBtnOption;
