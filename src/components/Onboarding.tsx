import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ChevronRight, Mail } from 'lucide-react';
import avatarImage from 'figma:asset/c5b98bf003853cb01915354cb27590601cf4ad33.png';
import * as db from '../services/database';

interface OnboardingProps {
  onComplete: () => void;
}

const INTERESTS = [
  'Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Groceries',
  'Sports', 'Books', 'Toys', 'Health', 'Automotive'
];

const DELIVERY_PREFERENCES = [
  { label: 'Speed is priority', icon: '⚡', value: 'speed' },
  { label: 'Best price matters', icon: '💰', value: 'price' },
  { label: 'Trusted sellers only', icon: '✓', value: 'trust' },
  { label: 'Eco-friendly options', icon: '🌱', value: 'eco' }
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [authMethod, setAuthMethod] = useState<'google' | 'apple' | 'phone' | null>(null);
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [deliveryPreference, setDeliveryPreference] = useState('');

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      savePreferencesAndComplete();
    }
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0: return authMethod !== null;
      case 1: return authMethod === 'phone' ? phone.length >= 10 : true;
      case 2: return location.length > 0;
      case 3: return selectedInterests.length >= 3;
      case 4: return deliveryPreference.length > 0;
      default: return false;
    }
  };

  const handleSSOLogin = (method: 'google' | 'apple') => {
    setAuthMethod(method);
    // In production: Handle OAuth flow
    setTimeout(() => {
      setStep(2); // Skip phone verification for SSO users
    }, 500);
  };

  const handlePhoneLogin = () => {
    setAuthMethod('phone');
    setStep(1); // Go to phone input screen
  };

  const savePreferencesAndComplete = async () => {
    try {
      const userId = localStorage.getItem('whitelight_user_id');
      if (userId) {
        await db.saveUserPreferences(userId, {
          interests: selectedInterests,
          deliveryPreference,
          location,
          phone: authMethod === 'phone' ? phone : undefined,
          authMethod: authMethod || undefined
        });
        console.log('User preferences saved successfully');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      onComplete();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Step 0: SSO Login */}
        {step === 0 && (
          <motion.div
            key="sso-login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col relative"
          >
            {/* Immersive Background Avatar */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.4 }}
                transition={{ duration: 1 }}
                className="w-full h-full"
              >
                <img 
                  src={avatarImage} 
                  alt="WhiteLight" 
                  className="w-full h-full object-cover blur-sm"
                />
              </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-end px-6 pb-12">
              {/* Logo & Brand */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8 text-center"
              >
                <div className="inline-block bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-2xl mb-4">
                  {/* WhiteLight Logo */}
                  <svg width="48" height="48" viewBox="0 0 80 80" fill="none">
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
                <h1 className="text-4xl mb-2 text-gray-900">
                  Welcome to <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">WhiteLight</span>
                </h1>
                <p className="text-gray-700">Your local shopping companion</p>
              </motion.div>

              {/* SSO Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3 mb-6"
              >
                {/* Google SSO */}
                <button
                  onClick={() => handleSSOLogin('google')}
                  className="w-full bg-white py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 hover:shadow-2xl transition-all active:scale-98"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-gray-700">Continue with Google</span>
                </button>

                {/* Apple SSO */}
                <button
                  onClick={() => handleSSOLogin('apple')}
                  className="w-full bg-black py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 hover:shadow-2xl transition-all active:scale-98"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <span className="text-white">Continue with Apple</span>
                </button>

                {/* Phone Number Login */}
                <button
                  onClick={handlePhoneLogin}
                  className="w-full bg-white border-2 border-gray-200 py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 hover:shadow-xl transition-all active:scale-98"
                >
                  <Mail className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-700">Continue with Phone</span>
                </button>
              </motion.div>

              {/* Terms */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xs text-center text-gray-600 px-4"
              >
                By continuing, you agree to our <span className="underline">Terms</span> and <span className="underline">Privacy Policy</span>
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* Step 1: Phone Number (if phone login selected) */}
        {step === 1 && (
          <motion.div
            key="phone-auth"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col relative"
          >
            {/* Immersive Background Avatar */}
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={avatarImage} 
                alt="WhiteLight" 
                className="w-full h-full object-cover blur-sm opacity-40"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-end px-6 pb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl"
              >
                <h2 className="text-3xl mb-2">Your phone number</h2>
                <p className="text-gray-600 mb-6">We'll send you a verification code</p>
                
                <div className="relative mb-4">
                  <div className="absolute left-4 top-4 text-gray-400">+91</div>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full pl-14 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none bg-white"
                    maxLength={10}
                  />
                </div>

                <p className="text-xs text-gray-500">
                  You'll receive a 6-digit OTP to verify your number
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <motion.div
            key="location"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col relative"
          >
            {/* Immersive Background Avatar */}
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={avatarImage} 
                alt="WhiteLight" 
                className="w-full h-full object-cover blur-sm opacity-40"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-end px-6 pb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl"
              >
                <h2 className="text-3xl mb-2">Where are you?</h2>
                <p className="text-gray-600 mb-6">Find products from nearby stores</p>
                
                <div className="space-y-3">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none bg-white"
                    />
                  </div>
                  
                  <button 
                    onClick={() => setLocation('Current Location')}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MapPin className="w-5 h-5" />
                    Use current location
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Interests */}
        {step === 3 && (
          <motion.div
            key="interests"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col relative"
          >
            {/* Immersive Background Avatar */}
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={avatarImage} 
                alt="WhiteLight" 
                className="w-full h-full object-cover blur-sm opacity-40"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-end px-6 pb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl max-h-[70vh] overflow-y-auto"
              >
                <h2 className="text-3xl mb-2">What do you love?</h2>
                <p className="text-gray-600 mb-6">Pick at least 3 categories</p>
                
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-5 py-3 rounded-full border-2 transition-all ${
                        selectedInterests.includes(interest)
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-transparent text-white shadow-lg scale-105'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  {selectedInterests.length} of 3 selected
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Preferences */}
        {step === 4 && (
          <motion.div
            key="preferences"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col relative"
          >
            {/* Immersive Background Avatar */}
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={avatarImage} 
                alt="WhiteLight" 
                className="w-full h-full object-cover blur-sm opacity-40"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-end px-6 pb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl"
              >
                <h2 className="text-3xl mb-2">What matters most?</h2>
                <p className="text-gray-600 mb-6">We'll personalize your feed</p>
                
                <div className="space-y-3">
                  {DELIVERY_PREFERENCES.map((pref) => (
                    <button
                      key={pref.value}
                      onClick={() => setDeliveryPreference(pref.value)}
                      className={`w-full p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                        deliveryPreference === pref.value
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-purple-500 shadow-lg'
                          : 'bg-white border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="text-3xl">{pref.icon}</div>
                      <div className="flex-1 text-left">
                        <p className="text-gray-900">{pref.label}</p>
                      </div>
                      {deliveryPreference === pref.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress & Next Button - Fixed at bottom */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-20 p-6 bg-white/95 backdrop-blur-md"
      >
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: i === step ? 1.2 : 1,
                width: i === step ? '32px' : '8px'
              }}
              className={`h-2 rounded-full transition-all ${
                i <= step 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg ${
            canProceed()
              ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-xl active:scale-98'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          {step === 4 ? 'Start Shopping' : 'Continue'}
          <ChevronRight className="w-5 h-5" />
        </button>
        
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="w-full py-3 text-gray-600 mt-2 hover:text-gray-900"
          >
            Back
          </button>
        )}
      </motion.div>
    </div>
  );
}