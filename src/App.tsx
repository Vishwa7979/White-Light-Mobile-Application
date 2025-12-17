import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LandingPage } from './components/LandingPage';
import { Onboarding } from './components/Onboarding';
import { HomeScreen } from './components/HomeScreen';
import { ExploreFeed } from './components/ExploreFeed';
import { ProductDetail } from './components/ProductDetail';
import { BiddingFlow } from './components/BiddingFlow';
import { FindMeProduct } from './components/FindMeProduct';
import { Cart } from './components/Cart';
import { OrderTracking } from './components/OrderTracking';
import { Profile } from './components/Profile';
import { Navigation } from './components/Navigation';
import { FilteredProducts } from './components/FilteredProducts';
import { MOCK_PRODUCTS } from './data/mockData';
import * as db from './services/database';

export type Screen = 
  | 'splash'
  | 'landing'
  | 'onboarding' 
  | 'home' 
  | 'explore' 
  | 'product-detail' 
  | 'bidding' 
  | 'find-product'
  | 'cart' 
  | 'orders' 
  | 'profile'
  | 'filtered-products';

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
  // Extended metadata for advanced filtering
  mood?: string; // 'Happy Vibes', 'Calm & Chill', 'Energetic', 'Romantic', 'Celebratory', 'Peaceful'
  occasion?: string; // 'Birthday', 'Anniversary', 'Wedding', 'Festival', 'Graduation', 'New Home'
  dealType?: string; // 'Flash Sale', 'Bundle Deals', 'Buy 1 Get 1', 'Clearance'
  sustainable?: string; // 'Eco-Friendly', 'Local & Handmade', 'Organic & Natural', 'Carbon Neutral'
  forWho?: string; // 'For Me', 'For Him', 'For Her', 'For Kids', 'For Pets', 'For Home'
  trending?: string; // 'Viral', 'Celebrity', 'New Arrival', 'Best Seller'
  color?: string; // 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink', 'Black', 'White'
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSeller: string;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterSubtitle, setFilterSubtitle] = useState('');
  const [userId] = useState(() => {
    // Get or create user ID
    let id = localStorage.getItem('whitelight_user_id');
    if (!id) {
      id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('whitelight_user_id', id);
    }
    return id;
  });
  const [isDbInitialized, setIsDbInitialized] = useState(false);

  // Initialize database with products on first load
  useEffect(() => {
    const initDb = async () => {
      try {
        // Check if already initialized
        const initialized = localStorage.getItem('whitelight_db_initialized');
        if (!initialized) {
          console.log('🚀 WhiteLight Database Setup');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('📦 Seeding products to Supabase...');
          await db.initializeDatabase(MOCK_PRODUCTS);
          localStorage.setItem('whitelight_db_initialized', 'true');
          console.log('✅ Database initialized successfully!');
          console.log(`📊 ${MOCK_PRODUCTS.length} products seeded`);
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        } else {
          console.log('✅ Database already initialized');
          console.log('🔄 Loading data from Supabase...');
        }
        setIsDbInitialized(true);
      } catch (error) {
        console.error('❌ Error initializing database:', error);
        console.log('⚠️  Continuing with fallback local data...');
        setIsDbInitialized(true); // Continue even if db init fails
      }
    };
    
    initDb();
  }, []);

  // Load user's cart from database
  useEffect(() => {
    if (isDbInitialized && userId) {
      loadCart();
    }
  }, [isDbInitialized, userId]);

  const loadCart = async () => {
    try {
      const cartData = await db.getCart(userId);
      setCart(cartData.items || []);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const navigateTo = (screen: Screen, product?: Product) => {
    if (product) {
      setSelectedProduct(product);
    }
    setCurrentScreen(screen);
  };

  const showFilteredProducts = (title: string, subtitle: string, products: Product[]) => {
    setFilterTitle(title);
    setFilterSubtitle(subtitle);
    setFilteredProducts(products);
    setCurrentScreen('filtered-products');
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setCurrentScreen('home');
  };

  const addToCart = async (item: CartItem) => {
    try {
      const updatedCart = await db.addToCart(userId, item);
      setCart(updatedCart.items || []);
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Fallback to local state
      setCart([...cart, item]);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentScreen('landing')} />;
      case 'landing':
        return <LandingPage onComplete={() => setCurrentScreen('onboarding')} />;
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'home':
        return <HomeScreen onNavigate={navigateTo} onShowFiltered={showFilteredProducts} />;
      case 'explore':
        return <ExploreFeed onNavigate={navigateTo} />;
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onNavigate={navigateTo}
            onAddToCart={addToCart}
          />
        ) : null;
      case 'bidding':
        return selectedProduct ? (
          <BiddingFlow 
            product={selectedProduct} 
            onNavigate={navigateTo}
            onAddToCart={addToCart}
          />
        ) : null;
      case 'find-product':
        return <FindMeProduct onNavigate={navigateTo} />;
      case 'cart':
        return <Cart items={cart} onNavigate={navigateTo} />;
      case 'orders':
        return <OrderTracking onNavigate={navigateTo} />;
      case 'profile':
        return <Profile onNavigate={navigateTo} />;
      case 'filtered-products':
        return <FilteredProducts 
          title={filterTitle} 
          subtitle={filterSubtitle} 
          products={filteredProducts} 
          onNavigate={navigateTo}
          onBack={() => setCurrentScreen('home')}
        />;
      default:
        return <HomeScreen onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto bg-white min-h-screen relative">
        {renderScreen()}
        
        {/* Bottom Navigation - Hide on onboarding and full-screen experiences */}
        {hasCompletedOnboarding && 
         currentScreen !== 'splash' &&
         currentScreen !== 'landing' &&
         currentScreen !== 'onboarding' && 
         currentScreen !== 'explore' && 
         currentScreen !== 'bidding' && 
         currentScreen !== 'find-product' &&
         currentScreen !== 'filtered-products' && (
          <Navigation 
            currentScreen={currentScreen} 
            onNavigate={navigateTo}
            cartCount={cart.length}
          />
        )}
      </div>
    </div>
  );
}

export default App;