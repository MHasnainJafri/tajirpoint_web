'use client';

import { CardDescription } from "@/components/ui/card"

import { CardContent } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Wifi,
  Package,
  Users,
  Globe,
  MessageSquare,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export function FeaturesSection() {
  const t = useTranslations('features');

  const features = [
    {
      icon: BarChart3,
      title: t('smartAnalytics.title'),
      description: t('smartAnalytics.description'),
    },
    {
      icon: Wifi,
      title: t('offlineMode.title'),
      description: t('offlineMode.description'),
    },
    {
      icon: Package,
      title: t('inventoryControl.title'),
      description: t('inventoryControl.description'),
    },
    {
      icon: Globe,
      title: t('multiLocation.title'),
      description: t('multiLocation.description'),
    },
    {
      icon: Users,
      title: t('customerCRM.title'),
      description: t('customerCRM.description'),
    },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, translateY: 20 },
    visible: {
      opacity: 1,
      translateY: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="w-full bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
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
              {t('title')}
            </h2>
            <p className="body text-[#6B6B6B]">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Features Grid - 3 columns */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-white border border-[#E8E8E8] rounded-[12px] p-10 hover:shadow-lg hover:border-[#714B67] transition-all duration-300 group h-full flex flex-col"
                  whileHover={{ translateY: -4 }}
                >
                  {/* Icon */}
                  <div className="mb-6 inline-flex w-10 h-10 items-center justify-center">
                    <Icon className="w-10 h-10 text-[#714B67] stroke-1.5" />
                  </div>

                  {/* Title */}
                  <h4 className="h4 text-[#2D2D2D] mb-3">
                    {feature.title}
                  </h4>

                  {/* Description */}
                  <p className="body text-[#6B6B6B] mb-6 flex-grow">
                    {feature.description}
                  </p>

                  {/* Learn More */}
                  <a href="#" className="small text-[#714B67] font-medium hover:underline transition-all duration-200">
                    {t('learnMore')}
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
