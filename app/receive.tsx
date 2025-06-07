import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Share2, Copy } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ReceiveScreen() {
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
        <Text style={styles.headerTitle}>Receive Money</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.qrContainer}>
          <View style={styles.qrCode}>
            {/* Placeholder for QR code */}
            <Text style={styles.qrPlaceholder}>QR Code</Text>
          </View>
          <Text style={styles.accountId}>Account ID: 1234567890</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Share2 size={24} color="#172e73" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Copy size={24} color="#172e73" />
            <Text style={styles.actionText}>Copy ID</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  qrCode: {
    width: 200,
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  qrPlaceholder: {
    color: '#999',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  accountId: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#172e73',
  },
}); 