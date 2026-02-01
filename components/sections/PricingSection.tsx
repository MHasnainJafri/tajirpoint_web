'use client';

import { Button } from "@/components/ui/button"

import { CardContent } from "@/components/ui/card"

import { CardDescription } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import { Card } from "@/components/ui/card"

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Starter',
    description: 'Free early access when we launch',
    price: 'Free',
    period: 'Then $299/month',
    features: [
      'Up to 1 location',
      'Basic inventory management',
      'Standard POS interface',
      'Email support',
      '30-day transaction history',
      'Offline mode',
    ],
    cta: 'Join Waitlist',
    popular: false,
  },
  {
    name: 'Professional',
    description: 'Best for growing businesses',
    price: '$599',
    period: 'per month (or $5,999/year)',
    features: [
      'Up to 5 locations',
      'Advanced inventory tracking',
      'Customer CRM',
      'Priority support',
      'Unlimited transaction history',
      'Offline mode',
      'Sales analytics',
      'Supplier management',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For large businesses with complex needs',
    price: 'Custom',
    period: 'contact sales',
    features: [
      'Unlimited locations',
      'Complete automation',
      'Advanced CRM & loyalty',
      '24/7 dedicated support',
      'Custom integrations',
      'Advanced offline mode',
      'Real-time analytics',
      'API access',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

interface PricingSectionProps {
  onGetEarlyAccess?: () => void;
}

export function PricingSection({ onGetEarlyAccess }: PricingSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="pricing" className="w-full bg-white py-20 sm:py-28">
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
              Simple Pricing
            </h2>
            <p className="body text-[#6B6B6B]">
              14-day free trial. No credit card required.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={plan.popular ? { translateY: -8 } : { translateY: -4 }}
                className={`relative rounded-[12px] border p-8 transition-all duration-300 flex flex-col h-full ${
                  plan.popular
                    ? 'bg-[#714B67] text-white border-[#714B67] shadow-lg'
                    : 'bg-white border-[#E8E8E8] text-[#2D2D2D]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#714B67] px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </div>
                )}

                {/* Plan name */}
                <h4 className="h4 mb-2">
                  {plan.name}
                </h4>

                {/* Description */}
                <p className={`small mb-6 ${plan.popular ? 'text-white/80' : 'text-[#6B6B6B]'}`}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <p className="h3 font-bold">
                    {plan.price}
                  </p>
                  <p className={`small ${plan.popular ? 'text-white/70' : 'text-[#9E9E9E]'}`}>
                    {plan.period}
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={onGetEarlyAccess}
                  className={`mb-8 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    plan.popular
                      ? 'bg-white text-[#714B67] hover:bg-white/90'
                      : 'bg-[#714B67] text-white hover:bg-[#5a3b52]'
                  }`}
                >
                  {plan.cta}
                </button>

                {/* Features */}
                <div className="space-y-3 flex-grow">
                  <p className="small uppercase tracking-wide font-medium opacity-70">
                    What's included
                  </p>
                  {plan.features.map((feature, fIdx) => (
                    <motion.div
                      key={fIdx}
                      className="flex items-start gap-3"
                      variants={itemVariants}
                    >
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="small">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
