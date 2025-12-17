import { Home, Search, ShoppingCart, Package, User } from 'lucide-react';
import { Screen } from '../App';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  cartCount: number;
}

export function Navigation({ currentScreen, onNavigate, cartCount }: NavigationProps) {
  const navItems = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'explore' as Screen, icon: Search, label: 'Explore' },
    { id: 'cart' as Screen, icon: ShoppingCart, label: 'Cart', badge: cartCount },
    { id: 'orders' as Screen, icon: Package, label: 'Orders' },
    { id: 'profile' as Screen, icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-1 px-4 py-2 relative"
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive ? 'text-blue-500' : 'text-gray-400'
                  }`}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">{item.badge > 9 ? '9+' : item.badge}</span>
                  </div>
                )}
              </div>
              <span
                className={`text-xs transition-colors ${
                  isActive ? 'text-blue-500' : 'text-gray-500'
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
