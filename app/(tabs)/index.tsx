import SafeArea from "@/components/SafeArea";
import { FlatList, StyleSheet } from "react-native";

import PropertyCard from "@/components/PropertyCard";

const properties = [
  {
    id: "1",
    images: [
      "https://www.loans.com.au/dA/9de8aa8d51/what-factors-affect-property-value.png",
      "https://www.bankrate.com/2019/08/27171217/5-tips-for-financing-for-investment-property.jpeg?auto=webp&optimize=high&crop=16:9",
    ],
    rentLow: 3750,
    rentHigh: 31054,
    bedRoomLow: 1,
    bedRoomHigh: 5,
    name: "The Hamilton",
    street: "555 NE 34Th St",
    city: "Miami",
    state: "Florida",
    zip: "33137",
    tags: ["Parking", "Pets", "Wifi"],
  },
  {
    id: "2",
    images: [
      "https://www.loans.com.au/dA/9de8aa8d51/what-factors-affect-property-value.png",
      "https://www.bankrate.com/2019/08/27171217/5-tips-for-financing-for-investment-property.jpeg?auto=webp&optimize=high&crop=16:9",
    ],
    rentLow: 3750,
    rentHigh: 31054,
    bedRoomLow: 1,
    bedRoomHigh: 5,
    name: "The Hamilton",
    street: "555 NE 34Th St",
    city: "Miami",
    state: "Florida",
    zip: "33137",
    tags: ["Parking", "Pets", "Wifi"],
  },
];

const Page = () => {
  return (
    <SafeArea style={{ paddingHorizontal: 10 }}>
      <FlatList
        data={properties}
        renderItem={({ item }) => <PropertyCard property={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ gap: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({});

export default Page;
