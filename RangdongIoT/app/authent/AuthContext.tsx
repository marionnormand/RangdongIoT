import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextProps {
    username: string;
    setUsername: (username: string) => void;
  }

const defaultValue: AuthContextProps = {
    username: '',
    setUsername: () => {},
};

export const AuthContext = createContext<AuthContextProps>(defaultValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string>('');

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};
