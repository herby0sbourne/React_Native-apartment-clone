import { useMemo } from "react";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import phoneNumberFormatter from "phone-number-formats";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import Button from "../Button";
import Colors from "@/constants/Colors";
import { UtilStyles } from "@/constants/UtilStyles";

interface ContactSectionProps {
  propertyId: string;
  phoneNumber: string;
  website: string;
}

const ContactSection = ({ propertyId, phoneNumber, website }: ContactSectionProps) => {
  const formattedPhoneNumber = useMemo(() => {
    return new phoneNumberFormatter(phoneNumber).format({
      type: "international",
      separator: "-",
    }).string;
  }, [phoneNumber]);

  const navigateToMessageScreen = (tour = false) => {
    const params = {
      propertyId: propertyId,
    };
    if (tour) {
      params.tour = tour;
    }
    router.push({
      pathname: "messageScreen",
      params,
    });
  };

  return (
    <>
      <Text style={[styles.titleStyle, styles.vertiMar]}>Contact</Text>
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${formattedPhoneNumber}`)}>
        <View style={[UtilStyles.flex, styles.options]}>
          <MaterialIcons name={"smartphone"} color={Colors.info} size={16} />
          <Text style={styles.textStyle}>{formattedPhoneNumber}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(`https:${website}`)}>
        <View style={[UtilStyles.flex, styles.options]}>
          <MaterialIcons name={"web"} color={Colors.info} size={16} />
          <Text style={styles.textStyle}>{website}</Text>
        </View>
      </TouchableOpacity>
      <View style={[UtilStyles.flex, styles.flexGap]}>
        <Button title="Tour" ghostBtn onPress={() => navigateToMessageScreen(true)} />
        <Button title="Message" ghostBtn onPress={() => navigateToMessageScreen()} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  vertiMar: {
    marginVertical: 10,
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 28,
  },
  options: {
    gap: 12,
    marginVertical: 5,
  },
  textStyle: {
    color: Colors.info,
    fontSize: 15,
  },
  flexGap: {
    marginTop: 15,
    gap: 35,
  },
});
export default ContactSection;
