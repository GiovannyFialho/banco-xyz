import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { decryptData, encryptData } from "@/utils/crypto";

interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserData {
  token: string;
  user: User | null;
}

interface UserContextType {
  token: string;
  user: User | null;
  setUserData: (data: UserData) => void;
  clearUserData: () => void;
}

export const UserContext = createContext({} as UserContextType);

interface UserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");

    if (storedData) {
      try {
        const parsedData: UserData = decryptData(storedData);

        setToken(parsedData.token);
        setUser(parsedData.user);
      } catch (error) {
        console.error("Erro ao descriptografar dados do localStorage:", error);
        clearUserData();
      }
    }
  }, []);

  useEffect(() => {
    if (token && user) {
      const data: UserData = { token, user };
      const encryptedData = encryptData(data);

      localStorage.setItem("userData", encryptedData);
    } else {
      localStorage.removeItem("userData");
    }
  }, [token, user]);

  const setUserData = (data: UserData) => {
    if (!data.token || !data.user) {
      throw new Error("Dados inválidos no setUserData.");
    }

    setToken(data.token);
    setUser(data.user);
  };

  const clearUserData = () => {
    setToken("");
    setUser(null);

    localStorage.removeItem("userData");
  };

  return (
    <UserContext.Provider value={{ token, user, setUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }

  return context;
}
