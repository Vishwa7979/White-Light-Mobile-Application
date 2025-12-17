// WhiteLight - Bidding Screen (React Native)

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { SellerBid } from '../types';
import { colors, spacing, typography, borderRadius } from '../theme';
import { storage } from '../services/storage';
import * as db from '../services/database';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Bidding'>;

type Duration = '1hr' | '4hrs' | '12hrs' | '24hrs';

const DURATIONS: { value: Duration; label: string; popular?: boolean }[] = [
  { value: '1hr', label: '1 Hour' },
  { value: '4hrs', label: '4 Hours', popular: true },
  { value: '12hrs', label: '12 Hours' },
  { value: '24hrs', label: '24 Hours' },
];

export default function BiddingScreen({ navigation, route }: Props) {
  const { product } = route.params;
  const [step, setStep] = useState<'duration' | 'bidding' | 'results'>('duration');
  const [selectedDuration, setSelectedDuration] = useState<Duration>('4hrs');
  const [bids, setBids] = useState<SellerBid[]>([]);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [bidRequestId, setBidRequestId] = useState('');

  useEffect(() => {
    if (step === 'bidding') {
      startBiddingTimer();
      simulateBids();
    }
  }, [step]);

  const handleClose = () => {
    navigation.goBack();
  };

  const startBiddingTimer = () => {
    const durationMinutes = {
      '1hr': 60,
      '4hrs': 240,
      '12hrs': 720,
      '24hrs': 1440,
    };

    let remainingSeconds = durationMinutes[selectedDuration] * 60;
    
    const interval = setInterval(() => {
      remainingSeconds--;
      
      const hours = Math.floor(remainingSeconds / 3600);
      const minutes = Math.floor((remainingSeconds % 3600) / 60);
      const seconds = remainingSeconds % 60;
      
      setTimeRemaining(
        `${hours}h ${minutes}m ${seconds}s`
      );

      if (remainingSeconds <= 0) {
        clearInterval(interval);
        setStep('results');
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  const simulateBids = () => {
    // Simulate seller bids coming in
    const mockBids: SellerBid[] = product.sellers.map((seller, index) => ({
      id: `bid_${index}`,
      sellerId: seller.id,
      sellerName: seller.name,
      price: seller.price - Math.floor(Math.random() * 500) - 100,
      deliveryTime: seller.deliveryTime,
      freebies: generateFreebies(),
      message: generateMessage(),
      rating: seller.rating,
      submittedAt: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    }));

    // Add bids one by one with delays
    mockBids.forEach((bid, index) => {
      setTimeout(() => {
        setBids((prev) => [...prev, bid].sort((a, b) => a.price - b.price));
      }, (index + 1) * 2000);
    });
  };

  const generateFreebies = () => {
    const possibleFreebies = [
      'Free Extended Warranty',
      'Free Shipping',
      'Free Installation',
      'Extra Accessories',
      'Gift Voucher',
      'Cashback Offer',
    ];
    const count = Math.floor(Math.random() * 3) + 1;
    return possibleFreebies.slice(0, count);
  };

  const generateMessage = () => {
    const messages = [
      'Best price in your area! Same-day delivery available.',
      'Premium quality guaranteed. Free installation included.',
      'Special discount for you! Limited time offer.',
      'Fastest delivery in the neighborhood!',
      'Extra freebies with this deal. Don\'t miss out!',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleStartBidding = async () => {
    try {
      const userId = await storage.getUserId();
      
      const bidRequest = await db.createBidRequest(userId, {
        productId: product.id,
        duration: selectedDuration,
      });

      setBidRequestId(bidRequest.id);
      setStep('bidding');
    } catch (error) {
      console.error('Error starting bidding:', error);
      // Continue anyway for demo
      setStep('bidding');
    }
  };

  const handleAcceptBid = (bid: SellerBid) => {
    // In production, accept the bid via API
    navigation.goBack();
    // Could navigate to cart with selected seller
  };

  const handleViewAllBids = () => {
    setStep('results');
  };

  // Step 1: Select Duration
  if (step === 'duration') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <Icon name="x" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Find Me Best Price</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Product Preview */}
          <View style={styles.productPreview}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productPreviewInfo}>
              <Text style={styles.productPreviewName} numberOfLines={2}>
                {product.name}
              </Text>
              <Text style={styles.productPreviewPrice}>
                Current Price: ₹{product.price.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Explanation */}
          <View style={styles.section}>
            <View style={styles.infoCard}>
              <Icon name="info" size={24} color={colors.primary[500]} />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>How it works</Text>
                <Text style={styles.infoText}>
                  Local sellers will compete to offer you the best price, delivery time, 
                  and freebies. You'll receive live bids and can accept the best deal!
                </Text>
              </View>
            </View>
          </View>

          {/* Duration Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select bidding duration</Text>
            <Text style={styles.sectionSubtitle}>
              How long should sellers have to place their bids?
            </Text>

            <View style={styles.durationsGrid}>
              {DURATIONS.map((duration) => (
                <TouchableOpacity
                  key={duration.value}
                  style={[
                    styles.durationCard,
                    selectedDuration === duration.value && styles.durationCardSelected,
                  ]}
                  onPress={() => setSelectedDuration(duration.value)}
                >
                  {duration.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>Popular</Text>
                    </View>
                  )}
                  <Icon
                    name="clock"
                    size={32}
                    color={
                      selectedDuration === duration.value
                        ? colors.primary[500]
                        : colors.gray[400]
                    }
                  />
                  <Text
                    style={[
                      styles.durationLabel,
                      selectedDuration === duration.value && styles.durationLabelSelected,
                    ]}
                  >
                    {duration.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Benefits */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What you get</Text>
            
            <View style={styles.benefits}>
              <View style={styles.benefit}>
                <Icon name="trending-down" size={20} color={colors.green[500]} />
                <Text style={styles.benefitText}>Lower prices than retail</Text>
              </View>
              <View style={styles.benefit}>
                <Icon name="gift" size={20} color={colors.purple[500]} />
                <Text style={styles.benefitText}>Free accessories & gifts</Text>
              </View>
              <View style={styles.benefit}>
                <Icon name="truck" size={20} color={colors.orange[500]} />
                <Text style={styles.benefitText}>Faster delivery options</Text>
              </View>
              <View style={styles.benefit}>
                <Icon name="map-pin" size={20} color={colors.primary[500]} />
                <Text style={styles.benefitText}>Support local businesses</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartBidding}
          >
            <Text style={styles.startButtonText}>Start Bidding</Text>
            <Icon name="arrow-right" size={20} color={colors.background} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Step 2: Live Bidding
  if (step === 'bidding') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <Icon name="x" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Live Bidding</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Timer */}
        <View style={styles.timerContainer}>
          <Icon name="clock" size={20} color={colors.red[500]} />
          <Text style={styles.timerText}>Time Remaining: {timeRemaining}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Current Best Bid */}
          {bids.length > 0 && (
            <View style={styles.bestBidCard}>
              <View style={styles.bestBidHeader}>
                <Icon name="award" size={24} color={colors.orange[500]} />
                <Text style={styles.bestBidTitle}>Current Best Offer</Text>
              </View>

              <View style={styles.bestBidContent}>
                <View style={styles.sellerInfo}>
                  <Text style={styles.sellerName}>{bids[0].sellerName}</Text>
                  <View style={styles.sellerRating}>
                    <Icon name="star" size={14} color={colors.orange[500]} />
                    <Text style={styles.ratingText}>{bids[0].rating}</Text>
                  </View>
                </View>

                <Text style={styles.bestBidPrice}>
                  ₹{bids[0].price.toLocaleString()}
                </Text>

                <View style={styles.savingsCard}>
                  <Text style={styles.savingsText}>
                    You save ₹{(product.price - bids[0].price).toLocaleString()}
                  </Text>
                </View>

                <View style={styles.bidDetails}>
                  <View style={styles.bidDetail}>
                    <Icon name="truck" size={16} color={colors.text.secondary} />
                    <Text style={styles.bidDetailText}>{bids[0].deliveryTime}</Text>
                  </View>
                  {bids[0].freebies.map((freebie, index) => (
                    <View key={index} style={styles.bidDetail}>
                      <Icon name="gift" size={16} color={colors.purple[500]} />
                      <Text style={styles.bidDetailText}>{freebie}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => handleAcceptBid(bids[0])}
                >
                  <Text style={styles.acceptButtonText}>Accept This Offer</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Incoming Bids */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                All Bids ({bids.length})
              </Text>
              {bids.length > 3 && (
                <TouchableOpacity onPress={handleViewAllBids}>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              )}
            </View>

            {bids.length === 0 && (
              <View style={styles.waitingState}>
                <Icon name="loader" size={48} color={colors.primary[500]} />
                <Text style={styles.waitingText}>
                  Waiting for sellers to place their bids...
                </Text>
              </View>
            )}

            {bids.slice(0, 5).map((bid, index) => (
              <View key={bid.id} style={styles.bidCard}>
                <View style={styles.bidCardHeader}>
                  <View style={styles.bidRank}>
                    <Text style={styles.bidRankText}>#{index + 1}</Text>
                  </View>
                  <View style={styles.bidSellerInfo}>
                    <Text style={styles.bidSellerName}>{bid.sellerName}</Text>
                    <View style={styles.bidSellerRating}>
                      <Icon name="star" size={12} color={colors.orange[500]} />
                      <Text style={styles.bidRatingText}>{bid.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.bidPrice}>
                    ₹{bid.price.toLocaleString()}
                  </Text>
                </View>

                <Text style={styles.bidMessage} numberOfLines={2}>
                  {bid.message}
                </Text>

                <View style={styles.bidFreebies}>
                  {bid.freebies.slice(0, 2).map((freebie, i) => (
                    <View key={i} style={styles.freebieBadge}>
                      <Icon name="gift" size={12} color={colors.purple[500]} />
                      <Text style={styles.freebieText}>{freebie}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.acceptBidButton}
                  onPress={() => handleAcceptBid(bid)}
                >
                  <Text style={styles.acceptBidButtonText}>Accept</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Step 3: Results (all bids)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <Icon name="x" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Bids</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.resultsTitle}>
            {bids.length} sellers competed for your business
          </Text>

          {bids.map((bid, index) => (
            <View key={bid.id} style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <View style={styles.resultRank}>
                  {index === 0 && <Icon name="award" size={20} color={colors.orange[500]} />}
                  <Text style={styles.resultRankText}>#{index + 1}</Text>
                </View>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultSellerName}>{bid.sellerName}</Text>
                  <View style={styles.resultRating}>
                    <Icon name="star" size={14} color={colors.orange[500]} />
                    <Text style={styles.resultRatingText}>{bid.rating}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.resultPriceRow}>
                <Text style={styles.resultPrice}>
                  ₹{bid.price.toLocaleString()}
                </Text>
                <Text style={styles.resultSavings}>
                  Save ₹{(product.price - bid.price).toLocaleString()}
                </Text>
              </View>

              <Text style={styles.resultMessage}>{bid.message}</Text>

              <View style={styles.resultFreebies}>
                {bid.freebies.map((freebie, i) => (
                  <View key={i} style={styles.resultFreebie}>
                    <Icon name="check" size={14} color={colors.green[500]} />
                    <Text style={styles.resultFreebieText}>{freebie}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={[
                  styles.resultAcceptButton,
                  index === 0 && styles.resultAcceptButtonBest,
                ]}
                onPress={() => handleAcceptBid(bid)}
              >
                <Text
                  style={[
                    styles.resultAcceptButtonText,
                    index === 0 && styles.resultAcceptButtonTextBest,
                  ]}
                >
                  {index === 0 ? 'Accept Best Offer' : 'Accept This Offer'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h4,
    color: colors.text.primary,
  },
  productPreview: {
    flexDirection: 'row',
    padding: spacing.base,
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray[200],
  },
  productPreviewInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productPreviewName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  productPreviewPrice: {
    ...typography.small,
    color: colors.text.secondary,
  },
  section: {
    padding: spacing.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text.primary,
  },
  sectionSubtitle: {
    ...typography.small,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    marginBottom: spacing.base,
  },
  viewAllText: {
    ...typography.small,
    color: colors.primary[500],
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.primary[50],
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    gap: spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  infoText: {
    ...typography.small,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  durationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  durationCard: {
    width: (width - spacing.base * 2 - spacing.md) / 2,
    aspectRatio: 1.2,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  durationCardSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  popularBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.orange[500],
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.base,
  },
  popularText: {
    ...typography.caption,
    color: colors.background,
    fontWeight: '700',
  },
  durationLabel: {
    ...typography.body,
    color: colors.text.secondary,
    fontWeight: '600',
    marginTop: spacing.sm,
  },
  durationLabelSelected: {
    color: colors.primary[700],
  },
  benefits: {
    gap: spacing.md,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  benefitText: {
    ...typography.body,
    color: colors.text.primary,
  },
  footer: {
    padding: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purple[500],
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  startButtonText: {
    ...typography.button,
    color: colors.background,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red[50],
    padding: spacing.md,
    gap: spacing.sm,
  },
  timerText: {
    ...typography.body,
    color: colors.red[700],
    fontWeight: '600',
  },
  bestBidCard: {
    margin: spacing.base,
    backgroundColor: colors.orange[50],
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: colors.orange[300],
    overflow: 'hidden',
  },
  bestBidHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
    gap: spacing.sm,
    backgroundColor: colors.orange[100],
  },
  bestBidTitle: {
    ...typography.h4,
    color: colors.orange[900],
  },
  bestBidContent: {
    padding: spacing.base,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sellerName: {
    ...typography.h3,
    color: colors.text.primary,
  },
  sellerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  bestBidPrice: {
    ...typography.display,
    color: colors.green[600],
    marginBottom: spacing.sm,
  },
  savingsCard: {
    backgroundColor: colors.green[100],
    padding: spacing.sm,
    borderRadius: borderRadius.base,
    marginBottom: spacing.md,
  },
  savingsText: {
    ...typography.body,
    color: colors.green[700],
    fontWeight: '700',
    textAlign: 'center',
  },
  bidDetails: {
    gap: spacing.sm,
    marginBottom: spacing.base,
  },
  bidDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  bidDetailText: {
    ...typography.small,
    color: colors.text.secondary,
  },
  acceptButton: {
    backgroundColor: colors.primary[500],
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  acceptButtonText: {
    ...typography.button,
    color: colors.background,
  },
  bidCard: {
    backgroundColor: colors.surface,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bidCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  bidRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  bidRankText: {
    ...typography.small,
    color: colors.primary[700],
    fontWeight: '700',
  },
  bidSellerInfo: {
    flex: 1,
  },
  bidSellerName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  bidSellerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  bidRatingText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  bidPrice: {
    ...typography.h3,
    color: colors.green[600],
  },
  bidMessage: {
    ...typography.small,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  bidFreebies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  freebieBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.purple[50],
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.base,
    gap: 4,
  },
  freebieText: {
    ...typography.caption,
    color: colors.purple[700],
  },
  acceptBidButton: {
    backgroundColor: colors.primary[500],
    padding: spacing.sm,
    borderRadius: borderRadius.base,
    alignItems: 'center',
  },
  acceptBidButtonText: {
    ...typography.small,
    color: colors.background,
    fontWeight: '600',
  },
  waitingState: {
    alignItems: 'center',
    padding: spacing['3xl'],
  },
  waitingText: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.base,
    textAlign: 'center',
  },
  resultsTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: colors.surface,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  resultRank: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  resultRankText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '700',
  },
  resultInfo: {
    flex: 1,
  },
  resultSellerName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  resultRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  resultRatingText: {
    ...typography.small,
    color: colors.text.secondary,
  },
  resultPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  resultPrice: {
    ...typography.h3,
    color: colors.green[600],
  },
  resultSavings: {
    ...typography.small,
    color: colors.green[600],
    fontWeight: '600',
  },
  resultMessage: {
    ...typography.small,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  resultFreebies: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  resultFreebie: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  resultFreebieText: {
    ...typography.small,
    color: colors.text.primary,
  },
  resultAcceptButton: {
    backgroundColor: colors.primary[500],
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  resultAcceptButtonBest: {
    backgroundColor: colors.orange[500],
  },
  resultAcceptButtonText: {
    ...typography.button,
    color: colors.background,
  },
  resultAcceptButtonTextBest: {
    color: colors.background,
  },
});
