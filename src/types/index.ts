export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  video?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  brand: string;
  inStock: boolean;
  deliveryTime: string;
  sellers: Seller[];
  variants?: ProductVariant[];
  creator?: Creator;
}

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  price: number;
  deliveryTime: string;
  rating: number;
  badge?: 'fast_delivery' | 'best_price' | 'trusted';
  confidence: number;
}

export interface ProductVariant {
  id: string;
  type: string;
  options: string[];
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  isVerified: boolean;
  storeName?: string;
}

export interface BidRequest {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  status: 'pending' | 'active' | 'completed' | 'expired';
  bids: Bid[];
  createdAt: Date;
  expiresAt: Date;
}

export interface Bid {
  id: string;
  seller: Seller;
  price: number;
  deliveryTime: string;
  message?: string;
  timestamp: Date;
}

export interface CartItem {
  id: string;
  product: Product;
  seller: Seller;
  quantity: number;
  variant?: Record<string, string>;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'confirmed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered';
  deliveryAddress: string;
  deliverySlot: string;
  createdAt: Date;
  estimatedDelivery: Date;
  deliveryPartner?: {
    name: string;
    phone: string;
    avatar: string;
  };
}

export interface FindMeProductRequest {
  id: string;
  type: 'photo' | 'voice' | 'text';
  query: string;
  photo?: string;
  status: 'searching' | 'found' | 'not_found';
  results?: Product[];
  createdAt: Date;
}
