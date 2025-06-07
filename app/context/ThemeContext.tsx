import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: typeof lightColors;
}

const lightColors = {
  primary: '#172e73',
  background: '#ffffff',
  card: '#f8f9fa',
  text: '#172e73',
  textSecondary: '#666666',
  border: '#eeeeee',
  error: '#DB0011',
  success: '#28a745',
  switchTrack: '#e0e0e0',
  switchThumb: '#ffffff',
};

const darkColors = {
  primary: '#4a6bff',
  background: '#1a1a1a',
  card: '#2a2a2a',
  text: '#ffffff',
  textSecondary: '#999999',
  border: '#333333',
  error: '#ff4d4d',
  success: '#4caf50',
  switchTrack: '#172e73',
  switchThumb: '#ffffff',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    // Load saved theme from AsyncStorage
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme as ThemeType);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode: theme === 'dark',
        toggleTheme,
        colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 
export default ThemeContext;