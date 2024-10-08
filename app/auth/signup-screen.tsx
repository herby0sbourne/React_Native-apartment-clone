import { Formik } from "formik";
import { object, string } from "yup";
import { useNavigation } from "expo-router";
import { StyleSheet } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Button from "@/components/Button";
import Divider from "@/components/Divider";
import SafeArea from "@/components/SafeArea";
import SocialAuth from "@/components/SocialAuth";
import CustomInput from "@/components/CustomInput";

import useAuth from "@/hooks/useAuth";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

import { captionStatus } from "@/utils/captionStatus";
import { apiRegisterUser } from "@/services/user.service";

interface IRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Page = () => {
  useWarmUpBrowser();

  const navigation = useNavigation();
  const { login } = useAuth();

  const nativeRegister = useMutation({
    mutationFn: async (values: IRegisterUser) => {
      const user = await apiRegisterUser(values);

      if (!user) return;

      login(user);
      navigation.goBack();
    },
  });

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
            nativeRegister.mutate(values);
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
                  isLoading={nativeRegister.isPending}
                />
                {/*  DIVIDER*/}
                <Divider style={styles.divider}>or</Divider>

                {/* SOCIAL AUTH BUTTONS*/}
                <SocialAuth />
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
