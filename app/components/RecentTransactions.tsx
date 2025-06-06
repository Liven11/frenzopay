import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTransactions } from '../context/TransactionContext';
import TransactionItem from './TransactionItem';

interface RecentTransactionsProps {
  nested?: boolean;
}

export default function RecentTransactions({ nested = false }: RecentTransactionsProps) {
  const { getRecentTransactions } = useTransactions();
  const recentTransactions = getRecentTransactions();

  if (nested) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recent Transactions</Text>
        <View style={styles.listContainer}>
          {recentTransactions.map((item) => (
            <TransactionItem key={item.id} transaction={item} />
          ))}
        </View>
      </View>
    );
  }

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
    fontFamily: 'Inter-Bold',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color: '#172e73',
  },
  listContainer: {
    padding: 16,
  },
}); 