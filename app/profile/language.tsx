import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../context/LanguageContext';

const languages = [
  { code: 'en', name: 'English', region: 'United States' },
  { code: 'hi', name: 'Hindi', region: 'India' },
];

const LanguageItem = ({ language, isSelected, onSelect }) => (
  <TouchableOpacity 
    style={styles.languageItem} 
    onPress={() => onSelect(language.code)}
  >
    <View style={styles.languageInfo}>
      <Text style={styles.languageName}>{language.name}</Text>
      <Text style={styles.languageRegion}>{language.region}</Text>
    </View>
    {isSelected && <Check size={24} color="#172e73" />}
  </TouchableOpacity>
);

export default function LanguageScreen() {
  const router = useRouter();
  const { language, setLanguage, translations } = useLanguage();

  const handleLanguageSelect = async (languageCode) => {
    await setLanguage(languageCode);
    // Optionally show a success message or automatically go back
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#172e73" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{translations[language]['language_title']}</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionDescription}>
          {translations[language]['select_language']}
        </Text>

        <View style={styles.languageList}>
          {languages.map((languageItem) => (
            <LanguageItem
              key={languageItem.code}
              language={languageItem}
              isSelected={language === languageItem.code}
              onSelect={handleLanguageSelect}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#172e73',
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    padding: 16,
    paddingBottom: 8,
  },
  languageList: {
    padding: 16,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#172e73',
  },
  languageRegion: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginTop: 2,
  },
}); 