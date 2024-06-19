import SafeArea from "@/components/SafeArea";
import Colors from "@/constants/Colors";
import utils from "@/constants/UtilStyles";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useRef, useState } from "react";
import Button from "@/components/Button";

const width = Dimensions.get("window").width;

const property = {
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
};

const Page = () => {
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
    <SafeArea style={{ paddingHorizontal: 10 }}>
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
            renderItem={data => (
              <Image source={{ uri: data.item }} style={styles.image} />
            )}
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
          <View style={utils.row}>
            <Text style={{ fontWeight: "600", fontSize: 17 }}>
              <Text>${property.rentLow.toLocaleString()} </Text>
              <Text>- {property.rentHigh.toLocaleString()}</Text>
            </Text>
            <Ionicons name="heart-outline" size={24} color={Colors.primary} />
          </View>
          <Text>
            {property.bedRoomLow} - {property.bedRoomHigh} Beds
          </Text>
          <View style={{ marginVertical: 8 }}>
            <Text>{property.name}</Text>
            <Text>{property.street}</Text>
            <Text>
              {property.city}, {property.state.substring(0, 2).toUpperCase()}{" "}
              {property.zip}
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
          <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
            <Button title={"Email"} />
            <Button title={"Call"} ghostBtn={false} />
          </View>
        </View>
      </View>
    </SafeArea>
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
});

export default Page;
