import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, CheckCircle, AlertCircle, Info } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'success',
      title: 'Payment Successful',
      message: 'Your payment of ₹500 to John has been completed successfully.',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Balance Alert',
      message: 'Your wallet balance is running low. Add money to continue using services.',
      time: '1 hour ago',
      read: true,
    },
    {
      id: 3,
      type: 'info',
      title: 'New Feature Available',
      message: 'Check out our new bill payment feature with instant cashback!',
      time: '2 hours ago',
      read: true,
    },
  ]);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={24} color="#14a051" />;
      case 'warning':
        return <AlertCircle size={24} color="#ff7043" />;
      case 'info':
        return <Info size={24} color="#172e73" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#172e73" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <ScrollView style={styles.content}>
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationItem,
              !notification.read && styles.unreadNotification
            ]}
            onPress={() => markAsRead(notification.id)}
          >
            <View style={styles.notificationIcon}>
              {getIcon(notification.type)}
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#172e73',
  },
  content: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  unreadNotification: {
    backgroundColor: '#f8f9fa',
  },
  notificationIcon: {
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#172e73',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
  },
}); 