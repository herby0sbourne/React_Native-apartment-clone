import { useState } from "react";
import { object, string } from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { router, useLocalSearchParams } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import useAuth from "@/hooks/useAuth";
import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";

import { abvState } from "@/utils/abbrevState";
import { properties } from "@/data/properties";

// import RNDateTimePicker from "@react-native-community/datetimepicker";

interface SearchParams extends Record<string, string | undefined> {
  propertyId: string;
  tour?: boolean;
}

const schema = object().shape({
  firstName: string().required("Your first name is required"),
  lastName: string().required("Your last name is required"),
  email: string().email().required("Your email is required"),
  phoneNumber: string(),
  message: string().required("Required"),
});

const MessageScreen = () => {
  const { user } = useAuth();
  const [pickedDate, setPickedDate] = useState<Date>(new Date());
  const [showCalender, setShowCalender] = useState(false);
  const { propertyId, tour } = useLocalSearchParams() as SearchParams;
  const property = properties.find((property) => +propertyId === property.id);

  const {
    control,
    handleSubmit,
    formState: { errors, touched },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user ? user.firstName : "",
      lastName: user?.lastName ?? "",
      phoneNumber: "",
      email: user?.email ?? "",
      message: tour ? "I would like to schedule a tour." : "",
    },
  });

  if (!property) {
    router.back();
    return null;
  }

  const onSubmit = (data) => {
    console.log("message log", data);
    // router.back();
  };

  return (
    <KeyboardAwareScrollView>
      {/* <SafeArea> */}
      <View style={styles.container}>
        <View style={styles.flexRow}>
          <Image source={{ uri: property?.images[0] }} style={styles.image} />
          <View style={styles.address}>
            <Text>{property.name}</Text>
            <Text>
              {property.city}, {abvState(property.state)} {property.zip}
            </Text>
            <Text>
              ${property.rentLow.toLocaleString()} - {property.rentHigh.toLocaleString()}{" "}
              | {property.bedroomLow} - {property.bedroomHigh} Beds
            </Text>
          </View>
        </View>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label={"First Name"}
              value={value}
              required
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={"Your First Name"}
              autoCapitalize="none"
              caption={errors.firstName?.message}
              status={errors.firstName ? "error" : "success"}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label={"Last Name"}
              value={value}
              required
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={"Your Last Name"}
              autoCapitalize="none"
              caption={errors.lastName?.message}
              status={errors.lastName ? "error" : "success"}
            />
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              value={value}
              onChangeText={onChange}
              placeholder="Your phone Number"
              label="Phone Number"
              keyboardType={"number-pad"}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label={"Email"}
              required
              value={value}
              keyboardType={"email-address"}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={"Your email"}
              autoCapitalize="none"
              caption={errors.email?.message}
              status={errors.email ? "error" : "success"}
            />
          )}
        />

        <View style={styles.label}>
          <Text>Move-In Date</Text>
          <Pressable style={styles.pickedDate} onPress={() => setShowCalender(true)}>
            <Text style={styles.dateText}>{pickedDate?.toDateString()}</Text>
          </Pressable>
        </View>
        {showCalender && (
          <DateTimePicker
            mode="date"
            value={pickedDate}
            onChange={(event, date) => {
              if (!date) return;

              setPickedDate(date);
              setShowCalender(false);
              console.log(date);
            }}
          />
        )}
        <Controller
          control={control}
          name="message"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label={"Message"}
              value={value}
              required
              keyboardType={"default"}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={"Your message"}
              autoCapitalize="none"
              multiline={true}
              numberOfLines={4}
              extraStyle={styles.messageInput}
              caption={errors.message?.message}
              status={errors.message ? "danger" : "basic"}
            />
          )}
        />

        <Button
          title={"Send Message"}
          ghostBtn={false}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      {/* </SafeArea> */}
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  messageInput: {
    height: 80,
    textAlignVertical: "top",
    paddingTop: 5,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 15,
  },
  image: {
    width: 70,
    height: 50,
  },
  address: {},
  label: {
    marginBottom: 12,
  },
  pickedDate: {
    borderColor: "#e8e8e8e8",
    borderRadius: 3,
    borderWidth: 1,
    height: 40,
    paddingLeft: 15,
    backgroundColor: "#f7f9fc",
  },
  dateText: {
    marginTop: 7,
  },
});
export default MessageScreen;
