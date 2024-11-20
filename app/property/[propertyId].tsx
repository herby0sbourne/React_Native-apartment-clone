import SafeArea from "@/components/SafeArea";
import { properties } from "@/data/properties";
import { useLocalSearchParams } from "expo-router";

import { FlatList, Text, View } from "react-native";
import ImageCarousel from "@/components/ImageCarousel";
import PropertyHeader from "@/components/propertyDetailsScreen/PropertyHeader";
import Divider from "@/components/Divider";
import PricingAndFloorPlan from "@/components/propertyDetailsScreen/PricingAndFloorPlan";
import AboutSection from "@/components/propertyDetailsScreen/AboutSection";

const PropertyScreen = () => {
  const { propertyId } = useLocalSearchParams<{ propertyId: string }>();

  const property = properties.find((property) => +propertyId === property.id);

  if (!property) {
    return <Text>Property not found</Text>;
  }

  return (
    <SafeArea>
      <FlatList
        data={[property]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <>
              {item.images && <ImageCarousel images={item.images} />}
              <View style={{ flex: 1, padding: 10 }}>
                <PropertyHeader property={item} />
                <Divider style={{ marginTop: 10 }} />
                <PricingAndFloorPlan property={item} />
                <Divider style={{ marginTop: 10 }} />
                <AboutSection property={item} />
                <Divider style={{ marginTop: 10 }} />
              </View>
            </>
          );
        }}
      />
    </SafeArea>
  );
};

export default PropertyScreen;
