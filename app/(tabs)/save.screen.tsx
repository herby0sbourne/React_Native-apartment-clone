import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Button from "@/components/Button";
import SafeArea from "@/components/SafeArea";
import EmptyContent from "@/components/EmptyContent";
import PropertyCard from "@/components/PropertyCard";
import SignUpAndSignInBtn from "@/components/SignUpAndSignInBtn";

import { UtilStyles } from "@/constants/UtilStyles";
import { properties } from "@/data/properties";

const Page = () => {
  const [activeBtn, setActiveBtn] = useState<Number>(0);
  const user = false;
  const likeProperty = undefined;
  const contactProperty = undefined;
  const applicationProperty = undefined;

  const handleClick = (btnIdx: number) => {
    setActiveBtn(btnIdx);
  };

  return (
    <SafeArea style={styles.container}>
      <View style={[UtilStyles.flex, { paddingVertical: 10 }]}>
        <Button
          title={"Favorites"}
          ghostBtn={!(activeBtn === 0)}
          extraStyle={styles.leftRadius}
          onPress={() => handleClick(0)}
        />
        <Button
          title={"Contacted"}
          ghostBtn={!(activeBtn === 1)}
          extraStyle={styles.noBorderRadius}
          onPress={() => handleClick(1)}
        />
        <Button
          title={"Application"}
          ghostBtn={!(activeBtn === 2)}
          extraStyle={styles.rightRadius}
          onPress={() => handleClick(2)}
        />
      </View>
      <>
        {likeProperty ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={likeProperty}
            contentContainerStyle={{ paddingVertical: 10, gap: 10 }}
            renderItem={({ item }) => <PropertyCard property={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <View style={styles.lottieWrapper}>
            <EmptyContent
              filePath={require("@/assets/lotties/favorites.json")}
              title={"You do not have any favorites saved"}
              subTitle={"Tap the heart icon on rentals to add favorites"}
            />
            {!user && <SignUpAndSignInBtn />}
          </View>
        )}
      </>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  rightRadius: {
    borderRadius: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  noBorderRadius: {
    borderRadius: 0,
  },
  leftRadius: {
    borderRadius: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  lottieWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Page;
