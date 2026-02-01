'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  fullName: string;
  email: string;
  businessName: string;
  businessType: string;
  locations: string;
  country: string;
  phone: string;
}

interface FormErrors {
  [key: string]: string;
}

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const countries = [
  { name: 'United States', flag: '🇺🇸' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Australia', flag: '🇦🇺' },
];

export function EarlyAccessModal({ isOpen, onClose }: EarlyAccessModalProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    businessName: '',
    businessType: '',
    locations: '',
    country: '',
    phone: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [queueNumber, setQueueNumber] = useState(0);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.fullName || formData.fullName.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.businessName) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.businessType) {
      newErrors.businessType = 'Please select a business type';
    }

    if (!formData.locations) {
      newErrors.locations = 'Please select number of locations';
    }

    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate queue number
      const queueNum = Math.floor(Math.random() * 1000) + 1;
      setQueueNumber(queueNum);

      // Store submission (in real app, would be backend)
      localStorage.setItem(
        'earlyAccessSubmission',
        JSON.stringify({
          ...formData,
          queueNumber: queueNum,
          timestamp: new Date().toISOString(),
        })
      );

      setIsSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSuccess) {
      onClose();
    }
  };

  const handleDone = () => {
    setIsSuccess(false);
    setFormData({
      fullName: '',
      email: '',
      businessName: '',
      businessType: '',
      locations: '',
      country: '',
      phone: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, translateY: 100 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 100 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="rounded-2xl bg-white shadow-2xl p-12 mx-4 max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 text-[#9E9E9E] hover:text-[#2D2D2D] transition-colors duration-200 hover:rotate-90"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {!isSuccess ? (
                <>
                  {/* Form Header */}
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-[#2D2D2D] mb-2">Join the Waitlist</h2>
                    <p className="text-base text-[#6B6B6B]">Get early access when we launch</p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-[#6B6B6B] mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#714B67] transition-all ${
                          errors.fullName ? 'border-red-500' : 'border-[#E8E8E8]'
                        }`}
                      />
                      {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-sm font-medium text-[#6B6B6B] mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@business.com"
                        className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#714B67] transition-all ${
                          errors.email ? 'border-red-500' : 'border-[#E8E8E8]'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    {/* Business Name */}
                    <div>
                      <label className="block text-sm font-medium text-[#6B6B6B] mb-2">Business Name</label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="Your Business Name"
                        className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#714B67] transition-all ${
                          errors.businessName ? 'border-red-500' : 'border-[#E8E8E8]'
                        }`}
                      />
                      {errors.businessName && <p className="text-xs text-red-500 mt-1">{errors.businessName}</p>}
                    </div>

                    {/* Business Type */}
                    <div>
                      <label className="block text-sm font-medium text-[#6B6B6B] mb-2">Business Type</label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#714B67] transition-all ${
                          errors.businessType ? 'border-red-500' : 'border-[#E8E8E8]'
                        }`}
                      >
                        <option value="">Select a business type</option>
                        <option value="retail">Retail Store</option>
                        <option value="restaurant">Restaurant / Cafe</option>
                        <option value="pharmacy">Pharmacy</option>
                        <option value="grocery">Grocery Store</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.businessType && <p className="text-xs text-red-500 mt-1">{errors.businessType}</p>}
                    </div>

                    {/* Number of Locations */}
                    <div>
                      <label className="block text-sm font-medium text-[#6B6B6B] mb-2">Number of Locations</label>
                      <select
                        name="locations"
                        value={formData.locations}
                        onChange={handleInputChange}
                        className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#714B67] transition-all ${
                          errors.locations ? 'border-red-500' : 'border-[#E8E8E8]'
                        }`}
                      >
                        <option value="">Select number of locations</option>
                        <option value="1">1 location</option>
                        <option value="2-5">2-5 locations</option>
                        <option value="6-10">6-10 locations</option>
                        <option value="11+">11+ locations</option>
                      </select>
                      {errors.locations && <p className="text-xs text-red-500 mt-1">{errors.locations}</p>}
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-sm font-medium text-[#6B6B6B] mb-2">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#714B67] transition-all ${
                          errors.country ? 'border-red-500' : 'border-[#E8E8E8]'
                        }`}
                      >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                          <option key={country.name} value={country.name}>
                            {country.flag} {country.name}
                          </option>
                        ))}
                      </select>
                      {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country}</p>}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-medium text-[#6B6B6B] mb-2">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 234 567 8900"
                        className="w-full h-12 px-4 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#714B67] transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-[#714B67] text-white font-medium rounded-lg hover:bg-[#5a3b52] disabled:opacity-70 transition-all duration-200 mt-6 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Join Waitlist'
                      )}
                    </button>

                    {/* Bottom Text */}
                    <p className="text-xs text-[#9E9E9E] text-center">
                      We'll notify you when we launch. No spam, promise.
                    </p>
                  </form>
                </>
              ) : (
                <>
                  {/* Success State */}
                  <div className="text-center">
                    {/* Success Icon */}
                    <motion.div
                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                    >
                      <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>

                    <h3 className="text-3xl font-bold text-[#2D2D2D] mb-2">You're on the List!</h3>

                    {/* Queue Number */}
                    <motion.div
                      className="bg-[#714B67] text-white rounded-lg p-6 my-6"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-sm text-white/70 mb-2">Position in Queue</p>
                      <p className="text-4xl font-bold">#{queueNumber}</p>
                    </motion.div>

                    <p className="text-base text-[#6B6B6B] mb-6 leading-relaxed">
                      Thank you for joining the waitlist! You're number #{queueNumber} in line. We'll notify you via email when TajirPoint launches.
                    </p>

                    {/* What Happens Next */}
                    <div className="bg-[#F5F5F5] rounded-lg p-6 mb-6 text-left">
                      <h4 className="font-bold text-[#2D2D2D] mb-3">What happens next?</h4>
                      <ul className="space-y-2 text-sm text-[#6B6B6B]">
                        <li>✓ You'll receive a confirmation email</li>
                        <li>✓ Get updates on our progress</li>
                        <li>✓ Priority access when we launch</li>
                        <li>✓ Exclusive early-bird pricing</li>
                      </ul>
                    </div>

                    {/* Social Share */}
                    <div className="mb-6">
                      <p className="text-sm font-medium text-[#2D2D2D] mb-3">Share with your network:</p>
                      <div className="flex justify-center gap-3">
                        <button className="w-10 h-10 bg-[#714B67] text-white rounded-lg hover:bg-[#5a3b52] transition-all duration-200 flex items-center justify-center">
                          𝕏
                        </button>
                        <button className="w-10 h-10 bg-[#714B67] text-white rounded-lg hover:bg-[#5a3b52] transition-all duration-200 flex items-center justify-center">
                          in
                        </button>
                        <button className="w-10 h-10 bg-[#714B67] text-white rounded-lg hover:bg-[#5a3b52] transition-all duration-200 flex items-center justify-center text-xs">
                          🔗
                        </button>
                      </div>
                    </div>

                    {/* Done Button */}
                    <button
                      onClick={handleDone}
                      className="w-full h-12 bg-[#714B67] text-white font-medium rounded-lg hover:bg-[#5a3b52] transition-all duration-200"
                    >
                      Done
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
