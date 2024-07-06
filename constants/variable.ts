const HEADER_HEIGHT = 250;
const TRANSITION_THRESHOLD = 100;

const SERVER_URL = "http://192.168.0.12:4000/api";
const location = "/location";
const locationEndpoint = SERVER_URL + location;

const ENDPOINTS = {
  searchEndpoint: `${locationEndpoint}/search`,
  autocompleteEndpoint: `${locationEndpoint}/autocomplete`,
};

export { HEADER_HEIGHT, TRANSITION_THRESHOLD, ENDPOINTS };
