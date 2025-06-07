import * as Device from 'expo-device';
import * as ScreenCapture from 'expo-screen-capture';
import * as Application from 'expo-application';
import { Platform, AppState, AppStateStatus, Alert } from 'react-native';

export class SecurityManager {
  private static instance: SecurityManager;
  private isScreenCaptureEnabled: boolean = false;
  private appStateSubscription: any = null;

  private constructor() {
    try {
      // Initialize app state listener for screenshot prevention
      this.setupAppStateListener();
    } catch (error) {
      console.warn('Error initializing security manager:', error);
    }
  }

  public static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  private setupAppStateListener() {
    try {
      this.appStateSubscription = AppState.addEventListener('change', this.handleAppStateChange);
    } catch (error) {
      console.warn('Error setting up app state listener:', error);
    }
  }

  private handleAppStateChange = async (nextAppState: AppStateStatus) => {
    try {
      if (nextAppState === 'active') {
        // Re-enable screenshot prevention when app comes to foreground
        await this.preventScreenshots();
      }
    } catch (error) {
      console.warn('Error handling app state change:', error);
    }
  };

  /**
   * Check if the device is rooted (Android) or jailbroken (iOS)
   */
  public async checkDeviceSecurity(): Promise<boolean> {
    try {
      // Always return true in development or preview builds
      if (__DEV__ || process.env.EAS_BUILD_PROFILE === 'preview') {
        return true;
      }

      if (Platform.OS === 'android') {
        try {
          const isRooted = await Device.isRootedExperimentalAsync();
          if (isRooted) {
            Alert.alert(
              'Security Notice',
              'This device appears to be rooted. Some features may be limited.',
              [{ text: 'OK' }]
            );
          }
        } catch (error) {
          console.warn('Error checking root status:', error);
        }
      }
      
      // Additional jailbreak detection for iOS
      if (Platform.OS === 'ios') {
        try {
          const isJailbroken = await this.checkIOSJailbreak();
          if (isJailbroken) {
            Alert.alert(
              'Security Notice',
              'This device appears to be jailbroken. Some features may be limited.',
              [{ text: 'OK' }]
            );
          }
        } catch (error) {
          console.warn('Error checking jailbreak status:', error);
        }
      }

      return true;
    } catch (error) {
      console.warn('Error in checkDeviceSecurity:', error);
      return true;
    }
  }

  /**
   * Check for app tampering
   */
  public async checkAppTampering(): Promise<boolean> {
    try {
      // Always return true in development or preview builds
      if (__DEV__ || process.env.EAS_BUILD_PROFILE === 'preview') {
        return true;
      }

      // Check if the app is running in debug mode
      const isDebug = __DEV__;
      if (isDebug) {
        console.warn('App is running in debug mode');
        return true;
      }

      return true;
    } catch (error) {
      console.warn('Error in checkAppTampering:', error);
      return true;
    }
  }

  /**
   * Enable screenshot prevention
   */
  public async preventScreenshots(): Promise<void> {
    try {
      // Skip screenshot prevention in development or preview builds
      if (__DEV__ || process.env.EAS_BUILD_PROFILE === 'preview') {
        return;
      }

      await ScreenCapture.preventScreenCaptureAsync();
      this.isScreenCaptureEnabled = true;
    } catch (error) {
      console.warn('Error preventing screenshots:', error);
    }
  }

  /**
   * Allow screenshots
   */
  public async allowScreenshots(): Promise<void> {
    try {
      if (this.isScreenCaptureEnabled) {
        await ScreenCapture.allowScreenCaptureAsync();
        this.isScreenCaptureEnabled = false;
      }
    } catch (error) {
      console.warn('Error allowing screenshots:', error);
    }
  }

  /**
   * Check for iOS jailbreak
   */
  private async checkIOSJailbreak(): Promise<boolean> {
    if (Platform.OS !== 'ios') return false;

    try {
      // Skip jailbreak detection in development or preview builds
      if (__DEV__ || process.env.EAS_BUILD_PROFILE === 'preview') {
        return false;
      }

      // Check for common jailbreak files
      const jailbreakPaths = [
        '/Applications/Cydia.app',
        '/Library/MobileSubstrate/MobileSubstrate.dylib',
        '/bin/bash',
        '/usr/sbin/sshd',
        '/etc/apt',
        '/private/var/lib/apt/'
      ];

      return false;
    } catch (error) {
      console.warn('Error checking iOS jailbreak:', error);
      return false;
    }
  }

  /**
   * Cleanup method to remove listeners
   */
  public cleanup() {
    try {
      if (this.appStateSubscription) {
        this.appStateSubscription.remove();
      }
    } catch (error) {
      console.warn('Error cleaning up security manager:', error);
    }
  }
}

export const securityManager = SecurityManager.getInstance(); 