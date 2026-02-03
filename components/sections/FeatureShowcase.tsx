'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
  BarChart3, 
  ShoppingCart, 
  Users, 
  Smartphone,
  Monitor,
  Receipt
} from 'lucide-react';

const features = [
  {
    key: 'inventory',
    icon: ShoppingCart,
  },
  {
    key: 'analytics',
    icon: BarChart3,
  },
  {
    key: 'customers',
    icon: Users,
  },
];

export function FeatureShowcase() {
  const t = useTranslations('featureShowcase');

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10">
              <Monitor className="w-7 h-7 text-primary" />
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                {t('title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-lg">
                {t('description')}
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {t(`features.${feature.key}.title`)}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t.rich(`features.${feature.key}.description`, {
                          bold: (chunks) => <strong className="text-foreground">{chunks}</strong>
                        })}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                <span>{t('cta')}</span>
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                {t('ctaSubtext')}
              </p>
            </motion.div>
          </motion.div>

          {/* Right Content - Stacked Screenshots */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:h-[600px]"
          >
            {/* Browser Window - Top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-30 bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-border max-w-md mx-auto lg:absolute lg:top-0 lg:right-0"
            >
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-background rounded-md px-3 py-1 text-xs text-muted-foreground truncate">
                    app.tajirpoint.com/dashboard
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="p-4 bg-primary/5">
                <div className="bg-primary text-primary-foreground rounded-lg p-4 text-center">
                  <p className="font-medium text-sm">
                    {t('screenshots.dashboard')}
                  </p>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-1 bg-background rounded-lg p-3 shadow-sm">
                      <div className="text-xs text-muted-foreground">{t('screenshots.todaySales')}</div>
                      <div className="text-lg font-bold text-foreground">Rs. 45,230</div>
                    </div>
                    <div className="flex-1 bg-background rounded-lg p-3 shadow-sm">
                      <div className="text-xs text-muted-foreground">{t('screenshots.orders')}</div>
                      <div className="text-lg font-bold text-foreground">127</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Middle Card - POS Screen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden lg:block relative z-20 bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-border max-w-sm mx-auto lg:absolute lg:top-32 lg:left-0"
            >
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Receipt className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-sm">{t('screenshots.quickSale')}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rice Basmati 1kg</span>
                    <span className="font-medium">Rs. 280</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cooking Oil 1L</span>
                    <span className="font-medium">Rs. 450</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sugar 1kg</span>
                    <span className="font-medium">Rs. 180</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>{t('screenshots.total')}</span>
                    <span className="text-primary">Rs. 910</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Card - Mobile View */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="hidden lg:block relative z-10 bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-border w-48 mx-auto lg:absolute lg:bottom-0 lg:right-12"
            >
              {/* Phone Header */}
              <div className="bg-muted/30 px-4 py-2 flex items-center justify-center">
                <div className="w-16 h-1 bg-muted rounded-full" />
              </div>
              <div className="p-3">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium">{t('screenshots.mobileApp')}</span>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary">+23%</div>
                  <div className="text-xs text-muted-foreground">{t('screenshots.salesGrowth')}</div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="hidden lg:block absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
