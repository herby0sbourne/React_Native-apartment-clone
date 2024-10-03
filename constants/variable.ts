import { Platform } from "react-native";

const HEADER_HEIGHT = 250;
const TRANSITION_THRESHOLD = 100;

const IPAddress = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const SERVER_URL = `http://${IPAddress}:4000/api`;

const location = "/location";
const user = "/user";

const locationEndpoint = SERVER_URL + location;
const userEndpoint = SERVER_URL + user;

const ENDPOINTS = {
  search: `${locationEndpoint}/search`,
  autocomplete: `${locationEndpoint}/autocomplete`,
  register: `${userEndpoint}/create-user`,
  login: `${userEndpoint}/login-user`,
  facebook: `${userEndpoint}/facebook-login`,
};

export { HEADER_HEIGHT, TRANSITION_THRESHOLD, ENDPOINTS };
