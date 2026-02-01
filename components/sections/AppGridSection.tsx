'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  ShoppingCart,
  Users,
  FileText,
  Package,
  Settings,
  Truck,
  TrendingUp,
} from 'lucide-react';

const apps = [
  { name: 'Sales', icon: ShoppingCart, color: 'from-blue-500 to-cyan-500' },
  { name: 'Inventory', icon: Package, color: 'from-purple-500 to-pink-500' },
  { name: 'Accounting', icon: FileText, color: 'from-green-500 to-emerald-500' },
  { name: 'Analytics', icon: BarChart3, color: 'from-orange-500 to-red-500' },
  { name: 'CRM', icon: Users, color: 'from-indigo-500 to-purple-500' },
  { name: 'Purchasing', icon: Truck, color: 'from-yellow-500 to-orange-500' },
  { name: 'Reports', icon: TrendingUp, color: 'from-teal-500 to-green-500' },
  { name: 'Settings', icon: Settings, color: 'from-slate-500 to-gray-500' },
];

export function AppGridSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-secondary/30 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            Complete Business Suite
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Access a comprehensive set of apps designed to run every aspect of your business.
          </p>
        </motion.div>

        {/* App Grid - Odoo Style */}
        <motion.div
          className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {apps.map((app, idx) => {
            const Icon = app.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group"
              >
                <div className={`relative h-40 rounded-2xl bg-gradient-to-br ${app.color} p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden`}>
                  {/* Floating background orb */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white blur-3xl -translate-y-1/2 translate-x-1/2" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center text-center">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Icon className="h-12 w-12 text-white mb-3" />
                    </motion.div>
                    <h3 className="font-semibold text-white text-sm sm:text-base">{app.name}</h3>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 group-hover:h-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-lg text-muted-foreground mb-6">
            All apps are seamlessly integrated and work together to automate your workflows
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-lg transition-all hover:scale-105">
            Explore All Apps
            <span>→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
