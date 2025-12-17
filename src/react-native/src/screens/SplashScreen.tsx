// WhiteLight - Splash Screen (React Native)

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';
import { storage } from '../services/storage';

const { width, height } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

export default function SplashScreen({ navigation }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 10,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after 3 seconds
    const timer = setTimeout(async () => {
      const onboardingComplete = await storage.isOnboardingComplete();
      
      if (onboardingComplete) {
        navigation.replace('MainTabs');
      } else {
        navigation.replace('Landing');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logo}>
          <Text style={styles.logoText}>WL</Text>
        </View>
        <Text style={styles.brandName}>WhiteLight</Text>
        <Text style={styles.tagline}>Shop Smarter, Live Better</Text>
      </Animated.View>

      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <View style={styles.loadingDots}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotDelay1]} />
          <View style={[styles.dot, styles.dotDelay2]} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.primary[500],
  },
  brandName: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.background,
    marginBottom: spacing.sm,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary[100],
    letterSpacing: 0.5,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.background,
  },
  dotDelay1: {
    opacity: 0.6,
  },
  dotDelay2: {
    opacity: 0.3,
  },
});
