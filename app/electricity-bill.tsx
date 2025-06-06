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
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { validateConsumerNumber, validateAmount } from './utils/validation';

export default function ElectricityBillScreen() {
  const router = useRouter();
  const [consumerNumber, setConsumerNumber] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const [errors, setErrors] = useState<{
    consumerNumber?: string;
    amount?: string;
  }>({});

  const handleContinue = () => {
    // Validate consumer number and amount
    const consumerValidation = validateConsumerNumber(consumerNumber);
    const amountValidation = validateAmount(billAmount);

    if (!consumerValidation.isValid || !amountValidation.isValid) {
      setErrors({
        consumerNumber: consumerValidation.error,
        amount: amountValidation.error,
      });
      return;
    }

    setErrors({});
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
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#172e73" />
        </TouchableOpacity>
        <Text style={styles.title}>Electricity Bill</Text>
      </View>

      <ScrollView style={styles.content}>
        {!showPinInput ? (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Consumer Number</Text>
              <TextInput
                style={[styles.input, errors.consumerNumber && styles.inputError]}
                placeholder="Enter consumer number"
                value={consumerNumber}
                onChangeText={(text) => {
                  setConsumerNumber(text.replace(/\D/g, ''));
                  if (errors.consumerNumber) {
                    setErrors(prev => ({ ...prev, consumerNumber: undefined }));
                  }
                }}
                keyboardType="numeric"
                maxLength={12}
              />
              {errors.consumerNumber && (
                <Text style={styles.errorText}>{errors.consumerNumber}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bill Amount (₹)</Text>
              <TextInput
                style={[styles.input, errors.amount && styles.inputError]}
                placeholder="Enter bill amount"
                value={billAmount}
                onChangeText={(text) => {
                  setBillAmount(text.replace(/[^0-9.]/g, ''));
                  if (errors.amount) {
                    setErrors(prev => ({ ...prev, amount: undefined }));
                  }
                }}
                keyboardType="decimal-pad"
              />
              {errors.amount && (
                <Text style={styles.errorText}>{errors.amount}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </>
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
    fontFamily: 'Inter-Bold',
    color: '#172e73',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  inputError: {
    borderColor: '#DB0011',
  },
  errorText: {
    color: '#DB0011',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
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
    fontFamily: 'Inter-Bold',
  },
  pinContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  pinLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
    color: '#333',
  },
  paymentAmountText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
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
    fontFamily: 'Inter-Bold',
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
    fontFamily: 'Inter-Bold',
  },
}); 