import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, Building2, Trash2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const BankAccountItem = ({ account, onDelete }) => (
  <View style={styles.accountContainer}>
    <View style={styles.account}>
      <View style={styles.accountHeader}>
        <Building2 size={24} color="#172e73" />
        <Text style={styles.accountType}>{account.type}</Text>
      </View>
      <Text style={styles.accountNumber}>****{account.lastFour}</Text>
      <View style={styles.accountFooter}>
        <Text style={styles.accountName}>{account.name}</Text>
        <Text style={styles.accountBalance}>${account.balance}</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(account.id)}>
      <Trash2 size={20} color="#DB0011" />
    </TouchableOpacity>
  </View>
);

export default function BankAccountsScreen() {
  const router = useRouter();
  const [accounts, setAccounts] = React.useState([
    {
      id: '1',
      type: 'Savings Account',
      lastFour: '1234',
      name: 'Bank of America',
      balance: '5,000.00',
    },
    {
      id: '2',
      type: 'Checking Account',
      lastFour: '5678',
      name: 'Chase Bank',
      balance: '2,500.00',
    },
  ]);

  const handleDeleteAccount = (accountId) => {
    setAccounts(accounts.filter(account => account.id !== accountId));
  };

  const handleAddAccount = () => {
    router.push('/profile/add-bank-account');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#172e73" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bank Accounts</Text>
      </View>

      <ScrollView style={styles.content}>
        {accounts.map((account) => (
          <BankAccountItem
            key={account.id}
            account={account}
            onDelete={handleDeleteAccount}
          />
        ))}

        <TouchableOpacity style={styles.addAccountButton} onPress={handleAddAccount}>
          <Plus size={24} color="#172e73" />
          <Text style={styles.addAccountText}>Add Bank Account</Text>
        </TouchableOpacity>
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
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#172e73',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  accountContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  account: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  accountType: {
    color: '#172e73',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  accountNumber: {
    color: '#666',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 20,
  },
  accountFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountName: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  accountBalance: {
    color: '#172e73',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  deleteButton: {
    padding: 12,
  },
  addAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#172e73',
    borderStyle: 'dashed',
    borderRadius: 12,
    marginTop: 8,
  },
  addAccountText: {
    color: '#172e73',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginLeft: 8,
  },
}); 