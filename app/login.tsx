import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone } from 'lucide-react-native';
import { securityManager } from './utils/security';
import { SecurityAlert } from './components/SecurityAlert';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [showDeviceAlert, setShowDeviceAlert] = useState(false);
  const [showAppAlert, setShowAppAlert] = useState(false);

  useEffect(() => {
    const checkSecurity = async () => {
      // Check device security
      const isDeviceSecure = await securityManager.checkDeviceSecurity();
      if (!isDeviceSecure) {
        setShowDeviceAlert(true);
        // Auto close app after 3 seconds
        setTimeout(() => {
          // On Android, use BackHandler.exitApp()
          // On iOS,  show the alert
          if (Platform.OS === 'android') {
            router.replace('/');
          }
        }, 3000);
        return;
      }

      // Check app tampering
      const isAppSecure = await securityManager.checkAppTampering();
      if (!isAppSecure) {
        setShowAppAlert(true);
        // Auto close app after 3 seconds
        setTimeout(() => {
          if (Platform.OS === 'android') {
            router.replace('/');
          }
        }, 3000);
        return;
      }
    };

    checkSecurity();
  }, []);

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
    setIsValid(true);
  };

  const handleLogin = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setIsValid(false);
      return;
    }

    if (phoneNumber === '9876543210') {
      router.push('/otp-verification');
    } else {
      Alert.alert('Error', 'Invalid phone number. Please use 9876543210 for testing.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/frenzopay-logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.tagline}>Your Digital Payment Partner</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Enter your phone number to continue</Text>
            
            <View style={styles.inputContainer}>
              <View style={styles.phoneInputWrapper}>
                <Phone size={20} color="#666" style={styles.phoneIcon} />
                <TextInput
                  style={[styles.input, !isValid && styles.inputError]}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phoneNumber}
                  onChangeText={handlePhoneNumberChange}
                />
              </View>
              {!isValid && (
                <Text style={styles.errorText}>Please enter a valid 10-digit phone number</Text>
              )}
            </View>

            <TouchableOpacity 
              style={[styles.button, !phoneNumber && styles.buttonDisabled]} 
              onPress={handleLogin}
              disabled={!phoneNumber}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By continuing, you agree to our{' '}
                <Text style={styles.termsLink}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      <SecurityAlert
        visible={showDeviceAlert}
        title="Security Warning"
        message="This device appears to be compromised (rooted/jailbroken). The app will close for security reasons."
        onClose={() => {
          setShowDeviceAlert(false);
          if (Platform.OS === 'android') {
            router.replace('/');
          }
        }}
      />

      <SecurityAlert
        visible={showAppAlert}
        title="App Security Warning"
        message="The app's integrity has been compromised. The app will close for security reasons."
        onClose={() => {
          setShowAppAlert(false);
          if (Platform.OS === 'android') {
            router.replace('/');
          }
        }}
      />
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
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#172e73',
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    fontFamily: 'Inter-Regular',
  },
  inputContainer: {
    marginBottom: 24,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
  },
  phoneIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  button: {
    backgroundColor: '#172e73',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
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
  termsContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  termsLink: {
    color: '#172e73',
    textDecorationLine: 'underline',
  },
}); 