import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  Package,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  Camera,
  Star
} from 'lucide-react';
import { Screen } from '../App';

interface OrderTrackingProps {
  onNavigate: (screen: Screen) => void;
}

interface Order {
  id: string;
  status: 'placed' | 'confirmed' | 'picked' | 'in-transit' | 'delivered';
  items: Array<{
    name: string;
    image: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  deliveryTime: string;
  placedAt: Date;
  seller: {
    name: string;
    rating: number;
  };
  deliveryPartner?: {
    name: string;
    phone: string;
    image: string;
  };
  timeline: Array<{
    status: string;
    time: Date;
    completed: boolean;
  }>;
  paymentStatus?: {
    type: 'full' | 'partial';
    paidAmount: number;
    pendingAmount: number;
    totalAmount: number;
  };
}

export function OrderTracking({ onNavigate }: OrderTrackingProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const MOCK_ORDERS: Order[] = [
    {
      id: 'WL1234567',
      status: 'in-transit',
      items: [
        {
          name: 'iPhone 15 Pro Max',
          image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200',
          quantity: 1,
          price: 134999
        }
      ],
      total: 134999,
      deliveryTime: '10 min',
      placedAt: new Date(Date.now() - 5 * 60 * 1000),
      seller: {
        name: 'QuickTech Store',
        rating: 4.9
      },
      deliveryPartner: {
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
      },
      timeline: [
        { status: 'Order Placed', time: new Date(Date.now() - 5 * 60 * 1000), completed: true },
        { status: 'Order Confirmed', time: new Date(Date.now() - 4 * 60 * 1000), completed: true },
        { status: 'Picked Up', time: new Date(Date.now() - 2 * 60 * 1000), completed: true },
        { status: 'Out for Delivery', time: new Date(), completed: true },
        { status: 'Delivered', time: new Date(Date.now() + 5 * 60 * 1000), completed: false }
      ],
      paymentStatus: {
        type: 'partial',
        paidAmount: 40500,
        pendingAmount: 94499,
        totalAmount: 134999
      }
    },
    {
      id: 'WL1234566',
      status: 'delivered',
      items: [
        {
          name: 'Nike Air Max 270',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
          quantity: 1,
          price: 12995
        }
      ],
      total: 12995,
      deliveryTime: '30 min',
      placedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      seller: {
        name: 'Sports Hub',
        rating: 4.7
      },
      timeline: [
        { status: 'Order Placed', time: new Date(Date.now() - 24 * 60 * 60 * 1000), completed: true },
        { status: 'Order Confirmed', time: new Date(Date.now() - 23 * 60 * 60 * 1000), completed: true },
        { status: 'Picked Up', time: new Date(Date.now() - 22 * 60 * 60 * 1000), completed: true },
        { status: 'Out for Delivery', time: new Date(Date.now() - 21 * 60 * 60 * 1000), completed: true },
        { status: 'Delivered', time: new Date(Date.now() - 20 * 60 * 60 * 1000), completed: true }
      ]
    }
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'placed':
      case 'confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'picked':
      case 'in-transit':
        return 'bg-orange-100 text-orange-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'placed':
        return 'Order Placed';
      case 'confirmed':
        return 'Confirmed';
      case 'picked':
        return 'Picked Up';
      case 'in-transit':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  if (selectedOrder) {
    return (
      <div className="h-screen bg-white flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white px-4 py-3 border-b">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedOrder(null)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg">Order #{selectedOrder.id}</h1>
              <p className="text-xs text-gray-600">Track your order</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          {/* Live Tracking */}
          {selectedOrder.status === 'in-transit' && (
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 mb-3">
              <div className="bg-white rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <Package className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <p>Your order is on the way!</p>
                    <p className="text-sm text-gray-600">Arriving in ~5 minutes</p>
                  </div>
                </div>
                
                {/* Delivery Partner */}
                {selectedOrder.deliveryPartner && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <img
                      src={selectedOrder.deliveryPartner.image}
                      alt={selectedOrder.deliveryPartner.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-sm">{selectedOrder.deliveryPartner.name}</p>
                      <p className="text-xs text-gray-600">Delivery Partner</p>
                    </div>
                    <button className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </button>
                    <button className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Delivery Timeline */}
          <div className="px-4 py-6 bg-white mb-3">
            <h3 className="text-lg mb-6">Delivery Timeline</h3>
            <div className="space-y-6">
              {selectedOrder.timeline.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Clock className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    {index < selectedOrder.timeline.length - 1 && (
                      <div
                        className={`w-0.5 h-12 ${
                          step.completed ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 -mt-1">
                    <p className={step.completed ? '' : 'text-gray-400'}>
                      {step.status}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {step.completed
                        ? step.time.toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : 'Expected'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div className="px-4 py-6 bg-white mb-3">
            <h3 className="text-lg mb-4">Order Items</h3>
            <div className="space-y-3">
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm mb-1">{item.name}</p>
                    <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm">₹{item.price.toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="px-4 py-6 bg-white mb-3">
            <h3 className="text-lg mb-4">Delivery Address</h3>
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm mb-1">Home</p>
                <p className="text-sm text-gray-600">
                  123, Koramangala, Bangalore - 560034
                </p>
              </div>
            </div>
          </div>

          {/* Bill Details */}
          <div className="px-4 py-6 bg-white mb-3">
            <h3 className="text-lg mb-4">Bill Details</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Item Total</span>
                <span>₹{selectedOrder.total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="pt-2 border-t flex items-center justify-between">
                <span>Total Amount</span>
                <span className="text-lg">₹{selectedOrder.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Partial Payment Status */}
            {selectedOrder.paymentStatus?.type === 'partial' && (
              <div className="mt-4 pt-4 border-t">
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-4 border-2 border-orange-200">
                  <h4 className="text-sm mb-3">Payment Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Paid Online</span>
                      <span className="text-green-600">✓ ₹{selectedOrder.paymentStatus.paidAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Pay at Delivery</span>
                      <span className="text-orange-600">₹{selectedOrder.paymentStatus.pendingAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  
                  {selectedOrder.status !== 'delivered' && (
                    <div className="mt-3 p-3 bg-white rounded-xl">
                      <p className="text-xs text-gray-700">
                        💡 Pay the remaining ₹{selectedOrder.paymentStatus.pendingAmount.toLocaleString('en-IN')} in cash or UPI to the delivery partner
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Proof of Delivery */}
          {selectedOrder.status === 'delivered' && (
            <div className="px-4 py-6 bg-white">
              <h3 className="text-lg mb-4">Proof of Delivery</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
                <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        {selectedOrder.status === 'delivered' && (
          <div className="sticky bottom-0 bg-white border-t px-4 py-4">
            <button className="w-full bg-blue-500 text-white py-4 rounded-2xl flex items-center justify-center gap-2">
              <Star className="w-5 h-5" />
              Rate Your Experience
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white px-4 py-3 border-b">
        <h1 className="text-lg">My Orders</h1>
        <p className="text-xs text-gray-600">{MOCK_ORDERS.length} total orders</p>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto pb-20">
        {MOCK_ORDERS.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Package className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-xl mb-2">No orders yet</h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Start shopping and your orders will appear here
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 bg-blue-500 text-white rounded-full"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {MOCK_ORDERS.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="w-full bg-white rounded-2xl p-4 text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm mb-1">Order #{order.id}</p>
                    <p className="text-xs text-gray-600">
                      {order.placedAt.toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>

                <div className="flex gap-3 mb-3">
                  {order.items.slice(0, 3).map((item, index) => (
                    <img
                      key={index}
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center">
                      <span className="text-sm text-gray-600">
                        +{order.items.length - 3}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm">₹{order.total.toLocaleString('en-IN')}</p>
                  <span className="text-blue-500 text-sm">Track Order →</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}