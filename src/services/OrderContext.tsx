import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../serverconfig/axiosInstance';
import APIs from '../serverconfig/apiURLs';

export interface OrderProduct {
  productName: string;
  casNo: string;
  formula: string;
  category: string;
  quantity: number;
}

export interface OrderClient {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  address: string;
}

export interface Order {
  id: string;
  client: OrderClient;
  items: OrderProduct[];
  customRequirements: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'PENDING' | 'APPROVED';
}

interface OrderContextType {
  orders: Order[];
  isAdminLoggedIn: boolean;
  loginAdmin: (username: string, password: string) => Promise<boolean> | boolean;
  logoutAdmin: () => void;
  addOrder: (client: OrderClient, items: OrderProduct[], customRequirements: string) => Promise<Order> | Order;
  approveOrder: (id: string) => Promise<boolean> | boolean;
  deleteOrder: (id: string) => Promise<boolean> | boolean;
  refreshOrders: () => void;
}

const AUTH_KEY = 'jsk_admin_auth';
const TOKEN_KEY = 'jsk_usertoken';

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(AUTH_KEY) === 'true';
    }
    return false;
  });

  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get(APIs.FULL_HEADERS.getAllInquiries);
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.log('Notice fetching backend inquiries:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [isAdminLoggedIn]);

  const loginAdmin = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await axiosInstance.post(APIs.PARTIAL_HEADERS.adminLogin, {
        email: username,
        password: password
      });

      if (response.data && response.data.success) {
        const token = response.data.data?.token;
        if (token) {
          localStorage.setItem(TOKEN_KEY, token);
        }
        setIsAdminLoggedIn(true);
        localStorage.setItem(AUTH_KEY, 'true');
        fetchOrders();
        return true;
      }
    } catch (e) {
      console.error('Admin login failed:', e);
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  const addOrder = async (client: OrderClient, items: OrderProduct[], customRequirements: string): Promise<Order> => {
    const tempId = `JSK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrderPayload = { client, items, customRequirements };

    try {
      const response = await axiosInstance.post(APIs.FULL_HEADERS.createInquiry, newOrderPayload);
      if (response.data && response.data.success && response.data.data) {
        const createdInquiry = response.data.data;
        setOrders(prev => [createdInquiry, ...prev]);
        return createdInquiry;
      }
    } catch (e) {
      console.error('Failed submitting inquiry to backend:', e);
    }

    const fallbackOrder: Order = {
      id: tempId,
      client,
      items,
      customRequirements,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    setOrders(prev => [fallbackOrder, ...prev]);
    return fallbackOrder;
  };

  const approveOrder = async (id: string): Promise<boolean> => {
    try {
      const response = await axiosInstance.put(`${APIs.FULL_HEADERS.approveInquiry}?id=${encodeURIComponent(id)}`);
      if (response.data && response.data.success) {
        setOrders(prev =>
          prev.map(order => (order.id === id ? { ...order, status: 'APPROVED' } : order))
        );
        return true;
      }
    } catch (e) {
      console.error('Approve order failed:', e);
    }

    setOrders(prev =>
      prev.map(order => (order.id === id ? { ...order, status: 'APPROVED' } : order))
    );
    return true;
  };

  const deleteOrder = async (id: string): Promise<boolean> => {
    try {
      const response = await axiosInstance.delete(`${APIs.FULL_HEADERS.deleteInquiry}?id=${encodeURIComponent(id)}`);
      if (response.data && response.data.success) {
        setOrders(prev => prev.filter(order => order.id !== id));
        return true;
      }
    } catch (e) {
      console.error('Delete order failed:', e);
    }

    setOrders(prev => prev.filter(order => order.id !== id));
    return true;
  };

  return (
    <OrderContext.Provider value={{ orders, isAdminLoggedIn, loginAdmin, logoutAdmin, addOrder, approveOrder, deleteOrder, refreshOrders: fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
