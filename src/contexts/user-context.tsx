import { createContext, ReactNode, useContext, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserData {
  token: string;
  user: User | null;
}

interface UserContextType {
  token: string;
  user: User | null;
  setUserData: (data: UserData) => void;
}

export const UserContext = createContext({} as UserContextType);

interface UserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const setUserData = (data: UserData) => {
    if (!data.token || !data.user) {
      throw new Error("Dados inválidos no setUserData.");
    }

    setToken(data.token);
    setUser(data.user);
  };

  return (
    <UserContext.Provider value={{ token, user, setUserData }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }

  return context;
}
