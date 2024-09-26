import axios from "axios";
import { ErrorResponse } from "@/types/error";

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return alert((error.response.data as ErrorResponse).detail);
    }

    return alert(error.message);
  }
};
