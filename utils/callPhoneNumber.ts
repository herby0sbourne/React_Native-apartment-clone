import phoneNumberFormatter from "phone-number-formats";
import * as Linking from "expo-linking";

export const formattedPhoneNumber = (phoneNumber: string) => {
  return new phoneNumberFormatter(phoneNumber).format({
    type: "international",
    separator: "-",
  }).string;
};

export const callPhoneNumber = (phoneNumber: string) => {
  Linking.openURL(`tel:${formattedPhoneNumber(phoneNumber)}`);
};
