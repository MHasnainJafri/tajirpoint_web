'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/atoms/Badge';
import { ShoppingCart, UtensilsCrossed, Pill, Store } from 'lucide-react';

const industries = [
  {
    icon: ShoppingCart,
    name: 'Retail Stores',
    description: 'Inventory management, barcode scanning, and multi-till support for modern retail shops.',
    features: ['Barcode Management', 'Stock Control', 'Multi-till Support'],
  },
  {
    icon: UtensilsCrossed,
    name: 'Restaurants',
    description: 'Table management, kitchen display system, and order tracking for food service.',
    features: ['Table Management', 'Order Tracking', 'Kitchen Display'],
  },
  {
    icon: Pill,
    name: 'Pharmacies',
    description: 'Prescription tracking, expiry management, and regulatory compliance features.',
    features: ['Prescription Tracking', 'Expiry Alerts', 'Compliance Tools'],
  },
  {
    icon: Store,
    name: 'Grocery Stores',
    description: 'Bulk inventory, weight-based pricing, and supplier integration.',
    features: ['Bulk Management', 'Smart Pricing', 'Supplier Link'],
  },
];

export function IndustrySection() {
  const [activeIndustry, setActiveIndustry] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="industries" className="relative py-20 sm:py-32 bg-gradient-to-b from-background via-secondary/20 to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            Purpose-Built for Your Industry
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Tailored solutions with industry-specific features for retailers, restaurants, pharmacies, and grocers.
          </p>
        </motion.div>

        {/* Industry Cards */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {industries.map((industry, idx) => {
            const Icon = industry.icon;
            return (
              <motion.button
                key={idx}
                variants={itemVariants}
                onClick={() => setActiveIndustry(idx)}
                whileHover={{ y: -8 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-border/40 bg-card/50 backdrop-blur p-8 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-2xl"
              >
                {/* Animated background gradient on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/5 to-accent/5 transition-opacity"
                  transition={{ duration: 0.4 }}
                />

                {/* Active state indicator */}
                {activeIndustry === idx && (
                  <motion.div
                    layoutId="activeIndustry"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent"
                    transition={{ type: 'spring', duration: 0.6 }}
                  />
                )}

                <div className="relative space-y-4 h-full flex flex-col">
                  {/* Icon with gradient on hover */}
                  <motion.div 
                    className="inline-flex rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-4 group-hover:from-primary/40 group-hover:to-accent/40 transition-colors w-fit"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
                  </motion.div>

                  {/* Title and Description */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {industry.description}
                    </p>
                  </div>

                  {/* Features list with animation */}
                  {activeIndustry === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-wrap gap-2 pt-4 border-t border-border/30"
                    >
                      {industry.features.map((feature, fIdx) => (
                        <motion.div
                          key={fIdx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: fIdx * 0.1 }}
                        >
                          <Badge
                            variant="accent"
                            className="text-xs font-medium"
                          >
                            {feature}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Hover indicator */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-sm font-semibold text-primary">→</div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
