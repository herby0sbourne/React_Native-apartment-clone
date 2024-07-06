import { Property } from "@/types/property";

export type RootStackParamList = {
  index: undefined | IndexScreenParams;
  "map.screen": { properties: Property[] };
  // other routes...
};

interface IndexScreenParams {
  location: string;
  lat: string;
  lng: string;
  boundingBox: string[];
}
