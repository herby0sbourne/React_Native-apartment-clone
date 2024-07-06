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
import { useEffect, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { transform } from "@babel/core";

type RootStackParamList = {
  "map.screen": { properties: Property[] };
};

type MapScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "map.screen"
>;
type MapScreenRouteProp = RouteProp<RootStackParamList, "map.screen">;

const Page = () => {
  // const flatListRef = useAnimatedRef<Animated.FlatList>();
  // const scrollOffset = useScrollViewOffset(flatListRef);

  const navigation = useNavigation();
  const route = useRoute();
  const [isMap, setIsMap] = useState(false);
  const bottomHeight = useBottomTabBarHeight();

  const translateY = useState(new Animated.Value(50))[0];

  const handleMapNavigation = () => {
    navigation.navigate("map.screen", {
      properties,
      lat: +route?.params?.lat,
      lng: +route?.params?.lng,
    });
  };

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isMap ? 0 : 50,
      duration: 500,
      useNativeDriver: true,
    }).start();

    navigation.setOptions({
      tabBarStyle: {
        position: "absolute",
        height: 50,
        transform: [{ translateY }],
      },
    });
  }, [isMap, navigation, translateY]);
  // console.log(bottomHeight);

  return (
    <>
      <SafeArea>
        <StatusBar translucent={false} barStyle={"dark-content"} />
        <SearchHeader
          // scrollOffset={scrollOffset}
          mapBtn={handleMapNavigation}
          isMap={false}
        />

        <View
          style={{
            flex: 1,
            backgroundColor: "pink",
            position: "absolute",
            zIndex: 100,
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => setIsMap(!isMap)}
            style={{ backgroundColor: "purple" }}
          >
            <Text>click</Text>
          </TouchableOpacity>
        </View>

        {/*<Animated.FlatList*/}
        {/*  ref={flatListRef}*/}
        {/*  data={properties}*/}
        {/*  style={{ backgroundColor: "white" }}*/}
        {/*  renderItem={({ item }) => <PropertyCard property={item} />}*/}
        {/*  keyExtractor={item => item.id.toString()}*/}
        {/*  contentContainerStyle={[{ gap: 10, paddingHorizontal: 10 }]}*/}
        {/*  showsVerticalScrollIndicator={false}*/}
        {/*  scrollEventThrottle={16}*/}
        {/*  bounces={false}*/}
        {/*/>*/}
      </SafeArea>
    </>
  );
};

const styles = StyleSheet.create({});

export default Page;
