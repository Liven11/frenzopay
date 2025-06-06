import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import UserProvider from './context/UserContext';
import { TransactionProvider } from './context/TransactionContext';
import { LanguageProvider } from './context/LanguageContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

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
      <UserProvider>
        <TransactionProvider>
          <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="search" options={{ headerShown: false }} />
              <Stack.Screen name="send" options={{ headerShown: false }} />
              <Stack.Screen name="insurance" options={{ headerShown: false }} />
              <Stack.Screen name="wallet" options={{ headerShown: false }} />
              <Stack.Screen name="notifications" options={{ headerShown: false }} />
              <Stack.Screen name="creditcard-payment" options={{ headerShown: false }} />
              <Stack.Screen name="scan" options={{ headerShown: false }} />
              <Stack.Screen name="profile/personal-info" options={{ headerShown: false }} />
              <Stack.Screen name="profile/cards" options={{ headerShown: false }} />
              <Stack.Screen name="profile/language" options={{ headerShown: false }} />
              <Stack.Screen name="profile/bank-accounts" options={{ headerShown: false }} />
              <Stack.Screen name="profile/security" options={{ headerShown: false }} />
              <Stack.Screen name="profile/help" options={{ headerShown: false }} />
              <Stack.Screen name="profile/contact" options={{ headerShown: false }} />
              <Stack.Screen name="profile/support" options={{ headerShown: false }} />
              <Stack.Screen name="refer-win" options={{ headerShown: false }} />
              <Stack.Screen name="personal-loans" options={{ headerShown: false }} />
              <Stack.Screen name="gold-loans" options={{ headerShown: false }} />
              <Stack.Screen name="digital-fds" options={{ headerShown: false }} />
              <Stack.Screen name="to-mobile" options={{ headerShown: false }} />
              <Stack.Screen name="to-bank-account" options={{ headerShown: false }} />
              <Stack.Screen name="electricity-bill" options={{ headerShown: false }} />
              <Stack.Screen name="transaction-success" options={{ headerShown: false }} />
              <Stack.Screen name="transaction-failure" options={{ headerShown: false }} />
              <Stack.Screen name="fastag-recharge" options={{ headerShown: false }} />
              <Stack.Screen name="mobile-recharge" options={{ headerShown: false }} />
              <Stack.Screen name="dth-payments" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="light" />
          </ThemeProvider>
        </TransactionProvider>
      </UserProvider>
    </LanguageProvider>
  );
}