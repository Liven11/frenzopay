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
import { validateBankAccount, validateAmount } from './utils/validation';

export default function ToBankAccountScreen() {
  const router = useRouter();
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [amount, setAmount] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const [errors, setErrors] = useState<{
    accountNumber?: string;
    ifscCode?: string;
    amount?: string;
    accountHolderName?: string;
  }>({});

  const handleContinue = () => {
    // Validate bank account details
    const bankValidation = validateBankAccount(accountNumber, ifscCode);
    const amountValidation = validateAmount(amount);

    if (!bankValidation.isValid || !amountValidation.isValid) {
      setErrors({
        ...bankValidation.errors,
        amount: amountValidation.error,
      });
      return;
    }

    if (!accountHolderName.trim()) {
      setErrors({
        ...errors,
        accountHolderName: 'Account holder name is required',
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
      const isSuccess = Math.random() > 0.5;

      if (isSuccess) {
        router.push({
          pathname: '/transaction-success',
          params: {
            type: 'transfer',
            amount: amount,
            recipient: accountHolderName,
            description: `Bank transfer to ${ifscCode}`,
          },
        });
      } else {
        router.push({
          pathname: '/transaction-failure',
          params: {
            type: 'transfer',
            amount: amount,
            recipient: accountHolderName,
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
          recipient: accountHolderName,
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
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#172e73" />
        </TouchableOpacity>
        <Text style={styles.title}>Bank Transfer</Text>
      </View>

      <ScrollView style={styles.content}>
        {!showPinInput ? (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Account Number</Text>
              <TextInput
                style={[styles.input, errors.accountNumber && styles.inputError]}
                placeholder="Enter account number"
                value={accountNumber}
                onChangeText={(text) => {
                  setAccountNumber(text.replace(/\D/g, ''));
                  if (errors.accountNumber) {
                    setErrors(prev => ({ ...prev, accountNumber: undefined }));
                  }
                }}
                keyboardType="numeric"
                maxLength={18}
              />
              {errors.accountNumber && (
                <Text style={styles.errorText}>{errors.accountNumber}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>IFSC Code</Text>
              <TextInput
                style={[styles.input, errors.ifscCode && styles.inputError]}
                placeholder="Enter IFSC code"
                value={ifscCode}
                onChangeText={(text) => {
                  setIfscCode(text.toUpperCase());
                  if (errors.ifscCode) {
                    setErrors(prev => ({ ...prev, ifscCode: undefined }));
                  }
                }}
                autoCapitalize="characters"
                maxLength={11}
              />
              {errors.ifscCode && (
                <Text style={styles.errorText}>{errors.ifscCode}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Account Holder Name</Text>
              <TextInput
                style={[styles.input, errors.accountHolderName && styles.inputError]}
                placeholder="Enter account holder name"
                value={accountHolderName}
                onChangeText={(text) => {
                  setAccountHolderName(text);
                  if (errors.accountHolderName) {
                    setErrors(prev => ({ ...prev, accountHolderName: undefined }));
                  }
                }}
                autoCapitalize="words"
              />
              {errors.accountHolderName && (
                <Text style={styles.errorText}>{errors.accountHolderName}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Amount (₹)</Text>
              <TextInput
                style={[styles.input, errors.amount && styles.inputError]}
                placeholder="Enter amount"
                value={amount}
                onChangeText={(text) => {
                  setAmount(text.replace(/[^0-9.]/g, ''));
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
            <Text style={styles.paymentAmountText}>Paying: ₹{amount}</Text>
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