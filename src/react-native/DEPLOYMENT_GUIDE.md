# 🚀 WhiteLight - Complete Deployment Guide

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [iOS Deployment](#ios-deployment)
4. [Android Deployment](#android-deployment)
5. [App Store Submission](#app-store-submission)
6. [Post-Deployment](#post-deployment)

---

## ✅ Pre-Deployment Checklist

### Code Preparation

- [ ] All 12 screens are working
- [ ] Navigation flows correctly
- [ ] Supabase credentials configured
- [ ] API endpoints tested
- [ ] Error handling implemented
- [ ] Loading states implemented
- [ ] Offline functionality tested
- [ ] No console warnings/errors
- [ ] TypeScript compilation successful
- [ ] All dependencies up to date

### Assets Preparation

- [ ] App icon created (1024x1024)
- [ ] Launch screen/splash screen
- [ ] All product images optimized
- [ ] Vector icons configured
- [ ] Screenshots captured (all devices)
- [ ] Feature graphics created
- [ ] Promotional materials ready

### Legal & Compliance

- [ ] Privacy Policy written
- [ ] Terms of Service written
- [ ] Age rating determined
- [ ] Data handling documented
- [ ] Third-party attribution listed
- [ ] Support contact information

### Testing

- [ ] iOS simulator tested
- [ ] Android emulator tested
- [ ] Real iOS device tested
- [ ] Real Android device tested
- [ ] Different screen sizes tested
- [ ] Network error scenarios tested
- [ ] Performance tested
- [ ] Battery usage optimized

---

## 🌐 Environment Setup

### 1. Production Environment Variables

Create `.env.production`:

```bash
# Supabase
SUPABASE_PROJECT_ID=your_production_project_id
SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key

# API
API_BASE_URL=https://your-domain.com/api

# App
APP_NAME=WhiteLight
APP_VERSION=1.0.0
BUNDLE_ID_IOS=com.whitelight.app
BUNDLE_ID_ANDROID=com.whitelight.app
```

### 2. Update Configuration Files

**src/services/database.ts:**
```typescript
const PROJECT_ID = process.env.SUPABASE_PROJECT_ID || 'your-project-id';
const PUBLIC_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'your-anon-key';
```

**app.json:**
```json
{
  "name": "WhiteLight",
  "displayName": "WhiteLight",
  "version": "1.0.0",
  "buildNumber": "1"
}
```

---

## 📱 iOS Deployment

### Step 1: Apple Developer Account

1. **Enroll**: https://developer.apple.com/programs/
   - Cost: $99/year
   - Approval: 24-48 hours

2. **Create App ID**:
   - Login to Apple Developer Portal
   - Certificates, Identifiers & Profiles → Identifiers
   - Register new App ID: `com.whitelight.app`
   - Enable capabilities: Push Notifications, Associated Domains

### Step 2: Code Signing

**Generate Certificates:**

```bash
# 1. Open Keychain Access
# 2. Keychain Access → Certificate Assistant → Request from Certificate Authority
# 3. Save to disk

# 4. Upload to Apple Developer Portal
# 5. Download and install certificate
```

**Create Provisioning Profile:**
1. Apple Developer Portal → Profiles
2. Create Distribution Profile
3. Select App ID
4. Select Certificate
5. Download and install

### Step 3: Configure Xcode

```bash
# Open project
cd ios
open WhiteLightMobile.xcworkspace
```

**In Xcode:**
1. Select project → General tab
2. Bundle Identifier: `com.whitelight.app`
3. Version: `1.0.0`
4. Build: `1`
5. Deployment Target: `iOS 13.0` minimum
6. Signing & Capabilities → Select Team
7. Enable Automatic Signing

### Step 4: App Icons

**Required Sizes:**
- 1024x1024 (App Store)
- 180x180 (iPhone @3x)
- 120x120 (iPhone @2x)
- 87x87 (iPhone @3x Settings)
- 58x58 (iPhone @2x Settings)

**Add to Xcode:**
1. ios/WhiteLightMobile/Images.xcassets/AppIcon.appiconset
2. Drag and drop all sizes

### Step 5: Launch Screen

Edit `ios/WhiteLightMobile/LaunchScreen.storyboard`:
- Add WhiteLight logo
- Background color: #3B82F6
- Center logo

### Step 6: Build Archive

```bash
# Command Line
xcodebuild -workspace ios/WhiteLightMobile.xcworkspace \
  -scheme WhiteLightMobile \
  -configuration Release \
  -archivePath build/WhiteLightMobile.xcarchive \
  archive

# Or use Xcode:
# Product → Archive
```

### Step 7: Upload to App Store Connect

```bash
# Command Line
xcodebuild -exportArchive \
  -archivePath build/WhiteLightMobile.xcarchive \
  -exportPath build/ \
  -exportOptionsPlist ExportOptions.plist

# Or use Xcode:
# Window → Organizer → Archives
# Select archive → Distribute App
# App Store Connect → Upload
```

---

## 🤖 Android Deployment

### Step 1: Google Play Console Account

1. **Register**: https://play.google.com/console
   - Cost: $25 (one-time)
   - Approval: Instant

2. **Create App**:
   - App name: WhiteLight
   - Default language: English
   - App/Game: App
   - Free/Paid: Free

### Step 2: Generate Keystore

```bash
# Generate keystore
keytool -genkeypair -v -storetype PKCS12 \
  -keystore whitelight.keystore \
  -alias whitelight \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# Move to android/app
mv whitelight.keystore android/app/
```

**IMPORTANT**: Save keystore password securely!

### Step 3: Configure Gradle

**android/gradle.properties:**
```properties
MYAPP_RELEASE_STORE_FILE=whitelight.keystore
MYAPP_RELEASE_KEY_ALIAS=whitelight
MYAPP_RELEASE_STORE_PASSWORD=your_store_password
MYAPP_RELEASE_KEY_PASSWORD=your_key_password
```

**android/app/build.gradle:**
```gradle
android {
    ...
    defaultConfig {
        applicationId "com.whitelight.app"
        minSdkVersion 21
        targetSdkVersion 33
        versionCode 1
        versionName "1.0.0"
    }
    
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Step 4: App Icons

**Generate Icons:**
- Use Android Studio → Image Asset
- Or use online generator: https://romannurik.github.io/AndroidAssetStudio/

**Required Sizes:**
- mipmap-mdpi: 48x48
- mipmap-hdpi: 72x72
- mipmap-xhdpi: 96x96
- mipmap-xxhdpi: 144x144
- mipmap-xxxhdpi: 192x192

**Location:**
```
android/app/src/main/res/
├── mipmap-mdpi/ic_launcher.png
├── mipmap-hdpi/ic_launcher.png
├── mipmap-xhdpi/ic_launcher.png
├── mipmap-xxhdpi/ic_launcher.png
└── mipmap-xxxhdpi/ic_launcher.png
```

### Step 5: Build APK/AAB

```bash
cd android

# Build APK (for testing)
./gradlew assembleRelease

# Build AAB (for Play Store)
./gradlew bundleRelease

# Output locations:
# APK: app/build/outputs/apk/release/app-release.apk
# AAB: app/build/outputs/bundle/release/app-release.aab
```

### Step 6: Upload to Play Console

1. **Production Track**:
   - Create new release
   - Upload AAB file
   - Release name: "1.0.0"
   - Release notes

2. **Internal Testing** (recommended first):
   - Create internal testing track
   - Add testers
   - Upload AAB
   - Test thoroughly

---

## 📝 App Store Submission

### iOS App Store Connect

1. **App Information**:
   - Name: WhiteLight
   - Subtitle: Shop Smarter, Live Better
   - Category: Shopping
   - Age Rating: 4+

2. **Pricing & Availability**:
   - Price: Free
   - Territories: All countries
   - Release: Manual

3. **App Privacy**:
   - Privacy Policy URL: https://whitelight.com/privacy
   - Data collection: Define all collected data
   - Data usage: Describe how data is used

4. **Screenshots** (Required for all devices):
   - iPhone 6.7" (1290x2796): 3-10 screenshots
   - iPhone 6.5" (1284x2778): 3-10 screenshots
   - iPhone 5.5" (1242x2208): 3-10 screenshots
   - iPad Pro 12.9" (2048x2732): 3-10 screenshots

5. **App Preview Video** (Optional but recommended):
   - 15-30 seconds
   - Showcase key features
   - All supported devices

6. **Description**:
```
WhiteLight - Next-Generation Mobile Commerce

Shop smarter with WhiteLight's revolutionary shopping experience:

🛒 BUY NOW
Instant checkout with the best prices from local stores.

💰 FIND ME BEST PRICE
Let sellers compete! Get live bids with better prices, freebies, and fast delivery.

🔍 FIND ME PRODUCT
AI-powered search using photos, voice, or text to find exactly what you need.

KEY FEATURES:
• Triple action on every product (Buy/Bid/Find)
• Same-day delivery from neighborhood stores
• Social commerce with creator recommendations
• Partial payment options
• Live seller bidding
• Smart product discovery
• Order tracking
• Secure payments

BENEFITS:
✓ Save money with competitive bidding
✓ Support local businesses
✓ Fast delivery times
✓ Eco-friendly shopping options
✓ Personalized recommendations
✓ Easy returns & refunds

Download WhiteLight and experience the future of mobile shopping!
```

7. **Keywords**:
```
shopping, ecommerce, marketplace, bidding, local stores, same day delivery, mobile commerce, online shopping, deals, discounts
```

8. **Support URL**: https://whitelight.com/support
9. **Marketing URL**: https://whitelight.com

10. **Submit for Review**:
    - Review time: 24 hours - 7 days
    - Common rejection reasons:
      - Broken links
      - Missing features described
      - Privacy policy issues
      - UI/UX problems

### Android Play Store

1. **Store Listing**:
   - App name: WhiteLight
   - Short description: "Shop Smarter with AI-Powered Commerce"
   - Full description: (Same as iOS)
   - Category: Shopping
   - Tags: shopping, marketplace, ecommerce

2. **Graphics**:
   - High-res icon: 512x512 PNG
   - Feature graphic: 1024x500 PNG
   - Phone screenshots: 320x3200 to 3840x7680 (min 2)
   - 7" tablet screenshots (optional)
   - 10" tablet screenshots (optional)

3. **Contact Details**:
   - Email: support@whitelight.com
   - Phone: +1-XXX-XXX-XXXX
   - Website: https://whitelight.com

4. **Privacy Policy**:
   - URL: https://whitelight.com/privacy

5. **App Content**:
   - Content rating questionnaire
   - Target audience
   - News apps declaration

6. **Pricing & Distribution**:
   - Free
   - Countries: All
   - Primarily child-directed: No
   - Contains ads: No
   - In-app purchases: No

7. **Submit for Review**:
   - Review time: Few hours - 7 days
   - Usually faster than iOS

---

## 🎯 Post-Deployment

### Monitoring

**Set up analytics:**
```bash
# Firebase Analytics
npm install @react-native-firebase/app @react-native-firebase/analytics

# Sentry for error tracking
npm install @sentry/react-native
```

**Track key metrics:**
- Daily Active Users (DAU)
- Session duration
- Crash-free sessions
- API response times
- Conversion rates

### Crashlytics

**Firebase Crashlytics:**
```typescript
import crashlytics from '@react-native-firebase/crashlytics';

// Log errors
crashlytics().log('Something went wrong');

// Record crash
crashlytics().recordError(new Error('Test crash'));

// Set user ID
crashlytics().setUserId(userId);
```

### Updates

**Over-the-Air (OTA) Updates:**
```bash
# CodePush (Microsoft)
npm install --save react-native-code-push

# Configure in AppCenter
```

**App Store Updates:**
1. Increment version/build number
2. Build new archive
3. Upload to App Store Connect
4. Submit for review

**Play Store Updates:**
1. Increment versionCode and versionName
2. Build new AAB
3. Upload to Play Console
4. Roll out gradually (10% → 50% → 100%)

### User Feedback

**In-App Feedback:**
- Add feedback form in Profile
- Email: feedback@whitelight.com
- In-app rating prompt after positive actions

**App Store Reviews:**
- Respond to all reviews
- Address negative feedback promptly
- Thank positive reviews

---

## 🔒 Security Checklist

- [ ] API keys in environment variables
- [ ] No sensitive data in source code
- [ ] HTTPS for all API calls
- [ ] Secure token storage
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] Certificate pinning (production)
- [ ] Encrypted database (if local storage)
- [ ] Biometric authentication (optional)

---

## 📊 Performance Optimization

**Before Deployment:**

1. **Enable Hermes** (JavaScript engine):
```
// android/app/build.gradle
project.ext.react = [
    enableHermes: true
]

// ios/Podfile
use_react_native!(
  :path => config[:reactNativePath],
  :hermes_enabled => true
)
```

2. **Optimize Images**:
```bash
# Use react-native-fast-image
npm install react-native-fast-image

# Or optimize manually
imagemin *.png --out-dir=build/
```

3. **Reduce Bundle Size**:
```bash
# Analyze bundle
npx react-native-bundle-visualizer

# Remove unused dependencies
npm prune

# Enable ProGuard (Android)
minifyEnabled true
```

4. **Lazy Loading**:
```typescript
const ExploreScreen = lazy(() => import('./screens/ExploreScreen'));
```

---

## 🎉 Launch Checklist

### Day Before Launch

- [ ] Final testing on real devices
- [ ] All app store assets uploaded
- [ ] Privacy policy live
- [ ] Support email configured
- [ ] Social media posts prepared
- [ ] Press release ready
- [ ] Marketing materials ready

### Launch Day

- [ ] Submit app for review
- [ ] Announce on social media
- [ ] Email subscribers
- [ ] Update website
- [ ] Monitor app store status
- [ ] Watch for crashes/errors
- [ ] Respond to initial reviews

### Week After Launch

- [ ] Analyze user behavior
- [ ] Fix critical bugs
- [ ] Respond to feedback
- [ ] Plan v1.1 features
- [ ] A/B test improvements
- [ ] Optimize based on data

---

## 📞 Support Contacts

**Apple Developer Support:**
- Email: developer@apple.com
- Phone: 1-800-633-2152

**Google Play Support:**
- Help Center: https://support.google.com/googleplay/android-developer

**Supabase Support:**
- Discord: https://discord.supabase.com
- Email: support@supabase.io

---

## 🎯 Success Metrics

**Track these KPIs:**
- App Store rating (target: 4.5+)
- Download rate
- Retention (Day 1, Day 7, Day 30)
- Session length (target: 5+ minutes)
- Cart abandonment rate
- Conversion rate
- Average order value
- Crash-free rate (target: 99.5%+)

---

**🚀 You're ready to deploy WhiteLight! Good luck with your launch!**
