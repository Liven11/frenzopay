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
import { ArrowLeft, Shield, DollarSign } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function InsuranceScreen() {
  const router = useRouter();

  const [policyNumber, setPolicyNumber] = useState('');
  const [premiumAmount, setPremiumAmount] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);

  const handleContinue = () => {
    if (!policyNumber || !premiumAmount || isNaN(Number(premiumAmount)) || Number(premiumAmount) <= 0) {
      Alert.alert('Invalid Details', 'Please enter a valid policy number and premium amount.');
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
      const isSuccess = Math.random() > 0.6; // 60% chance of success

      if (isSuccess) {
        router.push({
          pathname: '/transaction-success',
          params: { amount: premiumAmount, recipient: `Policy ${policyNumber}`, description: 'Insurance Payment' },
        });
      } else {
        const simulatedError = new Error("Insurance payment failed"); // Replace with actual error details
        router.push({
          pathname: '/transaction-failure',
          params: { message: simulatedError.message },
        });
      }

    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      router.push({
        pathname: '/transaction-failure',
        params: { message: errorMessage },
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
        <Text style={styles.title}>Insurance Payment</Text>
      </View>
      <ScrollView style={styles.content}>
        {!showPinInput ? (
          <View>
            <Text style={styles.sectionTitle}>Enter Policy Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Policy Number"
              keyboardType="default"
              value={policyNumber}
              onChangeText={setPolicyNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Premium Amount"
              keyboardType="numeric"
              value={premiumAmount}
              onChangeText={setPremiumAmount}
            />

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
              <Text style={styles.paymentAmountText}>Paying: ₹{premiumAmount} for policy {policyNumber}</Text>
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
                  <Text style={styles.payButtonText}>Pay ₹{premiumAmount}</Text>
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
}); 