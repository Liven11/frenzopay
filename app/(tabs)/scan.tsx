import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  Platform,
  Button
} from 'react-native';
import { router } from 'expo-router';
import { Camera as CameraIcon } from 'lucide-react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [scanResult, setScanResult] = useState({
    upiId: 'example@NexTPay',
    name: 'John Doe',
    merchantCode: 'MP12345',
    rawData: ''
  });

  const handleScanPress = async () => {
    setScanned(false);
    if (!permission) {
      return;
    }
    if (!permission.granted) {
      const { status } = await requestPermission();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera permission is required to scan QR codes.');
        return;
      }
    }
    setShowCamera(true);
  };

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return;
    setScanned(true);
    setShowCamera(false);
    let upiId = data;
    let name = 'Unknown Merchant/User';
    try {
      if (data.startsWith('upi://pay')) {
        const urlParams = new URLSearchParams(data.substring(data.indexOf('?') + 1));
        upiId = urlParams.get('pa') || data;
        name = urlParams.get('pn') || 'Unknown Merchant/User';
      }
    } catch (e) {
      console.error("Failed to parse UPI QR code:", e);
    }

    setScanResult({
      upiId: upiId,
      name: name,
      merchantCode: 'N/A',
      rawData: data
    });
    setShowResultModal(true);
  };

  const handlePay = () => {
    setShowResultModal(false);

    router.push({
      pathname: '/send-to-mobile',
      params: {
        upiId: scanResult.upiId,
        name: scanResult.name,
        paymentType: 'upi'
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>QR Code Scanner</Text>

        <View style={[styles.card, styles.scanCard]}>
          <View style={styles.scanIconContainer}>
            <CameraIcon size={48} color="#172e73" />
          </View>
          <Text style={styles.scanTitle}>Scan & Pay</Text>
          <Text style={styles.scanDescription}>
            Scan any QR code to make quick payments to merchants, friends, or services
          </Text>
          <TouchableOpacity onPress={handleScanPress} style={[styles.button, styles.scanButton]}>
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.historyCard]}>
          <Text style={styles.sectionTitle}>Recent Scans</Text>
          <View style={styles.emptyHistory}>
            <Text style={styles.emptyText}>No recent scans</Text>
          </View>
        </View>
      </View>

      {/* Camera Modal / View */}
      {showCamera && (
        <Modal
          visible={showCamera}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowCamera(false)}
        >
          <View style={styles.modalOverlay}>
            <CameraView
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ["qr"],
              }}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.scannerContainerOnCamera}>
              <View style={styles.scannerFrame}>
                <View style={styles.scannerCorner1} />
                <View style={styles.scannerCorner2} />
                <View style={styles.scannerCorner3} />
                <View style={styles.scannerCorner4} />
                <View style={styles.scanLine} />
              </View>
              <Text style={styles.scannerText}>Align QR code within frame</Text>
              <TouchableOpacity onPress={() => setShowCamera(false)} style={styles.cancelScanButton}>
                <Text style={styles.cancelScanButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Result Modal */}
      <Modal
        visible={showResultModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowResultModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.resultContainer}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>Scan Result</Text>
              <TouchableOpacity
                onPress={() => setShowResultModal(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.merchantDetails}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=600' }}
                style={styles.merchantLogo}
              />
              <Text style={styles.merchantName}>{scanResult.name}</Text>
              <Text style={styles.merchantId}>{scanResult.upiId}</Text>
            </View>

            <View style={styles.paymentActions}>
              <TouchableOpacity
                onPress={handlePay}
                style={[styles.button, styles.payButton]}
              >
                 <Text style={styles.buttonText}>Pay Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowResultModal(false)}
                style={[styles.button, styles.outlineButton, styles.cancelButton]}
              >
                 <Text style={[styles.buttonText, styles.outlineButtonText]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5' // Light background
  },
  content: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A', // Dark text
    marginBottom: 20
  },
  card: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#FFFFFF'
  },
  scanCard: {
    marginBottom: 20,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF'
  },
  scanIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(139, 61, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  scanTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8
  },
  scanDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16
  },
  scanButton: {
    width: '100%',
  },
  button: {
    backgroundColor: '#172e73',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8B3DFF',
  },
  outlineButtonText: {
    color: '#8B3DFF',
  },
  historyCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16
  },
  emptyHistory: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 14,
    color: '#666666'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scannerContainerOnCamera: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  scannerCorner1: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#8B3DFF',
    borderTopLeftRadius: 8
  },
  scannerCorner2: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#8B3DFF',
    borderTopRightRadius: 8
  },
  scannerCorner3: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#8B3DFF',
    borderBottomLeftRadius: 8
  },
  scannerCorner4: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#8B3DFF',
    borderBottomRightRadius: 8
  },
  scanLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#8B3DFF'
  },
  scannerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    position: 'absolute',
    bottom: 100,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cancelScanButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#8B3DFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  cancelScanButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%',
    position: 'absolute',
    bottom: 0
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A'
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666666',
    lineHeight: 20
  },
  merchantDetails: {
    alignItems: 'center',
    marginBottom: 24
  },
  merchantLogo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 12
  },
  merchantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4
  },
  merchantId: {
    fontSize: 14,
    color: '#666666'
  },
  paymentActions: {
    marginBottom: 16
  },
  payButton: {
    marginBottom: 12
  },
  cancelButton: {}
}); 