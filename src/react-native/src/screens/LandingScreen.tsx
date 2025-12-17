// WhiteLight - Landing Screen (React Native)

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, typography, borderRadius } from '../theme';

const { width, height } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Landing'>;
};

const FEATURES = [
  {
    icon: 'shopping-cart',
    title: 'Buy Now',
    description: 'Instant checkout with best prices from local stores',
    color: colors.primary[500],
  },
  {
    icon: 'trending-down',
    title: 'Find Me Best Price',
    description: 'Let sellers compete with live bids for your purchase',
    color: colors.purple[500],
  },
  {
    icon: 'search',
    title: 'Find Me Product',
    description: 'AI-powered search with photo, voice, or text',
    color: colors.green[500],
  },
  {
    icon: 'truck',
    title: 'Same-Day Delivery',
    description: 'Fast delivery from neighborhood stores',
    color: colors.orange[500],
  },
];

export default function LandingScreen({ navigation }: Props) {
  const handleGetStarted = () => {
    navigation.navigate('Onboarding');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>WL</Text>
            </View>
          </View>
          
          <Text style={styles.heroTitle}>WhiteLight</Text>
          <Text style={styles.heroSubtitle}>
            Shop Smarter, Live Better
          </Text>
          
          <Text style={styles.heroDescription}>
            Next-generation mobile commerce with live bidding, AI search, and same-day delivery
          </Text>

          <TouchableOpacity
            style={styles.ctaButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.ctaButtonText}>Get Started</Text>
            <Icon name="arrow-right" size={20} color={colors.background} />
          </TouchableOpacity>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why WhiteLight?</Text>
          
          <View style={styles.featuresGrid}>
            {FEATURES.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={[styles.featureIcon, { backgroundColor: `${feature.color}20` }]}>
                  <Icon name={feature.icon} size={28} color={feature.color} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* How It Works */}
        <View style={styles.howItWorksSection}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          
          <View style={styles.stepsContainer}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Browse or Search</Text>
                <Text style={styles.stepDescription}>
                  Find products using AI-powered search with photo, voice, or text
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Choose Your Action</Text>
                <Text style={styles.stepDescription}>
                  Buy now, request bids, or find similar products
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Get Best Deal</Text>
                <Text style={styles.stepDescription}>
                  Local sellers compete with prices, freebies, and fast delivery
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Receive Fast</Text>
                <Text style={styles.stepDescription}>
                  Same-day delivery from neighborhood stores
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Social Proof */}
        <View style={styles.socialProofSection}>
          <Text style={styles.sectionTitle}>Trusted by Thousands</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>50K+</Text>
              <Text style={styles.statLabel}>Happy Users</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Products</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>Local Stores</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>4.8★</Text>
              <Text style={styles.statLabel}>App Rating</Text>
            </View>
          </View>
        </View>

        {/* Final CTA */}
        <View style={styles.finalCta}>
          <Text style={styles.finalCtaTitle}>Ready to shop smarter?</Text>
          <Text style={styles.finalCtaSubtitle}>
            Join thousands of happy shoppers today
          </Text>
          
          <TouchableOpacity
            style={styles.finalCtaButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.finalCtaButtonText}>Get Started Free</Text>
            <Icon name="arrow-right" size={20} color={colors.background} />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms & Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    alignItems: 'center',
    paddingTop: spacing['3xl'],
    paddingHorizontal: spacing.base,
    paddingBottom: spacing['4xl'],
    backgroundColor: colors.primary[50],
  },
  logoContainer: {
    marginBottom: spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.background,
  },
  heroTitle: {
    ...typography.display,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    ...typography.h3,
    color: colors.primary[600],
    marginBottom: spacing.base,
  },
  heroDescription: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: spacing.xl,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[500],
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.base,
    borderRadius: borderRadius.full,
    gap: spacing.sm,
    shadowColor: colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaButtonText: {
    ...typography.button,
    color: colors.background,
  },
  featuresSection: {
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.base,
  },
  featureCard: {
    width: (width - spacing.xl * 2 - spacing.base) / 2,
    backgroundColor: colors.surface,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  featureTitle: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  featureDescription: {
    ...typography.small,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  howItWorksSection: {
    padding: spacing.xl,
    backgroundColor: colors.surface,
  },
  stepsContainer: {
    gap: spacing.lg,
  },
  step: {
    flexDirection: 'row',
    gap: spacing.base,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    ...typography.h3,
    color: colors.background,
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepTitle: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  stepDescription: {
    ...typography.small,
    color: colors.text.secondary,
  },
  socialProofSection: {
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.base,
  },
  statCard: {
    width: (width - spacing.xl * 2 - spacing.base) / 2,
    backgroundColor: colors.primary[50],
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  statNumber: {
    ...typography.h1,
    color: colors.primary[600],
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.small,
    color: colors.text.secondary,
  },
  finalCta: {
    padding: spacing.xl,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
  },
  finalCtaTitle: {
    ...typography.h2,
    color: colors.background,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  finalCtaSubtitle: {
    ...typography.body,
    color: colors.primary[100],
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  finalCtaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.base,
    borderRadius: borderRadius.full,
    gap: spacing.sm,
  },
  finalCtaButtonText: {
    ...typography.button,
    color: colors.primary[500],
  },
  footer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    ...typography.caption,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
});
