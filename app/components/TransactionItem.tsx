import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '../context/TransactionContext';
import { format } from 'date-fns';

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const getStatusColor = (status: string) => {
    return status === 'success' ? '#4CAF50' : '#F44336';
  };

  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionType}>{transaction.type}</Text>
        <Text
          style={[
            styles.transactionStatus,
            { color: getStatusColor(transaction.status) },
          ]}
        >
          {transaction.status}
        </Text>
      </View>
      <Text style={styles.amount}>₹{transaction.amount}</Text>
      <Text style={styles.recipient}>To: {transaction.recipient}</Text>
      <Text style={styles.description}>{transaction.description}</Text>
      <Text style={styles.timestamp}>
        {format(transaction.timestamp, 'MMM dd, yyyy HH:mm')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionType: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    textTransform: 'capitalize',
  },
  transactionStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    textTransform: 'capitalize',
  },
  amount: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  recipient: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
  },
}); 