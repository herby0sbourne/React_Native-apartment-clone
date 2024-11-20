import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import TabBar from "@/components/TabBar";
import Divider from "@/components/Divider";
import { UtilStyles } from "@/constants/UtilStyles";

interface PricingAndFloorPlanProps {
  property: Property;
}

const PricingAndFloorPlan = ({ property }: PricingAndFloorPlanProps) => {
  const [currentApartment, setCurrentApartment] = useState(property.apartments);

  useEffect(() => {
    if (property.apartments !== currentApartment)
      setCurrentApartment(property.apartments);
  }, [property]);

  const floorPlanOptions = [
    {
      title: "All",
      onPress: () => setCurrentApartment(property.apartments),
    },
    {
      title: "Studio",
      onPress: () => filterByBedroom(0, "eq"),
    },
    {
      title: "1 Bed",
      onPress: () => filterByBedroom(1, "eq"),
    },
    {
      title: "2 Beds",
      onPress: () => filterByBedroom(2, "eq"),
    },
    {
      title: "3+ Beds",
      onPress: () => filterByBedroom(2, "gt"),
    },
  ];

  const filterByBedroom = (bedRooms: number, operator: "eq" | "gt") => {
    if (property.apartments) {
      const filtered = property.apartments.filter((apartment) => {
        return operator === "eq"
          ? apartment.bedrooms === bedRooms
          : apartment.bedrooms > bedRooms;
      });
      setCurrentApartment(filtered);
    }
  };

  return (
    <>
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>Pricing & Floor Plans</Text>
      <View>
        {currentApartment && currentApartment.length > 0 ? (
          <>
            <TabBar tabs={floorPlanOptions} />
            {currentApartment.map((apartment) => (
              <View key={apartment.id} style={styles.container}>
                <View style={styles.roomInfo}>
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {apartment.bedrooms === 0 ? "Studio" : `${apartment.bedrooms} Bed`}{" "}
                      {apartment.bathrooms} Bath
                    </Text>
                    <Text>${apartment.rent.toLocaleString("en-US")}</Text>
                  </View>
                  <View>
                    <Image
                      style={styles.apartmentImage}
                      source={{ uri: apartment.images[0] }}
                    />
                  </View>
                </View>
                <View style={styles.availableProperty}>
                  <Text style={{ fontWeight: "600" }}>Available: Now</Text>
                  <TouchableOpacity
                    onPress={() => console.log("navigate to floor plan details")}
                  >
                    <Text style={styles.planText}>Floor Plan Details</Text>
                  </TouchableOpacity>
                </View>
                <Divider />
                <View style={[UtilStyles.flex]}>
                  <Text style={[styles.flex1, styles.fontWT]}>Unit</Text>
                  <Text style={[styles.flex1, styles.fontWT]}>Price</Text>
                  <Text style={[styles.flex1, styles.fontWT]}>Sq Ft</Text>
                  <Text style={[styles.flex2, styles.fontWT]}>Availability</Text>
                </View>
                <Divider />
                <View style={[UtilStyles.flex]}>
                  <Text style={styles.flex1}>{apartment.unit}:</Text>
                  <Text style={styles.flex1}>
                    ${apartment.rent.toLocaleString("en-US")}
                  </Text>
                  <Text style={styles.flex1}>
                    {apartment.sqFt.toLocaleString("en-US")}
                  </Text>
                  <Text style={styles.flex2}>
                    {new Date().toLocaleString("en", {
                      year: "numeric",
                      month: "2-digit",
                      day: "numeric",
                    })}
                  </Text>
                </View>
              </View>
            ))}
          </>
        ) : (
          <Text>No Apartment Listed</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  roomInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "flex-start",
  },
  apartmentImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  availableProperty: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  planText: {
    color: "#2196f3",
    fontWeight: "600",
  },
  fontWT: {
    fontWeight: "500",
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
});

export default PricingAndFloorPlan;
