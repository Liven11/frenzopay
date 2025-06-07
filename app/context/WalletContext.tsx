import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WalletContextType {
  balance: number;
  addMoney: (amount: number) => Promise<void>;
  deductMoney: (amount: number) => Promise<void>;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBalance();
  }, []);

  const loadBalance = async () => {
    try {
      const savedBalance = await AsyncStorage.getItem('walletBalance');
      if (savedBalance) {
        setBalance(parseFloat(savedBalance));
      }
    } catch (error) {
      console.error('Error loading wallet balance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBalance = async (newBalance: number) => {
    try {
      await AsyncStorage.setItem('walletBalance', newBalance.toString());
    } catch (error) {
      console.error('Error saving wallet balance:', error);
    }
  };

  const addMoney = async (amount: number) => {
    const newBalance = balance + amount;
    setBalance(newBalance);
    await saveBalance(newBalance);
  };

  const deductMoney = async (amount: number) => {
    if (balance < amount) {
      throw new Error('Insufficient balance');
    }
    const newBalance = balance - amount;
    setBalance(newBalance);
    await saveBalance(newBalance);
  };

  return (
    <WalletContext.Provider value={{ balance, addMoney, deductMoney, isLoading }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
} 