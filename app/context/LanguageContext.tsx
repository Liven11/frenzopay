import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  translations: Record<string, Record<string, string>>;
}

const translations = {
  en: {
    // Profile Page
    'personal_info': 'Personal Information',
    'update_profile': 'Update your profile details',
    'language': 'Language',
    'appearance': 'Appearance',
    'light_mode': 'Light mode',
    'security': 'Security',
    'payment_methods': 'Payment Methods',
    'support': 'Support',
    'logout': 'Log Out',
    'edit_profile': 'Edit Profile',
    'account': 'ACCOUNT',
    'face_id': 'Face ID / Touch ID',
    'use_biometric': 'Use biometric authentication',
    'pin_password': 'PIN & Password',
    'change_pin': 'Change your security PIN',
    'cards': 'Cards',
    'manage_cards': 'Manage your cards',
    'bank_accounts': 'Bank Accounts',
    'connected_banks': 'Connected bank accounts',
    'help_center': 'Help Center',
    'faqs_guides': 'FAQs and guides',
    'contact_support': 'Contact Support',
    'get_in_touch': 'Get in touch with us',
    
    // Language Page
    'select_language': 'Select your preferred language for the app interface',
    'language_title': 'Language',
  },
  hi: {
    // Profile Page
    'personal_info': 'व्यक्तिगत जानकारी',
    'update_profile': 'अपनी प्रोफ़ाइल विवरण अपडेट करें',
    'language': 'भाषा',
    'appearance': 'दिखावट',
    'light_mode': 'लाइट मोड',
    'security': 'सुरक्षा',
    'payment_methods': 'भुगतान विधियां',
    'support': 'सहायता',
    'logout': 'लॉग आउट',
    'edit_profile': 'प्रोफ़ाइल संपादित करें',
    'account': 'खाता',
    'face_id': 'फेस आईडी / टच आईडी',
    'use_biometric': 'बायोमेट्रिक प्रमाणीकरण का उपयोग करें',
    'pin_password': 'पिन और पासवर्ड',
    'change_pin': 'अपना सुरक्षा पिन बदलें',
    'cards': 'कार्ड',
    'manage_cards': 'अपने कार्ड प्रबंधित करें',
    'bank_accounts': 'बैंक खाते',
    'connected_banks': 'कनेक्टेड बैंक खाते',
    'help_center': 'सहायता केंद्र',
    'faqs_guides': 'पूछे जाने वाले प्रश्न और गाइड',
    'contact_support': 'सहायता से संपर्क करें',
    'get_in_touch': 'हमसे संपर्क करें',
    
    // Language Page
    'select_language': 'ऐप इंटरफेस के लिए अपनी पसंदीदा भाषा चुनें',
    'language_title': 'भाषा',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load saved language preference
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        setLanguageState(savedLanguage as Language);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const setLanguage = async (newLanguage: Language) => {
    try {
      await AsyncStorage.setItem('language', newLanguage);
      setLanguageState(newLanguage);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 