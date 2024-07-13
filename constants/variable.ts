import { Platform } from "react-native";

const HEADER_HEIGHT = 250;
const TRANSITION_THRESHOLD = 100;

const IPAddress = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const SERVER_URL = `http://${IPAddress}:4000/api`;
// const SERVER_URL = "http://192.168.100.7:4000/api";
const location = "/location";
const locationEndpoint = SERVER_URL + location;

const ENDPOINTS = {
  searchEndpoint: `${locationEndpoint}/search`,
  autocompleteEndpoint: `${locationEndpoint}/autocomplete`,
};

export { HEADER_HEIGHT, TRANSITION_THRESHOLD, ENDPOINTS };
