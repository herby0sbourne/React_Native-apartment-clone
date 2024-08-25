import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { useNavigation } from "expo-router";

interface ButtonListProps {
  data: { label: string; screenName: string | (() => void) }[];
  header?: string;
  extraStyle?: ViewStyle | ViewStyle[];
  borderTop?: boolean;
  marginTop?: boolean;
}

interface BtnHeaderProps extends Pick<ButtonListProps, "header" | "marginTop"> {}

const BtnHeader = ({ header, marginTop }: BtnHeaderProps) => {
  if (!header) return null;
  const marginTopWidth = marginTop && { marginTop: 35 };

  return (
    <View style={[styles.headerContainer, marginTopWidth]}>
      <Text style={styles.headerText}>{header}</Text>
    </View>
  );
};

const ButtonList = ({
  data,
  header,
  extraStyle,
  borderTop,
  marginTop,
}: ButtonListProps) => {
  const navigation = useNavigation();
  const borderTopWidth = borderTop && { borderTopWidth: 1 };

  const navigateToScreen = (screenName: string | (() => void)) => {
    if (typeof screenName === "string") {
      return navigation.navigate(screenName);
    }
    return screenName();
  };

  return (
    <View style={[styles.container, extraStyle, borderTopWidth]}>
      <BtnHeader header={header} marginTop={marginTop} />
      {data.map(({ label, screenName }, index) => {
        return (
          <Pressable
            key={label}
            onPress={() => navigateToScreen(screenName)}
            style={({ pressed }) => [
              styles.option,
              pressed && { backgroundColor: "lightgray" },
              index !== data.length - 1 && styles.container,
            ]}
          >
            <Text>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "lightgray",
    borderBottomWidth: 1,
  },
  headerContainer: {
    paddingVertical: 12,
    backgroundColor: "#f1f7e5",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  headerText: {
    fontWeight: "600",
    marginLeft: 18,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: "#f5f5f5",
  },
});

export default ButtonList;
