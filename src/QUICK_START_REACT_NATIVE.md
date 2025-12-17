# ⚡ WhiteLight React Native - 5-Minute Quick Start

## 🎯 Goal
Get WhiteLight running on iOS/Android in 30 minutes.

---

## 📋 Prerequisites

- Node.js 18+ installed
- Xcode (Mac, for iOS) or Android Studio
- 30 minutes of time

---

## 🚀 Setup Commands (Copy & Paste)

### 1. Create Project (3 minutes)

```bash
# Create React Native project with TypeScript
npx react-native init WhiteLightMobile --template react-native-template-typescript

# Navigate to project
cd WhiteLightMobile
```

### 2. Install Dependencies (5 minutes)

```bash
# Install all required packages (copy entire command)
npm install \
  @react-navigation/native \
  @react-navigation/native-stack \
  @react-navigation/bottom-tabs \
  react-native-screens \
  react-native-safe-area-context \
  @react-native-async-storage/async-storage \
  react-native-vector-icons \
  @types/react-native-vector-icons \
  react-native-gesture-handler \
  react-native-reanimated \
  react-native-linear-gradient \
  react-native-image-picker \
  @supabase/supabase-js \
  react-native-uuid \
  date-fns
```

### 3. iOS Setup (Mac Only, 2 minutes)

```bash
cd ios
pod install
cd ..
```

### 4. Android Setup (1 minute)

Add to `android/app/build.gradle` inside `android {}` block:

```gradle
packagingOptions {
    pickFirst 'lib/x86/libc++_shared.so'
    pickFirst 'lib/x86_64/libc++_shared.so'
    pickFirst 'lib/armeabi-v7a/libc++_shared.so'
    pickFirst 'lib/arm64-v8a/libc++_shared.so'
}
```

### 5. Configure Babel (1 minute)

Edit `babel.config.js`:

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Add this line (must be last)
  ],
};
```

### 6. Copy WhiteLight Files (2 minutes)

From your WhiteLight web project directory:

```bash
# Create src directory in WhiteLightMobile
mkdir -p WhiteLightMobile/src

# Copy all files from /react-native/src/ to WhiteLightMobile/src/
# On Mac/Linux:
cp -r react-native/src/* WhiteLightMobile/src/

# On Windows (use File Explorer or):
# xcopy react-native\src WhiteLightMobile\src /E /I
```

You should now have:
```
WhiteLightMobile/
└── src/
    ├── theme/
    ├── types/
    ├── services/
    ├── navigation/
    └── screens/
```

### 7. Copy Mock Data (1 minute)

```bash
# Copy mockData.ts from web project
cp data/mockData.ts WhiteLightMobile/src/data/mockData.ts
```

### 8. Update App.tsx (1 minute)

Replace entire content of `App.tsx` with:

```typescript
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}
```

### 9. Configure Supabase (1 minute)

Edit `src/services/database.ts` and replace:

```typescript
const PROJECT_ID = 'your-actual-supabase-project-id';
const PUBLIC_ANON_KEY = 'your-actual-supabase-anon-key';
```

Get these from your Supabase project settings.

### 10. Run the App! (1 minute)

```bash
# For iOS (Mac only)
npx react-native run-ios

# For Android (with emulator running or device connected)
npx react-native run-android
```

---

## ✅ What You'll See

1. **Splash Screen** (3 seconds)
   - Animated WhiteLight logo
   
2. **Landing Page** (or Home if onboarding complete)
   - Marketing page with Get Started button
   
3. **Home Screen** (after onboarding)
   - Product categories
   - Flash deals
   - Trending products
   - Product cards

4. **Product Detail**
   - Tap any product
   - See full details
   - Three CTA buttons (Buy/Bid/Find)

---

## 🐛 Troubleshooting

### Error: "Command PhaseScriptExecution failed"
```bash
cd ios
pod deintegrate
pod install
cd ..
npx react-native run-ios
```

### Error: "Metro bundler cache"
```bash
npx react-native start --reset-cache
```

### Error: "Vector icons not found"
Add to `ios/WhiteLightMobile/Info.plist`:
```xml
<key>UIAppFonts</key>
<array>
  <string>Feather.ttf</string>
</array>
```

Then rebuild:
```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

### Error: Android build fails
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

---

## 📱 Testing

### iOS Devices
```bash
# List simulators
xcrun simctl list devices

# Run on specific device
npx react-native run-ios --simulator="iPhone 14 Pro"
```

### Android Devices
```bash
# List devices
adb devices

# Run on specific device
npx react-native run-android --deviceId=DEVICE_ID
```

---

## 🎯 What's Included

### ✅ Working Screens
1. **SplashScreen** - Animated intro
2. **HomeScreen** - Product feed
3. **ProductDetailScreen** - Product page with 3 CTAs

### ✅ Features
- Bottom tab navigation
- Stack navigation
- Product browsing
- Category filtering
- Flash deals
- Mood-based shopping
- Seller comparison

### ⚡ Not Yet Implemented
- Onboarding flow
- Bidding system
- Find Me Product (AI search)
- Shopping cart
- Order tracking
- User profile

---

## 🚀 Next Steps

### Option A: I Create Remaining Screens
Tell me "Create all remaining screens" and I'll generate:
- LandingScreen
- OnboardingScreen
- ExploreScreen
- BiddingScreen
- FindProductScreen
- CartScreen
- OrdersScreen
- ProfileScreen
- FilteredProductsScreen

### Option B: Build Them Yourself
Follow the patterns in existing screens. Each screen template provided in documentation.

---

## 📖 Full Documentation

Detailed guides available in:
- `REACT_NATIVE_MIGRATION.md` - How conversion works
- `COMPLETE_SETUP_GUIDE.md` - Detailed setup
- `REACT_NATIVE_COMPLETE_PACKAGE.md` - Complete package overview
- `REACT_NATIVE_CONVERSION_SUMMARY.md` - Master summary

---

## 🎨 Customization

All design tokens in `/src/theme/`:
- `colors.ts` - Change colors
- `spacing.ts` - Adjust spacing
- `typography.ts` - Modify fonts

---

## ✨ Tips

1. **Use Hot Reload:** Press `Cmd+R` (iOS) or `RR` (Android) to reload
2. **Debug Menu:** `Cmd+D` (iOS) or `Cmd+M` (Android)
3. **Chrome DevTools:** Enable in debug menu
4. **Clear Cache:** `npx react-native start --reset-cache`
5. **Clean Build:** Delete `ios/build` and `android/app/build`

---

## 🎉 Success!

If you see the Splash Screen → Home Screen, **you're done!**

Your WhiteLight mobile app is running! 📱✨

---

## 📞 Need Help?

Common issues and solutions in:
- `COMPLETE_SETUP_GUIDE.md` (section: Troubleshooting)
- React Native Docs: https://reactnative.dev/docs/troubleshooting

---

**Time to completion: ~30 minutes** ⏱️

**Ready to create remaining screens?** Just ask! 🚀
