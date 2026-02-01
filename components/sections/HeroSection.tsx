'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
  BarChart3, 
  ShoppingCart, 
  Users, 
  Wallet, 
  TrendingUp, 
  Package,
  Receipt,
  CreditCard,
  Plus,
  Minus,
  Trash2,
  Check
} from 'lucide-react';

interface HeroSectionProps {
  onGetEarlyAccess?: () => void;
}

interface Product {
  id: number;
  name: string;
  price: number;
  emoji: string;
}

interface CartItem extends Product {
  quantity: number;
}

type BusinessType = 'retail' | 'restaurant' | 'grocery';

const businessTypes: { id: BusinessType; label: string; icon: string }[] = [
  { id: 'retail', label: 'Retail', icon: '🏪' },
  { id: 'restaurant', label: 'Restaurant', icon: '🍽️' },
  { id: 'grocery', label: 'Grocery', icon: '🛒' },
];

const productsByBusiness: Record<BusinessType, Product[]> = {
  retail: [
    { id: 1, name: 'T-Shirt', price: 1500, emoji: '👕' },
    { id: 2, name: 'Jeans', price: 3500, emoji: '👖' },
    { id: 3, name: 'Sneakers', price: 5500, emoji: '👟' },
    { id: 4, name: 'Watch', price: 4500, emoji: '⌚' },
    { id: 5, name: 'Bag', price: 2500, emoji: '👜' },
    { id: 6, name: 'Sunglasses', price: 1800, emoji: '🕶️' },
  ],
  restaurant: [
    { id: 1, name: 'Coffee', price: 350, emoji: '☕' },
    { id: 2, name: 'Burger', price: 550, emoji: '🍔' },
    { id: 3, name: 'Pizza', price: 1200, emoji: '🍕' },
    { id: 4, name: 'Juice', price: 250, emoji: '🧃' },
    { id: 5, name: 'Cake', price: 450, emoji: '🍰' },
    { id: 6, name: 'Fries', price: 300, emoji: '🍟' },
  ],
  grocery: [
    { id: 1, name: 'Milk', price: 280, emoji: '🥛' },
    { id: 2, name: 'Bread', price: 150, emoji: '🍞' },
    { id: 3, name: 'Eggs', price: 350, emoji: '🥚' },
    { id: 4, name: 'Rice', price: 450, emoji: '🍚' },
    { id: 5, name: 'Apples', price: 320, emoji: '🍎' },
    { id: 6, name: 'Chicken', price: 850, emoji: '🍗' },
  ],
};

