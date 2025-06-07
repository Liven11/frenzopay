import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, CreditCard } from 'lucide-react-native';
import { validateCreditCardPayment } from './utils/validation';

export default function CreditCardPaymentScreen() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: '',
  });

  const [errors, setErrors] = useState<{
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    amount?: string;
  }>({});

  const [cardType, setCardType] = useState<'visa' | 'mastercard' | 'unknown'>('unknown');

  useEffect(() => {
    // Validate card type whenever card number changes
    const validation = validateCreditCardPayment(
      formData.cardNumber,
      formData.expiryDate,
      formData.cvv,
      formData.amount
    );
    setCardType(validation.cardType || 'unknown');
  }, [formData.cardNumber]);

  const formatCardNumber = (text: string) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    // Add space after every 4 digits
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted;
  };

  const formatExpiryDate = (text: string) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    // Add slash after 2 digits
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;

    switch (field) {
      case 'cardNumber':
        formattedValue = formatCardNumber(value);
        break;
      case 'expiryDate':
        formattedValue = formatExpiryDate(value);
        break;
      case 'cvv':
        formattedValue = value.replace(/\D/g, '').slice(0, 4);
        break;
      case 'amount':
        formattedValue = value.replace(/[^0-9.]/g, '');
        break;
    }

    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }));

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = () => {
    const validation = validateCreditCardPayment(
      formData.cardNumber,
      formData.expiryDate,
      formData.cvv,
      formData.amount
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Process payment
    Alert.alert(
      'Confirm Payment',
      `Are you sure you want to pay ₹${formData.amount}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Pay',
          onPress: () => {
            // Simulate payment processing
            setTimeout(() => {
              router.push({
                pathname: '/transaction-success',
                params: {
                  type: 'payment',
                  amount: formData.amount,
                  recipient: `${cardType.charAt(0).toUpperCase() + cardType.slice(1)} Card Payment`,
                  description: `Credit card payment ending with ${formData.cardNumber.slice(-4)}`,
                },
              });
            }, 1500);
          },
        },
      ]
    );
  };

  const getCardIcon = () => {
    switch (cardType) {
      case 'visa':
        return require('../assets/visa.png');
      case 'mastercard':
        return require('../assets/mastercard.png');
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color="#172e73" />
          </TouchableOpacity>
          <Text style={styles.title}>Credit Card Payment</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.cardContainer}>
            {cardType !== 'unknown' ? (
              <Image
                source={getCardIcon()}
                style={styles.cardIcon}
                resizeMode="contain"
              />
            ) : (
              <CreditCard size={40} color="#172e73" />
            )}
            <Text style={styles.cardTitle}>Enter Card Details</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Card Number</Text>
              <TextInput
                style={[styles.input, errors.cardNumber && styles.inputError]}
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChangeText={(value) => handleInputChange('cardNumber', value)}
                keyboardType="numeric"
                maxLength={19}
              />
              {errors.cardNumber && (
                <Text style={styles.errorText}>{errors.cardNumber}</Text>
              )}
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Expiry Date</Text>
                <TextInput
                  style={[styles.input, errors.expiryDate && styles.inputError]}
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChangeText={(value) => handleInputChange('expiryDate', value)}
                  keyboardType="numeric"
                  maxLength={5}
                />
                {errors.expiryDate && (
                  <Text style={styles.errorText}>{errors.expiryDate}</Text>
                )}
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={[styles.input, errors.cvv && styles.inputError]}
                  placeholder="123"
                  value={formData.cvv}
                  onChangeText={(value) => handleInputChange('cvv', value)}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
                {errors.cvv && (
                  <Text style={styles.errorText}>{errors.cvv}</Text>
                )}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Amount (₹)</Text>
              <TextInput
                style={[styles.input, errors.amount && styles.inputError]}
                placeholder="0.00"
                value={formData.amount}
                onChangeText={(value) => handleInputChange('amount', value)}
                keyboardType="decimal-pad"
              />
              {errors.amount && (
                <Text style={styles.errorText}>{errors.amount}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.payButton}
              onPress={handleSubmit}
            >
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
  cardContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  cardIcon: {
    width: 60,
    height: 40,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#172e73',
    marginTop: 12,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 8,
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
    borderRadius: 8,
    padding: 12,
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
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  payButton: {
    backgroundColor: '#172e73',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
}); 