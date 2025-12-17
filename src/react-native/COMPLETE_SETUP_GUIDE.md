# 🚀 WhiteLight React Native - Complete Setup Guide

## 📦 Step-by-Step Instructions

### 1. Create New React Native Project

```bash
# Create project with TypeScript template
npx react-native init WhiteLightMobile --template react-native-template-typescript

# Navigate to project
cd WhiteLightMobile
```

### 2. Install All Dependencies

```bash
# Navigation
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context

# Storage
npm install @react-native-async-storage/async-storage

# Icons
npm install react-native-vector-icons
npm install --save-dev @types/react-native-vector-icons

# Animations
npm install react-native-gesture-handler
npm install react-native-reanimated

# UI Components
npm install react-native-linear-gradient

# Image Picker
npm install react-native-image-picker

# Supabase
npm install @supabase/supabase-js

# Utilities
npm install react-native-uuid
npm install date-fns
```

### 3. iOS Setup (Mac Only)

```bash
cd ios
pod install
cd ..
```

### 4. Android Setup

Add to `android/app/build.gradle`:

```gradle
android {
    packagingOptions {
        pickFirst 'lib/x86/libc++_shared.so'
        pickFirst 'lib/x86_64/libc++_shared.so'
        pickFirst 'lib/armeabi-v7a/libc++_shared.so'
        pickFirst 'lib/arm64-v8a/libc++_shared.so'
    }
}
```

### 5. Configure Vector Icons

#### iOS

Add to `ios/WhiteLightMobile/Info.plist`:

```xml
<key>UIAppFonts</key>
<array>
  <string>Feather.ttf</string>
</array>
```

#### Android

Add to `android/app/build.gradle`:

```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

### 6. Configure Reanimated

Add to `babel.config.js`:

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // This must be last
  ],
};
```

### 7. Copy WhiteLight Files

Copy all files from `/react-native/` directory to your project:

```bash
# From your current WhiteLight web project directory
cp -r react-native/src WhiteLightMobile/
```

### 8. Update Configuration Files

#### `App.tsx`

Replace entire content with:

```typescript
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}
```

#### Add Supabase Credentials

Edit `src/services/database.ts` and replace:

```typescript
const PROJECT_ID = 'your-actual-project-id';
const PUBLIC_ANON_KEY = 'your-actual-anon-key';
```

### 9. Copy Mock Data

Copy `/data/mockData.ts` to `src/data/mockData.ts`:

```bash
cp data/mockData.ts WhiteLightMobile/src/data/
```

Or create it with the 50 products (I'll provide in separate file).

### 10. Run the App

#### iOS

```bash
npx react-native run-ios
```

#### Android

```bash
npx react-native run-android
```

---

## 📁 Final Project Structure

```
WhiteLightMobile/
├── src/
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   └── types.ts
│   │
│   ├── screens/
│   │   ├── SplashScreen.tsx          ✅ Created
│   │   ├── LandingScreen.tsx         ⚡ Create next
│   │   ├── OnboardingScreen.tsx      ⚡ Create next
│   │   ├── HomeScreen.tsx            ⚡ Create next
│   │   ├── ExploreScreen.tsx         ⚡ Create next
│   │   ├── ProductDetailScreen.tsx   ⚡ Create next
│   │   ├── BiddingScreen.tsx         ⚡ Create next
│   │   ├── FindProductScreen.tsx     ⚡ Create next
│   │   ├── CartScreen.tsx            ⚡ Create next
│   │   ├── OrdersScreen.tsx          ⚡ Create next
│   │   ├── ProfileScreen.tsx         ⚡ Create next
│   │   └── FilteredProductsScreen.tsx ⚡ Create next
│   │
│   ├── components/
│   │   ├── ProductCard.tsx
│   │   └── Header.tsx
│   │
│   ├── services/
│   │   ├── database.ts               ✅ Created
│   │   └── storage.ts                ✅ Created
│   │
│   ├── data/
│   │   └── mockData.ts               ⚡ Copy from web project
│   │
│   ├── types/
│   │   └── index.ts                  ✅ Created
│   │
│   └── theme/
│       ├── colors.ts                 ✅ Created
│       ├── spacing.ts                ✅ Created
│       ├── typography.ts             ✅ Created
│       └── index.ts                  ✅ Created
│
├── App.tsx                           ⚡ Update
├── index.js                          ✅ Auto-created
└── package.json                      ✅ Auto-created
```

---

## 🔧 Key Conversions Reference

### Web → React Native Element Mapping

| Web Element | React Native Element | Example |
|-------------|---------------------|---------|
| `<div>` | `<View>` | Container elements |
| `<span>` | `<Text>` | Inline text |
| `<h1>`, `<h2>` | `<Text>` | Headers (styled) |
| `<p>` | `<Text>` | Paragraphs |
| `<button>` | `<TouchableOpacity>` | Buttons |
| `<input>` | `<TextInput>` | Text inputs |
| `<img>` | `<Image>` | Images |
| `<a>` | `<TouchableOpacity>` | Links |
| Scrollable div | `<ScrollView>` | Scrolling |
| Tailwind classes | `StyleSheet` | Styling |

### Example Conversion

**Web (React):**
```tsx
<div className="p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold mb-2">{product.name}</h2>
  <p className="text-gray-600">₹{product.price}</p>
  <button 
    className="px-4 py-2 bg-blue-500 text-white rounded"
    onClick={handleBuy}
  >
    Buy Now
  </button>
</div>
```

**React Native:**
```tsx
<View style={styles.card}>
  <Text style={styles.title}>{product.name}</Text>
  <Text style={styles.price}>₹{product.price}</Text>
  <TouchableOpacity style={styles.button} onPress={handleBuy}>
    <Text style={styles.buttonText}>Buy Now</Text>
  </TouchableOpacity>
</View>

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#6B7280',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
```

---

## ⚡ Quick Commands

```bash
# Start Metro bundler
npx react-native start

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android

# Clear cache
npx react-native start --reset-cache

# iOS specific device
npx react-native run-ios --simulator="iPhone 14 Pro"

# Android specific device
adb devices  # List devices
npx react-native run-android --deviceId=DEVICE_ID
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Metro bundler cache issues
```bash
rm -rf node_modules
npm install
npx react-native start --reset-cache
```

### Issue 2: iOS build fails
```bash
cd ios
pod deintegrate
pod install
cd ..
npx react-native run-ios
```

### Issue 3: Android build fails
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### Issue 4: Vector icons not showing
- Make sure you ran `pod install` (iOS)
- Check `fonts.gradle` is applied (Android)
- Rebuild the app completely

---

## 📱 Testing

### iOS Simulators
```bash
# List available simulators
xcrun simctl list devices

# Boot specific simulator
xcrun simctl boot "iPhone 14 Pro"

# Run app
npx react-native run-ios --simulator="iPhone 14 Pro"
```

### Android Emulators
```bash
# List emulators
emulator -list-avds

# Start emulator
emulator -avd Pixel_4_API_30

# Run app
npx react-native run-android
```

---

## 🎨 Next Steps

1. **Create All Screen Components** - I'll provide all 12 screens
2. **Add Product Images** - Use remote URLs (they work in RN)
3. **Test Navigation** - Navigate between all screens
4. **Style Components** - Apply WhiteLight design system
5. **Test on Real Device** - Deploy to physical device
6. **Build Release** - Create production builds

---

## 📖 Additional Resources

- [React Native Docs](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Vector Icons Directory](https://oblador.github.io/react-native-vector-icons/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

---

**You now have the complete foundation for WhiteLight React Native!** 🎉

Next, I'll create all the remaining screen components.
