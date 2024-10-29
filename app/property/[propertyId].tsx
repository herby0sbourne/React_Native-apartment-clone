import SafeArea from "@/components/SafeArea";
import { properties } from "@/data/properties";
import { useLocalSearchParams } from "expo-router";

import { FlatList, Text, View } from "react-native";
import ImageCarousel from "@/components/ImageCarousel";

const PropertyScreen = () => {
  const { propertyId } = useLocalSearchParams<{ propertyId: string }>();

  const property = properties.find((property) => +propertyId === property.id);

  return (
    <SafeArea>
      <FlatList
        data={[property]}
        keyExtractor={(item) => item!.id.toString()}
        renderItem={({ item }) => {
          return (
            <>
              {item.images && <ImageCarousel images={item.images} />}
              <View>
                <Text>its working</Text>
              </View>
            </>
          );
        }}
      />
    </SafeArea>
  );
};

export default PropertyScreen;
