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
import { ArrowLeft, Tv, DollarSign } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useWallet } from './context/WalletContext';

export default function DthPaymentsScreen() {
  const router = useRouter();
  const { balance, deductMoney, addMoney } = useWallet();

  const [subscriberId, setSubscriberId] = useState('');
  const [dthAmount, setDthAmount] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);

  const handleContinue = () => {
    if (!subscriberId || !dthAmount || isNaN(Number(dthAmount)) || Number(dthAmount) <= 0) {
      Alert.alert('Invalid Details', 'Please enter a valid subscriber ID and amount.');
      return;
    }

    if (Number(dthAmount) > balance) {
      Alert.alert('Insufficient Balance', 'You don\'t have enough balance in your wallet for this payment.');
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
      // Deduct amount from wallet
      await deductMoney(Number(dthAmount));

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate success or failure
      const isSuccess = Math.random() > 0.5; // 50% chance of success

      if (isSuccess) {
        router.push({
          pathname: '/transaction-success',
          params: { 
            amount: dthAmount, 
            recipient: `DTH ID: ${subscriberId}`, 
            description: 'DTH Payment' 
          },
        });
      } else {
        // If payment fails, add the amount back to wallet
        await addMoney(Number(dthAmount));
        router.push({
          pathname: '/transaction-failure',
          params: { 
            message: 'DTH operator error',
            amount: dthAmount,
            recipient: `DTH ID: ${subscriberId}`,
            description: 'DTH Payment'
          },
        });
      }

    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      router.push({
        pathname: '/transaction-failure',
        params: { 
          message: errorMessage,
          amount: dthAmount,
          recipient: `DTH ID: ${subscriberId}`,
          description: 'DTH Payment'
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
        <Text style={styles.title}>DTH Payments</Text>
      </View>
      <ScrollView style={styles.content}>
        {!showPinInput ? (
          <View>
            <Text style={styles.sectionTitle}>Enter DTH Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Subscriber ID"
              keyboardType="default"
              value={subscriberId}
              onChangeText={setSubscriberId}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={dthAmount}
              onChangeText={setDthAmount}
            />

            <Text style={styles.balanceText}>Available Balance: ₹{balance.toLocaleString()}</Text>

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
              <Text style={styles.paymentAmountText}>Paying: ₹{dthAmount} for DTH ID {subscriberId}</Text>
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
                  <Text style={styles.payButtonText}>Pay ₹{dthAmount}</Text>
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
  balanceText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    textAlign: 'right',
  },
}); 