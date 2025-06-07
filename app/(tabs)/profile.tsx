import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const ProfileItem = ({ title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.profileItem} onPress={onPress}>
    <View style={styles.profileItemIcon}>
      <View style={styles.iconPlaceholder} />
    </View>
    <View style={styles.profileItemContent}>
      <Text style={styles.profileItemTitle}>{title}</Text>
      {subtitle && <Text style={styles.profileItemSubtitle}>{subtitle}</Text>}
    </View>
    <View style={styles.chevron} />
  </TouchableOpacity>
);

const SectionHeader = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

export default function ProfileScreen() {
  const router = useRouter();

  const accountSettings = [
    {
      title: 'Personal Information',
      subtitle: 'Update your profile details',
      onPress: () => console.log('Navigate to personal info'),
    },
    {
      title: 'Language',
      subtitle: 'English (US)',
      onPress: () => console.log('Navigate to language'),
    },
    {
      title: 'Appearance',
      subtitle: 'Light mode',
      onPress: () => console.log('Navigate to appearance'),
    },
  ];

  const securitySettings = [
    {
      title: 'Face ID / Touch ID',
      subtitle: 'Use biometric authentication',
      onPress: () => console.log('Toggle biometric'),
    },
    {
      title: 'PIN & Password',
      subtitle: 'Change your security PIN',
      onPress: () => console.log('Navigate to security'),
    },
  ];

  const paymentSettings = [
    {
      title: 'Cards',
      subtitle: 'Manage your cards',
      onPress: () => console.log('Navigate to cards'),
    },
    {
      title: 'Bank Accounts',
      subtitle: 'Connected bank accounts',
      onPress: () => console.log('Navigate to bank accounts'),
    },
  ];

  const supportSettings = [
    {
      title: 'Help Center',
      subtitle: 'FAQs and guides',
      onPress: () => console.log('Navigate to help'),
    },
    {
      title: 'Contact Support',
      subtitle: 'Get in touch with us',
      onPress: () => console.log('Navigate to contact'),
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=100' }}
              style={styles.avatarImage}
            />
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <SectionHeader title="ACCOUNT" />
          {accountSettings.map((item, index) => (
            <ProfileItem
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              onPress={item.onPress}
            />
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader title="SECURITY" />
          {securitySettings.map((item, index) => (
            <ProfileItem
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              onPress={item.onPress}
            />
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader title="PAYMENT METHODS" />
          {paymentSettings.map((item, index) => (
            <ProfileItem
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              onPress={item.onPress}
            />
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader title="SUPPORT" />
          {supportSettings.map((item, index) => (
            <ProfileItem
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              onPress={item.onPress}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <View style={styles.logoutIcon} />
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
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  iconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: '#172e73',
    borderRadius: 4,
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
  chevron: {
    width: 8,
    height: 8,
    backgroundColor: '#666',
    transform: [{ rotate: '45deg' }],
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  logoutIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#DB0011',
    borderRadius: 4,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#DB0011',
  },
});