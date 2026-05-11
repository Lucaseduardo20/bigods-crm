import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { loginService } from '../services/auth';
import { AuthResponse, loginData } from '../types/auth';
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
  login: (data: loginData) => Promise<AxiosResponse<AuthResponse> | undefined>;
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
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      if (response.data.user?.company_id) {
        localStorage.setItem('tenant_company_id', String(response.data.user.company_id));
      }
      setUser(response.data.user);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error.response;
      }

      return undefined;
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUser({} as UserType);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tenant_company_id');
  };

  
  
  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      const userStorage = localStorage.getItem('user');
      if (token && userStorage) {
        setIsAuthenticated(true);
        const parsedUser = JSON.parse(userStorage);
        setUser(parsedUser)
        if (parsedUser?.company_id) {
          localStorage.setItem('tenant_company_id', String(parsedUser.company_id));
        }
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
