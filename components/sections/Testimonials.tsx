'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'TajirPoint transformed how we manage our chain of pharmacies. The offline mode and regulatory features are perfect for Pakistan.',
    author: 'Ahmed Hassan',
    business: 'Al-Shifa Pharmacies, Lahore',
    type: '5 locations',
    rating: 5,
  },
  {
    quote: 'Managing multiple retail stores was chaotic before TajirPoint. Now, real-time inventory sync and unified reporting save us hours daily.',
    author: 'Fatima Khan',
    business: 'Khan Fashion Group, Karachi',
    type: '8 locations',
    rating: 5,
  },
  {
    quote: 'The Urdu interface was a game-changer for our restaurant staff. System setup took just 2 hours and we were live.',
    author: 'Muhammad Ali',
    business: 'Karachi Kitchen Express, Islamabad',
    type: '3 locations',
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const testimonial = testimonials[current];

  return (
    <section className="w-full bg-secondary py-16 sm:py-24">
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
            Loved by Businesses Like Yours
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            See how TajirPoint transformed these businesses
          </p>
        </motion.div>

        {/* Testimonial Card Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="bg-white rounded-2xl border border-border shadow-md p-8 sm:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Star Rating */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-lg sm:text-xl text-foreground mb-8 leading-relaxed">
              "{testimonial.quote}"
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">
                  {testimonial.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.business}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {testimonial.type}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <motion.button
            onClick={prev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </motion.button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === current
                    ? 'bg-primary w-8'
                    : 'bg-border w-2 hover:bg-primary/50'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <motion.button
            onClick={next}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
