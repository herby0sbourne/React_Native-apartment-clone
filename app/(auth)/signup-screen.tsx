import { StyleSheet, View } from "react-native";
import SafeArea from "@/components/SafeArea";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { object, string } from "yup";
import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";
import Divider from "@/components/Divider";
import GoogleButton from "@/components/GoogleButton";
import FacebookButton from "@/components/FacebookButton";
import AppleButton from "@/components/AppleButton";

interface CaptionStatus {
  caption?: string;
  status: "basic" | "danger";
}

interface InputTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type InputKeys = keyof InputTypes;

const captionStatus = (touched, errors, inputName: InputKeys): CaptionStatus => ({
  caption: touched[inputName] && errors[inputName] ? errors[inputName] : undefined,
  status: touched[inputName] && errors[inputName] ? "danger" : "basic",
});

const Page = () => {
  return (
    <KeyboardAwareScrollView bounces={false}>
      <SafeArea style={styles.container}>
        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
          validationSchema={object().shape({
            firstName: string().required("Your first name is required"),
            lastName: string().required("Your last name is required"),
            email: string().email().required("Your email is required"),
            password: string()
              .required("Your password is required")
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Your password must have 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 special character.",
              ),
          })}
          onSubmit={(values) => {
            console.log("form values", values);
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit, setFieldTouched }) => {
            return (
              <>
                <CustomInput
                  label={"First Name"}
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                  onBlur={() => setFieldTouched("firstName")}
                  placeholder={"Your First Name"}
                  autoCapitalize="none"
                  caption={captionStatus(touched, errors, "firstName").caption}
                  status={captionStatus(touched, errors, "firstName").status}
                />
                <CustomInput
                  label={"Last Name"}
                  value={values.lastName}
                  onChangeText={handleChange("lastName")}
                  onBlur={() => setFieldTouched("lastName")}
                  placeholder={"Your Last Name"}
                  autoCapitalize="none"
                  caption={captionStatus(touched, errors, "lastName").caption}
                  status={captionStatus(touched, errors, "lastName").status}
                />
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
                  caption={captionStatus(touched, errors, "email").caption}
                  status={captionStatus(touched, errors, "email").status}
                />
                <CustomInput
                  value={values.password}
                  onChangeText={handleChange("password")}
                  placeholder={"Your password"}
                  onBlur={() => setFieldTouched("password")}
                  label={"Password"}
                  password={true}
                  caption={captionStatus(touched, errors, "password").caption}
                  status={captionStatus(touched, errors, "password").status}
                />
                {/* SUBMIT BUTTON*/}
                <Button
                  title={"Create Account"}
                  ghostBtn={false}
                  onPress={() => handleSubmit()}
                  extraStyle={{ marginTop: 20 }}
                />
                {/*  DIVIDER*/}
                <Divider style={styles.divider}>or</Divider>

                {/* SOCIAL SIGN UP */}
                <View style={{ gap: 10 }}>
                  <GoogleButton
                    text={"Continue with Google"}
                    onPress={() => console.log("sign up with google")}
                    textStyle={{ color: "#36454f" }}
                  />

                  <FacebookButton
                    text={"Continue with Facebook"}
                    onPress={() => console.log("sign up with facebook")}
                    extraStyle={{
                      backgroundColor: "#3b5998",
                      borderWidth: 0,
                    }}
                    textStyle={{ marginRight: -16 }}
                  />

                  <AppleButton
                    type={"sign-up"}
                    onPress={() => console.log("sign up with apple")}
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
    paddingTop: 18,
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
