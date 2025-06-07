import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Moon, Sun } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

export default function AppearanceScreen() {
  const router = useRouter();
  const { isDarkMode, toggleTheme, colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Appearance</Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.settingItem, { backgroundColor: colors.card }]}>
          <View style={styles.settingInfo}>
            <View style={[styles.settingIcon, { backgroundColor: colors.background }]}>
              {isDarkMode ? (
                <Moon size={24} color={colors.text} />
              ) : (
                <Sun size={24} color={colors.primary} />
              )}
            </View>
            <View style={styles.settingText}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Dark Mode
              </Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Switch between light and dark theme
              </Text>
            </View>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.switchTrack, true: colors.primary }}
            thumbColor={colors.switchThumb}
          />
        </View>

        <View style={[styles.infoBox, { backgroundColor: colors.card }]}>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            Dark mode reduces eye strain in low-light environments and can help save battery life on OLED screens.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  infoBox: {
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
}); 