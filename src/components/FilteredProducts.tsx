import { ChevronLeft } from 'lucide-react';
import { Screen, Product } from '../App';
import { ProductCard } from './ProductCard';

interface FilteredProductsProps {
  title: string;
  subtitle?: string;
  products: Product[];
  onNavigate: (screen: Screen, product?: Product) => void;
  onBack: () => void;
}

export function FilteredProducts({ title, subtitle, products, onNavigate, onBack }: FilteredProductsProps) {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white px-4 py-3 border-b">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg">{title}</h1>
            {subtitle && <p className="text-xs text-gray-600">{subtitle}</p>}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 pb-20">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onNavigate('product-detail', product)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-5xl">🔍</span>
            </div>
            <h2 className="text-xl mb-2 text-center">No products found</h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              We couldn't find any products matching your criteria
            </p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-blue-500 text-white rounded-full"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
