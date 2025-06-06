import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import RecentTransactions from './components/RecentTransactions';

export default function WalletScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#172e73" />
        </TouchableOpacity>
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

        <RecentTransactions nested={true} />
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#172e73',
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
    color: '#172e73',
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
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  transactionDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});