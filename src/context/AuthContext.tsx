// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import api from "../utils/axios-instance";
// src/types/auth.ts
export interface User {
  id: string;
  username: string;
}
type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};
export interface AuthContextType {
  user: User | null;
  login: (values: FormValues) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (values: FormValues) => {
    try {
      const response = await api.post("/auth/signin", values);

      const data = response?.data?.data;
      if (response?.data?.success) {
        const user: User = { id: data.id, username: data.username };
        localStorage.setItem("token", response.data.data.access_token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      }

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
