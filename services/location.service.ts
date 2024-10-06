import axios, { CancelToken } from "axios";
import { Location } from "@/types/locationIQ";
import ENDPOINTS from "@/utils/config";

export const getSuggestedLocations = async (
  text: string,
  cancelToken?: CancelToken,
  limit?: number,
): Promise<Location[]> => {
  try {
    let defaultLimit = 8;
    if (limit) defaultLimit = limit;

    const params = new URLSearchParams({
      location: text,
      limit: defaultLimit.toString(),
    });

    const url = `${ENDPOINTS.autocomplete}?${params.toString()}`;
    const { data } = await axios.get(url, { cancelToken: cancelToken });

    if (!data) return [];

    return data;
  } catch (error) {
    console.log("getSuggestedLocations");
    console.log(error);
    return [];
  }
};

export const searchLocations = async (text: string) => {
  try {
    const params = new URLSearchParams({ location: text });

    const url = `${ENDPOINTS.search}?${params.toString()}`;
    const { data } = await axios.get<Location>(url);

    if (!data) return [];

    return data;
  } catch (error) {
    console.log("searchLocations");
    console.error(error);
    return [];
  }
};
