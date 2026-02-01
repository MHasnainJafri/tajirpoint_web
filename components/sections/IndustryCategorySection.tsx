'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Easing } from 'framer-motion';
import { Store, UtensilsCrossed, Stethoscope, ShoppingCart, Check, ArrowRight, type LucideIcon } from 'lucide-react';

interface Industry {
  id: string;
  name: string;
  Icon: LucideIcon;
  features: string[];
}

const industries: Industry[] = [
  {
    id: 'retail',
    name: 'Retail',
    Icon: Store,
    features: [
      'Real-time sales analytics',
      'Customer loyalty programs',
      'Multi-location inventory sync',
      'POS & online sales integration',
    ],
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    Icon: UtensilsCrossed,
    features: [
      'Menu & dish-level profitability',
      'Kitchen display system',
      'Table management & reservations',
      'Staff scheduling & payroll',
    ],
  },
  {
    id: 'pharmacies',
    name: 'Pharmacies',
    Icon: Stethoscope,
    features: [
      'Prescription management',
      'Expiry date tracking',
      'Insurance integration',
      'Patient loyalty rewards',
    ],
  },
  {
    id: 'groceries',
    name: 'Groceries',
    Icon: ShoppingCart,
    features: [
      'Barcode scanning & inventory',
      'Bulk purchase discounts',
      'Fresh stock alerts',
      'Multi-aisle organization',
    ],
  },
];

export function IndustryCategorySection() {
  const [activeIndustry, setActiveIndustry] = useState('retail');
  const current = industries.find((ind) => ind.id === activeIndustry)!;
  const CurrentIcon = current.Icon;

  return (
    <section id="industries" className="w-full bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header - Apple style */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-[32px] sm:text-[40px] font-semibold text-[#1d1d1f] tracking-tight leading-tight">
            Built for Your Industry
          </h2>
          <p className="text-[17px] text-[#86868b] mt-3 font-normal">
            Specialized features for every business type
          </p>
        </motion.div>

        {/* Tab Buttons - Clean minimal style */}
        <motion.div
          className="flex justify-center gap-1 sm:gap-2 mb-16 p-1 bg-[#f5f5f7] rounded-full max-w-fit mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {industries.map((industry) => {
            const Icon = industry.Icon;
            const isActive = activeIndustry === industry.id;
            return (
              <button
                key={industry.id}
                onClick={() => setActiveIndustry(industry.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-[13px] sm:text-[14px] font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-[#1d1d1f] shadow-sm'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <Icon className="w-4 h-4 stroke-[1.5]" />
                <span className="hidden sm:inline">{industry.name}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndustry}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            {/* Left: Icon + Features */}
            <div className="space-y-8">
              <div className="w-14 h-14 rounded-2xl bg-[#f5f5f7] flex items-center justify-center">
                <CurrentIcon className="w-7 h-7 text-[#1d1d1f] stroke-[1.25]" />
              </div>

              <div className="space-y-4">
                {current.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#34c759]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#34c759] stroke-[2.5]" />
                    </div>
                    <span className="text-[15px] text-[#1d1d1f]/80">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-[#0071e3] text-[15px] font-medium hover:underline transition-all group"
              >
                Explore Details 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[1.5]" />
              </a>
            </div>

            {/* Right: Screenshot Placeholder */}
            <div className="bg-[#f5f5f7] rounded-2xl h-80 lg:h-96 flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-widest text-[#86868b] font-medium">
                  {current.name} Interface
                </p>
                <p className="text-[15px] text-[#86868b] mt-2">
                  Screenshot would go here
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
