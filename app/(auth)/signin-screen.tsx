import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import { useNavigation } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";

import Button from "@/components/Button";
import Divider from "@/components/Divider";
import SafeArea from "@/components/SafeArea";
import CustomInput from "@/components/CustomInput";
import AppleButton from "@/components/AppleButton";
import GoogleButton from "@/components/GoogleButton";
import FacebookButton from "@/components/FacebookButton";

import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

const Page = () => {
  // useWarmUpBrowser();
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView bounces={false} style={{ backgroundColor: "white" }}>
      <SafeArea style={styles.container}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            console.log("form values", values);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required("Your email is required"),
            password: Yup.string().required("Your password is required"),
          })}
        >
          {({ values, errors, touched, handleChange, handleSubmit, setFieldTouched }) => {
            return (
              <>
                <CustomInput
                  label={"Email"}
                  value={values.email}
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
                <CustomInput
                  value={values.password}
                  onChangeText={handleChange("password")}
                  placeholder={"Your password"}
                  onBlur={() => setFieldTouched("password")}
                  label={"Password"}
                  password={true}
                  caption={
                    touched.password && errors.password ? errors.password : undefined
                  }
                  status={touched.password && errors.password ? "danger" : "basic"}
                />
                {/*FORGOT PASSWORD*/}
                <TouchableOpacity
                  onPress={() => navigation.navigate("forgot-password")}
                  style={styles.forgotPassword}
                >
                  <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                </TouchableOpacity>
                {/* SUBMIT BUTTON*/}
                <Button
                  title={"Sign In"}
                  ghostBtn={false}
                  onPress={() => handleSubmit()}
                  extraStyle={{ marginTop: 20 }}
                />
                {/*  DIVIDER*/}
                <Divider style={styles.divider}>or</Divider>
                <View style={{ gap: 10 }}>
                  <GoogleButton
                    text={"Continue with Google"}
                    onPress={() => console.log("login with google")}
                    textStyle={{ color: "#36454f" }}
                  />

                  <FacebookButton
                    text={"Continue with Facebook"}
                    onPress={() => console.log("login with facebook")}
                    extraStyle={{ backgroundColor: "#3b5998", borderWidth: 0 }}
                    textStyle={{ marginRight: -16 }}
                  />

                  <AppleButton
                    type={"sign-in"}
                    onPress={() => console.log("login with apple")}
                  />
                </View>
              </>
            );
          }}
        </Formik>
      </SafeArea>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    // backgroundColor: "pink",
    paddingTop: 10,
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginLeft: "auto",
  },
  forgotPasswordText: {
    color: "#398fd2",
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 30,
  },
});

export default Page;
