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
      try {
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
          return;
        }

        // Check app tampering
        const isAppSecure = await securityManager.checkAppTampering();
        if (!isAppSecure) {
          setShowAppAlert(true);
          return;
        }
      } catch (error) {
        console.warn('Error in security check:', error);
        // Continue with the app even if security checks fail
      }
    };

    checkSecurity();
  }, [segments]);

  return (
    <View style={{ flex: 1 }}>
      {children}
      
      <SecurityAlert
        visible={showDeviceAlert}
        title="Security Notice"
        message="This device appears to be compromised (rooted/jailbroken). Some features may be limited."
        onClose={() => setShowDeviceAlert(false)}
      />

      <SecurityAlert
        visible={showAppAlert}
        title="App Security Notice"
        message="The app's integrity has been compromised. Some features may be limited."
        onClose={() => setShowAppAlert(false)}
      />
    </View>
  );
}; 