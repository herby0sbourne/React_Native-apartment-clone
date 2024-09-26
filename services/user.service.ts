import axios from "axios";
import { ENDPOINTS } from "@/constants/variable";
import { handleError } from "@/utils/errorHandler";
import { User } from "@/types/user";

type DataRes = { data: User };

interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const registerUser = async (userData: CreateUser) => {
  try {
    const { data } = await axios.post<DataRes>(ENDPOINTS.register, userData);

    if (!data) return null;

    return data.data;
  } catch (error) {
    handleError(error);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await axios.post<DataRes>(ENDPOINTS.login, { email, password });

    if (!data) return null;

    return data.data;
  } catch (error) {
    handleError(error);
  }
};