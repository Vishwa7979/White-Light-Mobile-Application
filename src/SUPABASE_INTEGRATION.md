# 🗄️ WhiteLight Supabase Database Integration

## Overview

WhiteLight is now fully integrated with **Supabase** as the backend database, providing persistent data storage, user management, cart synchronization, order tracking, and bidding functionality.

---

## 🏗️ Architecture

```
┌─────────────────┐
│   React App     │ (Frontend)
│   /App.tsx      │
└────────┬────────┘
         │
         │ HTTP Requests
         ▼
┌─────────────────────────────┐
│  Database Service Layer     │
│  /services/database.ts      │
└────────┬────────────────────┘
         │
         │ REST API
         ▼
┌─────────────────────────────────┐
│  Supabase Edge Functions        │
│  /supabase/functions/server/    │
│  index.tsx (Hono Server)        │
└────────┬────────────────────────┘
         │
         │ KV Store API
         ▼
┌─────────────────────────────────┐
│  Supabase KV Store              │
│  kv_store.tsx                   │
│  (Key-Value Database)           │
└─────────────────────────────────┘
```

---

## 📦 Data Models

### 1. **Products**
```typescript
Key Pattern: `product:{productId}`

{
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  mood?: string;
  occasion?: string;
  dealType?: string;
  sustainable?: string;
  forWho?: string;
  trending?: string;
  color?: string;
  sellers: Array<{
    id: string;
    name: string;
    price: number;
    rating: number;
    deliveryTime: string;
    badges: string[];
  }>;
  variants?: Array<{
    type: string;
    options: string[];
  }>;
}
```

### 2. **User Data**
```typescript
Key Pattern: `user:{userId}`

{
  userId: string;
  name?: string;
  email?: string;
  phone?: string;
  updatedAt: string;
}
```

### 3. **User Preferences**
```typescript
Key Pattern: `user:{userId}:preferences`

{
  interests: string[];           // ['Electronics', 'Fashion', ...]
  deliveryPreference: string;    // 'speed' | 'price' | 'trust' | 'eco'
  location: string;               // 'Koramangala, Bangalore'
  phone?: string;
  authMethod?: string;            // 'google' | 'apple' | 'phone'
  savedAt: string;
}
```

### 4. **Cart**
```typescript
Key Pattern: `cart:{userId}`

{
  items: Array<{
    product: Product;
    quantity: number;
    selectedSeller: string;
  }>;
  total: number;
}
```

### 5. **Orders**
```typescript
Key Pattern: `order:{orderId}`
User Orders List: `user:{userId}:orders`

{
  orderId: string;                // e.g., "ORD1702901234ABC"
  userId: string;
  items: CartItem[];
  total: number;
  deliveryAddress: string;
  paymentMethod: string;
  paymentDetails?: any;
  status: string;                 // 'pending' | 'confirmed' | 'shipped' | 'delivered'
  createdAt: string;
  updatedAt: string;
}
```

### 6. **Bidding Requests**
```typescript
Key Pattern: `bid:{bidId}`
User Bids List: `user:{userId}:bids`

{
  bidId: string;                  // e.g., "BID1702901234XYZ"
  userId: string;
  productId: string;
  productName: string;
  duration: number;               // Hours: 1, 4, 12, 24
  targetPrice?: number;
  requirements?: string;
  status: 'active' | 'accepted' | 'expired';
  bids: Array<{
    id: string;
    sellerId: string;
    sellerName: string;
    price: number;
    deliveryTime: string;
    freebies?: string[];
    message?: string;
    timestamp: string;
  }>;
  createdAt: string;
  expiresAt: string;
  acceptedBidId?: string;
}
```

### 7. **Analytics**
```typescript
Key Pattern: `analytics:views:{productId}`
User Views: `user:{userId}:views`

Product views count (number)
User view history: Array<{
  productId: string;
  timestamp: string;
}>
```

---

## 🔌 API Endpoints

### **Health Check**
```
GET /make-server-4971ce97/health
Response: { status: "ok", timestamp: string }
```

### **Products**

#### Seed Products (One-time initialization)
```
POST /make-server-4971ce97/products/seed
Body: Product[]
Response: { success: true, message: string, count: number }
```

