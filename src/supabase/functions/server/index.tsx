import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// ==================== HEALTH CHECK ====================
app.get("/make-server-4971ce97/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ==================== PRODUCTS ====================

// Initialize products in database (call this once to seed data)
app.post("/make-server-4971ce97/products/seed", async (c) => {
  try {
    const products = await c.req.json();
    
    // Store each product individually
    const storePromises = products.map((product: any) => 
      kv.set(`product:${product.id}`, product)
    );
    
    await Promise.all(storePromises);
    
    // Store product IDs list for easy retrieval
    const productIds = products.map((p: any) => p.id);
    await kv.set('product:ids', productIds);
    
    return c.json({ 
      success: true, 
      message: `Seeded ${products.length} products successfully`,
      count: products.length 
    });
  } catch (error) {
    console.error('Error seeding products:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get all products
app.get("/make-server-4971ce97/products", async (c) => {
  try {
    const productIds = await kv.get('product:ids');
    
    if (!productIds || !Array.isArray(productIds)) {
      return c.json({ success: true, products: [] });
    }
    
    const productKeys = productIds.map(id => `product:${id}`);
    const products = await kv.mget(productKeys);
    
    return c.json({ 
      success: true, 
      products: products.filter(p => p !== null),
      count: products.filter(p => p !== null).length
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get single product by ID
app.get("/make-server-4971ce97/products/:id", async (c) => {
  try {
    const productId = c.req.param('id');
    const product = await kv.get(`product:${productId}`);
    
    if (!product) {
      return c.json({ success: false, error: 'Product not found' }, 404);
    }
    
    return c.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== USER MANAGEMENT ====================

// Create or update user profile
app.post("/make-server-4971ce97/users/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const userData = await c.req.json();
    
    await kv.set(`user:${userId}`, {
      ...userData,
      userId,
      updatedAt: new Date().toISOString()
    });
    
    return c.json({ success: true, message: 'User profile saved' });
  } catch (error) {
    console.error('Error saving user profile:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get user profile
app.get("/make-server-4971ce97/users/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const user = await kv.get(`user:${userId}`);
    
    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404);
    }
    
    return c.json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Save user preferences (onboarding data)
app.post("/make-server-4971ce97/users/:userId/preferences", async (c) => {
  try {
    const userId = c.req.param('userId');
    const preferences = await c.req.json();
    
    await kv.set(`user:${userId}:preferences`, {
      ...preferences,
      savedAt: new Date().toISOString()
    });
    
    return c.json({ success: true, message: 'Preferences saved' });
  } catch (error) {
    console.error('Error saving preferences:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get user preferences
app.get("/make-server-4971ce97/users/:userId/preferences", async (c) => {
  try {
    const userId = c.req.param('userId');
    const preferences = await kv.get(`user:${userId}:preferences`);
    
    return c.json({ 
      success: true, 
      preferences: preferences || {
        interests: [],
        deliveryPreference: '',
        location: ''
      }
    });
  } catch (error) {
    console.error('Error fetching preferences:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== CART MANAGEMENT ====================

// Get user's cart
app.get("/make-server-4971ce97/cart/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const cart = await kv.get(`cart:${userId}`);
    
    return c.json({ 
      success: true, 
      cart: cart || { items: [], total: 0 }
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Add item to cart
app.post("/make-server-4971ce97/cart/:userId/add", async (c) => {
  try {
    const userId = c.req.param('userId');
    const item = await c.req.json();
    
    const cart = await kv.get(`cart:${userId}`) || { items: [], total: 0 };
    
    // Check if item already exists
    const existingIndex = cart.items.findIndex(
      (i: any) => i.product.id === item.product.id && i.selectedSeller === item.selectedSeller
    );
    
    if (existingIndex >= 0) {
      cart.items[existingIndex].quantity += item.quantity;
    } else {
      cart.items.push(item);
    }
    
    // Recalculate total
    cart.total = cart.items.reduce((sum: number, i: any) => 
      sum + (i.product.price * i.quantity), 0
    );
    
    await kv.set(`cart:${userId}`, cart);
    
    return c.json({ success: true, cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update cart item quantity
app.put("/make-server-4971ce97/cart/:userId/update", async (c) => {
  try {
    const userId = c.req.param('userId');
    const { productId, selectedSeller, quantity } = await c.req.json();
    
    const cart = await kv.get(`cart:${userId}`) || { items: [], total: 0 };
    
    const itemIndex = cart.items.findIndex(
      (i: any) => i.product.id === productId && i.selectedSeller === selectedSeller
    );
    
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      
      cart.total = cart.items.reduce((sum: number, i: any) => 
        sum + (i.product.price * i.quantity), 0
      );
      
      await kv.set(`cart:${userId}`, cart);
    }
    
    return c.json({ success: true, cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Remove item from cart
app.delete("/make-server-4971ce97/cart/:userId/remove", async (c) => {
  try {
    const userId = c.req.param('userId');
    const { productId, selectedSeller } = await c.req.json();
    
    const cart = await kv.get(`cart:${userId}`) || { items: [], total: 0 };
    
    cart.items = cart.items.filter(
      (i: any) => !(i.product.id === productId && i.selectedSeller === selectedSeller)
    );
    
    cart.total = cart.items.reduce((sum: number, i: any) => 
      sum + (i.product.price * i.quantity), 0
    );
    
    await kv.set(`cart:${userId}`, cart);
    
    return c.json({ success: true, cart });
  } catch (error) {
    console.error('Error removing from cart:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Clear cart
app.delete("/make-server-4971ce97/cart/:userId/clear", async (c) => {
  try {
    const userId = c.req.param('userId');
    await kv.set(`cart:${userId}`, { items: [], total: 0 });
    
    return c.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== ORDERS ====================

// Create order
app.post("/make-server-4971ce97/orders/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const orderData = await c.req.json();
    
    const orderId = `ORD${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const order = {
      orderId,
      userId,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Store order
    await kv.set(`order:${orderId}`, order);
    
    // Add to user's orders list
    const userOrders = await kv.get(`user:${userId}:orders`) || [];
    userOrders.unshift(orderId);
    await kv.set(`user:${userId}:orders`, userOrders);
    
    // Clear user's cart
    await kv.set(`cart:${userId}`, { items: [], total: 0 });
    
    return c.json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get user's orders
app.get("/make-server-4971ce97/orders/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const orderIds = await kv.get(`user:${userId}:orders`) || [];
    
    const orderKeys = orderIds.map((id: string) => `order:${id}`);
    const orders = await kv.mget(orderKeys);
    
    return c.json({ 
      success: true, 
      orders: orders.filter(o => o !== null)
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get single order
app.get("/make-server-4971ce97/orders/:userId/:orderId", async (c) => {
  try {
    const orderId = c.req.param('orderId');
    const order = await kv.get(`order:${orderId}`);
    
    if (!order) {
      return c.json({ success: false, error: 'Order not found' }, 404);
    }
    
    return c.json({ success: true, order });
  } catch (error) {
    console.error('Error fetching order:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update order status
app.put("/make-server-4971ce97/orders/:orderId/status", async (c) => {
  try {
    const orderId = c.req.param('orderId');
    const { status } = await c.req.json();
    
    const order = await kv.get(`order:${orderId}`);
    
    if (!order) {
      return c.json({ success: false, error: 'Order not found' }, 404);
    }
    
    order.status = status;
    order.updatedAt = new Date().toISOString();
    
    await kv.set(`order:${orderId}`, order);
    
    return c.json({ success: true, order });
  } catch (error) {
    console.error('Error updating order status:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== BIDDING ====================

// Create bid request
app.post("/make-server-4971ce97/bids/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const bidData = await c.req.json();
    
    const bidId = `BID${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const bid = {
      bidId,
      userId,
      ...bidData,
      status: 'active',
      bids: [],
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + bidData.duration * 60 * 60 * 1000).toISOString()
    };
    
    await kv.set(`bid:${bidId}`, bid);
    
    // Add to user's bids list
    const userBids = await kv.get(`user:${userId}:bids`) || [];
    userBids.unshift(bidId);
    await kv.set(`user:${userId}:bids`, userBids);
    
    return c.json({ success: true, bid });
  } catch (error) {
    console.error('Error creating bid:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get user's bids
app.get("/make-server-4971ce97/bids/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const bidIds = await kv.get(`user:${userId}:bids`) || [];
    
    const bidKeys = bidIds.map((id: string) => `bid:${id}`);
    const bids = await kv.mget(bidKeys);
    
    return c.json({ 
      success: true, 
      bids: bids.filter(b => b !== null)
    });
  } catch (error) {
    console.error('Error fetching bids:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get single bid
app.get("/make-server-4971ce97/bids/:userId/:bidId", async (c) => {
  try {
    const bidId = c.req.param('bidId');
    const bid = await kv.get(`bid:${bidId}`);
    
    if (!bid) {
      return c.json({ success: false, error: 'Bid not found' }, 404);
    }
    
    return c.json({ success: true, bid });
  } catch (error) {
    console.error('Error fetching bid:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Add seller bid to request
app.post("/make-server-4971ce97/bids/:bidId/seller-bid", async (c) => {
  try {
    const bidId = c.req.param('bidId');
    const sellerBid = await c.req.json();
    
    const bid = await kv.get(`bid:${bidId}`);
    
    if (!bid) {
      return c.json({ success: false, error: 'Bid not found' }, 404);
    }
    
    bid.bids.push({
      ...sellerBid,
      timestamp: new Date().toISOString()
    });
    
    await kv.set(`bid:${bidId}`, bid);
    
    return c.json({ success: true, bid });
  } catch (error) {
    console.error('Error adding seller bid:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Accept bid
app.post("/make-server-4971ce97/bids/:bidId/accept", async (c) => {
  try {
    const bidId = c.req.param('bidId');
    const { sellerBidId } = await c.req.json();
    
    const bid = await kv.get(`bid:${bidId}`);
    
    if (!bid) {
      return c.json({ success: false, error: 'Bid not found' }, 404);
    }
    
    bid.status = 'accepted';
    bid.acceptedBidId = sellerBidId;
    bid.updatedAt = new Date().toISOString();
    
    await kv.set(`bid:${bidId}`, bid);
    
    return c.json({ success: true, bid });
  } catch (error) {
    console.error('Error accepting bid:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== SEARCH & FILTERS ====================

// Search products
app.post("/make-server-4971ce97/products/search", async (c) => {
  try {
    const { query, filters } = await c.req.json();
    
    const productIds = await kv.get('product:ids') || [];
    const productKeys = productIds.map((id: string) => `product:${id}`);
    const products = await kv.mget(productKeys);
    
    let filtered = products.filter((p: any) => p !== null);
    
    // Text search
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter((p: any) => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Apply filters
    if (filters) {
      if (filters.category) {
        filtered = filtered.filter((p: any) => p.category === filters.category);
      }
      if (filters.brand) {
        filtered = filtered.filter((p: any) => p.brand === filters.brand);
      }
      if (filters.minPrice !== undefined) {
        filtered = filtered.filter((p: any) => p.price >= filters.minPrice);
      }
      if (filters.maxPrice !== undefined) {
        filtered = filtered.filter((p: any) => p.price <= filters.maxPrice);
      }
      if (filters.deliveryTime) {
        filtered = filtered.filter((p: any) => p.deliveryTime === filters.deliveryTime);
      }
      if (filters.mood) {
        filtered = filtered.filter((p: any) => p.mood === filters.mood);
      }
      if (filters.occasion) {
        filtered = filtered.filter((p: any) => p.occasion === filters.occasion);
      }
      if (filters.dealType) {
        filtered = filtered.filter((p: any) => p.dealType === filters.dealType);
      }
      if (filters.sustainable) {
        filtered = filtered.filter((p: any) => p.sustainable === filters.sustainable);
      }
      if (filters.forWho) {
        filtered = filtered.filter((p: any) => p.forWho === filters.forWho);
      }
      if (filters.trending) {
        filtered = filtered.filter((p: any) => p.trending === filters.trending);
      }
      if (filters.color) {
        filtered = filtered.filter((p: any) => p.color === filters.color);
      }
    }
    
    return c.json({ 
      success: true, 
      products: filtered,
      count: filtered.length
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== ANALYTICS ====================

// Track product view
app.post("/make-server-4971ce97/analytics/view", async (c) => {
  try {
    const { userId, productId } = await c.req.json();
    
    const viewKey = `analytics:views:${productId}`;
    const views = await kv.get(viewKey) || 0;
    await kv.set(viewKey, views + 1);
    
    // Track user's view history
    const userViews = await kv.get(`user:${userId}:views`) || [];
    userViews.unshift({ productId, timestamp: new Date().toISOString() });
    await kv.set(`user:${userId}:views`, userViews.slice(0, 50)); // Keep last 50
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error tracking view:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
