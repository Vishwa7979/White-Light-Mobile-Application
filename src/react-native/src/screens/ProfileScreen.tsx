// WhiteLight - Profile Screen (React Native)

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ProfileScreenNavigationProp } from '../navigation/types';
import { UserProfile } from '../types';
import { colors, spacing, typography, borderRadius } from '../theme';
import { storage } from '../services/storage';
import * as db from '../services/database';

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function ProfileScreen({ navigation }: Props) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userId = await storage.getUserId();
      const userProfile = await db.getUserProfile(userId);
      
      // Default profile if none exists
      if (!userProfile) {
        setProfile({
          id: userId,
          name: 'Guest User',
          email: '',
          phone: '',
          location: '',
          interests: [],
          deliveryPreference: 'fastest',
        });
      } else {
        setProfile(userProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await storage.setOnboardingComplete(false);
            navigation.navigate('Landing');
          },
        },
      ]
    );
  };

  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: 'user', label: 'Edit Profile', onPress: () => {} },
        { icon: 'map-pin', label: 'Addresses', onPress: () => {} },
        { icon: 'credit-card', label: 'Payment Methods', onPress: () => {} },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'heart', label: 'Wishlist', onPress: () => {} },
        { icon: 'star', label: 'My Interests', onPress: () => {} },
        { icon: 'bell', label: 'Notifications', onPress: () => {} },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-circle', label: 'Help Center', onPress: () => {} },
        { icon: 'message-circle', label: 'Contact Us', onPress: () => {} },
        { icon: 'info', label: 'About', onPress: () => {} },
      ],
    },
    {
      title: 'Legal',
      items: [
        { icon: 'file-text', label: 'Terms of Service', onPress: () => {} },
        { icon: 'shield', label: 'Privacy Policy', onPress: () => {} },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Icon name="user" size={40} color={colors.primary[500]} />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Icon name="camera" size={16} color={colors.background} />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile?.name || 'Guest User'}</Text>
            {profile?.email && (
              <Text style={styles.profileEmail}>{profile.email}</Text>
            )}
            {profile?.phone && (
              <Text style={styles.profilePhone}>+91 {profile.phone}</Text>
            )}
          </View>

          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Icon name="package" size={24} color={colors.primary[500]} />
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="heart" size={24} color={colors.red[500]} />
            <Text style={styles.statValue}>28</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="award" size={24} color={colors.orange[500]} />
            <Text style={styles.statValue}>450</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={[
                  styles.menuItem,
                  itemIndex === section.items.length - 1 && styles.menuItemLast,
                ]}
                onPress={item.onPress}
              >
                <View style={styles.menuItemLeft}>
                  <Icon name={item.icon} size={20} color={colors.text.secondary} />
                  <Text style={styles.menuItemText}>{item.label}</Text>
                </View>
                <Icon name="chevron-right" size={20} color={colors.text.tertiary} />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="log-out" size={20} color={colors.red[500]} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionSection}>
          <Text style={styles.versionText}>WhiteLight v1.0.0</Text>
        </View>
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
  profileCard: {
    backgroundColor: colors.background,
    padding: spacing.xl,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.base,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.base,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.background,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  profileName: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  profileEmail: {
    ...typography.small,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  profilePhone: {
    ...typography.small,
    color: colors.text.secondary,
  },
  editProfileButton: {
    backgroundColor: colors.primary[50],
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  editProfileButtonText: {
    ...typography.small,
    color: colors.primary[500],
    fontWeight: '600',
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    padding: spacing.base,
    gap: spacing.md,
    marginBottom: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
  },
  statValue: {
    ...typography.h3,
    color: colors.text.primary,
  },
  statLabel: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
  menuSection: {
    backgroundColor: colors.background,
    marginBottom: spacing.base,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    padding: spacing.base,
    paddingBottom: spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  menuItemText: {
    ...typography.body,
    color: colors.text.primary,
  },
  logoutSection: {
    padding: spacing.base,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red[50],
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  logoutButtonText: {
    ...typography.button,
    color: colors.red[500],
  },
  versionSection: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  versionText: {
    ...typography.caption,
    color: colors.text.tertiary,
  },
});