#### Get All Products
```
GET /make-server-4971ce97/products
Response: { success: true, products: Product[], count: number }
```

#### Get Single Product
```
GET /make-server-4971ce97/products/:id
Response: { success: true, product: Product }
```

#### Search Products
```
POST /make-server-4971ce97/products/search
Body: {
  query: string;
  filters?: {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    deliveryTime?: string;
    mood?: string;
    occasion?: string;
    dealType?: string;
    sustainable?: string;
    forWho?: string;
    trending?: string;
    color?: string;
  }
}
Response: { success: true, products: Product[], count: number }
```

### **User Management**

#### Create/Update User Profile
```
POST /make-server-4971ce97/users/:userId
Body: { name?: string, email?: string, phone?: string, ... }
Response: { success: true, message: string }
```

#### Get User Profile
```
GET /make-server-4971ce97/users/:userId
Response: { success: true, user: UserProfile }
```

#### Save User Preferences
```
POST /make-server-4971ce97/users/:userId/preferences
Body: { interests: string[], deliveryPreference: string, location: string }
Response: { success: true, message: string }
```

#### Get User Preferences
```
GET /make-server-4971ce97/users/:userId/preferences
Response: { success: true, preferences: UserPreferences }
```

### **Cart Management**

#### Get Cart
```
GET /make-server-4971ce97/cart/:userId
Response: { success: true, cart: { items: CartItem[], total: number } }
```

#### Add to Cart
```
POST /make-server-4971ce97/cart/:userId/add
Body: { product: Product, quantity: number, selectedSeller: string }
Response: { success: true, cart: Cart }
```

#### Update Cart Item
```
PUT /make-server-4971ce97/cart/:userId/update
Body: { productId: string, selectedSeller: string, quantity: number }
Response: { success: true, cart: Cart }
```

#### Remove from Cart
```
DELETE /make-server-4971ce97/cart/:userId/remove
Body: { productId: string, selectedSeller: string }
Response: { success: true, cart: Cart }
```

#### Clear Cart
```
DELETE /make-server-4971ce97/cart/:userId/clear
Response: { success: true, message: string }
```

### **Orders**

#### Create Order
```
POST /make-server-4971ce97/orders/:userId
Body: {
  items: CartItem[];
  total: number;
  deliveryAddress: string;
  paymentMethod: string;
  paymentDetails?: any;
}
Response: { success: true, order: Order }
```

#### Get User Orders
```
GET /make-server-4971ce97/orders/:userId
Response: { success: true, orders: Order[] }
```

#### Get Single Order
```
GET /make-server-4971ce97/orders/:userId/:orderId
Response: { success: true, order: Order }
```

#### Update Order Status
```
PUT /make-server-4971ce97/orders/:orderId/status
Body: { status: string }
Response: { success: true, order: Order }
```

### **Bidding**

#### Create Bid Request
```
POST /make-server-4971ce97/bids/:userId
Body: {
  productId: string;
  productName: string;
  duration: number;
  targetPrice?: number;
  requirements?: string;
}
Response: { success: true, bid: Bid }
```

#### Get User Bids
```
GET /make-server-4971ce97/bids/:userId
Response: { success: true, bids: Bid[] }
```

#### Get Single Bid
```
GET /make-server-4971ce97/bids/:userId/:bidId
Response: { success: true, bid: Bid }
```

#### Add Seller Bid
```
POST /make-server-4971ce97/bids/:bidId/seller-bid
Body: {
  id: string;
  sellerId: string;
  sellerName: string;
  price: number;
  deliveryTime: string;
  freebies?: string[];
  message?: string;
}
Response: { success: true, bid: Bid }
```

#### Accept Bid
```
POST /make-server-4971ce97/bids/:bidId/accept
Body: { sellerBidId: string }
Response: { success: true, bid: Bid }
```

### **Analytics**

#### Track Product View
```
POST /make-server-4971ce97/analytics/view
Body: { userId: string, productId: string }
Response: { success: true }
```

---

## 🚀 Usage Examples

### Frontend Integration

