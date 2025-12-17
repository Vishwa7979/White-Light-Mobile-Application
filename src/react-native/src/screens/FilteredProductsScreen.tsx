// WhiteLight - Filtered Products Screen (React Native)

import React from 'react';
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
import { Product } from '../types';
import { colors, spacing, typography, borderRadius } from '../theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.base * 3) / 2;

type Props = NativeStackScreenProps<RootStackParamList, 'FilteredProducts'>;

export default function FilteredProductsScreen({ navigation, route }: Props) {
  const { title, subtitle, products } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="sliders" size={20} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => handleProductPress(product)}
              activeOpacity={0.7}
            >
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />

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
                  <Text style={styles.price}>
                    ₹{product.price.toLocaleString()}
                  </Text>
                  {product.originalPrice && (
                    <Text style={styles.originalPrice}>
                      ₹{product.originalPrice.toLocaleString()}
                    </Text>
                  )}
                </View>

                <View style={styles.deliveryRow}>
                  <Icon name="clock" size={12} color={colors.green[500]} />
                  <Text style={styles.deliveryTime}>
                    {product.deliveryTime}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {products.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="search" size={64} color={colors.gray[300]} />
            <Text style={styles.emptyStateText}>No products found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    ...typography.h4,
    color: colors.text.primary,
  },
  headerSubtitle: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  filterButton: {
    padding: spacing.xs,
  },
  scrollContent: {
    padding: spacing.base,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
