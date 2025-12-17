// WhiteLight - Product Detail Screen (React Native)

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, typography, borderRadius } from '../theme';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen({ navigation, route }: Props) {
  const { product } = route.params;
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [selectedSeller, setSelectedSeller] = useState(product.sellers[0]);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleBuyNow = () => {
    // Add to cart and navigate to cart
    console.log('Buy Now:', product);
  };

  const handleFindBestPrice = () => {
    navigation.navigate('Bidding', { product });
  };

  const handleFindProduct = () => {
    navigation.navigate('FindProduct');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.headerButton}>
          <Icon name="x" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="share-2" size={20} color={colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="heart" size={20} color={colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <Image source={{ uri: product.image }} style={styles.productImage} />

        {/* Product Info */}
        <View style={styles.content}>
          {/* Brand */}
          <Text style={styles.brand}>{product.brand}</Text>
          
          {/* Name */}
          <Text style={styles.name}>{product.name}</Text>

          {/* Rating & Reviews */}
          <View style={styles.ratingRow}>
            <View style={styles.ratingBadge}>
              <Icon name="star" size={16} color={colors.background} solid />
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
            <Text style={styles.reviews}>{product.reviews} reviews</Text>
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>
            {product.originalPrice && (
              <>
                <Text style={styles.originalPrice}>
                  ₹{product.originalPrice.toLocaleString()}
                </Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </Text>
                </View>
              </>
            )}
          </View>

          {/* Delivery Info */}
          <View style={styles.deliveryCard}>
            <Icon name="truck" size={20} color={colors.green[500]} />
            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryTitle}>Fast Delivery</Text>
              <Text style={styles.deliveryTime}>{product.deliveryTime} delivery</Text>
            </View>
          </View>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <View style={styles.variantsSection}>
              {product.variants.map((variant) => (
                <View key={variant.type} style={styles.variantGroup}>
                  <Text style={styles.variantLabel}>{variant.type}</Text>
                  <View style={styles.variantOptions}>
                    {variant.options.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={[
                          styles.variantOption,
                          selectedVariants[variant.type] === option && styles.variantOptionSelected,
                        ]}
                        onPress={() => setSelectedVariants({
                          ...selectedVariants,
                          [variant.type]: option,
                        })}
                      >
                        <Text
                          style={[
                            styles.variantOptionText,
                            selectedVariants[variant.type] === option && styles.variantOptionTextSelected,
                          ]}
                        >
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Sellers */}
          <View style={styles.sellersSection}>
            <Text style={styles.sectionTitle}>Available from {product.sellers.length} sellers</Text>
            {product.sellers.map((seller) => (
              <TouchableOpacity
                key={seller.id}
                style={[
                  styles.sellerCard,
                  selectedSeller.id === seller.id && styles.sellerCardSelected,
                ]}
                onPress={() => setSelectedSeller(seller)}
              >
                <View style={styles.sellerInfo}>
                  <Text style={styles.sellerName}>{seller.name}</Text>
                  <View style={styles.sellerMeta}>
                    <Icon name="star" size={14} color={colors.orange[500]} />
                    <Text style={styles.sellerRating}>{seller.rating}</Text>
                    <Text style={styles.sellerDelivery}> • {seller.deliveryTime}</Text>
                  </View>
                  <View style={styles.badges}>
                    {seller.badges.map((badge) => (
                      <View key={badge} style={styles.badge}>
                        <Text style={styles.badgeText}>{badge}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <Text style={styles.sellerPrice}>₹{seller.price.toLocaleString()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Triple CTA Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.ctaBuyNow} onPress={handleBuyNow}>
          <Icon name="shopping-cart" size={20} color={colors.background} />
          <Text style={styles.ctaBuyNowText}>Buy Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ctaBid} onPress={handleFindBestPrice}>
          <Icon name="trending-down" size={20} color={colors.background} />
          <Text style={styles.ctaBidText}>Best Price</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ctaFind} onPress={handleFindProduct}>
          <Icon name="search" size={20} color={colors.background} />
          <Text style={styles.ctaFindText}>Find Me</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerButton: {
    padding: spacing.sm,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  productImage: {
    width: width,
    height: width,
    backgroundColor: colors.gray[100],
  },
  content: {
    padding: spacing.base,
  },
  brand: {
    ...typography.caption,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  name: {
    ...typography.h2,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.green[500],
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.base,
    gap: 4,
  },
  ratingText: {
    ...typography.caption,
    color: colors.background,
    fontWeight: '700',
  },
  reviews: {
    ...typography.small,
    color: colors.text.secondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  price: {
    ...typography.h1,
    color: colors.text.primary,
  },
  originalPrice: {
    ...typography.h4,
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: colors.green[100],
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.base,
  },
  discountText: {
    ...typography.caption,
    color: colors.green[700],
    fontWeight: '700',
  },
  deliveryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.green[50],
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    marginTop: spacing.base,
    gap: spacing.md,
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryTitle: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  deliveryTime: {
    ...typography.small,
    color: colors.green[700],
  },
  variantsSection: {
    marginTop: spacing.xl,
    gap: spacing.base,
  },
  variantGroup: {
    marginBottom: spacing.base,
  },
  variantLabel: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  variantOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  variantOption: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.base,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  variantOptionSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  variantOptionText: {
    ...typography.small,
    color: colors.text.secondary,
  },
  variantOptionTextSelected: {
    color: colors.primary[700],
    fontWeight: '600',
  },
  sellersSection: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  sellerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  sellerCardSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  sellerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: 4,
  },
  sellerRating: {
    ...typography.small,
    color: colors.text.primary,
    fontWeight: '600',
  },
  sellerDelivery: {
    ...typography.small,
    color: colors.text.secondary,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  badge: {
    backgroundColor: colors.green[100],
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.base,
  },
  badgeText: {
    ...typography.caption,
    color: colors.green[700],
    fontWeight: '600',
  },
  sellerPrice: {
    ...typography.h3,
    color: colors.text.primary,
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.base,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  ctaBuyNow: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[500],
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  ctaBuyNowText: {
    ...typography.button,
    color: colors.background,
  },
  ctaBid: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purple[500],
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
  },
  ctaBidText: {
    ...typography.buttonSmall,
    color: colors.background,
  },
  ctaFind: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green[500],
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
  },
  ctaFindText: {
    ...typography.buttonSmall,
    color: colors.background,
  },
});
