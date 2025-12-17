import { Search, Bell, MapPin, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onSearch?: () => void;
  onNotifications?: () => void;
  showLocation?: boolean;
  location?: string;
}

export function Header({
  onSearch,
  onNotifications,
  showLocation = true,
  location = 'New York, NY 10001'
}: HeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-md mx-auto px-4 py-3">
        {/* Top row - Logo and icons */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white">W</span>
            </div>
            <h1 className="text-gray-900">WhiteLight</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNotifications}
              className="relative p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <Bell size={20} className="text-gray-700" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></div>
            </button>
          </div>
        </div>

        {/* Location */}
        {showLocation && (
          <button className="flex items-center gap-1 mb-3 hover:bg-gray-50 rounded-lg px-2 py-1 -ml-2 transition-colors">
            <MapPin size={16} className="text-indigo-600" />
            <span className="text-gray-900 text-sm">{location}</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
        )}

        {/* Search bar */}
        <button
          onClick={onSearch}
          className="w-full flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 hover:bg-gray-100 transition-colors"
        >
          <Search size={20} className="text-gray-400" />
          <span className="text-gray-400">Search products, brands, creators...</span>
        </button>
      </div>
    </div>
  );
}
