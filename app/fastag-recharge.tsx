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
import { validateVehicleNumber, validateAmount } from './utils/validation';
import { useWallet } from './context/WalletContext';

export default function FastagRechargeScreen() {
  const router = useRouter();
  const { balance, deductMoney, addMoney } = useWallet();
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [fastagAmount, setFastagAmount] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const [errors, setErrors] = useState<{
    vehicleNumber?: string;
    amount?: string;
  }>({});

  const handleContinue = () => {
    // Validate vehicle number and amount
    const vehicleValidation = validateVehicleNumber(vehicleNumber);
    const amountValidation = validateAmount(fastagAmount);

    if (!vehicleValidation.isValid || !amountValidation.isValid) {
      setErrors({
        vehicleNumber: vehicleValidation.error,
        amount: amountValidation.error,
      });
      return;
    }

    if (Number(fastagAmount) > balance) {
      Alert.alert('Insufficient Balance', 'You don\'t have enough balance in your wallet for this recharge.');
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
      // Deduct amount from wallet
      await deductMoney(Number(fastagAmount));

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate success or failure
      const isSuccess = Math.random() > 0.6; // 60% chance of success

      if (isSuccess) {
        router.push({
          pathname: '/transaction-success',
          params: {
            type: 'recharge',
            amount: fastagAmount,
            recipient: `FASTag for ${vehicleNumber}`,
            description: 'FASTag Recharge',
          },
        });
      } else {
        // If payment fails, add the amount back to wallet
        await addMoney(Number(fastagAmount));
        router.push({
          pathname: '/transaction-failure',
          params: {
            type: 'recharge',
            amount: fastagAmount,
            recipient: `FASTag for ${vehicleNumber}`,
            description: 'FASTag Recharge',
            error: 'FASTag service unavailable',
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
          amount: fastagAmount,
          recipient: `FASTag for ${vehicleNumber}`,
          description: 'FASTag Recharge',
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
        <Text style={styles.title}>FASTag Recharge</Text>
      </View>

      <ScrollView style={styles.content}>
        {!showPinInput ? (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Vehicle Number</Text>
              <TextInput
                style={[styles.input, errors.vehicleNumber && styles.inputError]}
                placeholder="Enter vehicle number (e.g., KA01AB1234)"
                value={vehicleNumber}
                onChangeText={(text) => {
                  setVehicleNumber(text.toUpperCase());
                  if (errors.vehicleNumber) {
                    setErrors(prev => ({ ...prev, vehicleNumber: undefined }));
                  }
                }}
                autoCapitalize="characters"
                maxLength={10}
              />
              {errors.vehicleNumber && (
                <Text style={styles.errorText}>{errors.vehicleNumber}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Recharge Amount (₹)</Text>
              <TextInput
                style={[styles.input, errors.amount && styles.inputError]}
                placeholder="Enter recharge amount"
                value={fastagAmount}
                onChangeText={(text) => {
                  setFastagAmount(text.replace(/[^0-9.]/g, ''));
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

            <Text style={styles.balanceText}>Available Balance: ₹{balance.toLocaleString()}</Text>

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
            <Text style={styles.paymentAmountText}>Paying: ₹{fastagAmount}</Text>
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
                <Text style={styles.payButtonText}>Pay ₹{fastagAmount}</Text>
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
  balanceText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    textAlign: 'right',
  },
});
