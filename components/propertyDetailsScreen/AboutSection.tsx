import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import BulletedList from "../BulletedList";

interface AboutSectionProps {
  property: Property;
}

const AboutSection = ({ property }: AboutSectionProps) => {
  return (
    <>
      <Text style={styles.header}>About</Text>
      <View style={styles.row}>
        <MaterialIcons
          name="apartment"
          size={24}
          color={"#36454f"}
          // style={{ marginTop: -8 }}
        />
        <Text style={styles.propertyName}>{property.name}</Text>
      </View>
      <Text>{property.about}</Text>
      {/* UNIQUE FEATURES */}
      <>
        <View style={styles.row}>
          <MaterialIcons name="star-outline" size={26} color={"black"} />
          <Text style={styles.uniqueFeaturesText}>Unique Features</Text>
        </View>
        <View style={styles.bulletsListContainer}>
          {property.features ? (
            <BulletedList data={[...property.tags, ...property.features]} />
          ) : (
            <BulletedList data={property.tags} />
          )}
        </View>
      </>
    </>
  );
};

const styles = StyleSheet.create({
  textStyle: {},
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  propertyName: {
    paddingLeft: 10,

    fontWeight: "bold",
    fontSize: 22,
  },
  uniqueFeaturesText: {
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: 22,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  bulletsListContainer: {
    paddingHorizontal: 5,
  },
});

export default AboutSection;
