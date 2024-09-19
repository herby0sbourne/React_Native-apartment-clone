import { StyleSheet } from "react-native";
import { Formik } from "formik";
import { object, string, ref } from "yup";
import { useLocalSearchParams, router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Button from "@/components/Button";
import SafeArea from "@/components/SafeArea";
import CustomInput from "@/components/CustomInput";

import { captionStatus } from "@/utils/captionStatus";

const ResetPassword = () => {
  const params = useLocalSearchParams();

  console.log("Reset token:", params?.token);
  return (
    <KeyboardAwareScrollView bounces={false}>
      <SafeArea style={styles.container}>
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={object().shape({
            password: string()
              .required("Your password is required")
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Your password must have 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 special character.",
              ),
            confirmPassword: string()
              .oneOf([ref("password")], "Passwords do not match")
              .required(),
          })}
          onSubmit={(values) => {
            console.log("resetting password", values);
            router.replace("signin-screen");
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit, setFieldTouched }) => {
            return (
              <>
                <CustomInput
                  value={values.password}
                  onChangeText={handleChange("password")}
                  placeholder={"New Password"}
                  onBlur={() => setFieldTouched("password")}
                  label={"Reset Password"}
                  password={true}
                  caption={captionStatus(touched, errors, "password").caption}
                  status={captionStatus(touched, errors, "password").status}
                />
                <CustomInput
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  placeholder={"Confirm Password"}
                  onBlur={() => setFieldTouched("confirmPassword")}
                  label={"Confirm Password"}
                  password={true}
                  caption={captionStatus(touched, errors, "confirmPassword").caption}
                  status={captionStatus(touched, errors, "confirmPassword").status}
                />
                {/* SUBMIT BUTTON*/}
                <Button
                  title={"Reset Password"}
                  ghostBtn={false}
                  onPress={() => handleSubmit()}
                  extraStyle={{ marginTop: 20 }}
                />
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
});

export default ResetPassword;
