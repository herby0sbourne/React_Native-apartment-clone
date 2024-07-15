import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

import Colors from "@/constants/Colors";
import { UtilStyles } from "@/constants/UtilStyles";

interface RecentSearchProps {
  title: string;
  onPress: () => void;
  extraStyle?: ViewStyle;
}

const RecentSearchItem = ({ title, onPress, extraStyle }: RecentSearchProps) => {
  return (
    <TouchableOpacity style={[UtilStyles.flex, styles.btn, extraStyle]} onPress={onPress}>
      <MaterialCommunityIcons
        name="clock-time-three-outline"
        size={24}
        color={Colors.primary}
      />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10,
    gap: 6,
    marginTop: 8,
  },
});
export default RecentSearchItem;
