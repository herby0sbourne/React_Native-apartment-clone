import { Property } from "@/types/property";

export type RootStackParamList = {
  index: undefined | IndexScreenParams;
  "map.screen": { properties: Property[] };
  "save.screen": undefined;
  "account.screen": undefined;
  "signin-screen": undefined;
  "signup-screen": undefined;
  "forgot-password": undefined;
  "reset-password": { token: string };
  // other routes...
};

interface IndexScreenParams {
  location: string;
  lat: string;
  lng: string;
  boundingBox: string[];
}
