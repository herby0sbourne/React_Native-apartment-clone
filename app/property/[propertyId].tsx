import SafeArea from "@/components/SafeArea";
import { properties } from "@/data/properties";
import { useLocalSearchParams } from "expo-router";

import { Text } from "react-native";

const PropertyScreen = () => {
  const {propertyId} = useLocalSearchParams<{ propertyId: string }>();

  const property = properties.find((property) => +propertyId === property.id)

  return (
    <SafeArea>
      <Text> {property?.name}</Text>
    </SafeArea>
  );
};

export default PropertyScreen;
