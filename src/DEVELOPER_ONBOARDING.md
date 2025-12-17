# 👥 Developer Onboarding Guide - WhiteLight

Welcome to the WhiteLight development team! This guide will help you get started quickly.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Project Overview](#project-overview)
3. [Tech Stack](#tech-stack)
4. [Architecture](#architecture)
5. [Folder Structure](#folder-structure)
6. [Development Workflow](#development-workflow)
7. [Code Standards](#code-standards)
8. [API Reference](#api-reference)
9. [Common Tasks](#common-tasks)
10. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (check: `node --version`)
- npm 9+ (check: `npm --version`)
- Git (check: `git --version`)
- Code editor (VS Code recommended)

### Setup (5 minutes)

```bash
# 1. Clone repository
git clone https://github.com/[your-org]/whitelight.git
cd whitelight

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Navigate to: http://localhost:5173
```

**First-time setup:**
- App will auto-seed database with 50 products
- Complete onboarding flow once to test
- Check browser console for initialization logs

---

## 📱 Project Overview

**WhiteLight** is a next-generation mobile commerce platform combining:
- 🛒 Quick commerce (10-min delivery)
- 🏪 Multi-seller marketplace
- 📱 Social discovery feed
- 🤝 Live bidding & negotiation
- 🔍 AI-powered product search

### Key Features

1. **Triple CTA System** (on every product):
   - **Buy Now** → Instant checkout
   - **Find Me Best Price** → Seller bidding flow
   - **Find Me Product** → AI search (photo/voice/text)

2. **Advanced Shopping**:
   - Shop by Mood, Occasion, Color
   - Sustainability filters
   - Trending & viral products
   - Budget-based browsing

3. **Social Commerce**:
   - Creator recommendations
   - Influencer picks
   - Community-driven discovery

4. **Smart Bidding**:
   - 1hr / 4hrs / 12hrs / 24hrs durations
   - Sellers compete on price, delivery, freebies
   - Live negotiation & messaging

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Vite** - Build tool
- **Motion (Framer Motion)** - Animations
- **Lucide React** - Icons

### Backend
- **Supabase** - Database & auth
- **Hono** - Web framework (Edge Functions)
- **Deno** - Runtime environment

### State Management
- React `useState` / `useEffect`
- LocalStorage for persistence
- Supabase for server state

---

## 🏗 Architecture

```
┌─────────────────────────────────────────┐
│           User Interface                │
│  (React Components + Tailwind CSS)     │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│         Application Layer               │
│  App.tsx - Main state & routing         │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│        Service Layer                    │
│  /services/database.ts                  │
│  (API abstraction)                      │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│      Supabase Edge Functions            │
│  /supabase/functions/server/index.tsx   │
│  (23 REST API endpoints)                │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│       Supabase KV Store                 │
│  (Persistent database)                  │
└─────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
whitelight/
├── public/                    # Static assets
├── src/
│   ├── components/           # React components
│   │   ├── SplashScreen.tsx      # Animated splash (3s)
│   │   ├── LandingPage.tsx       # Marketing hero
│   │   ├── Onboarding.tsx        # 4-step onboarding with SSO
│   │   ├── HomeScreen.tsx        # Main feed + Shop by sections
│   │   ├── ExploreFeed.tsx       # Social discovery feed
│   │   ├── ProductDetail.tsx     # Product page + 3 CTAs
│   │   ├── BiddingFlow.tsx       # Complete bidding system
│   │   ├── FindMeProduct.tsx     # AI search (photo/voice/text)
│   │   ├── Cart.tsx              # Shopping cart
│   │   ├── OrderTracking.tsx     # Order history & tracking
│   │   ├── Profile.tsx           # User profile
│   │   ├── Navigation.tsx        # Bottom nav bar
│   │   ├── ProductCard.tsx       # Reusable product card
│   │   └── FilteredProducts.tsx  # Filtered product grid
│   │
│   ├── services/             # Business logic
│   │   └── database.ts           # Supabase API client
│   │
│   ├── data/                 # Mock data
│   │   └── mockData.ts           # 50 products across 8 categories
│   │
│   ├── utils/                # Utilities
│   │   └── supabase/
│   │       └── info.tsx          # Supabase config
│   │
│   ├── styles/               # Global styles
│   │   └── globals.css           # Tailwind + custom tokens
│   │
│   ├── imports/              # Figma assets
│   │   └── [generated files]     # SVGs, images
│   │
│   ├── App.tsx               # Main app component
│   └── main.tsx              # Entry point
│
├── supabase/                 # Backend functions
│   └── functions/
│       └── server/
│           ├── index.tsx         # Hono server (23 endpoints)
│           └── kv_store.tsx      # KV store utilities (protected)
│
├── DEPLOYMENT.md             # Deployment guide
├── SUPABASE_INTEGRATION.md   # Database docs
├── DEVELOPER_ONBOARDING.md   # This file
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
└── vite.config.ts            # Vite config
```

---

## 💻 Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Edit components in `/src/components/`
- Follow existing code style
- Add TypeScript types
- Use Tailwind for styling

### 3. Test Locally
```bash
npm run dev
# Test on http://localhost:5173
# Test mobile view (Chrome DevTools)
```

### 4. Commit Changes
```bash
git add .
git commit -m "feat: add new feature description"
```

**Commit Convention:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance

### 5. Push & Create PR
```bash
git push origin feature/your-feature-name
# Create Pull Request on GitHub
```

---

## 📐 Code Standards

### TypeScript
```typescript
// ✅ Good - Use interfaces for props
interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

// ✅ Good - Type all function parameters
function addToCart(item: CartItem): Promise<void> {
  // ...
}

// ❌ Avoid - No implicit any
function getData(id) {  // Missing type
  // ...
}
```

### React Components
```typescript
// ✅ Good - Functional components with TypeScript
interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [state, setState] = useState<string>('');
  
  return <div>...</div>;
}

// ❌ Avoid - Class components
class HomeScreen extends Component {
  // Prefer functional components
}
```

### Tailwind CSS
```typescript
// ✅ Good - Use Tailwind utility classes
<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
  Click Me
</button>

// ❌ Avoid - Inline styles (use only when dynamic)
<button style={{ padding: '8px 16px', backgroundColor: 'blue' }}>
  Click Me
</button>

// ⚠️ Note - Don't use font-size, font-weight, line-height classes
// These are handled by global typography in /styles/globals.css
<h1 className="text-gray-900">Title</h1>  // ✅ Correct
<h1 className="text-2xl font-bold">Title</h1>  // ❌ Avoid unless requested
```

### File Naming
- Components: `PascalCase.tsx` (e.g., `ProductCard.tsx`)
- Services: `camelCase.ts` (e.g., `database.ts`)
- Types: `PascalCase` interfaces (e.g., `Product`, `CartItem`)

---

## 🔌 API Reference

### Database Service (`/services/database.ts`)

All database operations are abstracted:

```typescript
import * as db from './services/database';

// Products
await db.getAllProducts();
await db.getProduct(productId);
await db.searchProducts(query, filters);

// Cart
await db.getCart(userId);
await db.addToCart(userId, cartItem);
await db.updateCartItem(userId, productId, sellerId, quantity);
await db.removeFromCart(userId, productId, sellerId);
await db.clearCart(userId);

// Orders
await db.createOrder(userId, orderData);
await db.getUserOrders(userId);
await db.getOrder(userId, orderId);

// Bidding
await db.createBidRequest(userId, bidData);
await db.getUserBids(userId);
await db.acceptBid(bidId, sellerBidId);

// User
await db.saveUserProfile(userId, userData);
await db.saveUserPreferences(userId, preferences);
await db.getUserPreferences(userId);

// Analytics
await db.trackProductView(userId, productId);
```

See **SUPABASE_INTEGRATION.md** for complete API documentation.

---

## 🎯 Common Tasks

### Add a New Screen

1. **Create Component:**
```typescript
// /components/NewScreen.tsx
import { Screen, Product } from '../App';

interface NewScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function NewScreen({ onNavigate }: NewScreenProps) {
  return (
    <div className="min-h-screen p-4">
      <h1>New Screen</h1>
      <button onClick={() => onNavigate('home')}>
        Go Home
      </button>
    </div>
  );
}
```

2. **Add to App.tsx:**
```typescript
// Add to Screen type
export type Screen = 
  | 'home'
  | 'new-screen'  // Add here
  | ...

// Add to renderScreen()
case 'new-screen':
  return <NewScreen onNavigate={navigateTo} />;
```

3. **Add Navigation:**
```typescript
<button onClick={() => onNavigate('new-screen')}>
  Open New Screen
</button>
```

### Add a New Product Category

1. **Update mockData.ts:**
```typescript
export const CATEGORIES = [
  // ... existing
  { name: 'Sports', icon: '⚽', color: 'bg-red-100' }
];
```

2. **Add Products:**
```typescript
{
  id: '51',
  name: 'Tennis Racket',
  category: 'Sports',
  // ... other fields
}
```

3. **Reseed Database:**
```javascript
localStorage.removeItem('whitelight_db_initialized');
// Refresh page - will auto-reseed
```

### Add a New Filter

1. **Update Product Interface in App.tsx:**
```typescript
export interface Product {
  // ... existing fields
  newFilter?: string;  // Add new filter
}
```

2. **Add to mockData.ts:**
```typescript
{
  id: '1',
  name: 'Product',
  newFilter: 'value',  // Add to products
  // ...
}
```

3. **Add Filter Function in HomeScreen.tsx:**
```typescript
const filterByNewFilter = (value: string) => {
  const filtered = MOCK_PRODUCTS.filter(p => p.newFilter === value);
  onShowFiltered(
    value,
    `Products with ${value}`,
    filtered
  );
};
```

4. **Add UI Button:**
```typescript
<button onClick={() => filterByNewFilter('value')}>
  Filter by New Filter
</button>
```

### Update Product Data

**Option 1: Mock Data (Development)**
```typescript
// Edit /data/mockData.ts
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Updated Product Name',
    price: 9999,
    // ...
  }
];
```

**Option 2: Database (Production)**
```typescript
// Call API to update
const updatedProduct = { ...product, name: 'New Name' };
await fetch(`${BASE_URL}/products/${productId}`, {
  method: 'PUT',
  body: JSON.stringify(updatedProduct)
});
```

---

## 🐛 Troubleshooting

### Database Not Seeding
```bash
# Clear initialization flag
localStorage.removeItem('whitelight_db_initialized');
# Refresh page
```

### Cart Not Persisting
```javascript
// Check user ID exists
console.log(localStorage.getItem('whitelight_user_id'));

// Manually test API
await db.getCart(userId);
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
npm run dev
```

### TypeScript Errors
```bash
# Check TypeScript config
npx tsc --noEmit

# Update types
npm install --save-dev @types/react @types/react-dom
```

### Images Not Loading
- Check Unsplash URLs are accessible
- Verify `figma:asset` imports don't have path prefixes
- Use `ImageWithFallback` component for new images

### Supabase Connection Issues
```javascript
// Check Supabase config
import { projectId, publicAnonKey } from './utils/supabase/info';
console.log('Project ID:', projectId);
console.log('Anon Key:', publicAnonKey);

// Test API manually
fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4971ce97/health`, {
  headers: { 'Authorization': `Bearer ${publicAnonKey}` }
})
  .then(r => r.json())
  .then(console.log);
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Splash screen loads and animates
- [ ] Landing page displays correctly
- [ ] Onboarding saves preferences
- [ ] Home screen shows all products
- [ ] All "Shop by" filters work
- [ ] Product details page loads
- [ ] Add to cart works
- [ ] Cart persists after refresh
- [ ] Bidding flow completes
- [ ] Find Me Product screen works
- [ ] Order tracking displays
- [ ] Profile loads user data
- [ ] Navigation switches screens
- [ ] Mobile responsive (375px-428px)

### Browser Testing
- ✅ Chrome (primary)
- ✅ Safari (iOS compatibility)
- ✅ Firefox
- ✅ Edge

### Device Testing
- iPhone 12/13/14 (390×844)
- iPhone 14 Pro Max (430×932)
- Samsung Galaxy S21 (360×800)
- Tablet (768px+)

---

## 📚 Resources

### Documentation
- [Supabase Integration](./SUPABASE_INTEGRATION.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Design System
- Colors: Defined in `/styles/globals.css`
- Typography: Global defaults (don't override)
- Icons: [Lucide React](https://lucide.dev)
- Animations: [Motion](https://motion.dev)

### APIs
- Supabase: 23 endpoints (see SUPABASE_INTEGRATION.md)
- Unsplash: Image search tool (available in codebase)

---

## 🎨 Design Guidelines

### Mobile-First
- Design for 375px width minimum
- Test up to 428px (iPhone Pro Max)
- Ensure touch targets are 44px minimum

### Color Usage
```css
/* Primary Actions */
bg-blue-500     /* Buy Now, primary CTAs */
bg-purple-500   /* Find Best Price */
bg-green-500    /* Success states */
bg-red-500      /* Urgent/Flash sales */

/* Backgrounds */
bg-gray-50      /* Page background */
bg-white        /* Cards, sections */

/* Text */
text-gray-900   /* Headings */
text-gray-700   /* Body text */
text-gray-500   /* Secondary text */
```

### Spacing
```css
p-4     /* Standard padding */
gap-3   /* Standard gap */
mb-3    /* Section margin */
rounded-2xl    /* Standard border radius */
```

---

## 🤝 Getting Help

### Internal Team
- **Architecture Questions:** Check SUPABASE_INTEGRATION.md
- **Deployment Issues:** See DEPLOYMENT.md
- **Code Review:** Create PR with detailed description

### External Resources
- React: https://react.dev/learn
- Tailwind: https://tailwindcss.com/docs
- Supabase: https://supabase.com/docs
- TypeScript: https://www.typescriptlang.org/docs/

### Debug Mode
```javascript
// Enable debug logging
localStorage.setItem('whitelight_debug', 'true');

// Check all stored data
console.log('User ID:', localStorage.getItem('whitelight_user_id'));
console.log('DB Init:', localStorage.getItem('whitelight_db_initialized'));
```

---

## 🎯 Your First Task

**Easy starter task to get familiar with the codebase:**

1. Add a new product to `/data/mockData.ts`
2. Add a new mood option to "Shop by Mood"
3. Test the filter works
4. Create a PR with your changes

**Time estimate:** 15-30 minutes

---

## 🚀 What to Build Next

### High Priority
- [ ] Supabase Auth (Google, Apple, Phone)
- [ ] Real-time bidding updates
- [ ] Push notifications for bids
- [ ] Seller dashboard
- [ ] Admin panel

### Medium Priority
- [ ] User reviews & ratings
- [ ] Wishlist functionality
- [ ] Referral system
- [ ] Loyalty points
- [ ] Multiple delivery addresses

### Nice to Have
- [ ] AR product preview
- [ ] Voice search
- [ ] Video commerce
- [ ] Live shopping events
- [ ] Influencer partnerships

---

**Welcome to WhiteLight! Happy coding! 🎉**

Questions? Ask in Slack #whitelight-dev or create a GitHub issue.
