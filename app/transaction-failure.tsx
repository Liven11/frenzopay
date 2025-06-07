import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { XCircle, ArrowLeft } from 'lucide-react-native';
import { useTransactions } from './context/TransactionContext';

export default function TransactionFailureScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addTransaction } = useTransactions();
  const transactionAdded = useRef(false);

  React.useEffect(() => {
    // Add failed transaction to history only once when component mounts
    if (!transactionAdded.current && params.amount && params.recipient && params.type) {
      addTransaction({
        type: params.type as 'payment' | 'transfer' | 'recharge',
        amount: Number(params.amount),
        recipient: params.recipient as string,
        status: 'failed',
        description: params.description as string || 'Payment failed',
      });
      transactionAdded.current = true;
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Transaction Status</Text>
      </View>
      <View style={styles.content}>
        <XCircle size={80} color="red" />
        <Text style={styles.statusText}>Payment Failed</Text>
        {params.amount && (
          <Text style={styles.detailsText}>Amount: ₹{params.amount}</Text>
        )}
        {params.recipient && (
          <Text style={styles.detailsText}>To: {params.recipient}</Text>
        )}
        <Text style={styles.errorText}>
          {params.error || 'Something went wrong. Please try again.'}
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
    color: 'red',
  },
  detailsText: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#172e73',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 