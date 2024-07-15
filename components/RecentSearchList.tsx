import { useState } from "react";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { Text, TouchableOpacity, ViewStyle } from "react-native";

import Colors from "@/constants/Colors";
import { Location } from "@/types/locationIQ";
import RecentSearchItem from "./RecentSearchItem";
import { RootStackParamList } from "@/types/navigation";
import getFormattedLocationText from "@/utils/getFormattedLocationText";

interface ShowBtnProps {
  text: string;
  onPress: () => void;
}

const ShowBtn = ({ text, onPress }: ShowBtnProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginTop: 10, marginLeft: 20 }}>
      <Text style={{ color: Colors.info, fontWeight: "bold" }}>{text}</Text>
    </TouchableOpacity>
  );
};

interface RecentSearchListProps {
  recentSearches?: Location[];
  extraStyle?: ViewStyle;
}

const RecentSearchList = ({ recentSearches }: RecentSearchListProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showMore, setShowMore] = useState(false);

  if (!recentSearches) {
    return;
  }

  const handleNavigate = (location: Location) => {
    navigation.navigate("index", {
      location: getFormattedLocationText(location),
      lat: location.lat,
      lng: location.lon,
      boundingBox: location.boundingbox,
    });
  };

  const displaySearches = showMore ? recentSearches : recentSearches.slice(0, 2);

  return (
    <>
      {displaySearches.map((item, idx) => {
        return (
          <RecentSearchItem
            key={item.display_name + idx}
            title={getFormattedLocationText(item)}
            onPress={() => handleNavigate(item)}
          />
        );
      })}
      {!showMore && <ShowBtn text="See More" onPress={() => setShowMore(true)} />}
      {showMore && <ShowBtn text="See Less" onPress={() => setShowMore(false)} />}
    </>
  );
};

export default RecentSearchList;
