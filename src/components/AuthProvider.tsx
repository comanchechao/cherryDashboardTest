import React, { ReactNode } from "react";
import useAuthHook from "../hooks/useAuth";
import { AuthContextType } from "../types/auth";

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const value = useAuthHook();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useAuthHook();
