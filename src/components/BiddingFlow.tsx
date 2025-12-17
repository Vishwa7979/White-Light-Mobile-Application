import {
  ChevronLeft,
  Clock,
  TrendingDown,
  Star,
  Zap,
  Shield,
  CheckCircle,
  XCircle,
  MessageSquare,
  MapPin,
  Gift,
  Package
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, Product } from '../App';

interface BiddingFlowProps {
  product: Product;
  onNavigate: (screen: Screen, product?: Product) => void;
  onAddToCart?: (item: { product: Product; quantity: number; selectedSeller: string; acceptedBid?: Bid }) => void;
}

interface Bid {
  id: string;
  seller: {
    name: string;
    rating: number;
    badges: string[];
    distance: string; // Distance from user location
  };
  price: number;
  deliveryTime: string;
  message?: string;
  freebies?: string[]; // Additional items offered
  accessories?: Array<{
    name: string;
    value: number;
  }>;
  benefits?: string[]; // Other benefits (warranty, installation, etc.)
  timestamp: Date;
  status: 'pending' | 'accepted' | 'declined' | 'countered';
  updateCount: number; // Track how many times bid was updated
}

export function BiddingFlow({ product, onNavigate, onAddToCart }: BiddingFlowProps) {
  const [step, setStep] = useState<'setup' | 'waiting' | 'receiving' | 'comparison' | 'accepted'>('setup');
  const [targetPrice, setTargetPrice] = useState('');
  const [timeLimit, setTimeLimit] = useState(1); // hours
  const [bids, setBids] = useState<Bid[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(1 * 60 * 60); // seconds
  const [selectedBid, setSelectedBid] = useState<string | null>(null);
  const [biddingTriggered, setBiddingTriggered] = useState(false);
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [counterBidId, setCounterBidId] = useState<string | null>(null);
  const [counterPrice, setCounterPrice] = useState('');

  // Simulate receiving bids
  useEffect(() => {
    if (step === 'waiting') {
      const timer = setTimeout(() => {
        setStep('receiving');
        simulateBids();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Countdown timer
  useEffect(() => {
    if (step === 'receiving' || step === 'comparison') {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Simulate bid updates
  useEffect(() => {
    if (step === 'receiving' && bids.length > 0) {
      // Simulate sellers updating their bids
      const updateInterval = setInterval(() => {
        const randomBidIndex = Math.floor(Math.random() * bids.length);
        const priceReduction = Math.floor(Math.random() * 500) + 200;
        
        setBids((prevBids) => 
          prevBids.map((bid, index) => 
            index === randomBidIndex
              ? {
                  ...bid,
                  price: bid.price - priceReduction,
                  updateCount: bid.updateCount + 1,
                  timestamp: new Date()
                }
              : bid
          )
        );
      }, 8000); // Update every 8 seconds

      return () => clearInterval(updateInterval);
    }
  }, [step, bids.length]);

  const simulateBids = () => {
    const mockBids: Bid[] = [
      {
        id: 'b1',
        seller: {
          name: 'QuickTech Store',
          rating: 4.9,
          badges: ['Fast Delivery', 'Verified'],
          distance: '0.8 km'
        },
        price: product.price - 2000,
        deliveryTime: '10 min',
        message: 'Best price guaranteed! We can deliver in 10 minutes.',
        freebies: ['Screen Protector', 'Phone Case'],
        benefits: ['6 months extended warranty', 'Free installation'],
        timestamp: new Date(),
        status: 'pending',
        updateCount: 0
      },
      {
        id: 'b2',
        seller: {
          name: 'Mega Electronics',
          rating: 4.7,
          badges: ['Best Price', 'Trusted'],
          distance: '1.2 km'
        },
        price: product.price - 3000,
        deliveryTime: '30 min',
        message: 'Lowest price with warranty included!',
        accessories: [
          { name: 'Wireless Charger', value: 1299 },
          { name: 'USB-C Cable', value: 299 }
        ],
        benefits: ['1 year warranty', 'Free setup'],
        timestamp: new Date(Date.now() + 5000),
        status: 'pending',
        updateCount: 0
      },
      {
        id: 'b3',
        seller: {
          name: 'Premium Gadgets',
          rating: 4.8,
          badges: ['Premium', 'Same Day'],
          distance: '2.5 km'
        },
        price: product.price - 1500,
        deliveryTime: '3 hrs',
        message: 'Official warranty + free accessories',
        freebies: ['Power Bank (10000mAh)', 'Earphones'],
        accessories: [
          { name: 'Premium Case', value: 799 }
        ],
        benefits: ['2 years warranty', 'Free home delivery', '30-day return'],
        timestamp: new Date(Date.now() + 10000),
        status: 'pending',
        updateCount: 0
      },
      {
        id: 'b4',
        seller: {
          name: 'Tech Hub',
          rating: 4.6,
          badges: ['Verified', 'Trending'],
          distance: '3.1 km'
        },
        price: product.price - 2500,
        deliveryTime: '1 hr',
        message: 'Special offer with extra accessories!',
        accessories: [
          { name: 'Bluetooth Speaker', value: 1999 },
          { name: 'Phone Stand', value: 399 }
        ],
        benefits: ['1 year warranty', 'Free shipping'],
        timestamp: new Date(Date.now() + 15000),
        status: 'pending',
        updateCount: 0
      }
    ];

    // Simulate bids coming in one by one
    mockBids.forEach((bid, index) => {
      setTimeout(() => {
        setBids((prev) => [...prev, bid]);
      }, index * 3000);
    });

    setTimeout(() => {
      setStep('comparison');
    }, mockBids.length * 3000 + 2000);
  };

  const handleStartBidding = () => {
    setBiddingTriggered(true);
    setTimeRemaining(timeLimit * 60 * 60); // Convert hours to seconds
    setStep('waiting');
  };

  const handleAcceptBid = (bidId: string) => {
    setBids(bids.map(b => 
      b.id === bidId ? { ...b, status: 'accepted' } : { ...b, status: 'declined' }
    ));
    setSelectedBid(bidId);
    if (onAddToCart) {
      const acceptedBid = bids.find(b => b.id === bidId);
      if (acceptedBid) {
        onAddToCart({ product, quantity: 1, selectedSeller: acceptedBid.seller.name, acceptedBid });
      }
    }
    setStep('accepted');
  };

  const handleCounterOffer = (bidId: string, newPrice: number) => {
    setBids(bids.map(b => 
      b.id === bidId ? { ...b, status: 'countered', price: newPrice } : b
    ));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white px-4 py-3 border-b">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('product-detail', product)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg">Find Best Price</h1>
            <p className="text-xs text-gray-600">Sellers compete for your business</p>
          </div>
          {(step === 'receiving' || step === 'comparison') && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-full">
              <Clock className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-600">{formatTime(timeRemaining)}</span>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Setup Step */}
        {step === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 overflow-y-auto px-4 py-6"
          >
            {/* Product Summary */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <div className="flex gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm mb-1 line-clamp-2">{product.name}</p>
                  <p className="text-xs text-gray-600 mb-2">{product.brand}</p>
                  <p className="text-lg">₹{product.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>

            {/* Bidding Settings */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-600 mb-3">
                  What's your target price? (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-gray-400">₹</span>
                  <input
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    placeholder="Enter your target price"
                    className="w-full pl-8 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Sellers will try to match or beat this price
                </p>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-3">
                  How long should sellers have to bid?
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 4, 12, 24].map((hours) => (
                    <button
                      key={hours}
                      onClick={() => setTimeLimit(hours)}
                      className={`py-3 rounded-2xl border-2 transition-all ${
                        timeLimit === hours
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'bg-white border-gray-200 text-gray-700'
                      }`}
                    >
                      {hours} hr{hours > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* How it Works */}
              <div className="bg-blue-50 rounded-2xl p-5">
                <h3 className="text-sm mb-4">How it works</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="text-sm">We notify verified sellers in your area</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="text-sm">Sellers compete with their best offers</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="text-sm">You choose the best deal or counter-offer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidence Indicators */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>All sellers are verified by WhiteLight</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>Only 4+ rated sellers can participate</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <TrendingDown className="w-5 h-5 text-blue-600" />
                  <span>Average savings: ₹2,500 per bid</span>
                </div>
              </div>
            </div>

            {/* CTA Button - Added padding bottom for spacing */}
            <div className="pb-6 mt-6">
              <button
                onClick={handleStartBidding}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg active:scale-95 transition-transform"
              >
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span>Start Bidding Process</span>
                </div>
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                {timeLimit} hour{timeLimit > 1 ? 's' : ''} bidding window • Free to use
              </p>
            </div>
          </motion.div>
        )}

        {/* Waiting Step */}
        {step === 'waiting' && (
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center px-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full mb-6"
            />
            <h2 className="text-xl mb-2">Finding sellers...</h2>
            <p className="text-sm text-gray-600 text-center max-w-sm">
              We're notifying verified sellers in your area. This usually takes a few seconds.
            </p>
          </motion.div>
        )}

        {/* Receiving Bids Step */}
        {step === 'receiving' && (
          <motion.div
            key="receiving"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 overflow-y-auto px-4 py-6"
          >
            <div className="mb-6 text-center">
              <h2 className="text-xl mb-2">Receiving bids...</h2>
              <p className="text-sm text-gray-600">
                {bids.length} seller{bids.length !== 1 ? 's' : ''} responded so far
              </p>
            </div>

            <div className="space-y-3">
              {bids.map((bid, index) => (
                <motion.div
                  key={`${bid.id}-${bid.updateCount}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 border-2 border-green-200 relative"
                >
                  {bid.updateCount > 0 && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                      Updated {bid.updateCount}x
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p>{bid.seller.name}</p>
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{bid.seller.rating}</span>
                        <span className="text-xs text-gray-600">•</span>
                        <MapPin className="w-3 h-3 text-blue-600" />
                        <span className="text-xs text-blue-600">{bid.seller.distance}</span>
                        <span className="text-xs text-gray-600">•</span>
                        <Clock className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-green-600">{bid.deliveryTime}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl">₹{bid.price.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-green-600">
                        Save ₹{(product.price - bid.price).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {bid.seller.badges.map((badge) => (
                      <span
                        key={badge}
                        className="text-xs px-2 py-1 bg-white rounded-full text-gray-700"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Message */}
                  {bid.message && (
                    <div className="bg-white rounded-xl p-3 text-sm text-gray-700 mb-3">
                      "{bid.message}"
                    </div>
                  )}

                  {/* Freebies */}
                  {bid.freebies && bid.freebies.length > 0 && (
                    <div className="bg-purple-50 rounded-xl p-3 mb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Gift className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-900">Free Items Included</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {bid.freebies.map((item, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-white rounded-full text-purple-700">
                            🎁 {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Accessories */}
                  {bid.accessories && bid.accessories.length > 0 && (
                    <div className="bg-blue-50 rounded-xl p-3 mb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-900">Add-on Accessories</span>
                      </div>
                      <div className="space-y-1">
                        {bid.accessories.map((acc, i) => (
                          <div key={i} className="flex items-center justify-between text-xs">
                            <span className="text-blue-700">+ {acc.name}</span>
                            <span className="text-blue-600">(₹{acc.value})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Benefits */}
                  {bid.benefits && bid.benefits.length > 0 && (
                    <div className="bg-green-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-900">Additional Benefits</span>
                      </div>
                      <div className="space-y-1">
                        {bid.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-green-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Comparison Step */}
        {step === 'comparison' && (
          <motion.div
            key="comparison"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 overflow-y-auto px-4 py-6"
          >
            <div className="mb-6">
              <h2 className="text-xl mb-2">Compare & Choose</h2>
              <p className="text-sm text-gray-600">
                {bids.length} sellers made offers. Choose the best one or counter.
              </p>
            </div>

            {/* Best Deal Highlight */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border-2 border-yellow-300 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                <p className="text-sm">Best Deal</p>
              </div>
              {(() => {
                const bestBid = bids.reduce((prev, current) => 
                  current.price < prev.price ? current : prev
                );
                return (
                  <>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="mb-1">{bestBid.seller.name}</p>
                        <div className="flex items-center gap-2">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{bestBid.seller.rating}</span>
                          <span className="text-xs text-gray-600">•</span>
                          <span className="text-xs text-gray-600">{bestBid.deliveryTime}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl">₹{bestBid.price.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-green-600">
                          Save ₹{(product.price - bestBid.price).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAcceptBid(bestBid.id)}
                      className="w-full bg-blue-500 text-white py-3 rounded-2xl"
                    >
                      Accept This Offer
                    </button>
                  </>
                );
              })()}
            </div>

            {/* Other Bids */}
            <p className="text-sm text-gray-600 mb-3">Other offers</p>
            <div className="space-y-3">
              {bids
                .filter(bid => bid.price !== Math.min(...bids.map(b => b.price)))
                .map((bid) => (
                  <div
                    key={bid.id}
                    className="bg-white rounded-2xl p-4 border-2 border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="mb-1">{bid.seller.name}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{bid.seller.rating}</span>
                          <span className="text-xs text-gray-600">•</span>
                          <MapPin className="w-3 h-3 text-blue-600" />
                          <span className="text-xs text-blue-600">{bid.seller.distance}</span>
                          <span className="text-xs text-gray-600">•</span>
                          <Clock className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-green-600">{bid.deliveryTime}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg">₹{bid.price.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-gray-600">
                          Save ₹{(product.price - bid.price).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    {/* Freebies */}
                    {bid.freebies && bid.freebies.length > 0 && (
                      <div className="bg-purple-50 rounded-xl p-2 mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Gift className="w-3 h-3 text-purple-600" />
                          <span className="text-xs text-purple-900">Freebies</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {bid.freebies.map((item, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-white rounded-full text-purple-700">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Accessories */}
                    {bid.accessories && bid.accessories.length > 0 && (
                      <div className="bg-blue-50 rounded-xl p-2 mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Package className="w-3 h-3 text-blue-600" />
                          <span className="text-xs text-blue-900">Accessories</span>
                        </div>
                        <div className="space-y-0.5">
                          {bid.accessories.map((acc, i) => (
                            <div key={i} className="flex items-center justify-between text-xs">
                              <span className="text-blue-700">{acc.name}</span>
                              <span className="text-blue-600">₹{acc.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Benefits */}
                    {bid.benefits && bid.benefits.length > 0 && (
                      <div className="bg-green-50 rounded-xl p-2 mb-3">
                        <div className="flex flex-wrap gap-2">
                          {bid.benefits.map((benefit, i) => (
                            <span key={i} className="text-xs text-green-700">✓ {benefit}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAcceptBid(bid.id)}
                        className="flex-1 py-2 border-2 border-blue-500 text-blue-500 rounded-xl text-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => {
                          setCounterBidId(bid.id);
                          setShowCounterModal(true);
                        }}
                        className="flex-1 py-2 border-2 border-gray-300 text-gray-700 rounded-xl text-sm flex items-center justify-center gap-1"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Counter
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Accepted Step */}
        {step === 'accepted' && (
          <motion.div
            key="accepted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center px-4"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-xl mb-2">Deal Accepted!</h2>
            <p className="text-sm text-gray-600 text-center max-w-sm">
              Your bid has been accepted. You can now proceed to checkout.
            </p>
            <button
              onClick={() => onNavigate('cart')}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg active:scale-95 transition-transform mt-6"
            >
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                <span>Proceed to Checkout</span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Counter Offer Modal */}
      {showCounterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-sm"
          >
            <h3 className="text-lg mb-2">Counter Offer</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter your proposed price for this product.
            </p>
            <div className="relative mb-6">
              <span className="absolute left-4 top-4 text-gray-400">₹</span>
              <input
                type="number"
                value={counterPrice}
                onChange={(e) => setCounterPrice(e.target.value)}
                placeholder="Enter your price"
                className="w-full pl-8 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCounterModal(false);
                  setCounterPrice('');
                  setCounterBidId(null);
                }}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (counterBidId && counterPrice) {
                    handleCounterOffer(counterBidId, parseFloat(counterPrice));
                    setShowCounterModal(false);
                    setCounterPrice('');
                    setCounterBidId(null);
                  }
                }}
                className="flex-1 py-3 bg-blue-500 text-white rounded-xl"
              >
                Send Counter
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}