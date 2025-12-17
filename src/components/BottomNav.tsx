import { Home, Compass, ShoppingCart, User } from 'lucide-react';

interface BottomNavProps {
  active: string;
  onNavigate: (screen: string) => void;
  cartCount?: number;
}

export function BottomNav({ active, onNavigate, cartCount = 0 }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'cart', label: 'Cart', icon: ShoppingCart },
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto flex items-center justify-around px-4 py-2 safe-area-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center flex-1 py-2 relative"
            >
              <div className="relative">
                <Icon
                  size={24}
                  className={`transition-colors ${
                    isActive ? 'text-indigo-600' : 'text-gray-400'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {item.id === 'cart' && cartCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartCount > 9 ? '9+' : cartCount}
                  </div>
                )}
              </div>
              <span
                className={`text-xs mt-1 transition-colors ${
                  isActive ? 'text-indigo-600' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
