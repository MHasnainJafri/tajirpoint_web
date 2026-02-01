'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/Button';
import { ArrowRight, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FinalCTAProps {
  onGetEarlyAccess?: () => void;
}

export function FinalCTA({ onGetEarlyAccess }: FinalCTAProps) {
  const t = useTranslations('cta');
  return (
    <section className="w-full bg-gradient-to-br from-primary via-primary to-accent py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance leading-tight">
            {t('title')}
          </h2>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-primary-foreground font-semibold px-8 py-3 text-base w-full sm:w-auto"
                onClick={onGetEarlyAccess}
              >
                {t('button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          {/* Trust Indicator */}
          <motion.div
            className="flex justify-center pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-white/80 text-sm">{t('noCreditCard')}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
