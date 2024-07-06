export interface Location {
  address: Address;
  boundingbox: string[];
  class: "place" | string;
  display_address: string;
  display_name: string;
  display_place: string;
  lat: string;
  licence: string;
  lon: string;
  osm_id: string;
  osm_type: string;
  place_id: string;
  type: "city" | "state" | "country" | string;
}

interface Address {
  city?: string;
  country: string;
  country_code: string;
  county: string;
  name: string;
  state?: string;
  postcode?: string;
}
