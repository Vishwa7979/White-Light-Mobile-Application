# 🚀 WhiteLight - Complete React Native Migration Guide

## 📋 Overview

This guide will help you convert the WhiteLight web app to a complete React Native mobile application.

---

## 🎯 What's Changing

| Component | Web Version | React Native Version |
|-----------|-------------|---------------------|
| UI Elements | `<div>`, `<button>` | `<View>`, `<TouchableOpacity>` |
| Styling | Tailwind CSS | StyleSheet / NativeWind |
| Navigation | State-based | React Navigation |
| Storage | localStorage | AsyncStorage |
| Images | `<img>` | `<Image>` |
| Text | Implicit | `<Text>` component |
| Scrolling | CSS overflow | `<ScrollView>` |

**What Stays the Same:**
- ✅ Business logic (`/services/database.ts`)
- ✅ Data models (`/data/mockData.ts`)
- ✅ TypeScript interfaces
- ✅ State management patterns
- ✅ API calls (Supabase)

---

## 🛠 Setup Instructions

### Step 1: Install React Native CLI

```bash
# Install globally
npm install -g react-native-cli

# Or use npx (recommended)
npx react-native --version
```

### Step 2: Create New React Native Project

```bash
# Create project
npx react-native init WhiteLightMobile --template react-native-template-typescript

# Navigate to project
cd WhiteLightMobile
```

### Step 3: Install Required Dependencies

```bash
# Navigation
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context

# Async Storage (replaces localStorage)
npm install @react-native-async-storage/async-storage

# Vector Icons
npm install react-native-vector-icons
npm install --save-dev @types/react-native-vector-icons

# Gestures & Reanimated (for animations)
npm install react-native-gesture-handler react-native-reanimated

# Linear Gradient
npm install react-native-linear-gradient

# Image Picker (for Find Me Product)
npm install react-native-image-picker

# Supabase
npm install @supabase/supabase-js

# Additional utilities
npm install react-native-uuid
npm install date-fns
```

### Step 4: iOS Setup (Mac only)

```bash
cd ios
pod install
cd ..
```

### Step 5: Android Setup

```bash
# Add to android/app/build.gradle
android {
    ...
    packagingOptions {
        pickFirst 'lib/x86/libc++_shared.so'
        pickFirst 'lib/x86_64/libc++_shared.so'
        pickFirst 'lib/armeabi-v7a/libc++_shared.so'
        pickFirst 'lib/arm64-v8a/libc++_shared.so'
    }
}
```

### Step 6: Configure Babel for Reanimated

Add to `babel.config.js`:

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

---

## 📁 Project Structure

```
WhiteLightMobile/
├── src/
│   ├── navigation/
│   │   ├── AppNavigator.tsx          # Main navigation
│   │   └── types.ts                   # Navigation types
│   │
│   ├── screens/                       # All screens (converted components)
│   │   ├── SplashScreen.tsx
│   │   ├── LandingScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── ExploreScreen.tsx
│   │   ├── ProductDetailScreen.tsx
│   │   ├── BiddingScreen.tsx
│   │   ├── FindProductScreen.tsx
│   │   ├── CartScreen.tsx
│   │   ├── OrdersScreen.tsx
│   │   └── ProfileScreen.tsx
│   │
│   ├── components/                    # Reusable components
│   │   ├── ProductCard.tsx
│   │   ├── BottomNav.tsx
│   │   ├── Header.tsx
│   │   └── FilteredProducts.tsx
│   │
│   ├── services/                      # Business logic (mostly unchanged)
│   │   ├── database.ts
│   │   ├── storage.ts                 # AsyncStorage wrapper
│   │   └── supabase.ts
│   │
│   ├── data/                          # Data models (unchanged)
│   │   └── mockData.ts
│   │
│   ├── types/                         # TypeScript types
│   │   └── index.ts
│   │
│   ├── theme/                         # Design tokens
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   └── index.ts
│   │
│   └── utils/                         # Utilities
│       ├── constants.ts
│       └── helpers.ts
│
├── App.tsx                            # Root component
├── index.js                           # Entry point
└── package.json
```

