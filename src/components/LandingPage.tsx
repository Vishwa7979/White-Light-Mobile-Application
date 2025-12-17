import { motion } from 'motion/react';
import { ArrowRight, Store, TrendingUp, Sparkles } from 'lucide-react';
import avatarImage from 'figma:asset/c5b98bf003853cb01915354cb27590601cf4ad33.png';

interface LandingPageProps {
  onComplete: () => void;
}

export function LandingPage({ onComplete }: LandingPageProps) {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      <div className="max-w-md mx-auto h-full flex flex-col">
        {/* Header with Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center pt-8 pb-4"
        >
          <div className="relative">
            {/* Outer Glow Ring */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(147,51,234,0.2) 0%, transparent 70%)',
                filter: 'blur(15px)'
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Logo Container */}
            <div className="relative w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center">
              {/* Light Beam Icon - Same as Splash */}
              <svg width="40" height="40" viewBox="0 0 80 80" fill="none">
                <path d="M40 10 L40 35" stroke="url(#gradient1)" strokeWidth="4" strokeLinecap="round" />
                <circle cx="40" cy="40" r="12" fill="url(#gradient2)" />
                <path d="M40 52 L40 70" stroke="url(#gradient1)" strokeWidth="3" strokeLinecap="round" />
                <path d="M55 55 L67 67" stroke="url(#gradient1)" strokeWidth="3" strokeLinecap="round" />
                <path d="M25 55 L13 67" stroke="url(#gradient1)" strokeWidth="3" strokeLinecap="round" />
                <path d="M58 40 L70 40" stroke="url(#gradient1)" strokeWidth="3" strokeLinecap="round" />
                <path d="M22 40 L10 40" stroke="url(#gradient1)" strokeWidth="3" strokeLinecap="round" />
                
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                  
                  <radialGradient id="gradient2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col justify-center px-6 pb-20">
          {/* Hero Image - Clean without floating cards */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative w-72 h-72 mx-auto">
              {/* Decorative Background Circle */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded-full opacity-30"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Main Image - No floating cards */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src={avatarImage} 
                  alt="WhiteLight Shopping" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Headline - Concise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mb-6"
          >
            <h1 className="text-5xl mb-3" style={{ fontWeight: 700 }}>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                WhiteLight
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-2">
              Shop Smarter, Live Better
            </p>
            <p className="text-gray-500">
              Local stores · Best prices · Same day
            </p>
          </motion.div>

          {/* Feature Pills - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex justify-center gap-3 mb-10"
          >
            {[
              { icon: Store, color: 'from-green-500 to-emerald-500' },
              { icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
              { icon: Sparkles, color: 'from-purple-500 to-pink-500' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 1.2 + (index * 0.1),
                  type: "spring",
                  stiffness: 200
                }}
                className={`bg-gradient-to-r ${feature.color} p-3 rounded-2xl shadow-lg`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            onClick={onComplete}
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transition-all active:scale-98"
          >
            <span className="text-xl">Get Started</span>
            <ArrowRight className="w-6 h-6" />
          </motion.button>

          {/* Minimal Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="flex items-center justify-center gap-8 mt-6 text-sm text-gray-500"
          >
            <div className="text-center">
              <p className="text-lg text-gray-900" style={{ fontWeight: 600 }}>10K+</p>
              <p className="text-xs">Products</p>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="text-center">
              <p className="text-lg text-gray-900" style={{ fontWeight: 600 }}>500+</p>
              <p className="text-xs">Sellers</p>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="text-center">
              <p className="text-lg text-gray-900" style={{ fontWeight: 600 }}>50K+</p>
              <p className="text-xs">Users</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
