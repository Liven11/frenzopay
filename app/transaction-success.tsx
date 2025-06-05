import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { CheckCircle, ArrowLeft } from 'lucide-react-native';

export default function TransactionSuccessScreen() {
  const router = useRouter();

  // You might receive transaction details via route params
  // const transactionDetails = router.params?.transactionDetails;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Transaction Status</Text>
      </View>
      <View style={styles.content}>
        <CheckCircle size={80} color="green" />
        <Text style={styles.statusText}>Payment Successful!</Text>
        {/* Display transaction details here */}
        {/* <Text style={styles.detailsText}>Amount: ₹{transactionDetails?.amount}</Text> */}
        {/* <Text style={styles.detailsText}>To: {transactionDetails?.recipient}</Text> */}
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.doneButtonText}>Done</Text>
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
    color: 'green',
  },
  detailsText: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },
  doneButton: {
    backgroundColor: '#172e73',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 