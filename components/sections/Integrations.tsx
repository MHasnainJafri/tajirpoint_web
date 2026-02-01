'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Integration {
  name: string;
}

const integrations: Integration[] = [
  { name: 'Stripe' },
  { name: 'PayPal' },
  { name: 'Square' },
  { name: 'Bank Transfer' },
  { name: 'QuickBooks' },
  { name: 'Xero' },
  { name: 'Shopify' },
  { name: 'WooCommerce' },
  { name: 'WhatsApp Business' },
  { name: 'SMS Gateway' },
  { name: 'Email' },
  { name: 'Slack' },
];

export function Integrations() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="w-full bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        <motion.div
          className="space-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div className="text-center space-y-4" variants={itemVariants}>
            <h2 className="h2 text-[#2D2D2D]">
              Seamlessly Connects With
            </h2>
          </motion.div>

          {/* Logo Grid - 4 columns × 3 rows */}
          <motion.div
            className="grid grid-cols-3 sm:grid-cols-4 gap-10 justify-items-center"
            variants={containerVariants}
          >
            {integrations.map((integration, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="h-12 bg-[#E8E8E8] rounded opacity-60 hover:opacity-100 transition-opacity duration-200 w-full flex items-center justify-center"
              >
                <p className="small text-[#9E9E9E] font-medium">
                  {integration.name}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Link */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <a
              href="#integrations"
              className="small text-[#714B67] font-medium hover:underline transition-all duration-200"
            >
              View all 50+ integrations →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
