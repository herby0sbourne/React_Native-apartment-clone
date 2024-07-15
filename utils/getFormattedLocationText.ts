import { Location } from "@/types/locationIQ";

const getFormattedLocationText = (item: Location) => {
  let location = item.address.name;

  if (item.type === "city" && item.address.state) {
    location += `, ${item.address.state}`;
  }
  return location;
};

export default getFormattedLocationText;
