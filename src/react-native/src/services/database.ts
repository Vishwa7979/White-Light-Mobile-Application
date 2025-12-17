// WhiteLight - Database Service for React Native (unchanged from web version)

import { Product, CartItem, Order, BidRequest } from '../types';

// These should be stored in environment variables or config
const PROJECT_ID = 'your-project-id'; // Replace with your Supabase project ID
const PUBLIC_ANON_KEY = 'your-anon-key'; // Replace with your Supabase anon key

const BASE_URL = `https://${PROJECT_ID}.supabase.co/functions/v1/make-server-4971ce97`;

// Helper function to make API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PUBLIC_ANON_KEY}`,
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

export async function createOrder(userId: string, orderData: {
  items: CartItem[];
  total: number;
  deliveryAddress: string;
  paymentMethod: string;
}) {
  const data = await apiCall(`/orders/${userId}`, {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
  return data.order;
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const data = await apiCall(`/orders/${userId}`);
  return data.orders || [];
}

export async function getOrder(userId: string, orderId: string) {
  const data = await apiCall(`/orders/${userId}/${orderId}`);
  return data.order;
}

export async function updateOrderStatus(orderId: string, status: string) {
  return apiCall(`/orders/${orderId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

// ==================== BIDDING ====================

export async function createBidRequest(userId: string, bidData: {
  productId: string;
  duration: '1hr' | '4hrs' | '12hrs' | '24hrs';
}) {
  const data = await apiCall(`/bids/${userId}`, {
    method: 'POST',
    body: JSON.stringify(bidData),
  });
  return data.bid;
}

export async function getUserBids(userId: string): Promise<BidRequest[]> {
  const data = await apiCall(`/bids/${userId}`);
  return data.bids || [];
}

export async function getBidDetails(userId: string, bidId: string) {
  const data = await apiCall(`/bids/${userId}/${bidId}`);
  return data.bid;
}

export async function submitSellerBid(bidId: string, bidData: {
  sellerId: string;
  sellerName: string;
  price: number;
  deliveryTime: string;
  freebies: string[];
  message: string;
}) {
  return apiCall(`/bids/${bidId}/seller-bid`, {
    method: 'POST',
    body: JSON.stringify(bidData),
  });
}

export async function acceptBid(bidId: string, sellerBidId: string) {
  return apiCall(`/bids/${bidId}/accept`, {
    method: 'POST',
    body: JSON.stringify({ sellerBidId }),
  });
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