// Floating icon component
const FloatingIcon = ({ 
  icon: Icon, 
  className, 
  delay = 0,
  duration = 3,
  color = "#714B67",
  size = "md"
}: { 
  icon: React.ElementType; 
  className: string; 
  delay?: number;
  duration?: number;
  color?: string;
  size?: "sm" | "md" | "lg";
}) => {
  const sizeClasses = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4"
  };
  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };
  
  return (
    <motion.div
      className={`absolute z-20 ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay }
      }}
    >
      <div className={`${sizeClasses[size]} bg-white rounded-2xl shadow-xl border border-gray-100/80 backdrop-blur-sm`}>
        <Icon className={iconSizes[size]} style={{ color }} />
      </div>
    </motion.div>
  );
};

export function HeroSection({ onGetEarlyAccess }: HeroSectionProps) {
  const t = useTranslations('hero');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addedProduct, setAddedProduct] = useState<number | null>(null);
  const [activeBusinessType, setActiveBusinessType] = useState<BusinessType>('retail');
  
  const currentProducts = productsByBusiness[activeBusinessType];
  
  const handleBusinessTypeChange = (type: BusinessType) => {
    setActiveBusinessType(type);
    setCart([]); // Clear cart when switching business type
  };
  
  const addToCart = (product: Product) => {
    setAddedProduct(product.id);
    setTimeout(() => setAddedProduct(null), 500);
    
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const dashboardVariants = {
    hidden: { opacity: 0, x: 50, rotateY: -15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
    },
  };

  return (
    <section className="w-full bg-gradient-to-br from-white via-gray-50/50 to-[#714B67]/5 pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_1.1fr] items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Text Content */}
          <motion.div className="space-y-6 lg:space-y-8" variants={itemVariants}>
            {/* Badge */}
            <motion.div
              className="inline-block"
              variants={itemVariants}
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-[#714B67]/10 border border-[#714B67]/20 rounded-full px-4 py-2"
                whileHover={{ scale: 1.05 }}
              >
                <motion.span 
                  className="w-2 h-2 bg-[#714B67] rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs font-semibold text-[#714B67]">{t('badge')}</span>
              </motion.div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2D2D] leading-[1.1] tracking-tight">
                {t('title')}
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p
              className="text-lg text-[#6B6B6B] max-w-lg leading-relaxed"
              variants={itemVariants}
            >
              {t('subtitle')}
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-2"
              variants={itemVariants}
            >
              <motion.button
                onClick={onGetEarlyAccess}
                className="h-12 px-8 bg-[#714B67] text-white font-medium rounded-xl hover:bg-[#5a3b52] transition-all duration-200 shadow-lg shadow-[#714B67]/25"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('cta')}
              </motion.button>
              <motion.button
                className="h-12 px-8 border-2 border-[#714B67]/30 text-[#714B67] font-medium rounded-xl hover:bg-[#714B67]/5 hover:border-[#714B67]/50 transition-all duration-200 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                {t('watchDemo')}
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex items-center gap-6 pt-4"
              variants={itemVariants}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[#714B67] to-[#8B5A7C] border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium text-[#2D2D2D]">2,500+ businesses</p>
                <p className="text-xs text-[#9E9E9E]">{t('trustLine')}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Dashboard Mockup with Floating Icons */}
          <motion.div
            className="relative h-[400px] sm:h-[480px] lg:h-[520px]"
            variants={dashboardVariants}
          >
            {/* Floating Icons - positioned outside the POS demo */}
            <FloatingIcon icon={ShoppingCart} className="-left-6 top-8" delay={0.5} duration={3} size="lg" />
            <FloatingIcon icon={BarChart3} className="-left-4 bottom-16" delay={0.7} duration={3.5} color="#22c55e" size="md" />
            <FloatingIcon icon={Users} className="-right-6 top-12" delay={0.9} duration={2.8} color="#3b82f6" size="lg" />
            <FloatingIcon icon={Wallet} className="-right-4 top-1/2" delay={1.1} duration={3.2} color="#f59e0b" size="md" />
            <FloatingIcon icon={TrendingUp} className="right-8 -bottom-2" delay={1.3} duration={3} color="#22c55e" size="md" />
            <FloatingIcon icon={Package} className="left-8 -bottom-2" delay={1.5} duration={2.9} color="#8b5cf6" size="md" />

            {/* Interactive Mini POS Demo */}
            <motion.div 
              className="absolute inset-4 sm:inset-6 bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {/* POS Header */}
              <div className="bg-gradient-to-r from-[#714B67] to-[#8B5A7C] p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                      <Receipt className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">TajirPoint POS</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <ShoppingCart className="w-5 h-5 text-white" />
                      <AnimatePresence>
                        {itemCount > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-2 -right-2 w-4 h-4 bg-white text-[#714B67] text-[10px] font-bold rounded-full flex items-center justify-center"
                          >
                            {itemCount}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Type Tabs */}
              <div className="flex border-b border-gray-100 bg-gray-50/50">
                {businessTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    onClick={() => handleBusinessTypeChange(type.id)}
                    className={`flex-1 py-2 px-2 text-[10px] font-medium transition-all relative ${
                      activeBusinessType === type.id
                        ? 'text-[#714B67] bg-white'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="mr-1">{type.icon}</span>
                    {type.label}
                    {activeBusinessType === type.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#714B67]"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="flex h-[calc(100%-120px)]">
                {/* Products Grid */}
                <div className="flex-1 p-3 overflow-y-auto">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-2">Tap to add</p>
                  <motion.div 
                    key={activeBusinessType}
                    className="grid grid-cols-3 gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentProducts.map((product: Product, i: number) => (
                      <motion.button
                        key={`${activeBusinessType}-${product.id}`}
                        onClick={() => addToCart(product)}
                        className={`relative p-2 rounded-xl border-2 transition-all ${
                          addedProduct === product.id 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-100 hover:border-[#714B67]/30 hover:bg-gray-50'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <AnimatePresence>
                          {addedProduct === product.id && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute inset-0 flex items-center justify-center bg-green-500/90 rounded-xl"
                            >
                              <Check className="w-5 h-5 text-white" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <span className="text-xl block">{product.emoji}</span>
                        <p className="text-[9px] font-medium text-gray-700 mt-1 truncate">{product.name}</p>
                        <p className="text-[9px] text-[#714B67] font-bold">₨{product.price}</p>
                      </motion.button>
                    ))}
                  </motion.div>
                </div>

                {/* Cart/Invoice Panel */}
                <div className="w-[45%] border-l border-gray-100 bg-gray-50/50 p-3 flex flex-col">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-2">Invoice</p>
                  
                  {/* Cart Items */}
                  <div className="flex-1 overflow-y-auto space-y-1.5 min-h-0">
                    <AnimatePresence mode="popLayout">
                      {cart.length === 0 ? (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-[10px] text-gray-400 text-center py-4"
                        >
                          Tap products to add
                        </motion.p>
                      ) : (
                        cart.map((item) => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-lg p-2 shadow-sm"
                          >
                            <div className="flex items-center justify-between gap-1">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span className="text-sm">{item.emoji}</span>
                                <span className="text-[10px] font-medium text-gray-700 truncate">{item.name}</span>
                              </div>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-400 hover:text-red-500 p-0.5"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <div className="flex items-center gap-1">
                                <button 
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                >
                                  <Minus className="w-2.5 h-2.5" />
                                </button>
                                <span className="text-[10px] font-medium w-4 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                >
                                  <Plus className="w-2.5 h-2.5" />
                                </button>
                              </div>
                              <span className="text-[10px] font-bold text-[#714B67]">₨{item.price * item.quantity}</span>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Total & Pay Button */}
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-gray-500">Total</span>
                      <motion.span 
                        key={total}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-sm font-bold text-[#2D2D2D]"
                      >
                        ₨{total.toLocaleString()}
                      </motion.span>
                    </div>
                    <motion.button
                      className={`w-full py-2 rounded-lg text-[11px] font-semibold transition-all ${
                        cart.length > 0 
                          ? 'bg-[#714B67] text-white hover:bg-[#5a3b52]' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                      whileHover={cart.length > 0 ? { scale: 1.02 } : {}}
                      whileTap={cart.length > 0 ? { scale: 0.98 } : {}}
                      disabled={cart.length === 0}
                    >
                      {cart.length > 0 ? 'Complete Sale ✓' : 'Add items'}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
