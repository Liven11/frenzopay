import { useState, useEffect } from 'react';
import { securityManager } from '../app/utils/security';

interface SecurityState {
  isDeviceSecure: boolean;
  isAppSecure: boolean;
  showDeviceAlert: boolean;
  showAppAlert: boolean;
}

export const useSecurity = () => {
  const [securityState, setSecurityState] = useState<SecurityState>({
    isDeviceSecure: true,
    isAppSecure: true,
    showDeviceAlert: false,
    showAppAlert: false,
  });

  useEffect(() => {
    const checkSecurity = async () => {
      // Check device security
      const isDeviceSecure = await securityManager.checkDeviceSecurity();
      if (!isDeviceSecure) {
        setSecurityState(prev => ({
          ...prev,
          isDeviceSecure: false,
          showDeviceAlert: true,
        }));
      }

      // Check app tampering
      const isAppSecure = await securityManager.checkAppTampering();
      if (!isAppSecure) {
        setSecurityState(prev => ({
          ...prev,
          isAppSecure: false,
          showAppAlert: true,
        }));
      }
    };

    checkSecurity();
  }, []);

  const handleDeviceAlertClose = () => {
    setSecurityState(prev => ({
      ...prev,
      showDeviceAlert: false,
    }));
  };

  const handleAppAlertClose = () => {
    setSecurityState(prev => ({
      ...prev,
      showAppAlert: false,
    }));
  };

  return {
    ...securityState,
    handleDeviceAlertClose,
    handleAppAlertClose,
  };
}; 