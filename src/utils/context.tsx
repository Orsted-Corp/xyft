// MyContext.tsx
import React, { createContext, useState, useContext } from 'react';

// Define the type for the context value
type MyContextValue = {
  accountDetails: string;
  setAccountDetails: React.Dispatch<React.SetStateAction<string>>;
  publicKey: string;
  setPublicKey: React.Dispatch<React.SetStateAction<string>>;
};

// Create the context
const MyContext = createContext<MyContextValue | undefined>(undefined);

// Define the props interface for MyContextProvider
interface MyContextProviderProps {
  // You can define any additional props you might want to pass to the provider
}

// Create the context provider
export const MyContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [accountDetails, setAccountDetails] = useState('');
  const [publicKey, setPublicKey] = useState('');

  return (
    <MyContext.Provider value={{ accountDetails, setAccountDetails, publicKey, setPublicKey }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to consume the context in any component
export const useMyContext = (): MyContextValue => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};