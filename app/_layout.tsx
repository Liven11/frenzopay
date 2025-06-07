import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { useColorScheme, AppState, AppStateStatus } from 'react-native';
import UserProvider from './context/UserContext';
import { TransactionProvider } from './context/TransactionContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import { SecureNavigation } from './components/SecureNavigation';
import { ScreenshotPreventionOverlay } from './components/ScreenshotPreventionOverlay';
import { securityManager } from './utils/security';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isAuthenticated, authenticateWithBiometrics, isBiometricEnabled } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      if (isAuthenticated && isBiometricEnabled) {
        const authenticated = await authenticateWithBiometrics();
        if (!authenticated) {
          router.replace('/login');
        }
      }
      // Re-enable screenshot prevention when app comes to foreground
      if (isAuthenticated) {
        await securityManager.preventScreenshots();
      }
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [isAuthenticated, isBiometricEnabled]);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    const isLoginScreen = segments[0] === 'login';
    const isOtpScreen = segments[0] === 'otp-verification';
    
    if (!isAuthenticated && !isLoginScreen && !isOtpScreen) {
      // Redirect to the login page if not authenticated
      router.replace('/login');
    } else if (isAuthenticated && (isLoginScreen || isOtpScreen)) {
      // Redirect to the main app if authenticated
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments]);

  // Handle screenshot prevention
  useEffect(() => {
    const setupScreenshotPrevention = async () => {
      if (isAuthenticated) {
        // Multiple attempts to ensure screenshot prevention is enabled
        for (let i = 0; i < 3; i++) {
          await securityManager.preventScreenshots();
          // Add a small delay between attempts
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } else {
        await securityManager.allowScreenshots();
      }
    };

    setupScreenshotPrevention();

    // Set up an interval to periodically re-enable screenshot prevention
    const interval = setInterval(() => {
      if (isAuthenticated) {
        securityManager.preventScreenshots();
      }
    }, 5000); // Check every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  return (
    <SecureNavigation>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="otp-verification" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="search" />
        <Stack.Screen name="send" />
        <Stack.Screen name="insurance" />
        <Stack.Screen name="wallet" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="creditcard-payment" />
        <Stack.Screen name="scan" />
        <Stack.Screen name="profile/personal-info" />
        <Stack.Screen name="profile/cards" />
        <Stack.Screen name="profile/language" />
        <Stack.Screen name="profile/bank-accounts" />
        <Stack.Screen name="profile/security" />
        <Stack.Screen name="profile/help" />
        <Stack.Screen name="profile/contact" />
        <Stack.Screen name="profile/support" />
        <Stack.Screen name="refer-win" />
        <Stack.Screen name="personal-loans" />
        <Stack.Screen name="gold-loans" />
        <Stack.Screen name="digital-fds" />
        <Stack.Screen name="to-mobile" />
        <Stack.Screen name="to-bank-account" />
        <Stack.Screen name="electricity-bill" />
        <Stack.Screen name="transaction-success" />
        <Stack.Screen name="transaction-failure" />
        <Stack.Screen name="fastag-recharge" />
        <Stack.Screen name="mobile-recharge" />
        <Stack.Screen name="dth-payments" />
      </Stack>
      {isAuthenticated && <ScreenshotPreventionOverlay />}
    </SecureNavigation>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Bold': Inter_700Bold,
  });

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LanguageProvider>
      <AuthProvider>
        <UserProvider>
          <TransactionProvider>
            <WalletProvider>
              <RootLayoutNav />
              <StatusBar style="light" />
            </WalletProvider>
          </TransactionProvider>
        </UserProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}