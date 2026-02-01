'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Users, Gift, Loader2, Sparkles, Copy, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  email: string;
  name: string;
  businessName: string;
  businessType: string;
  referralCode?: string;
}

interface SubmitResult {
  success: boolean;
  queueNumber?: number;
  referralCode?: string;
  error?: string;
}

// Animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 }
  },
  exit: { opacity: 0, scale: 0.9, y: 40 }
};

const formItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.3 }
  })
};

const successVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', damping: 20, stiffness: 300 }
  }
};

const API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:8001';

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const t = useTranslations('waitlist');
  const locale = useLocale();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    businessName: '',
    businessType: '',
    referralCode: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const businessTypes = [
    { value: 'retail', label: t('businessTypes.retail') },
    { value: 'restaurant', label: t('businessTypes.restaurant') },
    { value: 'pharmacy', label: t('businessTypes.pharmacy') },
    { value: 'grocery', label: t('businessTypes.grocery') },
    { value: 'wholesale', label: t('businessTypes.wholesale') },
    { value: 'other', label: t('businessTypes.other') },
  ];

  // Check for referral code in URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const refCode = urlParams.get('ref');
      if (refCode) {
        setFormData(prev => ({ ...prev, referralCode: refCode }));
      }
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email) {
      newErrors.email = t('errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('errors.emailInvalid');
    }

    if (!formData.name) {
      newErrors.name = t('errors.nameRequired');
    }

    if (!formData.businessName) {
      newErrors.businessName = t('errors.businessNameRequired');
    }

    if (!formData.businessType) {
      newErrors.businessType = t('errors.businessTypeRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/waitlist/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          businessName: formData.businessName,
          businessType: formData.businessType,
          referralCode: formData.referralCode || undefined,
          locale: locale,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult({
          success: true,
          queueNumber: data.queueNumber,
          referralCode: data.referralCode,
        });
        setStep('success');
      } else {
        const errorMsg = data.errors?.email?.[0] || data.error || t('errors.submitFailed');
        setResult({
          success: false,
          error: errorMsg,
        });
      }
    } catch (error) {
      setResult({
        success: false,
        error: t('errors.submitFailed'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep('form');
    setFormData({
      email: '',
      name: '',
      businessName: '',
      businessType: '',
      referralCode: '',
    });
    setErrors({});
    setResult(null);
    onClose();
  };

  const copyReferralLink = async () => {
    if (result?.referralCode) {
      const link = `${window.location.origin}?ref=${result.referralCode}`;
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#714B67] via-[#8B5A7C] to-[#714B67]" />
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Sparkles className="w-5 h-5 text-[#714B67]" />
                  </motion.div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {step === 'form' ? t('title') : t('successTitle')}
                  </h2>
                </div>
                <motion.button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-gray-500" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6">
                {step === 'form' ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.p 
                      className="text-gray-600 text-sm mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {t('subtitle')}
                    </motion.p>

                    {/* Email */}
                    <motion.div
                      custom={0}
                      variants={formItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('email')} *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#714B67] focus:border-transparent transition-all ${
                          errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder={t('emailPlaceholder')}
                      />
                      <AnimatePresence>
                        {errors.email && (
                          <motion.p 
                            className="text-red-500 text-xs mt-1"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Name */}
                    <motion.div
                      custom={1}
                      variants={formItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('name')} *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#714B67] focus:border-transparent transition-all ${
                          errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder={t('namePlaceholder')}
                      />
                      <AnimatePresence>
                        {errors.name && (
                          <motion.p 
                            className="text-red-500 text-xs mt-1"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Business Name */}
                    <motion.div
                      custom={2}
                      variants={formItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('businessName')} *
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) =>
                          setFormData({ ...formData, businessName: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#714B67] focus:border-transparent transition-all ${
                          errors.businessName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder={t('businessNamePlaceholder')}
                      />
                      <AnimatePresence>
                        {errors.businessName && (
                          <motion.p 
                            className="text-red-500 text-xs mt-1"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            {errors.businessName}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Business Type */}
                    <motion.div
                      custom={3}
                      variants={formItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('businessType')} *
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) =>
                          setFormData({ ...formData, businessType: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#714B67] focus:border-transparent transition-all ${
                          errors.businessType ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                      >
                        <option value="">{t('selectBusinessType')}</option>
                        {businessTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <AnimatePresence>
                        {errors.businessType && (
                          <motion.p 
                            className="text-red-500 text-xs mt-1"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            {errors.businessType}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Referral Code (Optional) */}
                    <motion.div
                      custom={4}
                      variants={formItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('referralCode')} <span className="text-gray-400">({t('optional')})</span>
                      </label>
                      <input
                        type="text"
                        value={formData.referralCode}
                        onChange={(e) =>
                          setFormData({ ...formData, referralCode: e.target.value.toUpperCase() })
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#714B67] focus:border-transparent transition-all"
                        placeholder={t('referralCodePlaceholder')}
                      />
                    </motion.div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {result?.error && (
                        <motion.div 
                          className="p-3 bg-red-50 border border-red-200 rounded-lg"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <p className="text-red-600 text-sm">{result.error}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-[#714B67] text-white font-medium rounded-lg hover:bg-[#5a3b52] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                      custom={5}
                      variants={formItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {t('submitting')}
                        </>
                      ) : (
                        t('joinWaitlist')
                      )}
                    </motion.button>

                    {/* Privacy Note */}
                    <motion.p 
                      className="text-xs text-gray-500 text-center"
                      custom={6}
                      variants={formItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {t('privacyNote')}{' '}
                      <a href="/privacy" className="text-[#714B67] hover:underline">
                        {t('privacyPolicy')}
                      </a>
                    </motion.p>
                  </form>
                ) : (
                  /* Success State */
                  <motion.div 
                    className="text-center py-4"
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                    >
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </motion.div>

                    <motion.h3 
                      className="text-xl font-semibold text-gray-900 mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {t('welcomeAboard')}
                    </motion.h3>

                    <motion.p 
                      className="text-gray-600 mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {t('successMessage')}
                    </motion.p>

                    {/* Queue Number */}
                    <motion.div 
                      className="bg-gradient-to-br from-[#714B67]/10 to-[#714B67]/5 rounded-xl p-6 mb-6 border border-[#714B67]/20"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-[#714B67]" />
                        <span className="text-sm text-gray-600">{t('yourPosition')}</span>
                      </div>
                      <motion.span 
                        className="text-4xl font-bold text-[#714B67]"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.5 }}
                      >
                        #{result?.queueNumber}
                      </motion.span>
                    </motion.div>

                    {/* Referral Section */}
                    <motion.div 
                      className="bg-gray-50 rounded-xl p-4 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Gift className="w-5 h-5 text-[#714B67]" />
                        <span className="text-sm font-medium text-gray-900">
                          {t('moveUpQueue')}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">
                        {t('referralDescription')}
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          readOnly
                          value={`${typeof window !== 'undefined' ? window.location.origin : ''}?ref=${result?.referralCode}`}
                          className="flex-1 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg truncate font-mono"
                        />
                        <motion.button
                          onClick={copyReferralLink}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1 ${
                            copied 
                              ? 'bg-green-500 text-white' 
                              : 'bg-[#714B67] text-white hover:bg-[#5a3b52]'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {copied ? (
                            <><Check className="w-4 h-4" /> {t('copied')}</>
                          ) : (
                            <><Copy className="w-4 h-4" /> {t('copy')}</>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>

                    <motion.button
                      onClick={handleClose}
                      className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {t('close')}
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
