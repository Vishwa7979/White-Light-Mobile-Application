// WhiteLight - Home Screen (React Native)

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { HomeScreenNavigationProp } from '../navigation/types';
import { Product } from '../types';
import { colors, spacing, typography, borderRadius } from '../theme';
import * as db from '../services/database';
import { storage } from '../services/storage';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.base * 3) / 2;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const CATEGORIES = [
  { name: 'Electronics', icon: '📱', color: colors.primary[100] },
  { name: 'Fashion', icon: '👗', color: colors.purple[100] },
  { name: 'Groceries', icon: '🛒', color: colors.green[100] },
  { name: 'Beauty', icon: '💄', color: colors.red[100] },
  { name: 'Home', icon: '🏠', color: colors.orange[100] },
  { name: 'Sports', icon: '⚽', color: colors.primary[100] },
  { name: 'Books', icon: '📚', color: colors.purple[100] },
  { name: 'Toys', icon: '🧸', color: colors.green[100] },
];

const MOODS = [
  'Happy Vibes',
  'Calm & Chill',
  'Energetic',
  'Romantic',
  'Celebratory',
  'Peaceful',
];

const DEAL_TYPES = ['Flash Sale', 'Bundle Deals', 'Buy 1 Get 1', 'Clearance'];

export default function HomeScreen({ navigation }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      const id = await storage.getUserId();
      setUserId(id);

      // Fetch products from database
      const allProducts = await db.getAllProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error('Error initializing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleCategoryPress = (categoryName: string) => {
    const filtered = products.filter(p => p.category === categoryName);
    navigation.navigate('FilteredProducts', {
      title: categoryName,
      subtitle: `${filtered.length} products`,
      products: filtered,
    });
  };

  const handleMoodPress = (mood: string) => {
    const filtered = products.filter(p => p.mood === mood);
    navigation.navigate('FilteredProducts', {
      title: `Shop by Mood`,
      subtitle: mood,
      products: filtered,
    });
  };

  const handleDealTypePress = (dealType: string) => {
    const filtered = products.filter(p => p.dealType === dealType);
    navigation.navigate('FilteredProducts', {
      title: dealType,
      subtitle: `${filtered.length} deals`,
      products: filtered,
    });
  };

  const renderProductCard = (product: Product) => (
    <TouchableOpacity
      key={product.id}
      style={styles.productCard}
      onPress={() => handleProductPress(product)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: product.image }} style={styles.productImage} />
      
      {product.originalPrice && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </Text>
        </View>
      )}

      <View style={styles.productInfo}>
        <Text style={styles.productBrand} numberOfLines={1}>
          {product.brand}
        </Text>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        
        <View style={styles.ratingContainer}>
          <Icon name="star" size={14} color={colors.orange[500]} solid />
          <Text style={styles.rating}>{product.rating}</Text>
          <Text style={styles.reviews}>({product.reviews})</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>
              ₹{product.originalPrice.toLocaleString()}
            </Text>
          )}
        </View>

        <View style={styles.deliveryRow}>
          <Icon name="clock" size={12} color={colors.green[500]} />
          <Text style={styles.deliveryTime}>{product.deliveryTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning! 👋</Text>
          <Text style={styles.subtitle}>Discover amazing products</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="bell" size={24} color={colors.gray[700]} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar} activeOpacity={0.7}>
          <Icon name="search" size={20} color={colors.gray[400]} />
          <Text style={styles.searchPlaceholder}>
            Search products, brands...
          </Text>
        </TouchableOpacity>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop by Category</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.name}
                style={[styles.categoryCard, { backgroundColor: category.color }]}
                onPress={() => handleCategoryPress(category.name)}
                activeOpacity={0.7}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Flash Deals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.flashHeader}>
              <Icon name="zap" size={20} color={colors.red[500]} />
              <Text style={styles.sectionTitle}>Flash Deals</Text>
              <View style={styles.timer}>
                <Icon name="clock" size={14} color={colors.red[500]} />
                <Text style={styles.timerText}>2h 15m</Text>
              </View>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dealsScroll}
          >
            {products.filter(p => p.dealType === 'Flash Sale').slice(0, 5).map(renderProductCard)}
          </ScrollView>
        </View>

        {/* Shop by Mood */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop by Mood</Text>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moodsScroll}
          >
            {MOODS.map((mood) => (
              <TouchableOpacity
                key={mood}
                style={styles.moodChip}
                onPress={() => handleMoodPress(mood)}
                activeOpacity={0.7}
              >
                <Text style={styles.moodText}>{mood}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trending Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Now 🔥</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.productsGrid}>
            {products.filter(p => p.trending === 'Viral').slice(0, 6).map(renderProductCard)}
          </View>
        </View>

        {/* Deal Types */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Special Deals</Text>
          </View>
          
          <View style={styles.dealsGrid}>
            {DEAL_TYPES.map((dealType) => {
              const count = products.filter(p => p.dealType === dealType).length;
              return (
                <TouchableOpacity
                  key={dealType}
                  style={styles.dealTypeCard}
                  onPress={() => handleDealTypePress(dealType)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.dealTypeName}>{dealType}</Text>
                  <Text style={styles.dealTypeCount}>{count} deals</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Recommended for You */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
          </View>
          
          <View style={styles.productsGrid}>
            {products.slice(0, 10).map(renderProductCard)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  loadingText: {
    marginTop: spacing.base,
    ...typography.body,
    color: colors.text.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.base,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  greeting: {
    ...typography.h3,
    color: colors.text.primary,
  },
  subtitle: {
    ...typography.small,
    color: colors.text.secondary,
    marginTop: 2,
  },
  notificationButton: {
    position: 'relative',
    padding: spacing.sm,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.red[500],
  },
  scrollContent: {
    paddingBottom: spacing['3xl'],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
    margin: spacing.base,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchPlaceholder: {
    ...typography.body,
    color: colors.text.tertiary,
    flex: 1,
  },
  section: {
    marginTop: spacing.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text.primary,
  },
  seeAll: {
    ...typography.small,
    color: colors.primary[500],
    fontWeight: '600',
  },
  flashHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: spacing.sm,
    backgroundColor: colors.red[50],
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.base,
  },
  timerText: {
    ...typography.caption,
    color: colors.red[500],
    fontWeight: '600',
  },
  categoriesScroll: {
    paddingHorizontal: spacing.base,
    gap: spacing.md,
  },
  categoryCard: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  categoryIcon: {
    fontSize: 28,
  },
  categoryName: {
    ...typography.caption,
    color: colors.text.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  dealsScroll: {
    paddingHorizontal: spacing.base,
    gap: spacing.md,
  },
  moodsScroll: {
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
  },
  moodChip: {
    backgroundColor: colors.purple[50],
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.purple[200],
  },
  moodText: {
    ...typography.small,
    color: colors.purple[700],
    fontWeight: '600',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.base,
    gap: spacing.md,
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: CARD_WIDTH,
    backgroundColor: colors.gray[100],
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.red[500],
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.base,
  },
  discountText: {
    ...typography.caption,
    color: colors.background,
    fontWeight: '700',
  },
  productInfo: {
    padding: spacing.md,
  },
  productBrand: {
    ...typography.caption,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  productName: {
    ...typography.small,
    color: colors.text.primary,
    fontWeight: '600',
    marginTop: 2,
    height: 34,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: 4,
  },
  rating: {
    ...typography.caption,
    color: colors.text.primary,
    fontWeight: '600',
  },
  reviews: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  price: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '700',
  },
  originalPrice: {
    ...typography.small,
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: 4,
  },
  deliveryTime: {
    ...typography.caption,
    color: colors.green[600],
    fontWeight: '600',
  },
  dealsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.base,
    gap: spacing.md,
  },
  dealTypeCard: {
    width: (width - spacing.base * 3) / 2,
    backgroundColor: colors.background,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  dealTypeName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  dealTypeCount: {
    ...typography.small,
    color: colors.text.secondary,
    marginTop: 4,
  },
});
