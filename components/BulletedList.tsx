import { StyleSheet, Text, View, ViewStyle } from "react-native";
import BlackDot from "./BlackDot";

interface BulletedListProps {
  data: string[];
  heading?: string;
  extraStyle?: ViewStyle | ViewStyle[];
}

const BulletedList = ({ data, extraStyle, heading }: BulletedListProps) => {
  console.log(data);

  const row = data
    .map((item, index) => {
      if (index % 2 === 0) {
        return (
          <View style={styles.mainRow} key={index}>
            <View style={styles.secondRow}>
              <BlackDot />
              <Text>{item}</Text>
            </View>
            {Boolean(data[index + 1]) && (
              <View style={styles.secondRow}>
                <BlackDot />
                <Text>{data[index + 1]}</Text>
              </View>
            )}
          </View>
        );
      }
      return null;
    })
    .filter(Boolean);

  return (
    <View style={[styles.container, extraStyle]}>
      {heading && <Text style={styles.heading}>{heading}</Text>}
      {row.map((item, index) => {
        return <View key={index}>{item}</View>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 5,

    paddingVertical: 10,
  },
  heading: {
    paddingVertical: 8,
  },
  mainRow: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    alignItems: "flex-start",

    marginBottom: 10,
  },
  secondRow: {
    flexDirection: "row",
    alignItems: "center",

    width: "45%",
  },
});

export default BulletedList;
