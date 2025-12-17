# 🌟 WhiteLight - Next-Gen Mobile Commerce Platform

<div align="center">

![WhiteLight Logo](https://img.shields.io/badge/WhiteLight-Commerce-blue?style=for-the-badge)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)

**A revolutionary mobile commerce platform combining quick commerce, marketplace functionality, social discovery, and innovative negotiation features.**

[Live Demo](#) • [Documentation](#documentation) • [Deploy Now](#deployment) • [Join Dev Team](#for-developers)

</div>

---

## ✨ What is WhiteLight?

WhiteLight reimagines mobile shopping by introducing **triple-action product interactions** that give users unprecedented control:

- 🛒 **Buy Now** - Instant checkout with the best available seller
- 🤝 **Find Me Best Price** - Let sellers compete with live bidding
- 🔍 **Find Me Product** - AI-powered search via photo, voice, or text

Built for the modern consumer who values **speed, choice, and community**.

---

## 🚀 Key Features

### 🎯 Core Differentiators

| Feature | Description |
|---------|-------------|
| **Triple CTA System** | Every product offers 3 ways to shop: Buy Now, Bid, or AI Search |
| **Live Bidding** | Sellers compete in real-time (1hr/4hrs/12hrs/24hrs durations) |
| **Social Commerce** | Creator recommendations, viral products, influencer picks |
| **Smart Filters** | Shop by Mood, Occasion, Sustainability, Budget, Color |
| **10-Min Delivery** | Ultra-fast delivery from neighborhood stores |
| **Multi-Seller** | Compare prices, delivery times, freebies across sellers |

### 📱 Complete User Journey

```
Splash Screen (3s animated)
    ↓
Landing Page (Hero + features)
    ↓
Onboarding (4 steps + SSO)
    ↓
Home Feed (8 "Shop by" sections)
    ↓
Product Detail (3 CTAs)
    ↓
Bidding Flow / Checkout
    ↓
Order Tracking
```

### 🎨 Shopping Categories (8)

- 📱 **Electronics** - Phones, laptops, gadgets
- 👗 **Fashion** - Clothing, shoes, accessories
- 🛒 **Groceries** - Fresh produce, essentials
- 💄 **Beauty** - Skincare, makeup, fragrances
- 🏠 **Home** - Furniture, decor, appliances
- ⚽ **Sports** - Fitness, outdoor gear
- 📚 **Books** - Literature, education
- 🧸 **Toys** - Kids, games, hobbies

### 🧠 Advanced "Shop by" Filters

- **By Mood**: Happy, Calm, Energetic, Romantic, Celebratory, Peaceful
- **By Occasion**: Birthday, Anniversary, Wedding, Festival, Graduation
- **By Deal Type**: Flash Sale, Bundle Deals, BOGO, Clearance
- **By Sustainability**: Eco-friendly, Local & Handmade, Organic, Carbon Neutral
- **By Recipient**: For Me, For Him, For Her, For Kids, For Pets, For Home
- **By Trending**: Viral, Celebrity Picks, New Arrivals, Best Sellers
- **By Color**: 8 color filters for visual shopping
- **By Budget**: Under ₹500, ₹500-2K, ₹2K-5K, Premium ₹5K+
- **By Delivery**: 10min, 30min, 3hrs, Same day
- **By Brand**: All major brands included

---

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **Motion (Framer Motion)** - Smooth animations
- **Lucide React** - Beautiful icons

### Backend
- **Supabase** - PostgreSQL database + Edge Functions
- **Hono** - Lightweight web framework
- **Deno** - Secure runtime for serverless functions

### State Management
- React Hooks (useState, useEffect)
- LocalStorage for persistence
- Supabase for server state sync

### DevOps
- **Vercel** / **Netlify** - Hosting & deployment
- **GitHub Actions** - CI/CD pipeline
- **Sentry** - Error tracking (optional)

---

## 📦 Project Structure

```
whitelight/
├── src/
│   ├── components/          # 15+ React components
│   │   ├── SplashScreen.tsx       # Animated 3s intro
│   │   ├── LandingPage.tsx        # Hero + features
│   │   ├── Onboarding.tsx         # 4-step SSO flow
│   │   ├── HomeScreen.tsx         # Main shopping feed
│   │   ├── ExploreFeed.tsx        # Social discovery
│   │   ├── ProductDetail.tsx      # Product page + 3 CTAs
│   │   ├── BiddingFlow.tsx        # Live bidding system
│   │   ├── FindMeProduct.tsx      # AI search (photo/voice/text)
│   │   ├── Cart.tsx               # Shopping cart
│   │   ├── OrderTracking.tsx      # Order history
│   │   └── ...
│   │
│   ├── services/            # Business logic
│   │   └── database.ts            # Supabase API client
│   │
│   ├── data/                # Product catalog
│   │   └── mockData.ts            # 50 products
│   │
│   └── styles/              # Global styles
│       └── globals.css            # Tailwind + tokens
│
├── supabase/                # Backend functions
│   └── functions/server/
│       ├── index.tsx              # 23 REST endpoints
│       └── kv_store.tsx           # Database utils
│
├── DEPLOYMENT.md            # Deploy to production
├── DEVELOPER_ONBOARDING.md  # Dev getting started guide
└── SUPABASE_INTEGRATION.md  # Complete API docs
```

---

## 🏃‍♂️ Quick Start

### 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/[your-org]/whitelight.git
cd whitelight

# Install dependencies
npm install

# Start development server
npm run dev
```

**App runs on:** `http://localhost:5173`

### 2. First Launch

- ✅ App auto-seeds 50 products to database
- ✅ Complete onboarding to test flow
- ✅ Browse products and test features
- ✅ Add to cart and test persistence

### 3. Development

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npx tsc --noEmit
```

---

## 🌐 Deployment

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

### Manual Deployment

```bash
# Build production bundle
npm run build

# Deploy to Vercel
vercel deploy --prod

# Or deploy to Netlify
netlify deploy --prod
```

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete guide.**

---

## 📊 Database & API

### Supabase Integration

WhiteLight uses **Supabase** for:
- ✅ Product catalog (50 products seeded)
- ✅ User profiles & preferences
- ✅ Shopping cart (persists across sessions)
- ✅ Order management & tracking
- ✅ Bidding requests & seller responses
- ✅ Analytics & view tracking

### API Endpoints (23 total)

```typescript
// Products (5)
GET    /products              // Get all products
GET    /products/:id          // Get single product
POST   /products/search       // Advanced search + filters
POST   /products/seed         // Initialize database

// Cart (5)
GET    /cart/:userId          // Get user cart
POST   /cart/:userId/add      // Add to cart
PUT    /cart/:userId/update   // Update quantity
DELETE /cart/:userId/remove   // Remove item
DELETE /cart/:userId/clear    // Clear cart

// Orders (4)
POST   /orders/:userId        // Create order
GET    /orders/:userId        // Get order history
GET    /orders/:userId/:id    // Get order details
PUT    /orders/:id/status     // Update order status

// Bidding (5)
POST   /bids/:userId          // Create bid request
GET    /bids/:userId          // Get user bids
GET    /bids/:userId/:id      // Get bid details
POST   /bids/:id/seller-bid   // Seller submits bid
POST   /bids/:id/accept       // Accept winning bid

// User Management (4)
POST   /users/:userId         // Save user profile
GET    /users/:userId         // Get user profile
POST   /users/:userId/prefs   // Save preferences
GET    /users/:userId/prefs   // Get preferences
```

**See [SUPABASE_INTEGRATION.md](./SUPABASE_INTEGRATION.md) for complete API documentation.**

---

## 📱 Features Showcase

### 1. Onboarding with SSO
- 4 beautiful screens with glassmorphism design
- Google, Apple, Phone number sign-in
- Smart flow: SSO users skip phone verification
- Collects interests, location, delivery preferences

### 2. Home Feed
- 8 different "Shop by" sections
- Dynamic product filtering
- Delivery speed selection
- Category browsing
- Brand showcase

### 3. Product Detail
- Image gallery
- Price comparison across sellers
- **3 Primary CTAs:**
  - Buy Now (instant checkout)
  - Find Me Best Price (bidding)
  - Find Me Product (AI search)
- Variant selection (color, size, storage)
- Seller comparison table

### 4. Bidding Flow
- Duration selection: 1hr, 4hrs, 12hrs, 24hrs
- Live seller bids
- Compare: Price, Delivery, Freebies, Reviews
- Chat with sellers
- Accept best offer

### 5. Find Me Product
- Photo upload (camera or gallery)
- Voice search
- Text search
- AI-powered product matching

### 6. Cart & Checkout
- Persistent cart (survives refresh)
- Partial payment system
- Multiple payment methods
- Delivery address management

### 7. Order Tracking
- Real-time status updates
- Live location tracking
- Estimated delivery time
- Reorder functionality

---

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Bidding**: Purple (#A855F7)
- **Success**: Green (#10B981)
- **Urgent**: Red (#EF4444)

### Typography
- Custom font scales defined in `globals.css`
- Mobile-optimized sizes
- Consistent line-heights

### Components
- Glassmorphism cards
- Gradient backgrounds
- Smooth animations (Motion)
- Touch-optimized buttons (44px min)

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Complete deployment guide |
| [DEVELOPER_ONBOARDING.md](./DEVELOPER_ONBOARDING.md) | Getting started for developers |
| [SUPABASE_INTEGRATION.md](./SUPABASE_INTEGRATION.md) | Database & API reference |

---

## 👥 For Developers

### Getting Started

1. **Read:** [DEVELOPER_ONBOARDING.md](./DEVELOPER_ONBOARDING.md)
2. **Setup:** Clone repo & run `npm install`
3. **Explore:** Browse `/src/components/` to understand structure
4. **Test:** Make a small change and see it live reload
5. **Contribute:** Create a branch, commit, push, PR

### Code Standards

- ✅ TypeScript for all code
- ✅ Functional React components
- ✅ Tailwind CSS for styling
- ✅ ESLint + Prettier
- ✅ Conventional commits

### Common Tasks

```typescript
// Add new product
// Edit: /data/mockData.ts

// Add new screen
// 1. Create: /components/NewScreen.tsx
// 2. Add to: App.tsx renderScreen()
// 3. Add navigation button

// Add new filter
// 1. Update: Product interface in App.tsx
// 2. Add to: mockData.ts products
// 3. Create filter function in HomeScreen.tsx
// 4. Add UI button
```

### Testing

- Manual testing checklist in [DEVELOPER_ONBOARDING.md](./DEVELOPER_ONBOARDING.md)
- Browser: Chrome, Safari, Firefox, Edge
- Devices: iPhone, Android, Tablet
- Lighthouse score: Target 90+

---

## 🚀 Roadmap

### ✅ Completed (Phase 1)
- [x] Complete UI/UX design
- [x] Triple CTA system
- [x] Bidding flow
- [x] Supabase integration
- [x] 50 products across 8 categories
- [x] Advanced filtering
- [x] Cart persistence
- [x] Order tracking
- [x] SSO onboarding

### 🔄 In Progress (Phase 2)
- [ ] Supabase Auth (Google, Apple)
- [ ] Real-time bidding updates
- [ ] Push notifications
- [ ] Seller dashboard
- [ ] Admin panel

### 📅 Planned (Phase 3)
- [ ] AR product preview
- [ ] Live shopping events
- [ ] Video commerce
- [ ] Influencer marketplace
- [ ] Loyalty program
- [ ] Referral system
- [ ] Multi-language support
- [ ] Dark mode

---

## 📊 Performance

- **Lighthouse Score:** 95+ (target)
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3s
- **Bundle Size:** ~200KB (gzipped)
- **Database:** <500ms response time

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Clone** your fork
3. **Create** a feature branch
4. **Make** your changes
5. **Test** thoroughly
6. **Commit** with conventional commits
7. **Push** to your fork
8. **Create** a Pull Request

### Contribution Guidelines

- Follow existing code style
- Add TypeScript types
- Use Tailwind CSS
- Test on mobile devices
- Update documentation if needed
- Write clear commit messages

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com)
- [Vite](https://vitejs.dev)
- [Motion](https://motion.dev)
- [Lucide](https://lucide.dev)

---

## 📞 Contact & Support

- **Issues:** [GitHub Issues](https://github.com/[your-org]/whitelight/issues)
- **Discussions:** [GitHub Discussions](https://github.com/[your-org]/whitelight/discussions)
- **Email:** dev@whitelight.com
- **Slack:** #whitelight-dev

---

## 🌟 Star Us!

If you find WhiteLight useful, please give it a ⭐️ on GitHub!

<div align="center">

**Made with ❤️ by the WhiteLight Team**

[Live Demo](#) • [Documentation](#documentation) • [Deploy Now](#deployment)

</div>
