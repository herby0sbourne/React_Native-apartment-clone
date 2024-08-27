import { StyleSheet, Text, TextInput, View } from "react-native";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import SafeArea from "@/components/SafeArea";
import { useNavigation } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";

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
                <View>
                  <Text style={{ color: "#574f4f" }}>Email</Text>
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      height: 40,
                      fontSize: 16,
                      borderColor: "lightgray",
                      borderWidth: StyleSheet.hairlineWidth,
                      marginVertical: 4,
                      paddingHorizontal: 10,
                    }}
                    keyboardType={"email-address"}
                    textContentType={"emailAddress"}
                    value={values.email}
                    autoCapitalize="none"
                    autoComplete={"email"}
                    onChangeText={handleChange("email")}
                    onBlur={() => setFieldTouched("email")}
                    placeholder={"Your Email Address"}
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
    // marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: "pink",
    paddingTop: 10,
  },
});

export default Page;
