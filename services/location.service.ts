import axios from "axios";
import { ENDPOINTS } from "@/constants/variable";
import { Location } from "@/types/locationIQ";

export const getSuggestedLocations = async (text: string, limit?: number) => {
  try {
    let defaultLimit = 8;
    if (limit) defaultLimit = limit;

    const params = new URLSearchParams({
      location: text,
      limit: defaultLimit.toString(),
    });

    const url = `${ENDPOINTS.autocompleteEndpoint}?${params.toString()}`;
    const { data } = await axios.get<Location[]>(url);

    if (!data) return [];

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchLocations = async (text: string) => {
  try {
    const params = new URLSearchParams({ location: text });

    const url = `${ENDPOINTS.searchEndpoint}?${params.toString()}`;
    const { data } = await axios.get<Location>(url);

    if (!data) return [];

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
// const url = `${ENDPOINTS.autocompleteEndpoint}?location=${text}&limit=${defaultLimit}`;