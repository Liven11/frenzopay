import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, AppState } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const ScreenshotPreventionOverlay: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    if (showOverlay) {
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto hide after 3 seconds
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowOverlay(false);
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showOverlay]);

  // Listen for screenshot attempts
  useEffect(() => {
    const handleScreenshotAttempt = () => {
      setShowOverlay(true);
    };

    // Add event listener for screenshot attempts
    // Note: This is a placeholder. In a real implementation, you would need to
    // use native modules to detect screenshot attempts
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        handleScreenshotAttempt();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (!showOverlay) return null;

  return (
    <Animated.View 
      style={[
        styles.overlay,
        { opacity: fadeAnim }
      ]}
    >
      <LinearGradient
        colors={['rgba(0, 0, 255, 0.8)', 'rgba(0, 0, 255, 0.6)']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Security Warning</Text>
          <Text style={styles.message}>
            Screenshots are disabled for security reasons.{'\n'}
            This app contains sensitive information and is protected against unauthorized capture.
          </Text>
          <Text style={styles.subMessage}>
            For your security, please do not attempt to capture the screen.
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
    maxWidth: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  subMessage: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.8,
  },
}); 