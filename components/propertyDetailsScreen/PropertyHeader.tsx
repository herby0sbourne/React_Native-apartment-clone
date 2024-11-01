import { Share, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { UtilStyles } from "@/constants/UtilStyles";
import { abvState } from "@/utils/abbrevState";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface PropertyHeaderProps {
  property: Property;
}

const PropertyHeader = ({ property }: PropertyHeaderProps) => {
  const [heartIcon, setHeartIcon] = useState<"heart" | "heart-outline">("heart-outline");

  const handleHeartPress = () => {
    if (heartIcon === "heart") {
      return setHeartIcon("heart-outline");
    }

    setHeartIcon("heart");
  };

  const shareItem = async () => {
    try {
      await Share.share({
        message: "Check out this apartment online",
      });
    } catch (e) {
      alert("Sorry, we're unable to share");
    }
  };

  return (
    <>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{property.name}</Text>
      <View style={[UtilStyles.row, { marginTop: 10 }]}>
        <View>
          <Text style={{ marginRight: 8 }}>{property.street}</Text>
          <Text>
            {property.city}, {abvState(property.state)} {property.zip}
          </Text>
        </View>
        <View style={[UtilStyles.flex, { gap: 20 }]}>
          <Ionicons
            onPress={shareItem}
            name={"share-social"}
            size={30}
            color={Colors.primary}
          />
          <Ionicons
            onPress={handleHeartPress}
            name={heartIcon}
            size={30}
            color={Colors.primary}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default PropertyHeader;
