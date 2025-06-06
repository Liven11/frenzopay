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
import { ArrowLeft, Banknote, User, DollarSign } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ToBankAccountScreen() {
  const router = useRouter();

  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [amount, setAmount] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);

  const handleContinue = () => {
    if (!accountNumber || !ifscCode || !accountHolderName || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('Invalid Details', 'Please fill in all bank details and a valid amount.');
      return;
    }
    // Basic validation, could add more robust validation for IFSC/account number
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

      // Simulate success or failure (replace with actual payment logic)
      const isSuccess = Math.random() > 0.5; // 50% chance of success

      if (isSuccess) {
        router.push({
          pathname: '/transaction-success',
          params: {
            type: 'transfer',
            amount: amount,
            recipient: accountHolderName || accountNumber,
            description: `Bank transfer to ${ifscCode}`,
          },
        });
      } else {
        router.push({
          pathname: '/transaction-failure',
          params: {
            type: 'transfer',
            amount: amount,
            recipient: accountHolderName || accountNumber,
            description: `Bank transfer to ${ifscCode}`,
            error: 'Bank server unresponsive',
          },
        });
      }

    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      router.push({
        pathname: '/transaction-failure',
        params: {
          type: 'transfer',
          amount: amount,
          recipient: accountHolderName || accountNumber,
          description: `Bank transfer to ${ifscCode}`,
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
        <Text style={styles.title}>Send to Bank Account</Text>
      </View>
      <ScrollView style={styles.content}>
        {!showPinInput ? (
          <View>
            <Text style={styles.sectionTitle}>Recipient Bank Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Account Number"
              keyboardType="numeric"
              value={accountNumber}
              onChangeText={setAccountNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="IFSC Code"
              autoCapitalize="characters"
              value={ifscCode}
              onChangeText={setIfscCode}
            />
            <TextInput
              style={styles.input}
              placeholder="Account Holder Name"
              value={accountHolderName}
              onChangeText={setAccountHolderName}
            />

            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Amount</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.pinContainer}>
             <Text style={styles.pinLabel}>Enter UPI PIN to Pay</Text>
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
                 <Text style={styles.payButtonText}>Pay ₹{amount}</Text>
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
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
    marginBottom: 24,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '500',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#172e73',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
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
    marginBottom: 12,
    color: '#333',
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