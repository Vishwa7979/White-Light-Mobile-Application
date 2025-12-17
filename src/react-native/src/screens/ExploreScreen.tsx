// WhiteLight - Explore Screen (React Native)

import React, { useState, useEffect } from 'react';
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
import { ExploreScreenNavigationProp } from '../navigation/types';
import { Product } from '../types';
import { colors, spacing, typography, borderRadius } from '../theme';
import * as db from '../services/database';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - spacing.base * 2;

type Props = {
  navigation: ExploreScreenNavigationProp;
};

const CATEGORIES = [
  { id: 'trending', label: 'Trending', icon: 'trending-up' },
  { id: 'viral', label: 'Viral', icon: 'zap' },
  { id: 'celebrity', label: 'Celebrity Picks', icon: 'star' },
  { id: 'local', label: 'Local Finds', icon: 'map-pin' },
  { id: 'sustainable', label: 'Sustainable', icon: 'leaf' },
];

export default function ExploreScreen({ navigation }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('trending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const allProducts = await db.getAllProducts();
      
      // Filter by selected category
      let filtered = allProducts;
      if (selectedCategory === 'viral') {
        filtered = allProducts.filter(p => p.trending === 'Viral');
      } else if (selectedCategory === 'celebrity') {
        filtered = allProducts.filter(p => p.trending === 'Celebrity');
      } else if (selectedCategory === 'sustainable') {
        filtered = allProducts.filter(p => p.sustainable);
      } else if (selectedCategory === 'local') {
        filtered = allProducts.filter(p => p.sellers.some(s => s.badges.includes('Local')));
      }
      
      setProducts(filtered);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const renderSocialCard = (product: Product, index: number) => (
    <View key={product.id} style={styles.socialCard}>
      {/* Creator Header */}
      {product.creator && (
        <View style={styles.creatorHeader}>
          <Image
            source={{ uri: product.creator.avatar }}
            style={styles.creatorAvatar}
          />
          <View style={styles.creatorInfo}>
            <Text style={styles.creatorName}>{product.creator.name}</Text>
            <Text style={styles.creatorFollowers}>
              {product.creator.followers} followers
            </Text>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Product Image */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleProductPress(product)}
      >
        <Image source={{ uri: product.image }} style={styles.socialImage} />
        
        {/* Quick Actions Overlay */}
        <View style={styles.imageOverlay}>
          <View style={styles.overlayTop}>
            {product.trending && (
              <View style={styles.trendingBadge}>
                <Icon name="trending-up" size={14} color={colors.background} />
                <Text style={styles.trendingText}>{product.trending}</Text>
              </View>
            )}
          </View>

          <View style={styles.overlayBottom}>
            <View style={styles.socialStats}>
              <TouchableOpacity style={styles.statButton}>
                <Icon name="heart" size={20} color={colors.background} />
                <Text style={styles.statText}>2.4K</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.statButton}>
                <Icon name="message-circle" size={20} color={colors.background} />
                <Text style={styles.statText}>156</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.statButton}>
                <Icon name="share-2" size={20} color={colors.background} />
                <Text style={styles.statText}>89</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>
                ₹{product.originalPrice.toLocaleString()}
              </Text>
            )}
          </View>

          <View style={styles.ratingBadge}>
            <Icon name="star" size={14} color={colors.background} />
            <Text style={styles.ratingText}>{product.rating}</Text>
          </View>
        </View>

        {/* Triple CTA */}
        <View style={styles.ctaRow}>
          <TouchableOpacity style={styles.ctaBuyNow}>
            <Icon name="shopping-cart" size={16} color={colors.background} />
            <Text style={styles.ctaBuyNowText}>Buy Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.ctaBid}
            onPress={() => navigation.navigate('Bidding', { product })}
          >
            <Icon name="trending-down" size={16} color={colors.background} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.ctaFind}
            onPress={() => navigation.navigate('FindProduct')}
          >
            <Icon name="search" size={16} color={colors.background} />
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          Discover this amazing product! Perfect for daily use with premium quality 
          and fast delivery from local stores. {product.deliveryTime} delivery available.
        </Text>

        {/* Tags */}
        <View style={styles.tags}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>#{product.category}</Text>
          </View>
          {product.mood && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>#{product.mood.replace(/\s/g, '')}</Text>
            </View>
          )}
          {product.sustainable && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>#Sustainable</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <TouchableOpacity>
          <Icon name="search" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.categoryChipSelected,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Icon
              name={category.icon}
              size={16}
              color={
                selectedCategory === category.id
                  ? colors.background
                  : colors.text.secondary
              }
            />
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === category.id && styles.categoryChipTextSelected,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Social Feed */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContent}
      >
        {products.map((product, index) => renderSocialCard(product, index))}

        {products.length === 0 && !loading && (
          <View style={styles.emptyState}>
            <Icon name="compass" size={64} color={colors.gray[300]} />
            <Text style={styles.emptyStateText}>
              No products found in this category
            </Text>
          </View>
        )}
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
    ...typography.h2,
    color: colors.text.primary,
  },
  categoriesScroll: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  categoriesContent: {
    padding: spacing.base,
    gap: spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  categoryChipSelected: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  categoryChipText: {
    ...typography.small,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  categoryChipTextSelected: {
    color: colors.background,
  },
  feedContent: {
    padding: spacing.base,
    gap: spacing.xl,
  },
  socialCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  creatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  creatorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[200],
  },
  creatorInfo: {
    flex: 1,
  },
  creatorName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  creatorFollowers: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  followButton: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.base,
    backgroundColor: colors.primary[500],
  },
  followButtonText: {
    ...typography.small,
    color: colors.background,
    fontWeight: '600',
  },
  socialImage: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    backgroundColor: colors.gray[100],
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  overlayTop: {
    padding: spacing.md,
    alignItems: 'flex-end',
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.red[500],
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.base,
    gap: 4,
  },
  trendingText: {
    ...typography.caption,
    color: colors.background,
    fontWeight: '700',
  },
  overlayBottom: {
    padding: spacing.md,
  },
  socialStats: {
    flexDirection: 'row',
    gap: spacing.base,
  },
  statButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  statText: {
    ...typography.caption,
    color: colors.background,
    fontWeight: '600',
  },
  productInfo: {
    padding: spacing.base,
  },
  productName: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  price: {
    ...typography.h3,
    color: colors.text.primary,
  },
  originalPrice: {
    ...typography.small,
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
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
  ctaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  ctaBuyNow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[500],
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
  },
  ctaBuyNowText: {
    ...typography.button,
    color: colors.background,
  },
  ctaBid: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purple[500],
    paddingHorizontal: spacing.base,
    borderRadius: borderRadius.lg,
  },
  ctaFind: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green[500],
    paddingHorizontal: spacing.base,
    borderRadius: borderRadius.lg,
  },
  description: {
    ...typography.small,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    backgroundColor: colors.primary[50],
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.base,
  },
  tagText: {
    ...typography.caption,
    color: colors.primary[700],
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['5xl'],
  },
  emptyStateText: {
    ...typography.body,
    color: colors.text.tertiary,
    marginTop: spacing.base,
  },
});
