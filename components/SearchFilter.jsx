import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { filterBtn } from "@/constants/filterBtn";

const SearchFilter = () => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 10 }}
    >
      <View style={styles.btnOutline}>
        <Ionicons name={"filter"} size={20} color={Colors.primary} />
      </View>
      {filterBtn.map(item => (
        <TouchableOpacity
          key={item.label}
          style={[styles.btnOutline, { paddingHorizontal: 10, borderRadius: 15 }]}
          onPress={item.onPress}
        >
          <Text style={styles.filterText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filterText: {
    fontWeight: "600",
    color: Colors.primary,
  },
  btnOutline: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,
  },
});
export default SearchFilter;
