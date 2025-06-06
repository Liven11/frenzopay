import React, { createContext, useContext, useState, useEffect } from 'react';
import { router } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  checkBiometricSupport: () => Promise<boolean>;
  authenticateWithBiometrics: () => Promise<boolean>;
  isBiometricEnabled: boolean;
  toggleBiometric: (enabled: boolean) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [lastAuthTime, setLastAuthTime] = useState<number>(0);
  const AUTH_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

  useEffect(() => {
    // Check if biometric auth is enabled
    checkBiometricStatus();
    // Check if we have a valid authentication session
    checkAuthSession();
  }, []);

  const checkAuthSession = async () => {
    try {
      const lastAuth = await AsyncStorage.getItem('lastAuthTime');
      if (lastAuth) {
        const time = parseInt(lastAuth);
        if (Date.now() - time < AUTH_TIMEOUT) {
          setIsAuthenticated(true);
          setLastAuthTime(time);
        }
      }
    } catch (error) {
      console.error('Error checking auth session:', error);
    }
  };

  const checkBiometricStatus = async () => {
    try {
      const biometricEnabled = await AsyncStorage.getItem('biometricEnabled');
      setIsBiometricEnabled(biometricEnabled === 'true');
    } catch (error) {
      console.error('Error checking biometric status:', error);
    }
  };

  const checkBiometricSupport = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (compatible) {
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        return enrolled && types.length > 0;
      }
      return false;
    } catch (error) {
      console.error('Error checking biometric support:', error);
      return false;
    }
  };

  const authenticateWithBiometrics = async () => {
    try {
      // Check if we have a valid session
      if (Date.now() - lastAuthTime < AUTH_TIMEOUT) {
        return true;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to continue',
        fallbackLabel: 'Use passcode',
        disableDeviceFallback: false,
        cancelLabel: 'Cancel',
      });

      if (result.success) {
        const currentTime = Date.now();
        setLastAuthTime(currentTime);
        await AsyncStorage.setItem('lastAuthTime', currentTime.toString());
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error authenticating with biometrics:', error);
      return false;
    }
  };

  const toggleBiometric = async (enabled: boolean) => {
    try {
      if (enabled) {
        const supported = await checkBiometricSupport();
        if (!supported) {
          throw new Error('Biometric authentication is not supported on this device');
        }
      }
      await AsyncStorage.setItem('biometricEnabled', enabled.toString());
      setIsBiometricEnabled(enabled);
    } catch (error) {
      console.error('Error toggling biometric:', error);
      throw error;
    }
  };

  const login = async () => {
    setIsAuthenticated(true);
    const currentTime = Date.now();
    setLastAuthTime(currentTime);
    await AsyncStorage.setItem('lastAuthTime', currentTime.toString());
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setLastAuthTime(0);
    await AsyncStorage.removeItem('lastAuthTime');
    router.replace('/login');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        login, 
        logout,
        checkBiometricSupport,
        authenticateWithBiometrics,
        isBiometricEnabled,
        toggleBiometric
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 