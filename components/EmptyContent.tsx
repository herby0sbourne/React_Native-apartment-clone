import { StyleSheet, Text, View } from "react-native";
import LottieView, { AnimationObject } from "lottie-react-native";

interface EmptyContentProps {
  filePath: string | AnimationObject | { uri: string };
  title: string;
  subTitle: string;
}

const EmptyContent = ({ filePath, subTitle, title }: EmptyContentProps) => {
  return (
    <View style={styles.lottieWrapper}>
      <LottieView autoPlay style={styles.lottie} source={filePath} />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lottieWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  lottie: {
    width: 180,
    height: 180,
  },
  textWrapper: {
    marginVertical: 15,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
  },
  subTitle: {
    marginTop: 10,
    fontSize: 15,
    color: "gray",
    textAlign: "center",
  },
});

export default EmptyContent;
