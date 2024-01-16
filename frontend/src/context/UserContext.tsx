// src/context/UserContext.js
import React, { createContext, useState, useContext, useEffect, ReactNode  } from 'react';

interface UserProviderProps {
    children: ReactNode;
}
interface UserData {
    userId: number;
    name: string;
    email: string;
    password: string;
}

interface UserContextType {
    user: UserData | null;
    login: (userData: UserData) => void;
    logout: () => void;
  }


const UserContext = createContext<UserContextType | null>(null);
export const useUser = () => useContext(UserContext);




export const UserProvider = ({ children }: UserProviderProps) => {
//   const [user, setUser] = useState(null); // null when not logged in
  // const [user, setUser] = useState<UserData | null>(null);
  const [user, setUser] = useState<UserData | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData: UserData) => {
    console.log("Logging in user:", userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData); // Set user data upon login
  };

  const logout = () => {
    console.log("Logging out user");
    localStorage.removeItem('user'); 
    setUser(null); // Clear user data upon logout
  };

  const contextValue: UserContextType = {
    user,
    login,
    logout
  };


  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

