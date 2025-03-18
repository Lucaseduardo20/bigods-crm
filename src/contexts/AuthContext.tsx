import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { loginService } from '../services/auth';
import { loginData } from '../types/auth';

interface AuthContextData {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void,
  user: any,
  setUser: (user: any) => void
  login: (data: loginData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState({});

  const login = async (data: loginData) => {
    try {
      const response = await loginService(data);
      setIsAuthenticated(true);
      console.log(response.data.token)
      localStorage.setItem('token', response.data.token);
      return response;
    } catch (error: any) {
      console.log(error);
      return error.response;
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    await localStorage.setItem('token', '');
  };

  
  
  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      const userStorage = localStorage.getItem('user');
      if (token && userStorage) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userStorage))
      }
    };

    checkAuthentication()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
