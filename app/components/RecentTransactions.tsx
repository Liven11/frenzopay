import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTransactions } from '../context/TransactionContext';
import { Transaction } from '../context/TransactionContext';
import { format } from 'date-fns';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
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
};

export default function RecentTransactions() {
  const { getRecentTransactions } = useTransactions();
  const recentTransactions = getRecentTransactions();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transactions</Text>
      <FlatList
        data={recentTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listContainer: {
    padding: 16,
  },
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
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  transactionStatus: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recipient: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
}); 