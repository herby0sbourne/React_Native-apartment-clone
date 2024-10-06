import { Platform } from "react-native";

const IPAddress = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const SERVER_URL = `http://${IPAddress}:4000/api`;

const location = "/location";
const user = "/user";

const locationEndpoint = SERVER_URL + location;
const userEndpoint = SERVER_URL + user;

const ENDPOINTS = {
  search: `${locationEndpoint}/search`,
  autocomplete: `${locationEndpoint}/autocomplete`,
  login: `${userEndpoint}/login-user`,
  google: `${userEndpoint}/google-login`,
  register: `${userEndpoint}/create-user`,
  facebook: `${userEndpoint}/facebook-login`,
};

export default ENDPOINTS;
