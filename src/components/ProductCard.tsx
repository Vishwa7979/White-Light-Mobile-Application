import { Star, Clock } from 'lucide-react';
import { Product } from '../App';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
            {discount}% OFF
          </div>
        )}
        {product.creator && (
          <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <img
              src={product.creator.avatar}
              alt={product.creator.name}
              className="w-4 h-4 rounded-full"
            />
            <span className="text-white text-xs truncate">{product.creator.name}</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-sm mb-2 line-clamp-2 min-h-[2.5rem]">{product.name}</p>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-600">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm">₹{product.price.toLocaleString('en-IN')}</p>
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <Clock className="w-3 h-3" />
            <span className="text-xs">{product.deliveryTime}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
