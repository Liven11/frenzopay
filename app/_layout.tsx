import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import UserProvider from './context/UserContext';
import { TransactionProvider } from './context/TransactionContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

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

  return (
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
            <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
              <RootLayoutNav />
              <StatusBar style="light" />
            </ThemeProvider>
          </TransactionProvider>
        </UserProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}