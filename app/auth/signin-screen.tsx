import { Formik } from "formik";
import { object, string } from "yup";
import { Link, useNavigation } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Button from "@/components/Button";
import Divider from "@/components/Divider";
import SafeArea from "@/components/SafeArea";
import SocialAuth from "@/components/SocialAuth";
import CustomInput from "@/components/CustomInput";

import useAuth from "@/hooks/useAuth";
import { apiLoginUser } from "@/services/user.service";

const Page = () => {
  const navigation = useNavigation();
  const { login } = useAuth();

  const nativeLogin = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      const user = await apiLoginUser(values.email, values.password);

      if (!user) return;

      login(user);
      navigation.goBack();
    },
  });

  return (
    <KeyboardAwareScrollView bounces={false} style={{ backgroundColor: "white" }}>
      <SafeArea style={styles.container}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            nativeLogin.mutate(values);
          }}
          validationSchema={object().shape({
            email: string().email().required("Your email is required"),
            password: string().required("Your password is required"),
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
                <Link href={"auth/forgot-password"} asChild>
                  <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                  </TouchableOpacity>
                </Link>
                {/* SUBMIT BUTTON*/}
                <Button
                  title={"Sign In"}
                  ghostBtn={false}
                  onPress={() => handleSubmit()}
                  extraStyle={{ marginTop: 20 }}
                  isLoading={nativeLogin.isPending}
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
    // backgroundColor: "pink",
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
