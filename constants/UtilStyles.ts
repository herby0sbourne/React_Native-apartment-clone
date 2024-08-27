import { TextStyle, ViewStyle } from "react-native";

export const UtilStyles: Record<string, ViewStyle | TextStyle> = {
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  authBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 0.5,
  },
  authText: {
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 15,
    paddingLeft: 30,
  },
};
