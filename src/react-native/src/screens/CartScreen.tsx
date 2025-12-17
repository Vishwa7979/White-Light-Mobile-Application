// WhiteLight - Cart Screen (React Native)

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CartScreenNavigationProp } from '../navigation/types';
import { CartItem } from '../types';
import { colors, spacing, typography, borderRadius } from '../theme';
import { storage } from '../services/storage';
import * as db from '../services/database';

type Props = {
  navigation: CartScreenNavigationProp;
};

export default function CartScreen({ navigation }: Props) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [partialPayment, setPartialPayment] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const userId = await storage.getUserId();
      const cart = await db.getCart(userId);
      setCartItems(cart || []);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (item: CartItem, delta: number) => {
    try {
      const userId = await storage.getUserId();
      const newQuantity = item.quantity + delta;
      
      if (newQuantity <= 0) {
        await db.removeFromCart(userId, item.product.id, item.selectedSeller);
      } else {
        await db.updateCartItem(
          userId,
          item.product.id,
          item.selectedSeller,
          newQuantity
        );
      }
      
      await loadCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (item: CartItem) => {
    try {
      const userId = await storage.getUserId();
      await db.removeFromCart(userId, item.product.id, item.selectedSeller);
      await loadCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const seller = item.product.sellers.find(s => s.id === item.selectedSeller);
      return sum + (seller?.price || item.product.price) * item.quantity;
    }, 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((sum, item) => {
      const seller = item.product.sellers.find(s => s.id === item.selectedSeller);
      const price = seller?.price || item.product.price;
      const originalPrice = item.product.originalPrice || price;
      return sum + (originalPrice - price) * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    // Navigate to checkout or create order
    const total = calculateTotal();
    console.log('Checkout with total:', total, 'Partial payment:', partialPayment);
    // In production: navigation.navigate('Checkout')
  };

  const total = calculateTotal();
  const savings = calculateSavings();
  const partialAmount = Math.floor(total * 0.3); // 30% partial payment

  if (cartItems.length === 0 && !loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cart</Text>
        </View>

        <View style={styles.emptyState}>
          <Icon name="shopping-cart" size={64} color={colors.gray[300]} />
          <Text style={styles.emptyStateTitle}>Your cart is empty</Text>
          <Text style={styles.emptyStateText}>
            Start shopping to add items to your cart
          </Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cart ({cartItems.length})</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cart Items */}
        <View style={styles.itemsSection}>
          {cartItems.map((item) => {
            const seller = item.product.sellers.find(s => s.id === item.selectedSeller);
            const itemPrice = seller?.price || item.product.price;
            
            return (
              <View key={`${item.product.id}-${item.selectedSeller}`} style={styles.cartItem}>
                <Image
                  source={{ uri: item.product.image }}
                  style={styles.itemImage}
                />
                
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName} numberOfLines={2}>
                    {item.product.name}
                  </Text>
                  
                  {seller && (
                    <Text style={styles.itemSeller}>
                      Sold by {seller.name}
                    </Text>
                  )}

                  <View style={styles.itemPriceRow}>
                    <Text style={styles.itemPrice}>
                      ₹{itemPrice.toLocaleString()}
                    </Text>
                    {item.product.originalPrice && (
                      <Text style={styles.itemOriginalPrice}>
                        ₹{item.product.originalPrice.toLocaleString()}
                      </Text>
                    )}
                  </View>

                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item, -1)}
                    >
                      <Icon name="minus" size={16} color={colors.text.primary} />
                    </TouchableOpacity>
                    
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item, 1)}
                    >
                      <Icon name="plus" size={16} color={colors.text.primary} />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeItem(item)}
                >
                  <Icon name="trash-2" size={20} color={colors.red[500]} />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Partial Payment Option */}
        <View style={styles.partialPaymentSection}>
          <TouchableOpacity
            style={styles.partialPaymentToggle}
            onPress={() => setPartialPayment(!partialPayment)}
          >
            <View
              style={[
                styles.checkbox,
                partialPayment && styles.checkboxChecked,
              ]}
            >
              {partialPayment && (
                <Icon name="check" size={16} color={colors.background} />
              )}
            </View>
            <View style={styles.partialPaymentInfo}>
              <Text style={styles.partialPaymentTitle}>
                Pay 30% now, rest later
              </Text>
              <Text style={styles.partialPaymentText}>
                Pay ₹{partialAmount.toLocaleString()} now, remaining at delivery
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Price Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Price Details</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
            </Text>
            <Text style={styles.summaryValue}>
              ₹{(total + savings).toLocaleString()}
            </Text>
          </View>

          {savings > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={styles.savingsValue}>
                -₹{savings.toLocaleString()}
              </Text>
            </View>
          )}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Charges</Text>
            <Text style={styles.freeValue}>FREE</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>
              ₹{total.toLocaleString()}
            </Text>
          </View>

          {partialPayment && (
            <View style={styles.partialSummary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Pay Now (30%)</Text>
                <Text style={styles.summaryValue}>
                  ₹{partialAmount.toLocaleString()}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Pay at Delivery</Text>
                <Text style={styles.summaryValue}>
                  ₹{(total - partialAmount).toLocaleString()}
                </Text>
              </View>
            </View>
          )}

          {savings > 0 && (
            <View style={styles.savingsBanner}>
              <Icon name="check-circle" size={20} color={colors.green[500]} />
              <Text style={styles.savingsBannerText}>
                You will save ₹{savings.toLocaleString()} on this order!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Checkout Footer */}
      <View style={styles.footer}>
        <View style={styles.footerTotal}>
          <Text style={styles.footerTotalLabel}>
            {partialPayment ? 'Pay Now' : 'Total'}
          </Text>
          <Text style={styles.footerTotalValue}>
            ₹{(partialPayment ? partialAmount : total).toLocaleString()}
          </Text>
        </View>
        
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          <Icon name="arrow-right" size={20} color={colors.background} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    padding: spacing.base,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text.primary,
  },
  itemsSection: {
    backgroundColor: colors.background,
    marginBottom: spacing.md,
  },
  cartItem: {
    flexDirection: 'row',
    padding: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray[200],
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  itemSeller: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginBottom: spacing.sm,
  },
  itemPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  itemPrice: {
    ...typography.h4,
    color: colors.text.primary,
  },
  itemOriginalPrice: {
    ...typography.small,
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'center',
  },
  removeButton: {
    padding: spacing.sm,
  },
  partialPaymentSection: {
    backgroundColor: colors.background,
    padding: spacing.base,
    marginBottom: spacing.md,
  },
  partialPaymentToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  partialPaymentInfo: {
    flex: 1,
  },
  partialPaymentTitle: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  partialPaymentText: {
    ...typography.small,
    color: colors.text.secondary,
  },
  summarySection: {
    backgroundColor: colors.background,
    padding: spacing.base,
  },
  summaryTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    ...typography.body,
    color: colors.text.secondary,
  },
  summaryValue: {
    ...typography.body,
    color: colors.text.primary,
  },
  savingsValue: {
    ...typography.body,
    color: colors.green[600],
  },
  freeValue: {
    ...typography.body,
    color: colors.green[600],
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  totalLabel: {
    ...typography.h4,
    color: colors.text.primary,
  },
  totalValue: {
    ...typography.h3,
    color: colors.text.primary,
  },
  partialSummary: {
    backgroundColor: colors.primary[50],
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginTop: spacing.md,
  },
  savingsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.green[50],
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  savingsBannerText: {
    ...typography.small,
    color: colors.green[700],
    fontWeight: '600',
    flex: 1,
  },
  footer: {
    backgroundColor: colors.background,
    padding: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.md,
  },
  footerTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerTotalLabel: {
    ...typography.body,
    color: colors.text.secondary,
  },
  footerTotalValue: {
    ...typography.h2,
    color: colors.text.primary,
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[500],
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  checkoutButtonText: {
    ...typography.button,
    color: colors.background,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyStateTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginTop: spacing.base,
    marginBottom: spacing.xs,
  },
  emptyStateText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  shopButton: {
    backgroundColor: colors.primary[500],
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.base,
    borderRadius: borderRadius.lg,
  },
  shopButtonText: {
    ...typography.button,
    color: colors.background,
  },
});
