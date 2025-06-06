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
import { ArrowLeft, Phone, DollarSign } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function MobileRechargeScreen() {
  const router = useRouter();

  const [mobileNumber, setMobileNumber] = useState('');
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);

  const handleContinue = () => {
    if (!mobileNumber || mobileNumber.length !== 10 || !rechargeAmount || isNaN(Number(rechargeAmount)) || Number(rechargeAmount) <= 0) {
      Alert.alert('Invalid Details', 'Please enter a valid 10-digit mobile number and a valid recharge amount.');
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
      const isSuccess = Math.random() > 0.4; // 60% chance of success

      if (isSuccess) {
        router.push({
          pathname: '/transaction-success',
          params: {
            type: 'recharge',
            amount: rechargeAmount,
            recipient: mobileNumber,
            description: 'Mobile Recharge',
          },
        });
      } else {
        router.push({
          pathname: '/transaction-failure',
          params: {
            type: 'recharge',
            amount: rechargeAmount,
            recipient: mobileNumber,
            description: 'Mobile Recharge',
            error: 'Operator server error',
          },
        });
      }

    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      router.push({
        pathname: '/transaction-failure',
        params: {
          type: 'recharge',
          amount: rechargeAmount,
          recipient: mobileNumber,
          description: 'Mobile Recharge',
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
        <Text style={styles.title}>Mobile Recharge</Text>
      </View>
      <ScrollView style={styles.content}>
        {!showPinInput ? (
          <View>
            <Text style={styles.sectionTitle}>Enter Mobile Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Mobile Number (10 digits)"
              keyboardType="number-pad"
              maxLength={10}
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Recharge Amount"
              keyboardType="numeric"
              value={rechargeAmount}
              onChangeText={setRechargeAmount}
            />

            {/* Could add plan selection here */}

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
              <Text style={styles.paymentAmountText}>Recharging: ₹{rechargeAmount} for {mobileNumber}</Text>
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
                  <Text style={styles.payButtonText}>Pay ₹{rechargeAmount}</Text>
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