---

## 🎨 Styling Approach

### Option 1: StyleSheet (Recommended - No Extra Dependencies)

```typescript
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
});
```

### Option 2: NativeWind (Tailwind for React Native)

```bash
# Install NativeWind
npm install nativewind
npm install --save-dev tailwindcss

# Setup
npx tailwindcss init
```

**For this migration, I'm using StyleSheet** for maximum compatibility and performance.

---

## 🔄 Key Conversions

### 1. Basic Elements

```typescript
// WEB (React)
<div className="p-4 bg-white rounded-lg">
  <h1 className="text-xl font-bold">Hello</h1>
  <button onClick={handleClick}>Click</button>
</div>

// REACT NATIVE
<View style={styles.container}>
  <Text style={styles.title}>Hello</Text>
  <TouchableOpacity onPress={handleClick}>
    <Text>Click</Text>
  </TouchableOpacity>
</View>
```

### 2. Scrolling

```typescript
// WEB
<div className="overflow-y-auto">
  {/* content */}
</div>

// REACT NATIVE
<ScrollView>
  {/* content */}
</ScrollView>
```

### 3. Images

```typescript
// WEB
<img src={product.image} alt={product.name} />

// REACT NATIVE
<Image source={{ uri: product.image }} style={styles.image} />
```

### 4. Navigation

```typescript
// WEB
<button onClick={() => setScreen('home')}>
  Go Home
</button>

// REACT NATIVE
<TouchableOpacity onPress={() => navigation.navigate('Home')}>
  <Text>Go Home</Text>
</TouchableOpacity>
```

### 5. Storage

```typescript
// WEB
localStorage.setItem('key', 'value');
const value = localStorage.getItem('key');

// REACT NATIVE
import AsyncStorage from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('key', 'value');
const value = await AsyncStorage.getItem('key');
```

---

## 📱 Running the App

### iOS (Mac only)

```bash
npx react-native run-ios

# Specific device
npx react-native run-ios --simulator="iPhone 14 Pro"
```

### Android

```bash
npx react-native run-android

# Make sure Android emulator is running or device is connected
```

### Development

```bash
# Start Metro bundler
npx react-native start

# Clear cache if needed
npx react-native start --reset-cache
```

---

## 🔧 Migration Checklist

- [ ] Create React Native project
- [ ] Install all dependencies
- [ ] Setup navigation structure
- [ ] Create theme/design system
- [ ] Convert SplashScreen
- [ ] Convert LandingPage
- [ ] Convert Onboarding
- [ ] Convert HomeScreen
- [ ] Convert ProductCard
- [ ] Convert ProductDetail
- [ ] Convert BiddingFlow
- [ ] Convert FindMeProduct
- [ ] Convert Cart
- [ ] Convert OrderTracking
- [ ] Convert Profile
- [ ] Convert ExploreFeed
- [ ] Migrate database service
- [ ] Setup AsyncStorage
- [ ] Test on iOS
- [ ] Test on Android
- [ ] Configure app icons
- [ ] Configure splash screen
- [ ] Setup build configurations

---

## 🚀 Next Steps

I'm now creating:
1. ✅ Complete theme system
2. ✅ All converted screen components
3. ✅ Navigation setup
4. ✅ Storage utilities
5. ✅ Updated services
6. ✅ Root App.tsx

**Files will be created in React Native format - ready to copy into your new project!**

---

## 📖 Resources

- React Native Docs: https://reactnative.dev/docs/getting-started
- React Navigation: https://reactnavigation.org/docs/getting-started
- AsyncStorage: https://react-native-async-storage.github.io/async-storage/
- Vector Icons: https://github.com/oblador/react-native-vector-icons

---

**Let's start the migration!** 🎉
