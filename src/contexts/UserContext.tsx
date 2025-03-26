import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { loginService } from '../services/auth';
import { loginData } from '../types/auth';
import { UserType } from '../types/user';

interface UserContextData {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void,
  user: UserType,
  setUser: (user: UserType) => void
  refreshAppointments: boolean,
  setRefreshAppointments: (refresh: boolean) => void;
  refreshSchedules: boolean,
  setRefreshSchedules: (refresh: boolean) => void;
  login: (data: loginData) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserType>({} as UserType);
  const [refreshAppointments, setRefreshAppointments] = useState(false);
  const [refreshSchedules, setRefreshSchedules] = useState(false);

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
    setUser({} as UserType);
    await localStorage.setItem('token', '');
    await localStorage.setItem('user', '');
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
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, login, logout, refreshAppointments, setRefreshAppointments, refreshSchedules, setRefreshSchedules }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
