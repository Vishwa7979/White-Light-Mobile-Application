import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  Minus,
  Plus,
  Trash2,
  Tag,
  Clock,
  MapPin,
  ChevronRight,
  CreditCard,
  Zap
} from 'lucide-react';
import { Screen, CartItem } from '../App';

interface CartProps {
  items: CartItem[];
  onNavigate: (screen: Screen) => void;
}

export function Cart({ items, onNavigate }: CartProps) {
  const [cartItems, setCartItems] = useState(items);
  const [deliverySlot, setDeliverySlot] = useState('10min');
  const [showCheckout, setShowCheckout] = useState(false);
  const [partialPaymentEnabled, setPartialPaymentEnabled] = useState(false);
  const [partialPaymentPercent, setPartialPaymentPercent] = useState(30); // Default 30% advance

  const updateQuantity = (index: number, delta: number) => {
    const newItems = [...cartItems];
    newItems[index].quantity = Math.max(1, newItems[index].quantity + delta);
    setCartItems(newItems);
  };

  const removeItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const seller = item.product.sellers.find(s => s.id === item.selectedSeller);
    return sum + (seller?.price || item.product.price) * item.quantity;
  }, 0);

  const deliveryFee = deliverySlot === '10min' ? 49 : 0;
  const discount = 500;
  const total = subtotal + deliveryFee - discount;

  const DELIVERY_SLOTS = [
    { value: '10min', label: '10 min', icon: '⚡', fee: 49 },
    { value: '30min', label: '30 min', icon: '🚀', fee: 0 },
    { value: '3hrs', label: '3 hrs', icon: '📦', fee: 0 },
    { value: 'sameday', label: 'Same day', icon: '🚚', fee: 0 }
  ];

  if (cartItems.length === 0) {
    return (
      <div className="h-screen bg-white flex flex-col">
        <div className="sticky top-0 z-20 bg-white px-4 py-3 border-b">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg">My Cart</h1>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Tag className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-xl mb-2">Your cart is empty</h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Start adding products to your cart
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 bg-blue-500 text-white rounded-full"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
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
            <h1 className="text-lg">My Cart</h1>
            <p className="text-xs text-gray-600">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-48">
        {/* Cart Items */}
        <div className="bg-white p-4 mb-3">
          <div className="space-y-4">
            {cartItems.map((item, index) => {
              const seller = item.product.sellers.find(s => s.id === item.selectedSeller);
              const price = seller?.price || item.product.price;

              return (
                <motion.div
                  key={`${item.product.id}-${index}`}
                  layout
                  className="flex gap-3 pb-4 border-b last:border-b-0"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm mb-1 line-clamp-2">{item.product.name}</p>
                    <p className="text-xs text-gray-600 mb-2">{seller?.name}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">₹{price.toLocaleString('en-IN')}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="self-start w-8 h-8 rounded-full bg-red-50 flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Delivery Slot */}
        <div className="bg-white p-4 mb-3">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm">Choose Delivery Slot</h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {DELIVERY_SLOTS.map((slot) => (
              <button
                key={slot.value}
                onClick={() => setDeliverySlot(slot.value)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  deliverySlot === slot.value
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="text-2xl mb-1">{slot.icon}</div>
                <p className="text-xs">{slot.label}</p>
                {slot.fee > 0 && (
                  <p className="text-xs text-gray-500 mt-1">₹{slot.fee}</p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white p-4 mb-3">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm">Delivery Address</h3>
          </div>
          <button className="w-full text-left p-4 bg-gray-50 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm mb-1">Home</p>
              <p className="text-xs text-gray-600">
                123, Koramangala, Bangalore - 560034
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Apply Coupon */}
        <div className="bg-white p-4 mb-3">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-green-600" />
            <input
              type="text"
              placeholder="Enter coupon code"
              className="flex-1 px-3 py-2 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none text-sm"
            />
            <button className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm">
              Apply
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
              <Tag className="w-3 h-3" />
            </div>
            <span>FIRST500 applied - You save ₹500</span>
          </div>
        </div>
      </div>

      {/* Fixed Bottom - Bill Details & Checkout */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20">
        <div className="max-w-md mx-auto px-4 py-4">
          {/* Bill Summary */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Discount</span>
              <span className="text-green-600">-₹{discount}</span>
            </div>
            <div className="pt-2 border-t flex items-center justify-between">
              <span>Total</span>
              <span className="text-xl">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => setShowCheckout(true)}
            className="w-full bg-blue-500 text-white py-4 rounded-2xl flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            <span>Proceed to Checkout</span>
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-30 flex items-end"
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="w-full max-w-md mx-auto bg-white rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl mb-6">Complete Your Payment</h2>

            {/* Partial Payment Toggle */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4 mb-6 border-2 border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm mb-1">Pay Partial Amount</p>
                  <p className="text-xs text-gray-600">Pay remaining at delivery</p>
                </div>
                <button
                  onClick={() => setPartialPaymentEnabled(!partialPaymentEnabled)}
                  className={`w-14 h-8 rounded-full transition-all ${
                    partialPaymentEnabled ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full transition-transform ${
                      partialPaymentEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Partial Payment Slider */}
              {partialPaymentEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-3 border-t border-purple-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm">Pay Now</span>
                    <span className="text-lg">₹{Math.round((total * partialPaymentPercent) / 100).toLocaleString('en-IN')}</span>
                  </div>
                  
                  {/* Slider */}
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={partialPaymentPercent}
                    onChange={(e) => setPartialPaymentPercent(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  
                  {/* Quick Presets */}
                  <div className="flex gap-2 mt-3">
                    {[20, 30, 50, 100].map((percent) => (
                      <button
                        key={percent}
                        onClick={() => setPartialPaymentPercent(percent)}
                        className={`flex-1 py-2 rounded-xl text-xs transition-all ${
                          partialPaymentPercent === percent
                            ? 'bg-blue-500 text-white'
                            : 'bg-white border-2 border-gray-200'
                        }`}
                      >
                        {percent}%
                      </button>
                    ))}
                  </div>

                  {/* Payment Breakdown */}
                  <div className="mt-4 space-y-2 bg-white rounded-xl p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Pay now ({partialPaymentPercent}%)</span>
                      <span className="text-blue-600">₹{Math.round((total * partialPaymentPercent) / 100).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Pay at delivery</span>
                      <span className="text-orange-600">₹{Math.round((total * (100 - partialPaymentPercent)) / 100).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="pt-2 border-t flex items-center justify-between">
                      <span className="text-sm">Total Amount</span>
                      <span>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Payment Methods */}
            <h3 className="text-sm text-gray-600 mb-3">Select Payment Method</h3>
            <div className="space-y-3 mb-6">
              <button className="w-full p-4 border-2 border-gray-200 rounded-2xl flex items-center gap-3 hover:border-blue-500 transition-all">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <span>Credit / Debit Card</span>
              </button>
              <button className="w-full p-4 border-2 border-gray-200 rounded-2xl flex items-center gap-3 hover:border-purple-500 transition-all">
                <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center text-white text-xs">
                  UPI
                </div>
                <span>UPI Payment</span>
              </button>
              {!partialPaymentEnabled && (
                <button className="w-full p-4 border-2 border-gray-200 rounded-2xl flex items-center gap-3 hover:border-green-500 transition-all">
                  <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center text-white text-xs">
                    ₹
                  </div>
                  <span>Cash on Delivery</span>
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <button
              onClick={() => {
                setShowCheckout(false);
                onNavigate('orders');
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl mb-3 shadow-lg"
            >
              {partialPaymentEnabled ? (
                <div>
                  <div className="text-sm opacity-90">Pay Now</div>
                  <div>₹{Math.round((total * partialPaymentPercent) / 100).toLocaleString('en-IN')} • Pay ₹{Math.round((total * (100 - partialPaymentPercent)) / 100).toLocaleString('en-IN')} at delivery</div>
                </div>
              ) : (
                <span>Complete Order - ₹{total.toLocaleString('en-IN')}</span>
              )}
            </button>
            <button
              onClick={() => setShowCheckout(false)}
              className="w-full py-3 text-gray-600"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}