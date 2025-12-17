// WhiteLight - AsyncStorage Wrapper (replaces localStorage)

import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER_ID: 'whitelight_user_id',
  DB_INITIALIZED: 'whitelight_db_initialized',
  ONBOARDING_COMPLETE: 'whitelight_onboarding_complete',
  USER_PREFERENCES: 'whitelight_user_preferences',
  CART: 'whitelight_cart',
};

export const storage = {
  // User ID
  async getUserId(): Promise<string> {
    let id = await AsyncStorage.getItem(KEYS.USER_ID);
    if (!id) {
      id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await AsyncStorage.setItem(KEYS.USER_ID, id);
    }
    return id;
  },

  async setUserId(id: string): Promise<void> {
    await AsyncStorage.setItem(KEYS.USER_ID, id);
  },

  // Database Initialization
  async isDbInitialized(): Promise<boolean> {
    const value = await AsyncStorage.getItem(KEYS.DB_INITIALIZED);
    return value === 'true';
  },

  async setDbInitialized(value: boolean): Promise<void> {
    await AsyncStorage.setItem(KEYS.DB_INITIALIZED, value.toString());
  },

  // Onboarding
  async isOnboardingComplete(): Promise<boolean> {
    const value = await AsyncStorage.getItem(KEYS.ONBOARDING_COMPLETE);
    return value === 'true';
  },

  async setOnboardingComplete(value: boolean): Promise<void> {
    await AsyncStorage.setItem(KEYS.ONBOARDING_COMPLETE, value.toString());
  },

  // User Preferences
  async getUserPreferences(): Promise<any> {
    const value = await AsyncStorage.getItem(KEYS.USER_PREFERENCES);
    return value ? JSON.parse(value) : null;
  },

  async setUserPreferences(preferences: any): Promise<void> {
    await AsyncStorage.setItem(KEYS.USER_PREFERENCES, JSON.stringify(preferences));
  },

  // Cart
  async getCart(): Promise<any[]> {
    const value = await AsyncStorage.getItem(KEYS.CART);
    return value ? JSON.parse(value) : [];
  },

  async setCart(cart: any[]): Promise<void> {
    await AsyncStorage.setItem(KEYS.CART, JSON.stringify(cart));
  },

  // Generic methods
  async setItem(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  },

  async getItem(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key);
  },

  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },

  async clear(): Promise<void> {
    await AsyncStorage.clear();
  },

  // Object storage
  async setObject(key: string, value: any): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  async getObject<T>(key: string): Promise<T | null> {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
};
