import { Property } from "@/types/property";

export type RootStackParamList = {
  index: undefined | IndexScreenParams;
  map: { properties: Property[] };
  save: undefined;
  account: undefined;
  "signin-screen": undefined;
  "signup-screen": undefined;
  "forgot-password": undefined;
  "reset-password": { token: string };
  property: { propertyId: number };
  // other routes...
};

interface IndexScreenParams {
  location: string;
  lat: string;
  lng: string;
  boundingBox: string[];
}
