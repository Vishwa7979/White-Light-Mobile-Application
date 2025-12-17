// WhiteLight - TypeScript Type Definitions

export interface Product {
  id: string;
  name: string;
  image: string;
  video?: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  creator?: {
    name: string;
    avatar: string;
    followers: string;
  };
  sellers: Seller[];
  variants?: Variant[];
  // Extended metadata for advanced filtering
  mood?: string;
  occasion?: string;
  dealType?: string;
  sustainable?: string;
  forWho?: string;
  trending?: string;
  color?: string;
}

export interface Seller {
  id: string;
  name: string;
  price: number;
  rating: number;
  deliveryTime: string;
  badges: string[];
}

export interface Variant {
  type: string;
  options: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSeller: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered';
  createdAt: string;
  deliveryAddress: string;
  estimatedDelivery: string;
}

export interface BidRequest {
  id: string;
  productId: string;
  userId: string;
  duration: '1hr' | '4hrs' | '12hrs' | '24hrs';
  createdAt: string;
  expiresAt: string;
  status: 'active' | 'expired' | 'accepted';
  bids: SellerBid[];
}

export interface SellerBid {
  id: string;
  sellerId: string;
  sellerName: string;
  price: number;
  deliveryTime: string;
  freebies: string[];
  message: string;
  rating: number;
  submittedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  location: string;
  interests: string[];
  deliveryPreference: string;
}

export interface UserPreferences {
  interests: string[];
  location: string;
  deliveryPreference: string;
  notifications: boolean;
}

export type Screen =
  | 'Splash'
  | 'Landing'
  | 'Onboarding'
  | 'Home'
  | 'Explore'
  | 'ProductDetail'
  | 'Bidding'
  | 'FindProduct'
  | 'Cart'
  | 'Orders'
  | 'Profile'
  | 'FilteredProducts';
