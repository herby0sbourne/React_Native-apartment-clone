import { useState } from "react";
import { useNavigation } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { Formik } from "formik";
import { object, string } from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Button from "@/components/Button";
import SafeArea from "@/components/SafeArea";
import CustomInput from "@/components/CustomInput";

const Page = () => {
  const navigation = useNavigation();
  const [emailSent, setEmailSent] = useState(false);

  return (
    <KeyboardAwareScrollView bounces={false} style={{ backgroundColor: "white" }}>
      <SafeArea style={styles.container}>
        {emailSent ? (
          <>
            <Text style={styles.title}>Email Sent</Text>
            <Text style={styles.subTitle}>
              An email containing instructions an how to change your password has been
              sent to your email. Please check your junk mail or spam if you do not see an
              email
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>Forgot your password?</Text>
            <Text style={styles.subTitle}>
              Please enter your email, and we'll send you a link to change your password.
            </Text>
            <Formik
              initialValues={{ email: "" }}
              onSubmit={(values) => {
                console.log("send submit data to the server", values);
                setEmailSent(true);
              }}
              validationSchema={object().shape({
                email: string().email().required("Your email is required"),
              })}
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
                      value={values.email}
                      label={"Email"}
                      onChangeText={handleChange("email")}
                      onBlur={() => setFieldTouched("email")}
                      placeholder={"Your Email Address"}
                      autoComplete={"email"}
                      keyboardType={"email-address"}
                      textContentType={"emailAddress"}
                      autoCapitalize="none"
                      caption={touched.email && errors.email ? errors.email : undefined}
                      status={touched.email && errors.email ? "danger" : "basic"}
                    />
                    <Button
                      title={"Send Email"}
                      ghostBtn={false}
                      onPress={() => handleSubmit()}
                    />
                  </>
                );
              }}
            </Formik>
          </>
        )}
      </SafeArea>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 18,
  },
  subTitle: {
    marginTop: 10,
    // textAlign: "center",
    paddingHorizontal: 10,
    fontSize: 15,
    marginBottom: 20,
  },
});

export default Page;
