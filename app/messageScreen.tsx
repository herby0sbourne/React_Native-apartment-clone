import { properties } from "@/data/properties";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { abvState } from "@/utils/abbrevState";
import { Formik } from "formik";
import useAuth from "@/hooks/useAuth";
import { object, string } from "yup";
import CustomInput from "@/components/CustomInput";
import { captionStatus } from "@/utils/captionStatus";
import Button from "@/components/Button";

// import RNDateTimePicker from "@react-native-community/datetimepicker";

interface SearchParams extends Record<string, string | undefined> {
  propertyId: string;
  tour?: boolean;
}

const MessageScreen = () => {
  const { user } = useAuth();
  const [pickedDate, setPickedDate] = useState<Date>(new Date());
  const [showCalender, setShowCalender] = useState(false);
  const { propertyId, tour } = useLocalSearchParams() as SearchParams;
  const property = properties.find((property) => +propertyId === property.id);

  if (!property) {
    router.back();
    return null;
  }

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
        <Formik
          initialValues={{
            firstName: user ? user.firstName : "",
            lastName: user?.lastName ?? "",
            phoneNumber: "",
            email: user?.email ?? "",
            message: tour ? "I would like to schedule a tour." : "",
          }}
          validationSchema={object().shape({
            firstName: string().required("Your first name is required"),
            lastName: string().required("Your last name is required"),
            email: string().email().required("Your email is required"),
            phoneNumber: string(),
            message: string().required("Required"),
          })}
          onSubmit={(values) => {
            console.log("message log", values);
            // router.back()
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldTouched,
            setFieldValue,
          }) => {
            return (
              <>
                <CustomInput
                  label={"First Name*"}
                  value={values.firstName}
                  keyboardType={"default"}
                  onChangeText={handleChange("firstName")}
                  onBlur={() => setFieldTouched("firstName")}
                  placeholder={"Your First Name"}
                  autoCapitalize="none"
                  caption={captionStatus(touched, errors, "firstName").caption}
                  status={captionStatus(touched, errors, "firstName").status}
                />
                <CustomInput
                  label={"Last Name*"}
                  value={values.lastName}
                  onChangeText={handleChange("lastName")}
                  onBlur={() => setFieldTouched("lastName")}
                  placeholder={"Your Last Name"}
                  autoCapitalize="none"
                  caption={captionStatus(touched, errors, "lastName").caption}
                  status={captionStatus(touched, errors, "lastName").status}
                />
                <CustomInput
                  value={values.phoneNumber}
                  onChangeText={handleChange("phoneNumber")}
                  placeholder="Your phone Number"
                  label="Phone Number"
                  keyboardType={"number-pad"}
                />
                <CustomInput
                  label={"Email*"}
                  value={values.email}
                  keyboardType={"email-address"}
                  onChangeText={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                  placeholder={"Your email"}
                  autoCapitalize="none"
                  caption={captionStatus(touched, errors, "email").caption}
                  status={captionStatus(touched, errors, "email").status}
                />

                <View style={styles.label}>
                  <Text>Move-In Date</Text>
                  <Pressable
                    style={styles.pickedDate}
                    onPress={() => setShowCalender(true)}
                  >
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
                <CustomInput
                  label={"Message*"}
                  value={values.message}
                  keyboardType={"default"}
                  onChangeText={handleChange("message")}
                  onBlur={() => setFieldTouched("message")}
                  placeholder={"Your message"}
                  autoCapitalize="none"
                  multiline={true}
                  numberOfLines={4}
                  extraStyle={styles.messageInput}
                  caption={captionStatus(touched, errors, "message").caption}
                  status={captionStatus(touched, errors, "message").status}
                />

                <Button
                  title={"Send Message"}
                  ghostBtn={false}
                  onPress={() => handleSubmit()}
                />
              </>
            );
          }}
        </Formik>
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
