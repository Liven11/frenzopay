import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Platform, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RefreshCw, Star, Bell, Calculator, Send, QrCode, Upload, Zap, CreditCard, ShoppingBag, Shield, User, Search } from 'lucide-react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useRouter, useFocusEffect } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { useTransactions, Transaction } from '../context/TransactionContext';
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const cardWidth = (width - 40) / 2 - 10; // 20 padding horizontal, 20 gap total for 2 cards

const ServiceItem = ({ Icon, label, onPress }) => (
  <TouchableOpacity style={styles.serviceCard} onPress={onPress}>
    <View style={styles.serviceIconContainer}>
      <Icon size={24} color="#172e73" />
    </View>
    <Text style={styles.serviceLabel}>{label}</Text>
  </TouchableOpacity>
);

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const getTransactionIcon = () => {
    switch (transaction.type) {
      case 'payment':
        return require('../../assets/expense-amazon.svg');
      case 'transfer':
        return require('../../assets/avatar-1.svg');
      case 'recharge':
        return require('../../assets/expense-paytm.svg');
      default:
        return require('../../assets/avatar.svg');
    }
  };

  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionAvatarPlaceholder}>
        <Image source={getTransactionIcon()} style={styles.transactionAvatarImage} />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionName}>{transaction.recipient}</Text>
        <Text style={styles.transactionDescription}>
          {format(transaction.timestamp, 'dd MMM')} • {transaction.description}
        </Text>
      </View>
      <Text 
        style={[
          styles.transactionAmount, 
          { color: transaction.status === 'success' ? '#17C261' : '#DB0011' }
        ]}
      >
        {transaction.status === 'success' ? '+' : '-'}₹{transaction.amount}
      </Text>
    </View>
  );
};

