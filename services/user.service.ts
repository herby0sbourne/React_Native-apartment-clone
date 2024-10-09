import axios from "axios";

import { User } from "@/types/user";
import ENDPOINTS from "@/utils/config";
import { handleError } from "@/utils/errorHandler";

type DataRes = User;

interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const apiRegisterUser = async (userData: CreateUser) => {
  try {
    const { data } = await axios.post<DataRes>(ENDPOINTS.register, userData);

    if (!data) return null;

    // Delay the return of data by 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const apiLoginUser = async (email: string, password: string) => {
  try {
    const { data } = await axios.post<DataRes>(ENDPOINTS.login, { email, password });

    if (!data) return null;

    // Delay the return of data by 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const apiFacebookLogin = async (accessToken: string) => {
  try {
    const { data } = await axios.post<DataRes>(ENDPOINTS.facebook, { accessToken });

    if (!data) return null;

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const apiGoogleLogin = async (accessToken: string) => {
  try {
    const { data } = await axios.post<DataRes>(ENDPOINTS.google, { accessToken });

    if (!data) return null;

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const apiAppleLogin = async (accessToken: string) => {
  try {
    const { data } = await axios.post<DataRes>(ENDPOINTS.apple, {
      identityToken: accessToken,
    });

    if (!data) return null;

    return data;
  } catch (error) {
    handleError(error);
  }
};
