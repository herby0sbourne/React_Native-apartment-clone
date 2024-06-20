import { ViewStyle } from "react-native";

const utils: { row: ViewStyle; flex: ViewStyle } = {
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
};

export default utils;
