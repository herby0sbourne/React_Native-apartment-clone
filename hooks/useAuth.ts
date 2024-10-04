import { useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { useQueryClient } from "@tanstack/react-query";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { User } from "@/types/user";
import { AuthContext } from "@/context/authContext";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const login = (user: User) => {
    let stringUser = JSON.stringify(user);
    setUser(user);
    SecureStore.setItemAsync("user", stringUser);
    queryClient.refetchQueries();
  };

  const logout = () => {
    setUser(null);
    SecureStore.deleteItemAsync("user");
    GoogleSignin.signOut();
    queryClient.clear();
    // queryClient.refetchQueries();
  };

  return { user, login, logout };
};

export default useAuth;
