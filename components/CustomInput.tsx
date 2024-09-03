import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  value: string;
  extraStyle?: TextStyle;
  onChangeText: (text: string) => void;
  placeholder: "Your password" | "Your Email Address";
  label: "Email" | "Password";
  onBlur?: () => void;
  caption?: string;
  status?: string;
  password?: boolean;
}

const EyeIcon = ({ isPassword }: { isPassword: boolean }) => {
  const name = isPassword ? "eye-off-outline" : "eye-outline";
  return <MaterialCommunityIcons name={name} size={24} color={"black"} />;
};

const CustomInput = ({
  value,
  extraStyle,
  onChangeText,
  placeholder,
  label,
  onBlur,
  caption,
  status,
  password,
  secureTextEntry,
  ...props
}: InputProps) => {
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const statusColor = status === "danger" && { borderColor: "red" };
  console.log({ caption, status });

  return (
    <>
      <Text style={[styles.label]}>{label}</Text>
      <View style={[styles.container]}>
        <TextInput
          style={[styles.inputStyle, extraStyle, statusColor]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={password ? isPassword : false}
          onBlur={onBlur}
          {...props}
        />
        <Text style={styles.captionText}>{caption}</Text>
        {password && (
          <TouchableOpacity
            onPress={() => setIsPassword(!isPassword)}
            style={styles.iconPosition}
          >
            <EyeIcon isPassword={isPassword} />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    position: "relative",
  },
  label: {
    color: "#574f4f",
  },
  inputStyle: {
    backgroundColor: "#f6f6f6",
    height: 40,
    fontSize: 16,
    borderColor: "#c5c5c5",
    borderWidth: StyleSheet.hairlineWidth,
    marginVertical: 4,
    paddingHorizontal: 10,
  },
  iconPosition: { position: "absolute", right: 10, top: 12 },
  captionText: {
    color: "red",
  },
});

export default CustomInput;
