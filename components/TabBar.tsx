import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { useState } from "react";
import Colors from "@/constants/Colors";

interface TabBarProps {
  tabs: { title: string; onPress: () => void }[];
  extraStyles?: ViewStyle | ViewStyle[];
}

const TabBar = ({ tabs, extraStyles }: TabBarProps) => {
  const [isActive, setIsActive] = useState(0);

  return (
    <View style={styles.filterOptions}>
      {tabs.map(({ title, onPress }, idx) => (
        <TouchableOpacity
          key={title}
          onPress={() => {
            setIsActive(idx);
            onPress();
          }}
        >
          <View
            style={{
              paddingHorizontal: 8,
              paddingVertical: 8,
              borderColor: Colors.primary,
              borderRightWidth: idx < tabs.length - 1 ? 1 : 0,
              backgroundColor: isActive === idx ? Colors.primary : "white",
            }}
          >
            <Text
              style={{
                color: isActive === idx ? "white" : Colors.primary,
                fontWeight: "600",
              }}
            >
              {title}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filterOptions: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.primary,
    width: 275,
    borderRadius: 6,
    overflow: "hidden",
    marginVertical: 10,
  },
});
export default TabBar;
