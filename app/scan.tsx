import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QrCode, Camera as CameraIcon } from 'lucide-react-native';
import * as Location from 'expo-location';

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cityName, setCityName] = useState<string>('');

  useEffect(() => {
    (async () => {
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      if (locationStatus.status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        
        try {
          const response = await Location.reverseGeocodeAsync({
            latitude,
            longitude
          });
          
          if (response[0]?.city) {
            setCityName(response[0].city);
          }
        } catch (error) {
          console.error('Error getting location:', error);
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.camera}>
        <View style={styles.overlay}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Scan QR Code</Text>
            {cityName && (
              <Text style={styles.locationText}>📍 {cityName}</Text>
            )}
          </View>
          
          <View style={styles.scanArea}>
            <View style={styles.scanFrame} />
            <Text style={styles.scanText}>
              Align QR code within the frame
            </Text>
          </View>

          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => {
              // Camera flip functionality will be added later
            }}>
            <CameraIcon size={24} color="white" />
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
  camera: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  locationText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginTop: 5,
  },
  scanArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
  },
  scanText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  flipButton: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});