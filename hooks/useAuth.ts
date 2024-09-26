import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { useQueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { User } from "@/types/user";

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
    queryClient.clear();
    // queryClient.refetchQueries();
  };

  return { user, login, logout };
};

export default useAuth;
