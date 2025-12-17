import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  Camera,
  Mic,
  Type,
  Upload,
  Sparkles,
  Clock,
  Star,
  Check
} from 'lucide-react';
import { Screen } from '../App';

interface FindMeProductProps {
  onNavigate: (screen: Screen) => void;
}

interface ProductResponse {
  id: string;
  name: string;
  image: string;
  price: number;
  deliveryTime: string;
  seller: {
    name: string;
    rating: number;
  };
  confidence: number;
}

export function FindMeProduct({ onNavigate }: FindMeProductProps) {
  const [mode, setMode] = useState<'select' | 'photo' | 'voice' | 'text' | 'results'>('select');
  const [textQuery, setTextQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<ProductResponse[]>([]);

  const handlePhotoUpload = () => {
    setMode('photo');
    // Simulate photo upload
    setTimeout(() => {
      searchProducts('Uploaded photo');
    }, 1000);
  };

  const handleVoiceInput = () => {
    setMode('voice');
    // Simulate voice recording
    setTimeout(() => {
      searchProducts('Voice query: Looking for wireless headphones');
    }, 3000);
  };

  const handleTextSearch = () => {
    if (textQuery.trim()) {
      searchProducts(textQuery);
    }
  };

  const searchProducts = (query: string) => {
    setIsSearching(true);
    setMode('results');

    // Simulate AI search
    setTimeout(() => {
      setResults([
        {
          id: '1',
          name: 'Sony WH-1000XM5 Wireless Headphones',
          image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
          price: 26990,
          deliveryTime: '3 hrs',
          seller: {
            name: 'Audio World',
            rating: 4.8
          },
          confidence: 95
        },
        {
          id: '2',
          name: 'Bose QuietComfort 45',
          image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400',
          price: 24990,
          deliveryTime: 'Same day',
          seller: {
            name: 'Sound Store',
            rating: 4.7
          },
          confidence: 88
        },
        {
          id: '3',
          name: 'Apple AirPods Max',
          image: 'https://images.unsplash.com/photo-1625155730107-c5c6c8f1e5b7?w=400',
          price: 54990,
          deliveryTime: '10 min',
          seller: {
            name: 'Apple Premium',
            rating: 5.0
          },
          confidence: 82
        }
      ]);
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white px-4 py-3 border-b">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg">Find Me Product</h1>
            <p className="text-xs text-gray-600">We'll help you find exactly what you need</p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Selection Mode */}
        {mode === 'select' && (
          <motion.div
            key="select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-y-auto px-4 py-8"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl mb-2">How would you like to search?</h2>
              <p className="text-sm text-gray-600">
                Choose your preferred method to find the product
              </p>
            </div>

            <div className="space-y-4 max-w-sm mx-auto">
              {/* Photo Upload */}
              <button
                onClick={handlePhotoUpload}
                className="w-full bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="mb-1">Upload a Photo</p>
                    <p className="text-sm text-gray-600">
                      Take or upload a product image
                    </p>
                  </div>
                </div>
              </button>

              {/* Voice Input */}
              <button
                onClick={handleVoiceInput}
                className="w-full bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center">
                    <Mic className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="mb-1">Voice Search</p>
                    <p className="text-sm text-gray-600">
                      Describe what you're looking for
                    </p>
                  </div>
                </div>
              </button>

              {/* Text Input */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center">
                    <Type className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="mb-1">Type to Search</p>
                    <p className="text-sm text-gray-600">
                      Enter product details
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={textQuery}
                    onChange={(e) => setTextQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTextSearch()}
                    placeholder="e.g., wireless headphones with noise cancellation"
                    className="w-full px-4 py-3 rounded-xl border-2 border-orange-300 focus:border-orange-500 focus:outline-none"
                  />
                  <button
                    onClick={handleTextSearch}
                    disabled={!textQuery.trim()}
                    className={`w-full py-3 rounded-xl transition-all ${
                      textQuery.trim()
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* AI Features */}
            <div className="mt-8 bg-blue-50 rounded-2xl p-5 max-w-sm mx-auto">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <p className="text-sm">AI-Powered Search</p>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Understands natural language & images</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Matches with verified sellers & creators</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Real-time price comparison</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Photo Upload Mode */}
        {mode === 'photo' && (
          <motion.div
            key="photo"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex-1 flex flex-col items-center justify-center px-4"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-32 h-32 bg-blue-100 rounded-3xl flex items-center justify-center mb-6"
            >
              <Upload className="w-16 h-16 text-blue-600" />
            </motion.div>
            <h2 className="text-xl mb-2">Analyzing image...</h2>
            <p className="text-sm text-gray-600 text-center">
              Our AI is identifying the product
            </p>
          </motion.div>
        )}

        {/* Voice Input Mode */}
        {mode === 'voice' && (
          <motion.div
            key="voice"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex-1 flex flex-col items-center justify-center px-4"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-6"
            >
              <Mic className="w-16 h-16 text-green-600" />
            </motion.div>
            <h2 className="text-xl mb-2">Listening...</h2>
            <p className="text-sm text-gray-600 text-center max-w-xs">
              Speak clearly. Tell us what you're looking for.
            </p>
            <div className="flex gap-2 mt-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  animate={{ height: [20, 40, 20] }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                  className="w-2 bg-green-500 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Results Mode */}
        {mode === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 overflow-y-auto"
          >
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-20 px-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-6"
                />
                <h2 className="text-xl mb-2">Searching...</h2>
                <p className="text-sm text-gray-600 text-center">
                  AI is analyzing and matching with sellers
                </p>
              </div>
            ) : (
              <div className="px-4 py-6">
                <div className="mb-6">
                  <h2 className="text-xl mb-2">Found {results.length} matches</h2>
                  <p className="text-sm text-gray-600">
                    Results sorted by relevance and price
                  </p>
                </div>

                <div className="space-y-4">
                  {results.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden"
                    >
                      <div className="flex gap-3 p-4">
                        <img
                          src={result.image}
                          alt={result.name}
                          className="w-24 h-24 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <p className="text-sm flex-1 line-clamp-2 pr-2">{result.name}</p>
                            <div className="px-2 py-1 bg-green-100 rounded-full">
                              <p className="text-xs text-green-700">{result.confidence}% match</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">{result.seller.rating}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-600">{result.seller.name}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-lg">₹{result.price.toLocaleString('en-IN')}</p>
                            <div className="flex items-center gap-1 text-green-600">
                              <Clock className="w-3 h-3" />
                              <span className="text-xs">{result.deliveryTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 border-t">
                        <button className="py-3 text-sm text-blue-600 border-r">
                          View Details
                        </button>
                        <button className="py-3 text-sm text-purple-600 border-r">
                          Best Price
                        </button>
                        <button className="py-3 text-sm text-green-600">
                          Buy Now
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Try Different Search */}
                <button
                  onClick={() => {
                    setMode('select');
                    setTextQuery('');
                    setResults([]);
                  }}
                  className="w-full mt-6 py-3 border-2 border-gray-300 rounded-2xl text-gray-700"
                >
                  Try Different Search
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
