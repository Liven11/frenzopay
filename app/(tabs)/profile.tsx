import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, Settings, Bell, Shield, CreditCard, 
  HelpCircle, LogOut, ChevronRight, Lock,
  Smartphone, Fingerprint, CreditCard as CardIcon,
  Building2, MessageCircle, Globe, Eye
} from 'lucide-react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

const ProfileItem = ({ icon, title, subtitle, onPress, rightElement }) => (
  <TouchableOpacity style={styles.profileItem} onPress={onPress}>
    <View style={styles.profileItemIcon}>
      {icon}
    </View>
    <View style={styles.profileItemContent}>
      <Text style={styles.profileItemTitle}>{title}</Text>
      {subtitle && <Text style={styles.profileItemSubtitle}>{subtitle}</Text>}
    </View>
    {rightElement || <ChevronRight size={20} color="#666" />}
  </TouchableOpacity>
);

const SectionHeader = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

export default function ProfileScreen() {
  const router = useRouter();
  const { userData } = useUser();
  const { logout } = useAuth();
  const fullName = `${userData.firstName} ${userData.lastName}`.trim() || 'User';
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const checkBiometricSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (compatible) {
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (enrolled) {
        setFaceIdEnabled(true);
      }
    }
  };

  React.useEffect(() => {
    checkBiometricSupport();
  }, []);

  const accountSettings = [
    {
      icon: <User size={24} color="#172e73" />,
      title: 'Personal Information',
      subtitle: 'Update your profile details',
      onPress: () => router.push('/profile/personal-info'),
    },
    {
      icon: <Globe size={24} color="#172e73" />,
      title: 'Language',
      subtitle: 'English (US)',
      onPress: () => router.push('/profile/language'),
    },
    {
      icon: <Eye size={24} color="#172e73" />,
      title: 'Appearance',
      subtitle: 'Light mode',
      rightElement: (
        <Switch
          value={darkModeEnabled}
          onValueChange={setDarkModeEnabled}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={darkModeEnabled ? '#172e73' : '#f4f3f4'}
        />
      ),
    },
  ];

  const securitySettings = [
    {
      icon: <Fingerprint size={24} color="#172e73" />,
      title: 'Face ID / Touch ID',
      subtitle: 'Use biometric authentication',
      rightElement: (
        <Switch
          value={faceIdEnabled}
          onValueChange={setFaceIdEnabled}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={faceIdEnabled ? '#172e73' : '#f4f3f4'}
        />
      ),
    },
    {
      icon: <Lock size={24} color="#172e73" />,
      title: 'PIN & Password',
      subtitle: 'Change your security PIN',
      onPress: () => router.push('/profile/security'),
    },
  ];

  const paymentSettings = [
    {
      icon: <CardIcon size={24} color="#172e73" />,
      title: 'Cards',
      subtitle: 'Manage your cards',
      onPress: () => router.push('/profile/cards'),
      rightElement: null,
    },
    {
      icon: <Building2 size={24} color="#172e73" />,
      title: 'Bank Accounts',
      subtitle: 'Connected bank accounts',
      onPress: () => router.push('/profile/bank-accounts'),
      rightElement: null,
    },
  ];

  const supportSettings = [
    {
      icon: <HelpCircle size={24} color="#172e73" />,
      title: 'Help Center',
      subtitle: 'FAQs and guides',
      onPress: () => router.push('/profile/help'),
      rightElement: null,
    },
    {
      icon: <MessageCircle size={24} color="#172e73" />,
      title: 'Contact Support',
      subtitle: 'Get in touch with us',
      onPress: () => router.push('/profile/contact'),
      rightElement: null,
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => logout(),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <User size={40} color="#172e73" />
          </View>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.email}>{userData.email}</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => router.push('/profile/personal-info')}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <SectionHeader title="ACCOUNT" />
          {accountSettings.map((item, index) => (
            <ProfileItem
              key={index}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              onPress={item.onPress}
              rightElement={item.rightElement}
            />
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader title="SECURITY" />
          {securitySettings.map((item, index) => (
            <ProfileItem
              key={index}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              onPress={item.onPress}
              rightElement={item.rightElement}
            />
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader title="PAYMENT METHODS" />
          {paymentSettings.map((item, index) => (
            <ProfileItem
              key={index}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              onPress={item.onPress}
              rightElement={item.rightElement}
            />
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader title="SUPPORT" />
          {supportSettings.map((item, index) => (
            <ProfileItem
              key={index}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              onPress={item.onPress}
              rightElement={item.rightElement}
            />
          ))}
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={24} color="#DB0011" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#172e73',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 15,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#172e73',
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#666',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileItemContent: {
    flex: 1,
    marginLeft: 15,
  },
  profileItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#172e73',
  },
  profileItemSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#DB0011',
  },
});