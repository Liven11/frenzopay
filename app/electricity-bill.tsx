import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, DollarSign, FileText } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface BillDetails {
  consumerNumber: string;
  amount: string;
  dueDate: string;
}

export default function ElectricityBillScreen() {
  const router = useRouter();

  const [consumerNumber, setConsumerNumber] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const [fetchedBill, setFetchedBill] = useState<BillDetails | null>(null);

  const handleFetchBill = () => {
    if (!consumerNumber) {
      Alert.alert('Missing Information', 'Please enter the consumer number.');
      return;
    }
    // Simulate fetching bill details
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulate a fetched bill amount and details
      const simulatedBillAmount = (Math.random() * 1000 + 500).toFixed(2);
      setBillAmount(simulatedBillAmount);
      setFetchedBill({ consumerNumber, amount: simulatedBillAmount, dueDate: '25th of next month' });
    }, 1500);
  };

  const handleContinue = () => {
    if (!billAmount || isNaN(Number(billAmount)) || Number(billAmount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid bill amount.');
      return;
    }
    setShowPinInput(true);
  };

  const handlePayment = async () => {
    if (upiPin.length !== 6) {
      Alert.alert('Invalid PIN', 'Please enter a 6-digit UPI PIN.');
      return;
    }

    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate success or failure
      const isSuccess = Math.random() > 0.3; // 70% chance of success

      if (isSuccess) {
        router.push({
          pathname: '/transaction-success',
          params: {
            type: 'bill',
            amount: billAmount,
            recipient: 'Electricity Board',
            description: `Electricity bill payment for consumer ${consumerNumber}`,
          },
        });
      } else {
        router.push({
          pathname: '/transaction-failure',
          params: {
            type: 'bill',
            amount: billAmount,
            recipient: 'Electricity Board',
            description: `Electricity bill payment for consumer ${consumerNumber}`,
            error: 'Payment gateway error',
          },
        });
      }

    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      router.push({
        pathname: '/transaction-failure',
        params: {
          type: 'bill',
          amount: billAmount,
          recipient: 'Electricity Board',
          description: `Electricity bill payment for consumer ${consumerNumber}`,
          error: errorMessage,
        },
      });
    } finally {
      setLoading(false);
      setShowPinInput(false);
      setUpiPin('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Electricity Bill Payment</Text>
      </View>
      <ScrollView style={styles.content}>
        {!showPinInput ? (
          <View>
            <Text style={styles.sectionTitle}>Enter Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Consumer Number"
              keyboardType="number-pad"
              value={consumerNumber}
              onChangeText={setConsumerNumber}
            />

            {!fetchedBill ? (
              <TouchableOpacity
                style={styles.fetchBillButton}
                onPress={handleFetchBill}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.fetchBillButtonText}>Fetch Bill</Text>
                )}
              </TouchableOpacity>
            ) : (
              <View style={styles.billDetailsContainer}>
                <Text style={styles.billDetailsText}>Bill Amount: ₹{fetchedBill.amount}</Text>
                <Text style={styles.billDetailsText}>Due Date: {fetchedBill.dueDate}</Text>
                 <TouchableOpacity
                   style={styles.continueButton}
                   onPress={handleContinue}
                 >
                   <Text style={styles.continueButtonText}>Continue to Pay</Text>
                 </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
           <View style={styles.pinContainer}>
              <Text style={styles.pinLabel}>Enter UPI PIN to Pay</Text>
              <Text style={styles.paymentAmountText}>Paying: ₹{billAmount}</Text>
              <TextInput
                style={styles.pinInput}
                placeholder="Enter 6-digit PIN"
                keyboardType="numeric"
                maxLength={6}
                secureTextEntry
                value={upiPin}
                onChangeText={setUpiPin}
              />
              <TouchableOpacity
                style={styles.payButton}
                onPress={handlePayment}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.payButtonText}>Pay ₹{billAmount}</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                 style={styles.cancelButton}
                 onPress={() => setShowPinInput(false)}
                 disabled={loading}
              >
                 <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
        )}
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
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 12,
  },
  fetchBillButton: {
    backgroundColor: '#172e73',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  fetchBillButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  billDetailsContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  billDetailsText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
   continueButton: {
    backgroundColor: '#172e73',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  pinContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  pinLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  paymentAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#172e73',
  },
  pinInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    width: '100%',
  },
  payButton: {
    backgroundColor: '#172e73',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
}); 