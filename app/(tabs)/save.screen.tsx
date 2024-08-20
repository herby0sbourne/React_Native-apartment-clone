import { useState } from "react";
import { StyleSheet, View } from "react-native";

import SafeArea from "@/components/SafeArea";
import Button from "@/components/Button";
import Contact from "@/components/Contact";
import Favorites from "@/components/Favorites";
import Application from "@/components/Application";

import { properties } from "@/data/properties";
import { UtilStyles } from "@/constants/UtilStyles";

const Page = () => {
  const [activeBtn, setActiveBtn] = useState<Number>(0);
  const user = false;
  const likeProperty = undefined;
  const contactProperty = undefined;
  const applicationProperty = undefined;

  const handleClick = (btnIdx: number) => {
    setActiveBtn(btnIdx);
  };

  const displayScreen = {
    0: <Favorites likeProperty={likeProperty} user={user} />,
    1: <Contact contactProperty={contactProperty} user={user} />,
    2: <Application applicationProperty={applicationProperty} user={user} />,
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
          title={"Applications"}
          ghostBtn={!(activeBtn === 2)}
          extraStyle={styles.rightRadius}
          onPress={() => handleClick(2)}
        />
      </View>
      {displayScreen[activeBtn as keyof typeof displayScreen]}
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
});
export default Page;
