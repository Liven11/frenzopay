import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from './context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Lock } from 'lucide-react-native';

export default function OTPVerificationScreen() {
  const [otp, setOtp] = useState('');
  const [isValid, setIsValid] = useState(true);
  const { login } = useAuth();

  const validateOTP = (otp: string) => {
    return otp.length === 4;
  };

  const handleOTPChange = (text: string) => {
    setOtp(text);
    setIsValid(true);
  };

  const handleVerifyOTP = () => {
    if (!validateOTP(otp)) {
      setIsValid(false);
      return;
    }

    if (otp === '0000') {
      login(); // Set auth state
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'Invalid OTP. Please use 0000 for testing.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#172e73" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>OTP Verification</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Lock size={48} color="#172e73" />
          </View>

          <Text style={styles.title}>Enter Verification Code</Text>
          <Text style={styles.subtitle}>
            We have sent a 4-digit verification code to your phone number
          </Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, !isValid && styles.inputError]}
              placeholder="Enter OTP"
              keyboardType="number-pad"
              maxLength={4}
              value={otp}
              onChangeText={handleOTPChange}
            />
            {!isValid && (
              <Text style={styles.errorText}>Please enter a valid 4-digit OTP</Text>
            )}
          </View>

          <TouchableOpacity 
            style={[styles.button, !otp && styles.buttonDisabled]} 
            onPress={handleVerifyOTP}
            disabled={!otp}
          >
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive the code? </Text>
            <TouchableOpacity>
              <Text style={styles.resendLink}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#172e73',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#172e73',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    backgroundColor: '#f8f9fa',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  button: {
    backgroundColor: '#172e73',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  resendText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  resendLink: {
    fontSize: 14,
    color: '#172e73',
    fontFamily: 'Inter-Bold',
  },
}); 