'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchFromAPI } from '../lib/api';

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  addresses?: any[];
  wishlist?: string[];
}

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  wishlist: string[];
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  toggleWishlist: (productId: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (authToken: string) => {
    try {
      const res = await fetchFromAPI('/auth/me', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.success && res.user) {
        setUser(res.user);
        setWishlist(res.user.wishlist || []);
      } else {
        logout();
      }
    } catch (e) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('axmin_token');
      if (savedToken) {
        setToken(savedToken);
        fetchProfile(savedToken);
      } else {
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetchFromAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (res.success && res.token) {
        setToken(res.token);
        setUser(res.user);
        setWishlist(res.user.wishlist || []);
        localStorage.setItem('axmin_token', res.token);
        return { success: true };
      } else {
        return { success: false, message: res.message || 'Login failed' };
      }
    } catch (err: any) {
      return { success: false, message: err.message || 'Login failed' };
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    try {
      const res = await fetchFromAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, phone }),
      });

      if (res.success && res.token) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('axmin_token', res.token);
        return { success: true };
      } else {
        return { success: false, message: res.message || 'Registration failed' };
      }
    } catch (err: any) {
      return { success: false, message: err.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setWishlist([]);
    localStorage.removeItem('axmin_token');
  };

  const refreshUser = async () => {
    if (token) {
      await fetchProfile(token);
    }
  };

  const toggleWishlist = async (productId: string) => {
    if (!token) {
      // Offline wishlist toggle
      setWishlist(prev => {
        const next = prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId];
        return next;
      });
      return !wishlist.includes(productId);
    }

    try {
      const res = await fetchFromAPI(`/auth/wishlist/${productId}`, { method: 'POST' });
      if (res.success) {
        setWishlist(res.wishlist || []);
        return res.inWishlist;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        wishlist,
        login,
        register,
        logout,
        refreshUser,
        toggleWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
