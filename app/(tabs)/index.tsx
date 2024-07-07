import { useNavigation } from "expo-router";
import { RouteProp, useRoute } from "@react-navigation/core";
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import SafeArea from "@/components/SafeArea";
import SearchHeader from "@/components/SearchHeader";

import { properties } from "@/data/properties";
import { Property } from "@/types/property";
import { useEffect, useRef, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Map from "@/components/Map";
import { useAnimatedRef } from "react-native-reanimated";
import PropertyCard from "@/components/PropertyCard";

type RootStackParamList = {
  "map.screen": { properties: Property[] };
};

type MapScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "map.screen"
>;
type MapScreenRouteProp = RouteProp<RootStackParamList, "map.screen">;

const Page = () => {
  const flatListRef = useAnimatedRef<Animated.FlatList>();
  // const scrollOffset = useScrollViewOffset(flatListRef);

  const navigation = useNavigation();
  const route = useRoute();
  const [isMap, setIsMap] = useState(false);
  const bottomHeight = useBottomTabBarHeight();

  // const translateY = useState(new Animated.Value(50))[0];
  // const translateY = useState(new Animated.Value(50))[0];
  const translateY = useRef(new Animated.Value(50)).current;
  const isInitialRender = useRef(true);

  const handleMapNavigation = () => {
    navigation.navigate("map.screen", {
      properties,
      lat: +route?.params?.lat,
      lng: +route?.params?.lng,
    });
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    Animated.timing(translateY, {
      toValue: !isMap ? 0 : 50,
      duration: 500,
      useNativeDriver: true,
    }).start();

    navigation.setOptions({
      tabBarStyle: {
        position: "absolute",
        // height: 50,
        transform: [{ translateY }],
      },
    });
  }, [isMap, navigation]);
  // console.log(bottomHeight);

  return (
    <>
      <SafeArea>
        <StatusBar translucent={false} barStyle={"dark-content"} />
        <SearchHeader
          // scrollOffset={scrollOffset}
          mapBtn={handleMapNavigation}
          isMap={isMap}
          setIsMap={setIsMap}
        />

        {isMap ? (
          <Map properties={properties} />
        ) : (
          <Animated.FlatList
            ref={flatListRef}
            data={properties}
            style={{ backgroundColor: "white", marginBottom: bottomHeight }}
            renderItem={({ item }) => <PropertyCard property={item} />}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={[{ gap: 10, paddingHorizontal: 10 }]}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            bounces={false}
          />
        )}
      </SafeArea>
    </>
  );
};

const styles = StyleSheet.create({});

export default Page;
