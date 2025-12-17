import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Product, CartItem } from '../App';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-4971ce97`;

// Helper function to make API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...options.headers,
    },
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }
  
  return data;
}

// ==================== PRODUCTS ====================

export async function seedProducts(products: Product[]) {
  return apiCall('/products/seed', {
    method: 'POST',
    body: JSON.stringify(products),
  });
}

export async function getAllProducts(): Promise<Product[]> {
  const data = await apiCall('/products');
  return data.products || [];
}

export async function getProduct(productId: string): Promise<Product | null> {
  try {
    const data = await apiCall(`/products/${productId}`);
    return data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function searchProducts(query: string, filters?: any): Promise<Product[]> {
  const data = await apiCall('/products/search', {
    method: 'POST',
    body: JSON.stringify({ query, filters }),
  });
  return data.products || [];
}

// ==================== USER MANAGEMENT ====================

export async function saveUserProfile(userId: string, userData: any) {
  return apiCall(`/users/${userId}`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export async function getUserProfile(userId: string) {
  try {
    const data = await apiCall(`/users/${userId}`);
    return data.user;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export async function saveUserPreferences(userId: string, preferences: {
  interests: string[];
  deliveryPreference: string;
  location: string;
  phone?: string;
  authMethod?: string;
}) {
  return apiCall(`/users/${userId}/preferences`, {
    method: 'POST',
    body: JSON.stringify(preferences),
  });
}

export async function getUserPreferences(userId: string) {
  const data = await apiCall(`/users/${userId}/preferences`);
  return data.preferences;
}

// ==================== CART MANAGEMENT ====================

export async function getCart(userId: string) {
  const data = await apiCall(`/cart/${userId}`);
  return data.cart;
}

export async function addToCart(userId: string, item: CartItem) {
  const data = await apiCall(`/cart/${userId}/add`, {
    method: 'POST',
    body: JSON.stringify(item),
  });
  return data.cart;
}

export async function updateCartItem(
  userId: string, 
  productId: string, 
  selectedSeller: string, 
  quantity: number
) {
  const data = await apiCall(`/cart/${userId}/update`, {
    method: 'PUT',
    body: JSON.stringify({ productId, selectedSeller, quantity }),
  });
  return data.cart;
}

export async function removeFromCart(userId: string, productId: string, selectedSeller: string) {
  const data = await apiCall(`/cart/${userId}/remove`, {
    method: 'DELETE',
    body: JSON.stringify({ productId, selectedSeller }),
  });
  return data.cart;
}

export async function clearCart(userId: string) {
  return apiCall(`/cart/${userId}/clear`, {
    method: 'DELETE',
  });
}

// ==================== ORDERS ====================

export interface Order {
  orderId: string;
  userId: string;
  items: CartItem[];
  total: number;
  deliveryAddress: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function createOrder(userId: string, orderData: {
  items: CartItem[];
  total: number;
  deliveryAddress: string;
  paymentMethod: string;
  paymentDetails?: any;
}) {
  const data = await apiCall(`/orders/${userId}`, {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
  return data.order as Order;
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const data = await apiCall(`/orders/${userId}`);
  return data.orders || [];
}

export async function getOrder(userId: string, orderId: string): Promise<Order | null> {
  try {
    const data = await apiCall(`/orders/${userId}/${orderId}`);
    return data.order;
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  const data = await apiCall(`/orders/${orderId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
  return data.order;
}

// ==================== BIDDING ====================

export interface Bid {
  bidId: string;
  userId: string;
  productId: string;
  productName: string;
  duration: number; // in hours
  targetPrice?: number;
  requirements?: string;
  status: 'active' | 'accepted' | 'expired';
  bids: SellerBid[];
  createdAt: string;
  expiresAt: string;
  acceptedBidId?: string;
}

export interface SellerBid {
  id: string;
  sellerId: string;
  sellerName: string;
  price: number;
  deliveryTime: string;
  freebies?: string[];
  message?: string;
  timestamp: string;
}

export async function createBidRequest(userId: string, bidData: {
  productId: string;
  productName: string;
  duration: number;
  targetPrice?: number;
  requirements?: string;
}) {
  const data = await apiCall(`/bids/${userId}`, {
    method: 'POST',
    body: JSON.stringify(bidData),
  });
  return data.bid as Bid;
}

export async function getUserBids(userId: string): Promise<Bid[]> {
  const data = await apiCall(`/bids/${userId}`);
  return data.bids || [];
}

export async function getBid(userId: string, bidId: string): Promise<Bid | null> {
  try {
    const data = await apiCall(`/bids/${userId}/${bidId}`);
    return data.bid;
  } catch (error) {
    console.error('Error fetching bid:', error);
    return null;
  }
}

export async function addSellerBid(bidId: string, sellerBid: Omit<SellerBid, 'timestamp'>) {
  const data = await apiCall(`/bids/${bidId}/seller-bid`, {
    method: 'POST',
    body: JSON.stringify(sellerBid),
  });
  return data.bid as Bid;
}

export async function acceptBid(bidId: string, sellerBidId: string) {
  const data = await apiCall(`/bids/${bidId}/accept`, {
    method: 'POST',
    body: JSON.stringify({ sellerBidId }),
  });
  return data.bid as Bid;
}

// ==================== ANALYTICS ====================

export async function trackProductView(userId: string, productId: string) {
  try {
    await apiCall('/analytics/view', {
      method: 'POST',
      body: JSON.stringify({ userId, productId }),
    });
  } catch (error) {
    console.error('Error tracking view:', error);
  }
}

// ==================== INITIALIZATION ====================

export async function initializeDatabase(products: Product[]) {
  try {
    console.log('Initializing database with products...');
    await seedProducts(products);
    console.log('Database initialized successfully!');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
}
