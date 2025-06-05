import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RefreshCw, Star, Bell, Calculator, Send, QrCode, Upload, Zap, CreditCard, ShoppingBag, Shield, User, Search } from 'lucide-react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useRouter, useFocusEffect } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

// Define the type for a transaction item
interface Transaction {
  id: number;
  name: string;
  date: string;
  description: string;
  amount: string;
  isExpense: boolean;
  AvatarComponent: () => React.JSX.Element;
}

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

const TransactionItem = ({ name, date, description, amount, isExpense, AvatarComponent }) => (
  <View style={styles.transactionItem}>
    <View style={styles.transactionAvatarPlaceholder}>
      <AvatarComponent />
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
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  const fetchRecentTransactions = useCallback(async () => {
    setLoadingTransactions(true);
    // Simulate fetching data
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const dummyTransactions: Transaction[] = [
      {
        id: 1,
        name: "Amazon Pantry",
        date: "01 Jan",
        description: "Subscription payment",
        amount: "-1,200",
        isExpense: true,
        AvatarComponent: () => <Image source={require('../../assets/expense-amazon.svg')} style={styles.transactionAvatarImage} />
      },
      {
        id: 2,
        name: "Riya Mehta",
        date: "05 Jan",
        description: "Graduation Gift",
        amount: "+10,000",
        isExpense: false,
        AvatarComponent: () => <Image source={require('../../assets/avatar-1.svg')} style={styles.transactionAvatarImage} />
      },
      {
        id: 3,
        name: "Paytm Auto Pay",
        date: "22 Jan",
        description: "Weekly Transaction through...",
        amount: "-3,500",
        isExpense: true,
        AvatarComponent: () => <Image source={require('../../assets/expense-paytm.svg')} style={styles.transactionAvatarImage} />
      },
      {
        id: 4,
        name: "Parimal Sinha",
        date: "05 Jan",
        description: "House Rent",
        amount: "+6,550",
        isExpense: false,
        AvatarComponent: () => <Image source={require('../../assets/avatar.svg')} style={styles.transactionAvatarImage} />
      },
      {
        id: 5,
        name: "Zomato Online Order",
        date: "05 Jan",
        description: "Gift for Christmas",
        amount: "-1301.80",
        isExpense: true,
        AvatarComponent: () => <Image source={require('../../assets/alms-1.png')} style={styles.transactionAvatarImage} />
      }
    ];

    // Simulate a new transaction based on a random outcome
    const isSuccess = Math.random() > 0.5; // 50% chance of success
    const newTransaction: Transaction = isSuccess ?
      { // Simulated success transaction
        id: dummyTransactions.length + 1,
        name: "New Contact Payment",
        date: "Today",
        description: "Mobile Payment",
        amount: "+500", // Sample amount
        isExpense: false,
        AvatarComponent: () => <Image source={require('../../assets/avatar-1.svg')} style={styles.transactionAvatarImage} />
      } :
      { // Simulated failure transaction
        id: dummyTransactions.length + 1,
        name: "Payment Attempt",
        date: "Today",
        description: "Payment Failed",
        amount: "-500", // Sample amount
        isExpense: true,
        AvatarComponent: () => <Image source={require('../../assets/expense-amazon.svg')} style={styles.transactionAvatarImage} /> // Using a placeholder icon
      };

    setRecentTransactions([newTransaction, ...dummyTransactions]); // Prepend the new transaction
    setLoadingTransactions(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchRecentTransactions();
    }, [fetchRecentTransactions])
  );

  const serviceCategories = [
    {
      title: 'Money Transfer',
      icon: () => <FontAwesome5 name="tags" size={20} color="#172e73" />,
      items: [
        { id: 1, label: 'Scan & Pay', Icon: () => <MaterialCommunityIcons name="qrcode-scan" size={24} color="#172e73" />, route: '/scan' },
        { id: 2, label: 'To Mobile', Icon: () => <MaterialCommunityIcons name="cellphone" size={24} color="#172e73" />, route: '/to-mobile' },
        { id: 3, label: 'To Bank Account', Icon: () => <MaterialCommunityIcons name="bank" size={24} color="#172e73" />, route: '/to-bank-account' },
        { id: 4, label: 'Balance & History', Icon: () => <MaterialCommunityIcons name="history" size={24} color="#172e73" />, route: '/wallet' },
      ],
    },
    {
      title: 'Recharges & Bill Payments',
      icon: () => <FontAwesome5 name="tags" size={20} color="#172e73" />,
      items: [
        { id: 5, label: 'Electricity Bill', Icon: () => <MaterialCommunityIcons name="flash" size={24} color="#172e73" />, route: '/electricity-bill' },
        { id: 6, label: 'Mobile Recharge', Icon: () => <MaterialCommunityIcons name="cellphone-wireless" size={24} color="#172e73" />, route: '/mobile-recharge' },
        { id: 7, label: 'Fastag Recharge', Icon: () => <MaterialCommunityIcons name="road" size={24} color="#172e73" />, route: '/fastag-recharge' },
        { id: 8, label: 'DTH Payments', Icon: () => <MaterialCommunityIcons name="satellite" size={24} color="#172e73" />, route: '/dth-payments' },
      ],
    },
    {
      title: 'Loans & Investments',
      icon: () => <FontAwesome5 name="tags" size={20} color="#172e73" />,
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
              <Text style={styles.userName}>Richa Anand</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Search size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.logoSection}>
          <Image source={require('../../assets/frenzopay-logo.png')} style={styles.logoImage} resizeMode="contain" />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.promoBanner, { backgroundColor: '#ff7043' }]}>
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoGreeting}>Hello from FrenzoPay!</Text>
            <Text style={styles.promoTitle}>Pay Credit Card Bills</Text>
            <Text style={styles.promoTitle}>& Get Instant Cashback!</Text>
            <TouchableOpacity style={styles.payNowButton}>
              <Text style={styles.payNowText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require('../../assets/untitled-design---2025-06-03t105328-501-1.png')}
            style={styles.promoIllustration}
            resizeMode="contain"
          />
        </View>

        {serviceCategories.map((category) => (
          <View key={category.title} style={styles.categoryContainer}>
            <View style={styles.categoryHeader}>
               {category.icon()}
               <Text style={styles.categoryTitle}>{category.title}</Text>
            </View>
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

        <View style={styles.transactionsContainer}>
           <View style={styles.transactionsHeader}>
             <MaterialCommunityIcons name="tag" size={20} color="#172e73" />
             <Text style={styles.transactionsTitle}>Recent Transacation ...</Text>
           </View>
           {loadingTransactions ? (
             <ActivityIndicator size="large" color="#172e73" />
           ) : (
             recentTransactions.map((transaction) => (
               <TransactionItem
                 key={transaction.id}
                 name={transaction.name}
                 date={transaction.date}
                 description={transaction.description}
                 amount={transaction.amount}
                 isExpense={transaction.isExpense}
                 AvatarComponent={transaction.AvatarComponent}
               />
             ))
           )}
        </View>
      </ScrollView>

      {/* <TouchableOpacity style={styles.scanQrButton} onPress={() => router.push('/scan')}>
        <Image source={require('../../assets/scan-button.png')} style={styles.scanQrImage} />
        <Text style={styles.scanQrButtonText}>Scan any QR</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f6',
  },
  header: {
    backgroundColor: '#172e73',
    padding: 15,
    paddingBottom: 80,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    backgroundColor: 'white',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
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
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  userName: {
    color: 'white',
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
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginRight: 10,
  },
  logoImage: {
    width: 120,
    height: 30,
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
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginLeft: 10,
    color: '#172e73'
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
  transactionsContainer: {
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
   recentTransactionsTitle: {
     fontSize: 14,
     fontFamily: 'Inter-Bold',
     marginBottom: 10,
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