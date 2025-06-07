import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface SearchResult {
  id: number;
  type: 'service' | 'transaction';
  title: string;
  description: string;
  amount?: string;
  route: string;
}

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const availableScreens = [
    { id: 1, type: 'service' as const, title: 'Mobile Recharge', description: 'Recharge your mobile number', route: '/mobile-recharge' },
    { id: 2, type: 'service' as const, title: 'Electricity Bill', description: 'Pay your electricity bill', route: '/electricity-bill' },
    { id: 3, type: 'service' as const, title: 'DTH Payments', description: 'Pay your DTH bills', route: '/dth-payments' },
    { id: 4, type: 'service' as const, title: 'Fastag Recharge', description: 'Recharge your Fastag', route: '/fastag-recharge' },
    { id: 5, type: 'service' as const, title: 'Digital FDs', description: 'Open digital fixed deposits', route: '/digital-fds' },
    { id: 6, type: 'service' as const, title: 'Gold Loans', description: 'Apply for gold loans', route: '/gold-loans' },
    { id: 7, type: 'service' as const, title: 'Insurance', description: 'Get insurance coverage', route: '/insurance' },
    { id: 8, type: 'service' as const, title: 'Personal Loans', description: 'Apply for personal loans', route: '/personal-loans' },
    { id: 9, type: 'transaction' as const, title: 'Send Money', description: 'Send money to anyone', route: '/send' },
    { id: 10, type: 'transaction' as const, title: 'Receive Money', description: 'Receive money from anyone', route: '/receive' },
    { id: 11, type: 'transaction' as const, title: 'To Mobile', description: 'Send money to mobile number', route: '/to-mobile' },
    { id: 12, type: 'transaction' as const, title: 'To Bank Account', description: 'Send money to bank account', route: '/to-bank-account' },
    { id: 13, type: 'transaction' as const, title: 'Credit Card Payment', description: 'Pay your credit card bill', route: '/creditcard-payment' },
  ];

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = availableScreens.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
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
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services, transactions..."
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              handleSearch(text);
            }}
            autoFocus
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => {
              setSearchQuery('');
              setSearchResults([]);
            }}>
              <X size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView style={styles.content}>
        {searchResults.map((result) => (
          <TouchableOpacity
            key={result.id}
            style={styles.resultItem}
            onPress={() => {
              router.push(result.route);
            }}
          >
            <View style={styles.resultContent}>
              <Text style={styles.resultTitle}>{result.title}</Text>
              <Text style={styles.resultDescription}>{result.description}</Text>
            </View>
            {result.type === 'transaction' && (
              <View style={styles.transactionIndicator}>
                <Text style={styles.transactionText}>Transfer</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
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
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#172e73',
    marginBottom: 4,
  },
  resultDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  resultAmount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#172e73',
  },
  transactionIndicator: {
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  transactionText: {
    color: '#172e73',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
}); 