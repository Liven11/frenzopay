import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { SecurityAlert } from './SecurityAlert';
import { securityManager } from '../utils/security';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SecureNavigationProps {
  children: React.ReactNode;
}

export const SecureNavigation: React.FC<SecureNavigationProps> = ({ children }) => {
  const [showDeviceAlert, setShowDeviceAlert] = useState(false);
  const [showAppAlert, setShowAppAlert] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkSecurity = async () => {
      // Skip security checks for login and public routes
      const isPublicRoute = segments[0] === 'login' || segments[0] === 'otp-verification';
      if (isPublicRoute) return;

      // Check if user is logged in
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (!isLoggedIn) return;

      // Check device security
      const isDeviceSecure = await securityManager.checkDeviceSecurity();
      if (!isDeviceSecure) {
        setShowDeviceAlert(true);
        // Log out user and clear storage
        await AsyncStorage.clear();
        setTimeout(() => {
          router.replace('/login');
        }, 3000);
        return;
      }

      // Check app tampering
      const isAppSecure = await securityManager.checkAppTampering();
      if (!isAppSecure) {
        setShowAppAlert(true);
        // Log out user and clear storage
        await AsyncStorage.clear();
        setTimeout(() => {
          router.replace('/login');
        }, 3000);
        return;
      }
    };

    checkSecurity();
  }, [segments]);

  return (
    <View style={{ flex: 1 }}>
      {children}
      
      <SecurityAlert
        visible={showDeviceAlert}
        title="Security Warning"
        message="This device appears to be compromised (rooted/jailbroken). You have been logged out for security reasons."
        onClose={() => {
          setShowDeviceAlert(false);
          router.replace('/login');
        }}
      />

      <SecurityAlert
        visible={showAppAlert}
        title="App Security Warning"
        message="The app's integrity has been compromised. You have been logged out for security reasons."
        onClose={() => {
          setShowAppAlert(false);
          router.replace('/login');
        }}
      />
    </View>
  );
}; 