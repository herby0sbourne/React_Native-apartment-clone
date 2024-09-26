import React, { createContext, useEffect, useMemo, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { User } from "@/types/user";

interface IAuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
  // logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: (user: User | null) => {},
  // logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

/*   const handleUser = (user: User | null) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  }; */

  useEffect(() => {
    const getUser = async () => {
      const user = await SecureStore.getItemAsync("user");

      if (user) setUser(JSON.parse(user));
    };

    getUser();
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