const OfferCard = ({ title, description, color, illustration, onPress }) => (
  <TouchableOpacity style={[styles.offerCard, { backgroundColor: color }]} onPress={onPress}>
    <View style={styles.offerTextContainer}>
      <Text style={styles.offerTitle}>{title}</Text>
      {description && <Text style={styles.offerDescription}>{description}</Text>}
    </View>
    <Image
      source={illustration}
      style={styles.offerIllustration}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

export default function HomeScreen() {
  const router = useRouter();
  const { userData } = useUser();
  const { getRecentTransactions } = useTransactions();
  const fullName = `${userData.firstName} ${userData.lastName}`.trim() || 'User';
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  const fetchRecentTransactions = useCallback(async () => {
    setLoadingTransactions(true);
    try {
      const transactions = getRecentTransactions(5); // Get 5 most recent transactions
      setRecentTransactions(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoadingTransactions(false);
    }
  }, [getRecentTransactions]);

  useFocusEffect(
    useCallback(() => {
      fetchRecentTransactions();
    }, [fetchRecentTransactions])
  );

  const serviceCategories = [
    {
      title: 'Money Transfer',
      icon: (color) => <FontAwesome5 name="tags" size={20} color={color} />,
      items: [
        { id: 1, label: 'Scan & Pay', Icon: () => <MaterialCommunityIcons name="qrcode-scan" size={24} color="#172e73" />, route: '/scan' },
        { id: 2, label: 'To Mobile', Icon: () => <MaterialCommunityIcons name="cellphone" size={24} color="#172e73" />, route: '/to-mobile' },
        { id: 3, label: 'To Bank Account', Icon: () => <MaterialCommunityIcons name="bank" size={24} color="#172e73" />, route: '/to-bank-account' },
        { id: 4, label: 'Balance & History', Icon: () => <MaterialCommunityIcons name="history" size={24} color="#172e73" />, route: '/wallet' },
      ],
    },
    {
      title: 'Recharges & Bill Payments',
      icon: (color) => <FontAwesome5 name="tags" size={20} color={color} />,
      items: [
        { id: 5, label: 'Electricity Bill', Icon: () => <MaterialCommunityIcons name="flash" size={24} color="#172e73" />, route: '/electricity-bill' },
        { id: 6, label: 'Mobile Recharge', Icon: () => <MaterialCommunityIcons name="cellphone-wireless" size={24} color="#172e73" />, route: '/mobile-recharge' },
        { id: 7, label: 'Fastag Recharge', Icon: () => <MaterialCommunityIcons name="road" size={24} color="#172e73" />, route: '/fastag-recharge' },
        { id: 8, label: 'DTH Payments', Icon: () => <MaterialCommunityIcons name="satellite" size={24} color="#172e73" />, route: '/dth-payments' },
      ],
    },
    {
      title: 'Loans & Investments',
      icon: (color) => <FontAwesome5 name="tags" size={20} color={color} />,
      items: [
        { id: 9, label: 'Personal Loans', Icon: () => <MaterialCommunityIcons name="account" size={24} color="#172e73" />, route: '/personal-loans' },
        { id: 10, label: 'Digital FDs', Icon: () => <MaterialCommunityIcons name="wallet" size={24} color="#172e73" />, route: '/digital-fds' },
        { id: 11, label: 'Insurance', Icon: () => <MaterialCommunityIcons name="shield-check" size={24} color="#172e73" />, route: '/insurance' },
        { id: 12, label: 'Gold Loans', Icon: () => <MaterialCommunityIcons name="gold" size={24} color="#172e73" />, route: '/gold-loans' },
      ],
    },
  ];

  const offers = [
    {
      id: 1,
      title: 'Refer & Win',
      description: 'Exciting Rewards!',
      color: '#ff8a00',
      illustration: require('../../assets/discount-bag-1.png'),
      route: '/refer-win'
    },
    {
      id: 2,
      title: 'Get Instant',
      description: 'Personal Loans',
      color: '#ff4d4d',
      illustration: require('../../assets/calculator-money-13794296-1.png'),
      route: '/personal-loans'
    },
    {
      id: 3,
      title: 'Instant Gold',
      description: 'Loan Offers!',
      color: '#8e44ad',
      illustration: require('../../assets/alms-1.png'),
      route: '/gold-loans'
    },
    {
      id: 4,
      title: 'Exciting Offers',
      description: 'on Digital FDs',
      color: '#3498db',
      illustration: require('../../assets/credit-card-1.png'),
      route: '/digital-fds'
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.avatarContainer}
            onPress={() => router.push('/profile')}
          >
            <Image
              source={require('../../assets/Avatar.png')}
              style={styles.avatarImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/profile/personal-info')}>
            <View style={styles.welcomeInfo}>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.userName}>{fullName}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => router.push('/search')}
            >
              <Search size={24} color="#172e73" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => router.push('/notifications')}
            >
              <Bell size={24} color="#172e73" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.logoSection}>
          <Image source={require('../../assets/frenzopay-logo.png')} style={styles.logoImage} resizeMode="contain" />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.promoBanner, { backgroundColor: '#172e73' }]}>
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoGreeting}>Hello from FrenzoPay!</Text>
            <Text style={styles.promoTitle}>Pay Credit Card Bills</Text>
            <Text style={styles.promoTitle}>& Get Instant Cashback!</Text>
            <TouchableOpacity style={styles.payNowButton} onPress={() => router.push('/creditcard-payment')}>
              <Text style={styles.payNowText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require('../../assets/personwithphone.png')}
            style={styles.promoIllustration}
            resizeMode="contain"
          />
        </View>

        {serviceCategories.map((category) => (
          <View key={category.title} style={styles.categoryContainer}>
            <LinearGradient
              colors={['#F07103', '#172E73']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.categoryHeaderGradient}
            >
              {category.icon('white')}
              <Text style={styles.categoryTitleGradient}>{category.title}</Text>
            </LinearGradient>
            <View style={styles.servicesGrid}>
              {category.items.map((item) => (
                <ServiceItem key={item.id} Icon={item.Icon} label={item.label} onPress={() => router.push(item.route)} />
              ))}
            </View>
          </View>
        ))}

        <View style={styles.offersContainer}>
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              title={offer.title}
              description={offer.description}
              color={offer.color}
              illustration={offer.illustration}
              onPress={() => router.push(offer.route)}
            />
          ))}
        </View>

        <View style={styles.transactionsSection}>
          <View style={styles.transactionsHeader}>
            <MaterialCommunityIcons name="tag" size={20} color="#172e73" />
            <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          </View>
          {loadingTransactions ? (
            <ActivityIndicator size="large" color="#172e73" />
          ) : recentTransactions.length > 0 ? (
            <FlatList
              data={recentTransactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionItem transaction={item} />}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.noTransactionsText}>No recent transactions</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f6',
  },
  header: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    paddingBottom: 80,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(23,46,115,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  welcomeInfo: {
    flex: 1,
    marginLeft: 10,
  },
  welcomeText: {
    color: '#666666',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  userName: {
    color: '#172e73',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 10,
    marginLeft: 15,
  },
  logoImage: {
    width: 140,
    height: 50,
    resizeMode: 'contain',
  },
  logoImagePlaceholder: {
     width: 40,
     height: 40,
     backgroundColor: 'gray',
     borderRadius: 20,
  },
  content: {
    flex: 1,
    marginTop: -60,
    paddingHorizontal: 10,
  },
  promoBanner: {
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  promoTextContainer: {
    flex: 1,
  },
  promoGreeting: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 5,
  },
  promoTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  payNowButton: {
    backgroundColor: '#14a051',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  payNowText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    marginLeft: 5,
  },
  promoIllustration: {
    width: 100,
    height: 100,
  },
  categoryContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryHeaderGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 7,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginLeft: 10,
    color: '#172e73'
  },
  categoryTitleGradient: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
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
    color: '#172e73'
  },
  offersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10
  },
  offerCard: {
    width: cardWidth,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    justifyContent: 'space-between',
    height: 120,
  },
  offerTextContainer: {
    flex: 1,
  },
  offerTitle: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  offerDescription: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 5,
  },
  offerIllustration: {
    width: 60,
    height: 60,
    alignSelf: 'flex-end',
  },
  transactionsSection: {
    backgroundColor: '#EEF7FB',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
   transactionsHeader: {
     flexDirection: 'row',
     alignItems: 'center',
     marginBottom: 15,
   },
  transactionsTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    marginBottom: 20,
    marginLeft: 10,
    color: '#172e73'
  },
   noTransactionsText: {
     fontSize: 14,
     fontFamily: 'Inter-Regular',
     marginLeft: 10,
     color: '#172e73'
   },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
   transactionAvatarPlaceholder: {
     width: 40,
     height: 40,
     borderRadius: 20,
     backgroundColor: '#ccc',
     justifyContent: 'center',
     alignItems: 'center',
     marginRight: 10,
     overflow: 'hidden'
   },
   transactionAvatarImage: {
     width: '100%',
     height: '100%',
   },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 14,
    marginBottom: 2,
    fontFamily: 'Inter-Regular',
    color: '#172e73'
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
   transactionHistoryButton: {
     marginTop: 10,
     alignItems: 'flex-start',
   },
  transactionHistoryText: {
    color: '#172e73',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  scanQrButton: {
    backgroundColor: '#ff7043',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    margin: 20,
    borderRadius: 15,
  },
  scanQrImage: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  scanQrButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginLeft: 10,
  },
});