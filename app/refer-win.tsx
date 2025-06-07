import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ReferWinScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#172e73" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Refer & Win</Text>
      </View>
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.referContent}>
          <Text style={styles.referTitle}>Refer Friends & Earn Rewards!</Text>
          <Text style={styles.referDescription}>
            Share your referral code with friends and earn exciting rewards when they join FrenzoPay.
          </Text>
          <View style={styles.referCodeContainer}>
            <Text style={styles.referCodeLabel}>Your Referral Code</Text>
            <Text style={styles.referCode}>FRENZO123</Text>
            <TouchableOpacity style={styles.copyButton}>
              <Text style={styles.copyButtonText}>Copy Code</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rewardsContainer}>
            <Text style={styles.rewardsTitle}>Rewards</Text>
            <View style={styles.rewardItem}>
              <Text style={styles.rewardText}>• ₹100 for each friend who joins</Text>
            </View>
            <View style={styles.rewardItem}>
              <Text style={styles.rewardText}>• ₹50 for each transaction they make</Text>
            </View>
            <View style={styles.rewardItem}>
              <Text style={styles.rewardText}>• Special rewards for top referrers</Text>
            </View>
          </View>
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
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#172e73',
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  referContent: {
    flex: 1,
    alignItems: 'center',
  },
  referTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#172e73',
    textAlign: 'center',
    marginBottom: 16,
  },
  referDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  referCodeContainer: {
    backgroundColor: '#f4f7f6',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  referCodeLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 8,
  },
  referCode: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#172e73',
    marginBottom: 16,
  },
  copyButton: {
    backgroundColor: '#172e73',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  copyButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  rewardsContainer: {
    width: '100%',
    backgroundColor: '#f4f7f6',
    padding: 20,
    borderRadius: 12,
  },
  rewardsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#172e73',
    marginBottom: 16,
  },
  rewardItem: {
    marginBottom: 12,
  },
  rewardText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
});