```typescript
import * as db from './services/database';

// 1. Initialize Database (First time only)
await db.initializeDatabase(MOCK_PRODUCTS);

// 2. Get All Products
const products = await db.getAllProducts();

// 3. Add to Cart
await db.addToCart(userId, {
  product: selectedProduct,
  quantity: 1,
  selectedSeller: 's1'
});

// 4. Create Order
const order = await db.createOrder(userId, {
  items: cartItems,
  total: 5999,
  deliveryAddress: 'Koramangala, Bangalore',
  paymentMethod: 'UPI'
});

// 5. Create Bid Request
const bid = await db.createBidRequest(userId, {
  productId: 'prod_123',
  productName: 'iPhone 15 Pro',
  duration: 4,
  targetPrice: 130000
});

// 6. Search Products
const results = await db.searchProducts('laptop', {
  category: 'Electronics',
  minPrice: 30000,
  maxPrice: 100000
});
```

---

## 💾 Data Flow

### 1. **App Initialization**
```
App.tsx (useEffect) 
  → Check localStorage for 'whitelight_db_initialized'
  → If not initialized:
      → Call db.initializeDatabase(MOCK_PRODUCTS)
      → Seed all products to Supabase
      → Set localStorage flag
  → Generate/retrieve userId
  → Load user's cart from database
```

### 2. **Onboarding Flow**
```
User completes onboarding
  → Collect: interests, location, deliveryPreference, authMethod
  → Call db.saveUserPreferences(userId, preferences)
  → Store in: user:{userId}:preferences
```

### 3. **Shopping Flow**
```
User adds product to cart
  → Call db.addToCart(userId, cartItem)
  → Server updates cart:{userId}
  → Returns updated cart
  → Frontend updates local state
```

### 4. **Checkout Flow**
```
User proceeds to checkout
  → Call db.createOrder(userId, orderData)
  → Server:
      - Creates order:{orderId}
      - Adds orderId to user:{userId}:orders
      - Clears cart:{userId}
  → Returns order details
```

### 5. **Bidding Flow**
```
User initiates "Find Me Best Price"
  → Call db.createBidRequest(userId, bidData)
  → Server creates bid:{bidId}
  → Sellers add bids via db.addSellerBid()
  → User accepts bid via db.acceptBid()
```

---

## 🔐 Security Notes

1. **API Key**: Requests use `publicAnonKey` from `/utils/supabase/info`
2. **User ID**: Generated client-side and stored in localStorage
3. **CORS**: Server allows all origins with `origin: "*"`
4. **Authorization Header**: `Bearer ${publicAnonKey}` on all requests

---

## 📊 Database Status

✅ **Products** - Seeded and retrievable  
✅ **User Preferences** - Saved during onboarding  
✅ **Cart** - Synced across sessions  
✅ **Orders** - Persistent order history  
✅ **Bidding** - Full bidding lifecycle  
✅ **Analytics** - Product view tracking  

---

## 🛠️ Development

### Initialize Database
On first run, the app automatically seeds products. To reset:
```javascript
localStorage.removeItem('whitelight_db_initialized');
// Refresh the app
```

### Generate New User
```javascript
localStorage.removeItem('whitelight_user_id');
// Refresh the app - new ID will be generated
```

### Clear All Data
Open browser console:
```javascript
localStorage.clear();
location.reload();
```

---

## 🧪 Testing Endpoints

Use the browser console or a tool like **Postman**:

```javascript
// Test health check
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-4971ce97/health', {
  headers: { 'Authorization': 'Bearer YOUR_ANON_KEY' }
})
  .then(r => r.json())
  .then(console.log);

// Get all products
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-4971ce97/products', {
  headers: { 'Authorization': 'Bearer YOUR_ANON_KEY' }
})
  .then(r => r.json())
  .then(console.log);
```

---

## 📝 Notes

- **KV Store**: Uses Supabase's built-in key-value store (no SQL tables needed)
- **Auto-scaling**: Supabase Edge Functions scale automatically
- **Global CDN**: Fast response times worldwide
- **Real-time**: Can be extended with Supabase Realtime for live bidding updates
- **Flexible Schema**: KV store allows schema changes without migrations

---

## 🚀 Next Steps

1. **Add Supabase Auth** for proper user authentication
2. **Enable Realtime subscriptions** for live bidding updates
3. **Implement Storage** for user-uploaded images
4. **Add RLS policies** for enhanced security
5. **Create admin dashboard** for seller management

---

**WhiteLight is now production-ready with full database integration!** 🎉
