// WhiteLight - Onboarding Screen (React Native)

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, typography, borderRadius } from '../theme';
import { storage } from '../services/storage';
import * as db from '../services/database';

const { width } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

type Step = 1 | 2 | 3 | 4;

const INTERESTS = [
  { id: 'electronics', label: 'Electronics', icon: '📱' },
  { id: 'fashion', label: 'Fashion', icon: '👗' },
  { id: 'groceries', label: 'Groceries', icon: '🛒' },
  { id: 'beauty', label: 'Beauty', icon: '💄' },
  { id: 'home', label: 'Home & Living', icon: '🏠' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'books', label: 'Books', icon: '📚' },
  { id: 'toys', label: 'Toys & Kids', icon: '🧸' },
];

const DELIVERY_PREFERENCES = [
  { id: 'fastest', label: 'Fastest Delivery', icon: 'zap' },
  { id: 'cheapest', label: 'Cheapest Price', icon: 'dollar-sign' },
  { id: 'local', label: 'Local Stores', icon: 'map-pin' },
  { id: 'eco', label: 'Eco-Friendly', icon: 'leaf' },
];

export default function OnboardingScreen({ navigation }: Props) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [authMethod, setAuthMethod] = useState<'google' | 'apple' | 'phone' | null>(null);
  const [phone, setPhone] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [deliveryPreference, setDeliveryPreference] = useState('');

  const scrollViewRef = useRef<ScrollView>(null);

  const handleNext = async () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    } else {
      await completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  const handleSkip = async () => {
    await completeOnboarding();
  };

  const completeOnboarding = async () => {
    try {
      // Save user preferences
      const userId = await storage.getUserId();
      
      await db.saveUserPreferences(userId, {
        interests: selectedInterests,
        deliveryPreference,
        location,
        phone,
        authMethod: authMethod || 'phone',
      });

      // Mark onboarding as complete
      await storage.setOnboardingComplete(true);

      // Navigate to main app
      navigation.replace('MainTabs');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      // Still navigate to avoid blocking user
      navigation.replace('MainTabs');
    }
  };

  const handleAuthMethodSelect = (method: 'google' | 'apple' | 'phone') => {
    setAuthMethod(method);
    if (method !== 'phone') {
      // In production, handle Google/Apple Sign In here
      handleNext();
    }
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return authMethod === 'phone' ? phone.length >= 10 : authMethod !== null;
      case 2:
        return selectedInterests.length > 0;
      case 3:
        return location.length > 0;
      case 4:
        return deliveryPreference.length > 0;
      default:
        return true;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {currentStep > 1 && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        )}
        
        <View style={styles.progressContainer}>
          {[1, 2, 3, 4].map((step) => (
            <View
              key={step}
              style={[
                styles.progressDot,
                step <= currentStep && styles.progressDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Step 1: Authentication */}
        {currentStep === 1 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Welcome to WhiteLight!</Text>
            <Text style={styles.stepSubtitle}>
              Let's get you started. How would you like to sign in?
            </Text>

            <View style={styles.authOptions}>
              <TouchableOpacity
                style={[
                  styles.authButton,
                  authMethod === 'google' && styles.authButtonSelected,
                ]}
                onPress={() => handleAuthMethodSelect('google')}
              >
                <Icon name="mail" size={24} color={colors.red[500]} />
                <Text style={styles.authButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.authButton,
                  authMethod === 'apple' && styles.authButtonSelected,
                ]}
                onPress={() => handleAuthMethodSelect('apple')}
              >
                <Icon name="smartphone" size={24} color={colors.gray[900]} />
                <Text style={styles.authButtonText}>Continue with Apple</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.authButton,
                  authMethod === 'phone' && styles.authButtonSelected,
                ]}
                onPress={() => handleAuthMethodSelect('phone')}
              >
                <Icon name="phone" size={24} color={colors.primary[500]} />
                <Text style={styles.authButtonText}>Continue with Phone</Text>
              </TouchableOpacity>
            </View>

            {authMethod === 'phone' && (
              <View style={styles.phoneInputContainer}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.phoneInput}>
                  <Text style={styles.countryCode}>+91</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your phone number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    maxLength={10}
                  />
                </View>
              </View>
            )}
          </View>
        )}

        {/* Step 2: Interests */}
        {currentStep === 2 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>What are you interested in?</Text>
            <Text style={styles.stepSubtitle}>
              Select categories to personalize your experience
            </Text>

            <View style={styles.interestsGrid}>
              {INTERESTS.map((interest) => (
                <TouchableOpacity
                  key={interest.id}
                  style={[
                    styles.interestCard,
                    selectedInterests.includes(interest.id) &&
                      styles.interestCardSelected,
                  ]}
                  onPress={() => toggleInterest(interest.id)}
                >
                  <Text style={styles.interestIcon}>{interest.icon}</Text>
                  <Text style={styles.interestLabel}>{interest.label}</Text>
                  {selectedInterests.includes(interest.id) && (
                    <View style={styles.selectedBadge}>
                      <Icon name="check" size={14} color={colors.background} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 3: Location */}
        {currentStep === 3 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Where are you located?</Text>
            <Text style={styles.stepSubtitle}>
              We'll show you products from nearby stores
            </Text>

            <View style={styles.locationContainer}>
              <View style={styles.inputGroup}>
                <Icon name="map-pin" size={20} color={colors.primary[500]} />
                <TextInput
                  style={styles.locationInput}
                  placeholder="Enter your city or area"
                  value={location}
                  onChangeText={setLocation}
                />
              </View>

              <TouchableOpacity style={styles.currentLocationButton}>
                <Icon name="navigation" size={20} color={colors.primary[500]} />
                <Text style={styles.currentLocationText}>
                  Use current location
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.locationIllustration}>
              <Icon name="map" size={120} color={colors.gray[300]} />
            </View>
          </View>
        )}

        {/* Step 4: Delivery Preference */}
        {currentStep === 4 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Your delivery preference?</Text>
            <Text style={styles.stepSubtitle}>
              What matters most when you shop?
            </Text>

            <View style={styles.preferencesContainer}>
              {DELIVERY_PREFERENCES.map((pref) => (
                <TouchableOpacity
                  key={pref.id}
                  style={[
                    styles.preferenceCard,
                    deliveryPreference === pref.id &&
                      styles.preferenceCardSelected,
                  ]}
                  onPress={() => setDeliveryPreference(pref.id)}
                >
                  <Icon
                    name={pref.icon}
                    size={32}
                    color={
                      deliveryPreference === pref.id
                        ? colors.primary[500]
                        : colors.gray[400]
                    }
                  />
                  <Text
                    style={[
                      styles.preferenceLabel,
                      deliveryPreference === pref.id &&
                        styles.preferenceLabelSelected,
                    ]}
                  >
                    {pref.label}
                  </Text>
                  {deliveryPreference === pref.id && (
                    <View style={styles.preferenceCheckmark}>
                      <Icon name="check-circle" size={24} color={colors.primary[500]} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !canProceed() && styles.continueButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={!canProceed()}
        >
          <Text style={styles.continueButtonText}>
            {currentStep === 4 ? 'Get Started' : 'Continue'}
          </Text>
          <Icon name="arrow-right" size={20} color={colors.background} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 60,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    flex: 1,
    justifyContent: 'center',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray[300],
  },
  progressDotActive: {
    backgroundColor: colors.primary[500],
    width: 24,
  },
  skipText: {
    ...typography.body,
    color: colors.primary[500],
    fontWeight: '600',
    width: 60,
    textAlign: 'right',
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  stepSubtitle: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  authOptions: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.background,
    gap: spacing.md,
  },
  authButtonSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  authButtonText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  phoneInputContainer: {
    marginTop: spacing.xl,
  },
  inputLabel: {
    ...typography.small,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  countryCode: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  textInput: {
    ...typography.body,
    flex: 1,
    color: colors.text.primary,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.base,
  },
  interestCard: {
    width: (width - spacing.xl * 2 - spacing.md * 2) / 3,
    aspectRatio: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  interestCardSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  interestIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  interestLabel: {
    ...typography.caption,
    color: colors.text.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
  selectedBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationContainer: {
    marginTop: spacing.xl,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
    marginBottom: spacing.base,
  },
  locationInput: {
    ...typography.body,
    flex: 1,
    color: colors.text.primary,
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    gap: spacing.sm,
  },
  currentLocationText: {
    ...typography.body,
    color: colors.primary[500],
    fontWeight: '600',
  },
  locationIllustration: {
    alignItems: 'center',
    marginTop: spacing['3xl'],
  },
  preferencesContainer: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  preferenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.md,
    position: 'relative',
  },
  preferenceCardSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  preferenceLabel: {
    ...typography.body,
    color: colors.text.secondary,
    fontWeight: '600',
    flex: 1,
  },
  preferenceLabelSelected: {
    color: colors.text.primary,
  },
  preferenceCheckmark: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
  },
  footer: {
    padding: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[500],
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  continueButtonDisabled: {
    backgroundColor: colors.gray[300],
  },
  continueButtonText: {
    ...typography.button,
    color: colors.background,
  },
});
