import { Platform } from "react-native";

const isPreview = process.env.NODE_ENV === "development";

const IPAddress = Platform.OS === "android" ? "10.0.2.2" : "localhost";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;
const LOCAL_API_URL = `http://${IPAddress}:4000/api`;

const SERVER_URL = isPreview ? EXPO_PUBLIC_API_URL : LOCAL_API_URL;
// const SERVER_URL = "http://192.168.100.14:4000/api";

const location = "/location";
const user = "/user";

const locationEndpoint = SERVER_URL + location;
const userEndpoint = SERVER_URL + user;

const ENDPOINTS = {
  search: `${locationEndpoint}/search`,
  autocomplete: `${locationEndpoint}/autocomplete`,
  login: `${userEndpoint}/login-user`,
  apple: `${userEndpoint}/apple-login`,
  google: `${userEndpoint}/google-login`,
  register: `${userEndpoint}/create-user`,
  facebook: `${userEndpoint}/facebook-login`,
};

export default ENDPOINTS;
