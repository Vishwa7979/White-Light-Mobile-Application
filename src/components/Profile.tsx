import { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Package,
  Heart,
  Gift,
  Users,
  Settings,
  HelpCircle,
  Shield,
  LogOut,
  ChevronRight,
  Bell,
  MapPin,
  CreditCard,
  Star,
  TrendingUp,
  Zap
} from 'lucide-react';
import { Screen } from '../App';

interface ProfileProps {
  onNavigate: (screen: Screen) => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const USER = {
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    memberSince: 'January 2024',
    stats: {
      orders: 24,
      saved: 156,
      rewards: 2500
    }
  };

  const MENU_SECTIONS = [
    {
      title: 'Activity',
      items: [
        { icon: Package, label: 'My Orders', value: '24 orders', screen: 'orders' as Screen },
        { icon: Heart, label: 'Wishlist', value: '156 items', screen: null },
        { icon: Star, label: 'Reviews & Ratings', value: '12 reviews', screen: null }
      ]
    },
    {
      title: 'Rewards & Offers',
      items: [
        { icon: Gift, label: 'Rewards Points', value: '2,500 pts', screen: null },
        { icon: TrendingUp, label: 'Ongoing Offers', value: '8 active', screen: null },
        { icon: Users, label: 'Refer & Earn', value: '₹500 per friend', screen: null }
      ]
    },
    {
      title: 'Account Settings',
      items: [
        { icon: User, label: 'Edit Profile', value: null, screen: null },
        { icon: MapPin, label: 'Saved Addresses', value: '3 addresses', screen: null },
        { icon: CreditCard, label: 'Payment Methods', value: '2 cards', screen: null },
        { icon: Bell, label: 'Notifications', value: null, screen: null }
      ]
    },
    {
      title: 'Support & Info',
      items: [
        { icon: HelpCircle, label: 'Help & FAQs', value: null, screen: null },
        { icon: Shield, label: 'Privacy & Security', value: null, screen: null },
        { icon: Settings, label: 'App Settings', value: null, screen: null }
      ]
    }
  ];

  const handleMenuClick = (screen: Screen | null) => {
    if (screen) {
      onNavigate(screen);
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 px-4 pt-6 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={USER.avatar}
            alt={USER.name}
            className="w-20 h-20 rounded-full border-4 border-white/30"
          />
          <div className="flex-1 text-white">
            <h1 className="text-xl mb-1">{USER.name}</h1>
            <p className="text-sm text-white/80">{USER.email}</p>
            <p className="text-xs text-white/70 mt-1">Member since {USER.memberSince}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <p className="text-2xl text-white mb-1">{USER.stats.orders}</p>
            <p className="text-xs text-white/80">Orders</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <p className="text-2xl text-white mb-1">{USER.stats.saved}</p>
            <p className="text-xs text-white/80">Saved</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <p className="text-2xl text-white mb-1">₹{USER.stats.rewards}</p>
            <p className="text-xs text-white/80">Rewards</p>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="flex-1 overflow-y-auto pb-20 px-4 py-4">
        {/* Premium Membership Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-5 mb-4 text-white">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="mb-1">Upgrade to WhiteLight Plus</p>
              <p className="text-sm text-white/90 mb-3">
                Get free delivery, exclusive deals & early access
              </p>
              <button className="px-4 py-2 bg-white text-orange-600 rounded-full text-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        {MENU_SECTIONS.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-4">
            <p className="text-xs text-gray-500 px-2 mb-2">{section.title}</p>
            <div className="bg-white rounded-2xl overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    onClick={() => handleMenuClick(item.screen)}
                    className="w-full flex items-center gap-3 px-4 py-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-700" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm">{item.label}</p>
                      {item.value && (
                        <p className="text-xs text-gray-500 mt-0.5">{item.value}</p>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full bg-white rounded-2xl px-4 py-4 flex items-center gap-3 text-red-600 mb-4"
        >
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="flex-1 text-left text-sm">Logout</span>
        </button>

        {/* App Version */}
        <p className="text-center text-xs text-gray-400 mb-4">
          WhiteLight v1.0.0
        </p>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-30 flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-sm w-full"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl text-center mb-2">Logout</h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Are you sure you want to logout from your account?
            </p>
            <div className="space-y-3">
              <button
                onClick={() => onNavigate('onboarding')}
                className="w-full bg-red-500 text-white py-3 rounded-2xl"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full border-2 border-gray-200 text-gray-700 py-3 rounded-2xl"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
