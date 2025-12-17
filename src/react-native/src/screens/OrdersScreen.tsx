// WhiteLight - Orders Screen (React Native)

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
import { OrdersScreenNavigationProp } from '../navigation/types';
import { Order } from '../types';
import { colors, spacing, typography, borderRadius } from '../theme';
import { storage } from '../services/storage';
import * as db from '../services/database';

type Props = {
  navigation: OrdersScreenNavigationProp;
};

const STATUS_COLORS: Record<Order['status'], string> = {
  pending: colors.orange[500],
  confirmed: colors.primary[500],
  preparing: colors.purple[500],
  'out-for-delivery': colors.green[500],
  delivered: colors.green[600],
};

const STATUS_ICONS: Record<Order['status'], string> = {
  pending: 'clock',
  confirmed: 'check-circle',
  preparing: 'package',
  'out-for-delivery': 'truck',
  delivered: 'check',
};

export default function OrdersScreen({ navigation }: Props) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'active' | 'delivered'>('active');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const userId = await storage.getUserId();
      const userOrders = await db.getUserOrders(userId);
      setOrders(userOrders || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const activeOrders = orders.filter(
    (order) => order.status !== 'delivered'
  );
  const deliveredOrders = orders.filter(
    (order) => order.status === 'delivered'
  );

  const displayOrders = selectedTab === 'active' ? activeOrders : deliveredOrders;

  const getStatusLabel = (status: Order['status']) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (displayOrders.length === 0 && !loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Orders</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'active' && styles.tabActive]}
            onPress={() => setSelectedTab('active')}
          >
            <Text
              style={[styles.tabText, selectedTab === 'active' && styles.tabTextActive]}
            >
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'delivered' && styles.tabActive]}
            onPress={() => setSelectedTab('delivered')}
          >
            <Text
              style={[styles.tabText, selectedTab === 'delivered' && styles.tabTextActive]}
            >
              Delivered
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emptyState}>
          <Icon name="package" size={64} color={colors.gray[300]} />
          <Text style={styles.emptyStateTitle}>No orders yet</Text>
          <Text style={styles.emptyStateText}>
            {selectedTab === 'active'
              ? 'Your active orders will appear here'
              : 'Your delivered orders will appear here'}
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
        <Text style={styles.headerTitle}>Orders</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'active' && styles.tabActive]}
          onPress={() => setSelectedTab('active')}
        >
          <Text
            style={[styles.tabText, selectedTab === 'active' && styles.tabTextActive]}
          >
            Active {activeOrders.length > 0 && `(${activeOrders.length})`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'delivered' && styles.tabActive]}
          onPress={() => setSelectedTab('delivered')}
        >
          <Text
            style={[styles.tabText, selectedTab === 'delivered' && styles.tabTextActive]}
          >
            Delivered {deliveredOrders.length > 0 && `(${deliveredOrders.length})`}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {displayOrders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            {/* Order Header */}
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderId}>Order #{order.id.slice(-8)}</Text>
                <Text style={styles.orderDate}>
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Text>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: `${STATUS_COLORS[order.status]}20` },
                ]}
              >
                <Icon
                  name={STATUS_ICONS[order.status]}
                  size={14}
                  color={STATUS_COLORS[order.status]}
                />
                <Text
                  style={[
                    styles.statusText,
                    { color: STATUS_COLORS[order.status] },
                  ]}
                >
                  {getStatusLabel(order.status)}
                </Text>
              </View>
            </View>

            {/* Order Items */}
            <View style={styles.orderItems}>
              {order.items.slice(0, 2).map((item, index) => (
                <View key={index} style={styles.orderItem}>
                  <Image
                    source={{ uri: item.product.image }}
                    style={styles.itemImage}
                  />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.product.name}
                    </Text>
                    <Text style={styles.itemQuantity}>
                      Qty: {item.quantity}
                    </Text>
                  </View>
                </View>
              ))}
              {order.items.length > 2 && (
                <Text style={styles.moreItems}>
                  +{order.items.length - 2} more items
                </Text>
              )}
            </View>

            {/* Order Total */}
            <View style={styles.orderTotal}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>
                ₹{order.total.toLocaleString()}
              </Text>
            </View>

            {/* Delivery Info */}
            {order.status === 'out-for-delivery' && (
              <View style={styles.deliveryInfo}>
                <Icon name="map-pin" size={16} color={colors.text.secondary} />
                <Text style={styles.deliveryText}>
                  Arriving by {order.estimatedDelivery}
                </Text>
              </View>
            )}

            {/* Actions */}
            <View style={styles.orderActions}>
              {order.status !== 'delivered' && (
                <TouchableOpacity style={styles.trackButton}>
                  <Icon name="navigation" size={16} color={colors.primary[500]} />
                  <Text style={styles.trackButtonText}>Track Order</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>View Details</Text>
                <Icon name="chevron-right" size={16} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    padding: spacing.base,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text.primary,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary[500],
  },
  tabText: {
    ...typography.body,
    color: colors.text.tertiary,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.primary[500],
  },
  orderCard: {
    backgroundColor: colors.background,
    marginBottom: spacing.md,
    padding: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  orderId: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '700',
  },
  orderDate: {
    ...typography.small,
    color: colors.text.tertiary,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.base,
    gap: 4,
  },
  statusText: {
    ...typography.caption,
    fontWeight: '700',
  },
  orderItems: {
    marginBottom: spacing.md,
  },
  orderItem: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.base,
    backgroundColor: colors.gray[200],
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    ...typography.small,
    color: colors.text.primary,
    fontWeight: '600',
  },
  itemQuantity: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  moreItems: {
    ...typography.caption,
    color: colors.primary[500],
    fontWeight: '600',
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginBottom: spacing.md,
  },
  totalLabel: {
    ...typography.body,
    color: colors.text.secondary,
  },
  totalValue: {
    ...typography.h4,
    color: colors.text.primary,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.green[50],
    padding: spacing.sm,
    borderRadius: borderRadius.base,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  deliveryText: {
    ...typography.small,
    color: colors.green[700],
    fontWeight: '600',
  },
  orderActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  trackButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[50],
    padding: spacing.sm,
    borderRadius: borderRadius.base,
    gap: spacing.xs,
  },
  trackButtonText: {
    ...typography.small,
    color: colors.primary[500],
    fontWeight: '600',
  },
  detailsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    padding: spacing.sm,
    borderRadius: borderRadius.base,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  detailsButtonText: {
    ...typography.small,
    color: colors.text.primary,
    fontWeight: '600',
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
