// WhiteLight - Navigation Types

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import { Product } from '../types';

// Root Stack Navigator
export type RootStackParamList = {
  Splash: undefined;
  Landing: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
  ProductDetail: { product: Product };
  Bidding: { product: Product };
  FindProduct: undefined;
  FilteredProducts: { 
    title: string; 
    subtitle: string; 
    products: Product[] 
  };
};

// Bottom Tab Navigator
export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Cart: undefined;
  Orders: undefined;
  Profile: undefined;
};

// Navigation prop types for screens
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;

// Combined navigation prop for nested navigators
export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export type ExploreScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Explore'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export type CartScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Cart'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Profile'>,
  NativeStackNavigationProp<RootStackParamList>
>;
