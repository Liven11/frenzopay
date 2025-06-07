import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Platform, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const cardWidth = (width - 40) / 2 - 10;

// Simple icon components
const SearchIcon = ({ size = 24, color = "#172e73" }) => (
  <View style={[styles.iconPlaceholder, { width: size, height: size, backgroundColor: color }]} />
);

const BellIcon = ({ size = 24, color = "#172e73" }) => (
  <View style={[styles.iconPlaceholder, { width: size, height: size, backgroundColor: color, borderRadius: size / 2 }]} />
);

const ServiceItem = ({ label, onPress }) => (
  <TouchableOpacity style={styles.serviceCard} onPress={onPress}>
    <View style={styles.serviceIconContainer}>
      <View style={styles.serviceIcon} />
    </View>
    <Text style={styles.serviceLabel}>{label}</Text>
  </TouchableOpacity>
);

const OfferCard = ({ title, description, color, onPress }) => (
  <TouchableOpacity style={[styles.offerCard, { backgroundColor: color }]} onPress={onPress}>
    <View style={styles.offerTextContainer}>
      <Text style={styles.offerTitle}>{title}</Text>
      {description && <Text style={styles.offerDescription}>{description}</Text>}
    </View>
    <View style={styles.offerIllustration} />
  </TouchableOpacity>
);

export default function HomeScreen() {
  const router = useRouter();
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }

          let location = await Location.getCurrentPositionAsync({});
          // You can use reverse geocoding here to get city name
          setLocation('Mumbai'); // Placeholder
        } catch (error) {
          console.log('Error getting location:', error);
        }
      }
    })();
  }, []);

  const handleServicePress = (route: string, label: string) => {
    if (Platform.OS === 'web') {
      Alert.alert('Feature Not Available', `${label} is not available on web. Please use the mobile app.`);
    } else {
      // Navigate to the route
      console.log(`Navigate to ${route}`);
    }
  };

  const serviceCategories = [
    {
      title: 'Money Transfer',
      items: [
        { id: 1, label: 'Scan & Pay', route: '/scan' },
        { id: 2, label: 'To Mobile', route: '/to-mobile' },
        { id: 3, label: 'To Bank Account', route: '/to-bank-account' },
        { id: 4, label: 'Balance & History', route: '/wallet' },
      ],
    },
    {
      title: 'Recharges & Bill Payments',
      items: [
        { id: 5, label: 'Electricity Bill', route: '/electricity-bill' },
        { id: 6, label: 'Mobile Recharge', route: '/mobile-recharge' },
        { id: 7, label: 'Fastag Recharge', route: '/fastag-recharge' },
        { id: 8, label: 'DTH Payments', route: '/dth-payments' },
      ],
    },
    {
      title: 'Loans & Investments',
      items: [
        { id: 9, label: 'Personal Loans', route: '/personal-loans' },
        { id: 10, label: 'Digital FDs', route: '/digital-fds' },
        { id: 11, label: 'Insurance', route: '/insurance' },
        { id: 12, label: 'Gold Loans', route: '/gold-loans' },
      ],
    },
  ];

  const offers = [
    {
      id: 1,
      title: 'Refer & Win',
      description: 'Exciting Rewards!',
      color: '#ff8a00',
      route: '/refer-win'
    },
    {
      id: 2,
      title: 'Get Instant',
      description: 'Personal Loans',
      color: '#ff4d4d',
      route: '/personal-loans'
    },
    {
      id: 3,
      title: 'Instant Gold',
      description: 'Loan Offers!',
      color: '#8e44ad',
      route: '/gold-loans'
    },
    {
      id: 4,
      title: 'Exciting Offers',
      description: 'on Digital FDs',
      color: '#3498db',
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
              source={{ uri: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=100' }}
              style={styles.avatarImage}
            />
          </TouchableOpacity>
          <View style={styles.welcomeInfo}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.userName}>John Doe</Text>
            {location && <Text style={styles.locationText}>📍 {location}</Text>}
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <SearchIcon size={24} color="#172e73" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <BellIcon size={24} color="#172e73" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.logoSection}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=140' }} 
            style={styles.logoImage} 
            resizeMode="contain" 
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.promoBanner, { backgroundColor: '#172e73' }]}>
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoGreeting}>Hello from FrenzoPay!</Text>
            <Text style={styles.promoTitle}>Pay Credit Card Bills</Text>
            <Text style={styles.promoTitle}>& Get Instant Cashback!</Text>
            <TouchableOpacity style={styles.payNowButton}>
              <Text style={styles.payNowText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=100' }}
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
              <View style={styles.categoryIcon} />
              <Text style={styles.categoryTitleGradient}>{category.title}</Text>
            </LinearGradient>
            <View style={styles.servicesGrid}>
              {category.items.map((item) => (
                <ServiceItem 
                  key={item.id} 
                  label={item.label} 
                  onPress={() => handleServicePress(item.route, item.label)} 
                />
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
              onPress={() => handleServicePress(offer.route, offer.title)}
            />
          ))}
        </View>

        <View style={styles.transactionsSection}>
          <View style={styles.transactionsHeader}>
            <View style={styles.categoryIcon} />
            <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          </View>
          <View style={styles.noTransactionsContainer}>
            <Text style={styles.noTransactionsText}>No recent transactions</Text>
          </View>
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
  locationText: {
    color: '#666666',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
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
  iconPlaceholder: {
    borderRadius: 2,
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
    padding: 0,
    marginBottom: 20,
    overflow: 'hidden',
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
  categoryIcon: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 4,
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
    paddingHorizontal: 15,
    paddingVertical: 15,
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
  serviceIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#172e73',
    borderRadius: 4,
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
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
    marginLeft: 10,
    color: '#172e73'
  },
  noTransactionsContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noTransactionsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#172e73'
  },
});