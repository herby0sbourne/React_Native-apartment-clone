import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";

import Divider from "@/components/Divider";
import SafeArea from "@/components/SafeArea";
import ImageCarousel from "@/components/ImageCarousel";
import AboutSection from "@/components/propertyDetailsScreen/AboutSection";
import ContactSection from "@/components/propertyDetailsScreen/ContactSection";
import PropertyHeader from "@/components/propertyDetailsScreen/PropertyHeader";
import PricingAndFloorPlan from "@/components/propertyDetailsScreen/PricingAndFloorPlan";

import { properties } from "@/data/properties";

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
                <PropertyHeader
                  address={{
                    name: item.name,
                    street: item.street,
                    city: item.city,
                    state: item.state,
                    zip: item.zip,
                  }}
                />
                <Divider style={{ marginTop: 10 }} />
                <PricingAndFloorPlan property={item} />
                <Divider style={{ marginTop: 10 }} />
                <AboutSection property={item} />
                <Divider style={{ marginTop: 10 }} />
                <ContactSection
                  propertyId={`${item.id}`}
                  phoneNumber={item.phoneNumber}
                  website={item.website}
                />
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
