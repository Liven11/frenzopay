import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, Settings, Bell, Shield, CreditCard, 
  HelpCircle, LogOut, ChevronRight 
} from 'lucide-react-native';

const ProfileItem = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.profileItem} onPress={onPress}>
    <View style={styles.profileItemIcon}>
      {icon}
    </View>
    <View style={styles.profileItemContent}>
      <Text style={styles.profileItemTitle}>{title}</Text>
      {subtitle && <Text style={styles.profileItemSubtitle}>{subtitle}</Text>}
    </View>
    <ChevronRight size={20} color="#666" />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const profileItems = [
    {
      icon: <Settings size={24} color="#172e73" />,
      title: 'Account Settings',
      subtitle: 'Privacy, security, and language',
    },
    {
      icon: <Bell size={24} color="#172e73" />,
      title: 'Notifications',
      subtitle: 'Customize your alerts',
    },
    {
      icon: <Shield size={24} color="#172e73" />,
      title: 'Security',
      subtitle: 'Face ID, PIN & password',
    },
    {
      icon: <CreditCard size={24} color="#172e73" />,
      title: 'Payment Methods',
      subtitle: 'Connected cards and accounts',
    },
    {
      icon: <HelpCircle size={24} color="#172e73" />,
      title: 'Help & Support',
      subtitle: 'FAQs and contact information',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <User size={40} color="#172e73" />
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          {profileItems.map((item, index) => (
            <ProfileItem
              key={index}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              onPress={() => {}}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
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