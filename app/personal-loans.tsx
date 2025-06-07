import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, Calendar } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function PersonalLoansScreen() {
  const router = useRouter();

  const [loanAmount, setLoanAmount] = useState('');
  const [loanTenure, setLoanTenure] = useState(''); // in months
  const [loading, setLoading] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<'idle' | 'submitting' | 'success' | 'failure'>('idle');

  const handleApply = async () => {
    if (!loanAmount || isNaN(Number(loanAmount)) || Number(loanAmount) <= 0 || !loanTenure || isNaN(Number(loanTenure)) || Number(loanTenure) <= 0) {
      Alert.alert('Invalid Details', 'Please enter a valid loan amount and tenure.');
      return;
    }

    setLoading(true);
    setApplicationStatus('submitting');

    try {
      // Simulate loan application processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate success or failure
      const isSuccess = Math.random() > 0.5; // 50% chance of approval

      if (isSuccess) {
        setApplicationStatus('success');
        Alert.alert(
          'Application Submitted',
          'Your loan application was submitted successfully.',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/'),
            },
          ]
        );
      } else {
        setApplicationStatus('failure');
        const simulatedError = new Error("Eligibility criteria not met"); // Replace with actual rejection reason
        Alert.alert(
          'Application Failed',
          simulatedError.message,
          [
            {
              text: 'OK',
              onPress: () => {
                setApplicationStatus('idle');
                setLoanAmount('');
                setLoanTenure('');
              },
            },
          ]
        );
      }

    } catch (error) {
      console.error('Application error:', error);
      setApplicationStatus('failure');
      Alert.alert('Error', 'An error occurred during application submission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Personal Loans</Text>
      </View>
      <ScrollView style={styles.content}>
        {applicationStatus === 'idle' && (
          <View>
            <Text style={styles.sectionTitle}>Apply for Personal Loan</Text>
            <TextInput
              style={styles.input}
              placeholder="Desired Loan Amount"
              keyboardType="numeric"
              value={loanAmount}
              onChangeText={setLoanAmount}
            />
            <TextInput
              style={styles.input}
              placeholder="Loan Tenure (in months)"
              keyboardType="numeric"
              value={loanTenure}
              onChangeText={setLoanTenure}
            />

            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApply}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.applyButtonText}>Apply Now</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {applicationStatus === 'submitting' && (
          <View style={styles.statusContainer}>
            <ActivityIndicator size="large" color="#172e73" />
            <Text style={styles.statusText}>Submitting Application...</Text>
          </View>
        )}

        {/* Success and Failure states are handled by Alerts and navigation/state reset */}

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
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 12,
  },
  applyButton: {
    backgroundColor: '#172e73',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  statusText: {
    fontSize: 18,
    marginTop: 12,
    color: '#333',
  },
});