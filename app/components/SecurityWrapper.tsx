import React, { useEffect } from 'react';
import { View } from 'react-native';
import { SecurityAlert } from './SecurityAlert';
import { useSecurity } from '../../hooks/useSecurity';
import { securityManager } from '../utils/security';

interface SecurityWrapperProps {
  children: React.ReactNode;
}

export const SecurityWrapper: React.FC<SecurityWrapperProps> = ({ children }) => {
  const {
    showDeviceAlert,
    showAppAlert,
    handleDeviceAlertClose,
    handleAppAlertClose,
  } = useSecurity();

  useEffect(() => {
    // Prevent screenshots when the component mounts
    securityManager.preventScreenshots();

    // Allow screenshots when the component unmounts
    return () => {
      securityManager.allowScreenshots();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {children}
      
      <SecurityAlert
        visible={showDeviceAlert}
        title="Security Warning"
        message="This device appears to be compromised (rooted/jailbroken). For security reasons, some features may be limited."
        onClose={handleDeviceAlertClose}
      />

      <SecurityAlert
        visible={showAppAlert}
        title="App Security Warning"
        message="The app's integrity has been compromised. Please reinstall the app from a trusted source."
        onClose={handleAppAlertClose}
      />
    </View>
  );
}; 