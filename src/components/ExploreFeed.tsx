import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Share2, Bookmark, Play, ChevronLeft } from 'lucide-react';
import { Screen, Product } from '../App';
import { MOCK_PRODUCTS } from '../data/mockData';

interface ExploreFeedProps {
  onNavigate: (screen: Screen, product?: Product) => void;
}

export function ExploreFeed({ onNavigate }: ExploreFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const creatorProducts = MOCK_PRODUCTS.filter(p => p.creator);

  const toggleLike = (id: string) => {
    const newLiked = new Set(liked);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLiked(newLiked);
  };

  const toggleSave = (id: string) => {
    const newSaved = new Set(saved);
    if (newSaved.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
    }
    setSaved(newSaved);
  };

  return (
    <div className="h-screen bg-black overflow-hidden relative">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('home')}
        className="absolute top-4 left-4 z-20 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Vertical Feed */}
      <div className="h-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar">
        {creatorProducts.map((product, index) => (
          <div
            key={product.id}
            className="h-screen snap-start relative flex items-center justify-center"
          >
            {/* Product Image/Video Background */}
            <div className="absolute inset-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
            </div>

            {/* Play Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-10">
              <button
                onClick={() => toggleLike(product.id)}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Heart
                    className={`w-6 h-6 ${
                      liked.has(product.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-white'
                    }`}
                  />
                </div>
                <span className="text-white text-xs">
                  {liked.has(product.id) ? '12.4K' : '12.3K'}
                </span>
              </button>

              <button className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-xs">1.2K</span>
              </button>

              <button
                onClick={() => toggleSave(product.id)}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Bookmark
                    className={`w-6 h-6 ${
                      saved.has(product.id)
                        ? 'fill-white text-white'
                        : 'text-white'
                    }`}
                  />
                </div>
              </button>

              <button className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
              </button>

              {/* Creator Avatar */}
              <button className="relative">
                <img
                  src={product.creator?.avatar}
                  alt={product.creator?.name}
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black">
                  <span className="text-white text-xs">+</span>
                </div>
              </button>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-20 left-4 right-20 z-10 text-white">
              {/* Creator Info */}
              <div className="flex items-center gap-2 mb-3">
                <img
                  src={product.creator?.avatar}
                  alt={product.creator?.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm">{product.creator?.name}</p>
                  <p className="text-xs text-white/70">{product.creator?.followers} followers</p>
                </div>
                <button className="ml-auto px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  Follow
                </button>
              </div>

              {/* Product Info */}
              <p className="text-sm mb-2 line-clamp-2">
                Check out this amazing {product.name}! 
                {product.originalPrice && ' 🔥 Limited time deal!'}
              </p>
              
              {/* Product Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  #{product.category}
                </span>
                <span className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  #{product.brand}
                </span>
                <span className="text-xs bg-green-500/80 backdrop-blur-sm px-3 py-1 rounded-full">
                  {product.deliveryTime} delivery
                </span>
              </div>

              {/* View Product CTA */}
              <button
                onClick={() => onNavigate('product-detail', product)}
                className="w-full bg-white text-black py-3 rounded-full flex items-center justify-center gap-2"
              >
                <span>View Product</span>
                <span>₹{product.price.toLocaleString('en-IN')}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
