import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RefreshCw, Star, Bell, Calculator, Send, QrCode, Upload, Zap, CreditCard, ShoppingBag, Shield, User } from 'lucide-react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ServiceItem = ({ Icon, label }) => (
  <View style={styles.serviceCard}>
    <View style={styles.serviceIconContainer}>
      <Icon size={24} color="#172e73" />
    </View>
    <Text style={styles.serviceLabel}>{label}</Text>
  </View>
);

const TransactionItem = ({ name, date, description, amount, isExpense, Icon }) => (
  <View style={styles.transactionItem}>
    <View style={styles.transactionIcon}>
      <Icon size={24} color="#172e73" />
    </View>
    <View style={styles.transactionDetails}>
      <Text style={styles.transactionName}>{name}</Text>
      <Text style={styles.transactionDescription}>{date} • {description}</Text>
    </View>
    <Text style={[styles.transactionAmount, { color: isExpense ? '#DB0011' : '#17C261' }]}>
      {amount}
    </Text>
  </View>
);

export default function HomeScreen() {
  const serviceItems = [
    { id: 1, Icon: Calculator, label: 'Account Balance' },
    { id: 2, Icon: Send, label: 'Send Money' },
    { id: 3, Icon: QrCode, label: 'Scan & Pay' },
    { id: 4, Icon: Upload, label: 'Mobile Recharge' },
    { id: 5, Icon: Zap, label: 'Electricity Bill' }, 
    { id: 6, Icon: CreditCard, label: 'Credit Card Bill' },
    { id: 7, Icon: ShoppingBag, label: 'Loans' },
    { id: 8, Icon: Shield, label: 'Insurance' },
  ];

  const transactions = [
    {
      id: 1,
      name: "Amazon Pantry",
      date: "01 Jan",
      description: "Subscription payment",
      amount: "-1,200",
      isExpense: true,
      Icon: () => <MaterialCommunityIcons name="shopping" size={24} color="#172e73" />,
    },
    {
      id: 2,
      name: "Riya Mehta",
      date: "05 Jan",
      description: "Graduation Gift",
      amount: "+10,000",
      isExpense: false,
      Icon: User,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>FrenzoPay</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="white" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <View style={styles.profileImage}>
              <User size={24} color="white" />
            </View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>John Doe</Text>
          </View>
        </View>
      </View>

      <View style={styles.balanceSection}>
        <View>
          <Text style={styles.greeting}>Hello from FrenzoPay!</Text>
          <Text style={styles.balance}>₹85,625</Text>
          <View style={styles.primaryTag}>
            <Star size={14} color="#fff4f4" />
            <Text style={styles.primaryText}>Primary</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.refreshButton}>
          <RefreshCw size={26} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.servicesGrid}>
          {serviceItems.map((item) => (
            <ServiceItem key={item.id} Icon={item.Icon} label={item.label} />
          ))}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, styles.sendButton]}>
            <Text style={styles.actionButtonText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.receiveButton]}>
            <Text style={styles.actionButtonText}>Receive</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsContainer}>
          <Text style={styles.transactionsTitle}>RECENT TRANSACTIONS</Text>
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} {...transaction} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#172e73',
  },
  header: {
    padding: 15,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  notificationButton: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ef7103',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  profileSection: {
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  userName: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  balanceSection: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  greeting: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  balance: {
    color: 'white',
    fontSize: 34,
    fontFamily: 'Inter-Bold',
    marginVertical: 5,
  },
  primaryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  primaryText: {
    color: '#fff4f4',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  refreshButton: {
    backgroundColor: '#14a051',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 6,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  serviceCard: {
    width: '23%',
    backgroundColor: '#EEF7FB',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceLabel: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Inter-Regular',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
    backgroundColor: '#fff',
  },
  actionButton: {
    flex: 1,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: '#17c261',
  },
  receiveButton: {
    backgroundColor: '#172e73',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  transactionsContainer: {
    padding: 20,
    backgroundColor: '#EEF7FB',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  transactionsTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    marginBottom: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 14,
    marginBottom: 2,
    fontFamily: 'Inter-Regular',
  },
  transactionDescription: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: 'Inter-Regular',
  },
  transactionAmount: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
});