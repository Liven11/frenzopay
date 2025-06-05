import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard, ArrowDownLeft, ArrowUpRight } from 'lucide-react-native';

const TransactionItem = ({ type, amount, date, category }) => (
  <View style={styles.transactionItem}>
    <View style={[styles.iconContainer, { backgroundColor: type === 'credit' ? '#17C261' : '#DB0011' }]}>
      {type === 'credit' ? 
        <ArrowDownLeft size={20} color="white" /> : 
        <ArrowUpRight size={20} color="white" />
      }
    </View>
    <View style={styles.transactionDetails}>
      <Text style={styles.transactionCategory}>{category}</Text>
      <Text style={styles.transactionDate}>{date}</Text>
    </View>
    <Text style={[styles.amount, { color: type === 'credit' ? '#17C261' : '#DB0011' }]}>
      {type === 'credit' ? '+' : '-'}₹{amount}
    </Text>
  </View>
);

export default function WalletScreen() {
  const transactions = [
    { id: 1, type: 'debit', amount: '2,500', date: 'Today, 2:45 PM', category: 'Shopping' },
    { id: 2, type: 'credit', amount: '15,000', date: 'Yesterday, 6:30 PM', category: 'Salary' },
    { id: 3, type: 'debit', amount: '800', date: 'Jan 15, 1:20 PM', category: 'Food' },
    { id: 4, type: 'credit', amount: '5,000', date: 'Jan 14, 11:45 AM', category: 'Refund' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wallet</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <CreditCard size={24} color="#172e73" />
            <Text style={styles.balanceTitle}>Total Balance</Text>
          </View>
          <Text style={styles.balanceAmount}>₹85,625</Text>
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.withdrawButton]}>
              <Text style={[styles.actionButtonText, styles.withdrawButtonText]}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {transactions.map(transaction => (
            <TransactionItem key={transaction.id} {...transaction} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#172e73',
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Inter-Bold',
  },
  content: {
    flex: 1,
  },
  balanceCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  balanceTitle: {
    fontSize: 16,
    color: '#172e73',
    fontFamily: 'Inter-Regular',
  },
  balanceAmount: {
    fontSize: 36,
    color: '#172e73',
    fontFamily: 'Inter-Bold',
    marginVertical: 15,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#172e73',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  withdrawButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#172e73',
  },
  withdrawButtonText: {
    color: '#172e73',
  },
  transactionsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 15,
  },
  transactionCategory: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});