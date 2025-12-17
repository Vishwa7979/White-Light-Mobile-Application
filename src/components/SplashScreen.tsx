import { useEffect } from 'react';
import { motion } from 'motion/react';
import avatarImage from 'figma:asset/c5b98bf003853cb01915354cb27590601cf4ad33.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 15000); // 15 seconds splash

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleClick = () => {
    onComplete();
  };

  return (
    <div 
      className="h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center relative overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* Background Avatar with Higher Opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${avatarImage})`,
          opacity: 0.4,
          filter: 'blur(8px)'
        }}
      />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full"
        style={{ opacity: 0.1 }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full"
        style={{ opacity: 0.1 }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Dynamic WhiteLight Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ 
            duration: 1,
            ease: [0.34, 1.56, 0.64, 1] // Bouncy easing
          }}
          className="mb-6"
        >
          <div className="relative">
            {/* Outer Glow Ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                filter: 'blur(20px)'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Logo Container */}
            <div className="relative w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
              {/* Light Beam Icon */}
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                {/* Main Light Beam */}
                <motion.path
                  d="M40 10 L40 35"
                  stroke="url(#gradient1)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                
                {/* Center Circle */}
                <motion.circle
                  cx="40"
                  cy="40"
                  r="12"
                  fill="url(#gradient2)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                />
                
                {/* Light Rays */}
                <motion.path
                  d="M40 52 L40 70"
                  stroke="url(#gradient1)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                />
                
                <motion.path
                  d="M55 55 L67 67"
                  stroke="url(#gradient1)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                />
                
                <motion.path
                  d="M25 55 L13 67"
                  stroke="url(#gradient1)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                />
                
                <motion.path
                  d="M58 40 L70 40"
                  stroke="url(#gradient1)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                />
                
                <motion.path
                  d="M22 40 L10 40"
                  stroke="url(#gradient1)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                />
                
                {/* Gradient Definitions */}
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

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center"
        >
          <h1 className="text-5xl text-white mb-2 tracking-tight" style={{ fontWeight: 700 }}>
            WhiteLight
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-white text-lg"
            style={{ opacity: 0.9 }}
          >
            Shop Smarter, Live Better
          </motion.p>
        </motion.div>

        {/* Loading Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
          className="mt-12"
        >
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
        }}
        animate={{
          x: ['-100%', '200%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
          delay: 1
        }}
      />
    </div>
  );
}