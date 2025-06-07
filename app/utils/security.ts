import * as Device from 'expo-device';
import * as ScreenCapture from 'expo-screen-capture';
import * as Application from 'expo-application';
import { Platform, AppState, AppStateStatus } from 'react-native';

export class SecurityManager {
  private static instance: SecurityManager;
  private isScreenCaptureEnabled: boolean = false;
  private appStateSubscription: any = null;

  private constructor() {
    // Initialize app state listener for screenshot prevention
    this.setupAppStateListener();
  }

  public static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  private setupAppStateListener() {
    this.appStateSubscription = AppState.addEventListener('change', this.handleAppStateChange);
  }

  private handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      // Re-enable screenshot prevention when app comes to foreground
      await this.preventScreenshots();
    }
  };

  /**
   * Check if the device is rooted (Android) or jailbroken (iOS)
   */
  public async checkDeviceSecurity(): Promise<boolean> {
    try {
      if (Platform.OS === 'android') {
        const isRooted = await Device.isRootedExperimentalAsync();
        if (isRooted) {
          console.warn('Device is rooted');
          return false;
        }
      }
      
      // Additional jailbreak detection for iOS
      if (Platform.OS === 'ios') {
        const isJailbroken = await this.checkIOSJailbreak();
        if (isJailbroken) {
          console.warn('Device is jailbroken');
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Error checking device security:', error);
      return false;
    }
  }

  /**
   * Check for app tampering
   */
  public async checkAppTampering(): Promise<boolean> {
    try {
      // Check if the app is running in debug mode
      const isDebug = __DEV__;
      if (isDebug) {
        console.warn('App is running in debug mode');
        return false;
      }

      // Check if the app signature matches
      const nativeApplicationVersion = Application.nativeApplicationVersion;
      const nativeBuildVersion = Application.nativeBuildVersion;
      
      // Add your app signature verification logic here
      // This is a placeholder - you should implement proper signature verification
      const isValidSignature = true;

      return isValidSignature;
    } catch (error) {
      console.error('Error checking app tampering:', error);
      return false;
    }
  }

  /**
   * Enable screenshot prevention
   */
  public async preventScreenshots(): Promise<void> {
    try {
      // Multiple attempts to ensure screenshot prevention is enabled
      for (let i = 0; i < 3; i++) {
        await ScreenCapture.preventScreenCaptureAsync();
        this.isScreenCaptureEnabled = true;
      }
    } catch (error) {
      console.error('Error preventing screenshots:', error);
      // Retry on error
      setTimeout(() => this.preventScreenshots(), 1000);
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
      console.error('Error allowing screenshots:', error);
    }
  }

  /**
   * Check for iOS jailbreak
   */
  private async checkIOSJailbreak(): Promise<boolean> {
    if (Platform.OS !== 'ios') return false;

    try {
      // Check for common jailbreak files
      const jailbreakPaths = [
        '/Applications/Cydia.app',
        '/Library/MobileSubstrate/MobileSubstrate.dylib',
        '/bin/bash',
        '/usr/sbin/sshd',
        '/etc/apt',
        '/private/var/lib/apt/'
      ];

      // This is a simplified check - in a real app, you'd want to implement
      // more sophisticated jailbreak detection
      return false;
    } catch (error) {
      console.error('Error checking iOS jailbreak:', error);
      return false;
    }
  }

  /**
   * Cleanup method to remove listeners
   */
  public cleanup() {
    if (this.appStateSubscription) {
      this.appStateSubscription.remove();
    }
  }
}

export const securityManager = SecurityManager.getInstance(); 