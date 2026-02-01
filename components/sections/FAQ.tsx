'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function FAQ() {
  const t = useTranslations('faq');

  const faqItems = [
    {
      question: t('items.offline.question'),
      answer: t('items.offline.answer'),
    },
    {
      question: t('items.languages.question'),
      answer: t('items.languages.answer'),
    },
    {
      question: t('items.dataOffline.question'),
      answer: t('items.dataOffline.answer'),
    },
    {
      question: t('items.setupTime.question'),
      answer: t('items.setupTime.answer'),
    },
    {
      question: t('items.training.question'),
      answer: t('items.training.answer'),
    },
    {
      question: t('items.multiStore.question'),
      answer: t('items.multiStore.answer'),
    },
    {
      question: t('items.payments.question'),
      answer: t('items.payments.answer'),
    },
    {
      question: t('items.setupFee.question'),
      answer: t('items.setupFee.answer'),
    },
  ];
  const [expanded, setExpanded] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="w-full bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {t('title')}
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="border border-border rounded-lg overflow-hidden"
            >
              <motion.button
                onClick={() => toggleExpand(index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary transition-colors"
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
              >
                <h3 className="text-lg font-semibold text-foreground text-left">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: expanded === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 text-primary" />
                </motion.div>
              </motion.button>

              {/* Answer */}
              {expanded === index && (
                <motion.div
                  className="px-6 py-4 bg-secondary border-t border-border"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Support Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-muted-foreground">
            {t('stillHaveQuestions')}{' '}
            <a href="#contact" className="text-primary font-semibold hover:underline">
              {t('contactSupport')}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
