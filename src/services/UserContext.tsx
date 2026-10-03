import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../serverconfig/axiosInstance';
import APIs from '../serverconfig/apiURLs';

export interface User {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  password?: string;
}

interface UserContextType {
  users: User[];
  currentUser: User | null;
  isLoggedIn: boolean;
  register: (newUser: User) => Promise<{ success: boolean; message: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (updatedFields: Partial<User>) => Promise<{ success: boolean; message: string }>;
}

const SESSION_STORAGE_KEY = 'jsk_customer_session';
const TOKEN_KEY = 'jsk_usertoken';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users] = useState<User[]>([]);

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const activeSession = localStorage.getItem(SESSION_STORAGE_KEY);
      if (activeSession) {
        try {
          return JSON.parse(activeSession);
        } catch (e) {
          console.error('Error parsing active session:', e);
        }
      }
    }
    return null;
  });

  useEffect(() => {
    if (currentUser && currentUser.email) {
      axiosInstance.get(`${APIs.FULL_HEADERS.getProfile}?email=${encodeURIComponent(currentUser.email)}`)
        .then(res => {
          if (res.data && res.data.data) {
            setCurrentUser(res.data.data);
            localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(res.data.data));
          }
        })
        .catch(err => console.log('Profile sync notice:', err?.message));
    }
  }, []);

  const isLoggedIn = currentUser !== null;

  const register = async (newUser: User): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await axiosInstance.post(APIs.PARTIAL_HEADERS.register, newUser);
      const resData = response.data;

      if (resData.success) {
        const authData = resData.data;
        if (authData && authData.token) {
          localStorage.setItem(TOKEN_KEY, authData.token);
        }
        if (authData && authData.user) {
          setCurrentUser(authData.user);
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(authData.user));
        }
        return { success: true, message: resData.message || 'Account registered successfully.' };
      } else {
        return { success: false, message: resData.message || 'Registration failed.' };
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || 'Registration failed. Backend unavailable.';
      return { success: false, message: msg };
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await axiosInstance.post(APIs.PARTIAL_HEADERS.login, { email, password });
      const resData = response.data;

      if (resData.success) {
        const authData = resData.data;
        if (authData && authData.token) {
          localStorage.setItem(TOKEN_KEY, authData.token);
        }
        if (authData && authData.user) {
          setCurrentUser(authData.user);
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(authData.user));
        }
        return { success: true, message: resData.message || 'Logged in successfully.' };
      } else {
        return { success: false, message: resData.message || 'Invalid credentials.' };
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || 'Login failed. Check server connection.';
      return { success: false, message: msg };
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post(APIs.FULL_HEADERS.logout);
    } catch (e) {
      console.log('Logout token revocation notice:', e);
    } finally {
      setCurrentUser(null);
      localStorage.removeItem(SESSION_STORAGE_KEY);
      localStorage.removeItem(TOKEN_KEY);
    }
  };

  const updateProfile = async (updatedFields: Partial<User>): Promise<{ success: boolean; message: string }> => {
    if (!currentUser) {
      return { success: false, message: 'No active session found.' };
    }

    try {
      const response = await axiosInstance.put(
        `${APIs.FULL_HEADERS.updateProfile}?email=${encodeURIComponent(currentUser.email)}`,
        updatedFields
      );
      const resData = response.data;

      if (resData.success) {
        const updatedUser = resData.data?.user || { ...currentUser, ...updatedFields };
        setCurrentUser(updatedUser);
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedUser));
        return { success: true, message: resData.message || 'Profile updated successfully.' };
      } else {
        return { success: false, message: resData.message || 'Failed to update profile.' };
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || 'Profile update failed.';
      return { success: false, message: msg };
    }
  };

  return (
    <UserContext.Provider value={{ users, currentUser, isLoggedIn, register, login, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
