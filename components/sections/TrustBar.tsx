'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Zap, BadgeCheck, Sparkles, CreditCard, Cloud, Smartphone, Wallet, Flame, MessageCircle } from 'lucide-react';

export function TrustBar() {
  const trustSignals = [
    { icon: ShieldCheck, title: '256-bit SSL', subtitle: 'Bank-grade Security' },
    { icon: Clock, title: '2 Months Free', subtitle: 'No Credit Card' },
    { icon: Zap, title: 'Instant Setup', subtitle: 'Under 5 Minutes' },
    { icon: BadgeCheck, title: 'Money Back', subtitle: '30-Day Guarantee' },
  ];

  const techPartners = [
    { name: 'Stripe', icon: CreditCard, color: '#635bff' },
    { name: 'AWS', icon: Cloud, color: '#ff9900' },
    { name: 'JazzCash', icon: Smartphone, color: '#e2231a' },
    { name: 'EasyPaisa', icon: Wallet, color: '#00a651' },
    { name: 'Firebase', icon: Flame, color: '#ffca28' },
    { name: 'WhatsApp', icon: MessageCircle, color: '#25d366' },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 border-y border-gray-100">
      <div className="mx-auto max-w-5xl px-6">
        {/* Trust Signals - Apple-style minimal */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-16">
          {trustSignals.map((signal, idx) => {
            const IconComponent = signal.icon;
            return (
              <motion.div
                key={idx}
                className="flex flex-col items-center text-center group"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
              >
                <div className="mb-4">
                  <IconComponent 
                    className="w-8 h-8 text-[#1d1d1f] stroke-[1.25] group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
                  {signal.title}
                </h3>
                <p className="text-[13px] text-[#86868b] mt-1 font-normal">
                  {signal.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Subtle divider */}
        <div className="w-12 h-px bg-gray-200 mx-auto mb-12" />

        {/* Technology Partners - With proper icons */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-[11px] text-[#86868b] mb-6 font-medium tracking-[0.1em] uppercase">
            Integrated with leading platforms
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {techPartners.map((partner, idx) => {
              const Icon = partner.icon;
              return (
                <div 
                  key={idx} 
                  className="flex items-center gap-2 px-4 py-2 bg-[#f5f5f7] rounded-full hover:bg-[#e8e8ed] transition-colors cursor-default"
                >
                  <Icon className="w-4 h-4" style={{ color: partner.color }} strokeWidth={1.5} />
                  <span className="text-[13px] font-medium text-[#1d1d1f]">
                    {partner.name}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Early Access Banner - Minimal Apple style */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f5f5f7] rounded-full">
            <Sparkles className="w-4 h-4 text-[#714B67]" />
            <span className="text-[13px] font-medium text-[#1d1d1f]">
              Early adopters get <span className="text-[#714B67]">50% off</span> for life
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
