import { View, Text, FlatList, Image, Dimensions, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { UtilStyles } from "@/constants/UtilStyles";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import { Property } from "@/constants/types";

const width = Dimensions.get("window").width;

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const flatListRef = useRef<FlatList>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const changeIndex = (delta: number) => {
    const newIndex = scrollIndex + delta;
    if (newIndex >= 0 && newIndex < property.images.length) {
      flatListRef.current?.scrollToIndex({
        index: newIndex,
        animated: true,
      });
      setScrollIndex(newIndex);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={{ position: "relative" }}>
        <FlatList
          ref={flatListRef}
          data={property.images}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToAlignment={"center"}
          pagingEnabled={true}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 95 }}
          renderItem={data => <Image source={{ uri: data.item }} style={styles.image} />}
          keyExtractor={item => item.toString()}
        />
        <View style={[styles.iconContainer, { left: 0 }]}>
          <Ionicons
            name={"chevron-back"}
            size={45}
            color={"white"}
            onPress={() => changeIndex(-1)}
          />
        </View>
        <View style={[styles.iconContainer, { right: 0 }]}>
          <Ionicons
            name={"chevron-forward"}
            size={45}
            color={"white"}
            onPress={() => changeIndex(1)}
          />
        </View>
      </View>
      <View style={{ padding: 5 }}>
        <View style={UtilStyles.row}>
          <Text style={{ fontWeight: "600", fontSize: 17 }}>
            <Text>${property.rentLow.toLocaleString()} </Text>
            <Text>- {property.rentHigh.toLocaleString()}</Text>
          </Text>
          <Ionicons name="heart-outline" size={24} color={Colors.primary} />
        </View>
        <Text>
          {property.bedroomLow} - {property.bedroomHigh} Beds
        </Text>
        <View style={{ marginVertical: 8 }}>
          <Text>{property.name}</Text>
          <Text>{property.street}</Text>
          <Text>
            {property.city}, {property.state.substring(0, 2).toUpperCase()} {property.zip}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          {property.tags.map((tag, index) => {
            return (
              <Text key={tag}>
                {tag}
                {index !== property.tags.length - 1 ? ", " : ""}
              </Text>
            );
          })}
        </View>
        <View style={styles.btnWrapper}>
          <Button title={"Email"} />
          <Button title={"Call"} ghostBtn={false} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "gray",
    overflow: "hidden",
    // borderColor: "#D3D3D3",
  },
  image: {
    height: 250,
    width: width,
    // width: "100%",
    // borderTopRightRadius: 6,
    // borderTopLeftRadius: 6,
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    // left: 0,
    // right: 0,
    bottom: 0,
    justifyContent: "center",
    // alignItems: "center",
  },
  btnWrapper: {
    gap: 10,
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "row",
  },
});

export default PropertyCard;
