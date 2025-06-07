import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Transaction {
  id: string;
  type: 'payment' | 'transfer' | 'recharge';
  amount: number;
  recipient: string;
  status: 'success' | 'failed';
  timestamp: Date;
  description: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  getRecentTransactions: (limit?: number) => Transaction[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const getRecentTransactions = (limit: number = 10) => {
    return transactions.slice(0, limit);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        getRecentTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}

export default function RecentTransactions() {
  const { getRecentTransactions } = useTransactions();
  const recentTransactions = getRecentTransactions();
  // ... displays all transactions
}