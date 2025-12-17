import { useState } from 'react';
import { 
  Search, 
  Bell, 
  MapPin, 
  ChevronRight, 
  Sparkles, 
  Zap, 
  TrendingUp,
  Heart,
  Smile,
  Cloud,
  Flame,
  Leaf,
  Gift,
  Tag,
  Users,
  Star,
  Palette,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Screen, Product } from '../App';
import { MOCK_PRODUCTS, CATEGORIES, DELIVERY_SPEEDS, BRANDS } from '../data/mockData';
import { ProductCard } from './ProductCard';

interface HomeScreenProps {
  onNavigate: (screen: Screen, product?: Product) => void;
  onShowFiltered: (title: string, subtitle: string, products: Product[]) => void;
}

export function HomeScreen({ onNavigate, onShowFiltered }: HomeScreenProps) {
  const [selectedDeliverySpeed, setSelectedDeliverySpeed] = useState('10min');

  // Filter functions
  const filterByDeliverySpeed = (speed: string) => {
    setSelectedDeliverySpeed(speed);
    const filtered = MOCK_PRODUCTS.filter(p => p.deliveryTime === speed);
    const speedLabel = DELIVERY_SPEEDS.find(s => s.value === speed)?.label || speed;
    onShowFiltered(
      `${speedLabel} Delivery`,
      `Products available in ${speedLabel}`,
      filtered
    );
  };

  const filterByCategory = (category: string) => {
    const filtered = MOCK_PRODUCTS.filter(p => p.category === category);
    onShowFiltered(
      category,
      `${filtered.length} products in ${category}`,
      filtered
    );
  };

  const filterByBudget = (min: number, max: number, label: string) => {
    const filtered = MOCK_PRODUCTS.filter(p => p.price >= min && p.price <= max);
    onShowFiltered(
      label,
      `${filtered.length} products found`,
      filtered
    );
  };

  const filterByBrand = (brand: string) => {
    const filtered = MOCK_PRODUCTS.filter(p => p.brand === brand);
    onShowFiltered(
      brand,
      `${filtered.length} products available`,
      filtered
    );
  };

  const filterByMood = (mood: string) => {
    const filtered = MOCK_PRODUCTS.filter(p => p.mood === mood);
    onShowFiltered(
      mood,
      `Products that match your ${mood} mood`,
      filtered.length > 0 ? filtered : MOCK_PRODUCTS.slice(0, 10) // Fallback to show some products
    );
  };

  const filterByOccasion = (occasion: string) => {
    const filtered = MOCK_PRODUCTS.filter(p => p.occasion === occasion);
    onShowFiltered(
      occasion,
      `Perfect for ${occasion}`,
      filtered.length > 0 ? filtered : MOCK_PRODUCTS.slice(0, 10)
    );
  };

  const filterByDealType = (dealType: string) => {
    const filtered = MOCK_PRODUCTS.filter(p => p.dealType === dealType);
    onShowFiltered(
      dealType,
      `Hot ${dealType} deals available now`,
      filtered.length > 0 ? filtered : MOCK_PRODUCTS.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 10)
    );
  };

  const filterBySustainable = (sustainable: string) => {
    const filtered = MOCK_PRODUCTS.filter(p => p.sustainable === sustainable);
    onShowFiltered(
      sustainable,
      `${sustainable} products`,
      filtered.length > 0 ? filtered : MOCK_PRODUCTS.filter(p => p.category === 'Groceries' || p.category === 'Beauty').slice(0, 10)
    );
  };

  const filterByForWho = (forWho: string) => {
    const filtered = MOCK_PRODUCTS.filter(p => p.forWho === forWho);
    onShowFiltered(
      forWho,
      `Great products ${forWho.toLowerCase()}`,
      filtered.length > 0 ? filtered : MOCK_PRODUCTS.slice(0, 10)
    );
  };

  const filterByTrending = (trending: string) => {
    const filtered = MOCK_PRODUCTS.filter(p => p.trending === trending);
    onShowFiltered(
      trending,
      `${trending} products right now`,
      filtered.length > 0 ? filtered : MOCK_PRODUCTS.filter(p => p.creator).slice(0, 10)
    );
  };

  const filterByColor = (color: string) => {
    const filtered = MOCK_PRODUCTS.filter(p => p.color === color);
    onShowFiltered(
      `${color} Products`,
      `Shop all ${color.toLowerCase()} colored items`,
      filtered.length > 0 ? filtered : MOCK_PRODUCTS.slice(0, 10)
    );
  };

  return (
    <div className="pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500">Deliver to</p>
              <p className="text-sm">Koramangala, Bangalore</p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center relative">
            <Bell className="w-5 h-5 text-gray-700" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Search Bar */}
        <button
          onClick={() => onNavigate('find-product')}
          className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-2xl"
        >
          <Search className="w-5 h-5 text-gray-400" />
          <span className="text-gray-500">Search products or upload image</span>
        </button>
      </div>

      {/* Shop by Delivery Speed */}
      <div className="bg-white px-4 py-5 mb-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">Shop by Delivery Speed</h2>
          <Zap className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {DELIVERY_SPEEDS.map((speed) => (
            <button
              key={speed.value}
              onClick={() => filterByDeliverySpeed(speed.value)}
              className={`flex-shrink-0 px-5 py-3 rounded-full border-2 transition-all ${
                selectedDeliverySpeed === speed.value
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'bg-white border-gray-200 text-gray-700'
              }`}
            >
              <span className="mr-2">{speed.icon}</span>
              {speed.label}
            </button>
          ))}
        </div>
      </div>

      {/* Shop by Mood - Emotional Commerce */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-5 mb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Smile className="w-5 h-5 text-pink-600" />
            <h2 className="text-lg">Shop by Mood</h2>
          </div>
          <button className="text-pink-600 text-sm flex items-center gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {[
            { emoji: '😊', label: 'Happy Vibes', gradient: 'from-yellow-400 to-orange-400' },
            { emoji: '😌', label: 'Calm & Chill', gradient: 'from-blue-400 to-cyan-400' },
            { emoji: '⚡', label: 'Energetic', gradient: 'from-red-400 to-pink-400' },
            { emoji: '💝', label: 'Romantic', gradient: 'from-pink-400 to-rose-400' },
            { emoji: '🎉', label: 'Celebratory', gradient: 'from-purple-400 to-indigo-400' },
            { emoji: '🧘', label: 'Peaceful', gradient: 'from-green-400 to-teal-400' }
          ].map((mood) => (
            <button
              key={mood.label}
              onClick={() => filterByMood(mood.label)}
              className="flex-shrink-0 w-28 h-28 rounded-2xl bg-gradient-to-br shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center text-white"
              style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
            >
              <div className={`w-full h-full bg-gradient-to-br ${mood.gradient} rounded-2xl flex flex-col items-center justify-center`}>
                <span className="text-3xl mb-2">{mood.emoji}</span>
                <span className="text-xs text-center px-2">{mood.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Shop by Budget */}
      <div className="bg-white px-4 py-5 mb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h2 className="text-lg">Shop by Budget</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => filterByBudget(0, 500, 'Under ₹500')}
            className="p-4 rounded-2xl border-2 bg-green-50 border-green-200 text-green-700 flex items-center gap-3 hover:shadow-md transition-all"
          >
            <span className="text-2xl">💰</span>
            <div className="text-left">
              <p className="text-sm">Under ₹500</p>
            </div>
          </button>
          <button
            onClick={() => filterByBudget(500, 2000, '₹500 - ₹2,000')}
            className="p-4 rounded-2xl border-2 bg-blue-50 border-blue-200 text-blue-700 flex items-center gap-3 hover:shadow-md transition-all"
          >
            <span className="text-2xl">💵</span>
            <div className="text-left">
              <p className="text-sm">₹500 - ₹2,000</p>
            </div>
          </button>
          <button
            onClick={() => filterByBudget(2000, 5000, '₹2,000 - ₹5,000')}
            className="p-4 rounded-2xl border-2 bg-purple-50 border-purple-200 text-purple-700 flex items-center gap-3 hover:shadow-md transition-all"
          >
            <span className="text-2xl">💳</span>
            <div className="text-left">
              <p className="text-sm">₹2,000 - ₹5,000</p>
            </div>
          </button>
          <button
            onClick={() => filterByBudget(5000, 999999, 'Premium ₹5,000+')}
            className="p-4 rounded-2xl border-2 bg-amber-50 border-amber-200 text-amber-700 flex items-center gap-3 hover:shadow-md transition-all"
          >
            <span className="text-2xl">💎</span>
            <div className="text-left">
              <p className="text-sm">Premium ₹5,000+</p>
            </div>
          </button>
        </div>
      </div>

      {/* Shop by Occasion */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-5 mb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg">Shop by Occasion</h2>
          </div>
          <button className="text-orange-600 text-sm flex items-center gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {[
            { name: 'Birthday', icon: '🎂', count: '240+ items' },
            { name: 'Anniversary', icon: '💐', count: '180+ items' },
            { name: 'Wedding', icon: '💍', count: '320+ items' },
            { name: 'Festival', icon: '🪔', count: '450+ items' },
            { name: 'Graduation', icon: '🎓', count: '120+ items' },
            { name: 'New Home', icon: '🏠', count: '280+ items' }
          ].map((occasion) => (
            <button
              key={occasion.name}
              onClick={() => filterByOccasion(occasion.name)}
              className="flex-shrink-0 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border-2 border-orange-100"
            >
              <div className="flex flex-col items-center gap-2 w-20">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
                  {occasion.icon}
                </div>
                <span className="text-xs text-center">{occasion.name}</span>
                <span className="text-xs text-orange-600">{occasion.count}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Shop by Deal Type */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 px-4 py-5 mb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-600" />
            <h2 className="text-lg">Hot Deals Right Now</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { type: 'Flash Sale', icon: '⚡', time: 'Ends in 2h', color: 'bg-red-500' },
            { type: 'Bundle Deals', icon: '📦', discount: 'Save 30%', color: 'bg-purple-500' },
            { type: 'Buy 1 Get 1', icon: '🎁', label: 'BOGO', color: 'bg-green-500' },
            { type: 'Clearance', icon: '🏷️', discount: 'Up to 70%', color: 'bg-orange-500' }
          ].map((deal) => (
            <button
              key={deal.type}
              onClick={() => filterByDealType(deal.type)}
              className={`${deal.color} text-white rounded-2xl p-4 hover:shadow-lg transition-all relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mr-8 -mt-8" />
              <div className="relative">
                <span className="text-3xl mb-2 block">{deal.icon}</span>
                <p className="text-sm mb-1">{deal.type}</p>
                <p className="text-xs opacity-90">{deal.time || deal.discount || deal.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Shop by Sustainability */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-5 mb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            <h2 className="text-lg">Sustainable Shopping</h2>
          </div>
          <button className="text-green-600 text-sm flex items-center gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Eco-Friendly Products', icon: '🌱', desc: 'Biodegradable & recyclable', badge: 'Verified' },
            { label: 'Local & Handmade', icon: '🤲', desc: 'Support local artisans', badge: 'Authentic' },
            { label: 'Organic & Natural', icon: '🍃', desc: 'Chemical-free products', badge: 'Certified' },
            { label: 'Carbon Neutral Delivery', icon: '🚲', desc: 'Eco-friendly shipping', badge: 'Green' }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => filterBySustainable(item.label)}
              className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 border-2 border-green-200 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm mb-1">{item.label}</p>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
              <div className="px-3 py-1 bg-green-100 rounded-full">
                <span className="text-xs text-green-700">{item.badge}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Shop by Who It's For */}
      <div className="bg-white px-4 py-5 mb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg">Who Are You Shopping For?</h2>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'For Me', icon: '🙋', color: 'from-blue-400 to-blue-500' },
            { label: 'For Him', icon: '👨', color: 'from-indigo-400 to-indigo-500' },
            { label: 'For Her', icon: '👩', color: 'from-pink-400 to-pink-500' },
            { label: 'For Kids', icon: '👶', color: 'from-yellow-400 to-yellow-500' },
            { label: 'For Pets', icon: '🐾', color: 'from-orange-400 to-orange-500' },
            { label: 'For Home', icon: '🏡', color: 'from-green-400 to-green-500' }
          ].map((recipient) => (
            <button
              key={recipient.label}
              onClick={() => filterByForWho(recipient.label)}
              className={`bg-gradient-to-br ${recipient.color} text-white rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-lg transition-all`}
            >
              <span className="text-3xl">{recipient.icon}</span>
              <span className="text-xs text-center">{recipient.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Shop by Trending */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-5 mb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg">What's Trending</h2>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Viral on Social Media', icon: '📱', count: '1.2M views', trend: '+156%' },
            { label: 'Celebrity Favorites', icon: '⭐', count: '50+ picks', trend: 'Hot' },
            { label: 'New Arrivals This Week', icon: '🆕', count: '340+ items', trend: 'Fresh' },
            { label: 'Best Sellers Near You', icon: '🔥', count: '2.8K sold', trend: '+89%' }
          ].map((trend) => (
            <button
              key={trend.label}
              onClick={() => filterByTrending(trend.label)}
              className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 border-2 border-indigo-200 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                {trend.icon}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm mb-1">{trend.label}</p>
                <p className="text-xs text-gray-600">{trend.count}</p>
              </div>
              <div className="px-3 py-1 bg-indigo-500 rounded-full">
                <span className="text-xs text-white">{trend.trend}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Shop by Color - Visual Shopping */}
      <div className="bg-white px-4 py-5 mb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg">Shop by Color</h2>
          </div>
          <button className="text-purple-600 text-sm flex items-center gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {[
            { name: 'Red', hex: '#EF4444', items: '420+' },
            { name: 'Blue', hex: '#3B82F6', items: '580+' },
            { name: 'Green', hex: '#10B981', items: '340+' },
            { name: 'Yellow', hex: '#F59E0B', items: '290+' },
            { name: 'Purple', hex: '#A855F7', items: '310+' },
            { name: 'Pink', hex: '#EC4899', items: '450+' },
            { name: 'Black', hex: '#000000', items: '720+' },
            { name: 'White', hex: '#FFFFFF', items: '680+', border: true }
          ].map((color) => (
            <button
              key={color.name}
              onClick={() => filterByColor(color.name)}
              className="flex-shrink-0 flex flex-col items-center gap-2"
            >
              <div 
                className={`w-16 h-16 rounded-full shadow-md hover:shadow-lg transition-all ${color.border ? 'border-2 border-gray-300' : ''}`}
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-xs text-gray-700">{color.name}</span>
              <span className="text-xs text-gray-500">{color.items}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white px-4 py-5 mb-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">Shop by Category</h2>
          <button className="text-blue-500 text-sm flex items-center gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {CATEGORIES.map((category) => (
            <button
              key={category.name}
              onClick={() => filterByCategory(category.name)}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center text-2xl`}>
                {category.icon}
              </div>
              <span className="text-xs text-gray-700 text-center">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="bg-white px-4 py-5 mb-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">Top Brands</h2>
          <button className="text-blue-500 text-sm flex items-center gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {BRANDS.map((brand) => (
            <button
              key={brand.name}
              onClick={() => filterByBrand(brand.name)}
              className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden"
            >
              <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Featured Deals */}
      <div className="px-4 py-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg">Featured Deals</h2>
            <div className="px-2 py-1 bg-red-100 rounded-full">
              <span className="text-red-600 text-xs">Limited Time</span>
            </div>
          </div>
          <button className="text-blue-500 text-sm flex items-center gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {MOCK_PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onNavigate('product-detail', product)}
            />
          ))}
        </div>
      </div>

      {/* Trending Creator Picks */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 px-4 py-5 mb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg">Trending Creator Picks</h2>
          </div>
          <button className="text-purple-600 text-sm flex items-center gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {MOCK_PRODUCTS.filter(p => p.creator).slice(0, 3).map((product) => (
            <button
              key={product.id}
              onClick={() => onNavigate('product-detail', product)}
              className="w-full bg-white rounded-2xl p-3 flex gap-3 shadow-sm"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1 text-left">
                <p className="text-sm mb-1 line-clamp-2">{product.name}</p>
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={product.creator?.avatar}
                    alt={product.creator?.name}
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="text-xs text-gray-600">{product.creator?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p>₹{product.price.toLocaleString('en-IN')}</p>
                  <span className="text-xs text-green-600">{product.deliveryTime}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="px-4 py-5">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg">Picked for You</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {MOCK_PRODUCTS.slice(2, 6).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onNavigate('product-detail', product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}