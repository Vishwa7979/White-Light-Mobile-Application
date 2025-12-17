import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  Heart,
  Share2,
  Star,
  Clock,
  MapPin,
  Shield,
  TrendingDown,
  Search,
  Zap,
  ChevronRight
} from 'lucide-react';
import { Screen, Product, CartItem } from '../App';

interface ProductDetailProps {
  product: Product;
  onNavigate: (screen: Screen, product?: Product) => void;
  onAddToCart: (item: CartItem) => void;
}

export function ProductDetail({ product, onNavigate, onAddToCart }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSeller, setSelectedSeller] = useState(product.sellers[0]);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [showSellerComparison, setShowSellerComparison] = useState(false);

  const images = [product.image, product.image, product.image]; // Mock multiple images

  const handleBuyNow = () => {
    onAddToCart({
      product,
      quantity,
      selectedSeller: selectedSeller.id
    });
    onNavigate('cart');
  };

  const handleFindBestPrice = () => {
    onNavigate('bidding', product);
  };

  const handleFindProduct = () => {
    onNavigate('find-product');
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white px-4 py-3 flex items-center justify-between border-b">
        <button
          onClick={() => onNavigate('home')}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Image Gallery */}
        <div className="relative bg-gray-50">
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="w-full h-80 object-cover"
          />
          {product.originalPrice && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm rounded-full">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedImage === index ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="px-4 py-5 border-b">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h1 className="text-xl mb-2">{product.name}</h1>
              <p className="text-sm text-gray-600 mb-3">{product.brand}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{selectedSeller.deliveryTime}</span>
            </div>
          </div>

          <div className="flex items-end gap-3">
            <p className="text-3xl">₹{selectedSeller.price.toLocaleString('en-IN')}</p>
            {product.originalPrice && (
              <p className="text-lg text-gray-400 line-through mb-1">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </p>
            )}
          </div>
        </div>

        {/* Creator Info */}
        {product.creator && (
          <div className="px-4 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b">
            <p className="text-xs text-gray-600 mb-2">Recommended by</p>
            <div className="flex items-center gap-3">
              <img
                src={product.creator.avatar}
                alt={product.creator.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <p>{product.creator.name}</p>
                <p className="text-sm text-gray-600">{product.creator.followers} followers</p>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm">
                Follow
              </button>
            </div>
          </div>
        )}

        {/* Seller Selection */}
        <div className="px-4 py-5 border-b">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg">Selected Seller</h3>
            <button
              onClick={() => setShowSellerComparison(!showSellerComparison)}
              className="text-blue-500 text-sm flex items-center gap-1"
            >
              Compare {product.sellers.length} sellers
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-blue-50 rounded-2xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p>{selectedSeller.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{selectedSeller.rating}</span>
                  </div>
                  <span className="text-xs text-gray-600">•</span>
                  <span className="text-xs text-gray-600">{selectedSeller.deliveryTime}</span>
                </div>
              </div>
              <p>₹{selectedSeller.price.toLocaleString('en-IN')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSeller.badges.map((badge) => (
                <span
                  key={badge}
                  className="text-xs px-2 py-1 bg-white rounded-full text-blue-600"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {showSellerComparison && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-3 space-y-2"
            >
              {product.sellers
                .filter(s => s.id !== selectedSeller.id)
                .map((seller) => (
                  <button
                    key={seller.id}
                    onClick={() => setSelectedSeller(seller)}
                    className="w-full bg-gray-50 rounded-2xl p-4 text-left"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-sm">{seller.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{seller.rating}</span>
                          </div>
                          <span className="text-xs text-gray-600">•</span>
                          <span className="text-xs text-gray-600">{seller.deliveryTime}</span>
                        </div>
                      </div>
                      <p className="text-sm">₹{seller.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {seller.badges.map((badge) => (
                        <span
                          key={badge}
                          className="text-xs px-2 py-1 bg-white rounded-full text-gray-600"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
            </motion.div>
          )}
        </div>

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <div className="px-4 py-5 border-b">
            {product.variants.map((variant) => (
              <div key={variant.type} className="mb-4 last:mb-0">
                <p className="text-sm text-gray-600 mb-3">
                  Select {variant.type}
                </p>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map((option) => (
                    <button
                      key={option}
                      onClick={() =>
                        setSelectedVariants({ ...selectedVariants, [variant.type]: option })
                      }
                      className={`px-4 py-2 rounded-full border-2 transition-all ${
                        selectedVariants[variant.type] === option
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'bg-white border-gray-200 text-gray-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delivery Info */}
        <div className="px-4 py-5 border-b">
          <h3 className="text-lg mb-4">Delivery Information</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm">Deliver to Koramangala, Bangalore</p>
                <p className="text-xs text-green-600 mt-1">Available for {selectedSeller.deliveryTime} delivery</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm">Secure packaging & 7-day return</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Preview */}
        <div className="px-4 py-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg">Reviews & Ratings</h3>
            <button className="text-blue-500 text-sm">View All</button>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-center">
                <p className="text-3xl mb-1">{product.rating}</p>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${
                        star <= Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600">{product.reviews} reviews</p>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs w-4">{star}★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : 5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA - THREE PRIMARY ACTIONS */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20">
        <div className="max-w-md mx-auto px-4 py-4">
          {/* Primary Action - Buy Now */}
          <button
            onClick={handleBuyNow}
            className="w-full bg-blue-500 text-white py-4 rounded-2xl flex items-center justify-center gap-2 mb-3"
          >
            <Zap className="w-5 h-5" />
            <span>Buy Now - ₹{selectedSeller.price.toLocaleString('en-IN')}</span>
          </button>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleFindBestPrice}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-blue-500 text-blue-500"
            >
              <TrendingDown className="w-5 h-5" />
              <span className="text-sm">Find Best Price</span>
            </button>
            <button
              onClick={handleFindProduct}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-purple-500 text-purple-500"
            >
              <Search className="w-5 h-5" />
              <span className="text-sm">Find Product</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
