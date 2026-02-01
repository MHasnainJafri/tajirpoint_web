'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'TajirPoint has transformed how we manage our business. Sales are up 35% since implementation.',
    author: 'Ahmed Khan',
    role: 'Store Owner',
    company: 'Khan Electronics, Lahore',
  },
  {
    quote: 'The offline mode is a lifesaver. Our internet keeps dropping and we never lose a sale.',
    author: 'Fatima Malik',
    role: 'Manager',
    company: 'Malik Clothing Store',
  },
  {
    quote: 'Best investment for our restaurant. Staff is more efficient, customers are happier.',
    author: 'Hassan Ali',
    role: 'Owner',
    company: 'Ali Restaurant Group',
  },
  {
    quote: 'The Urdu interface made it so easy to train our team. Support is exceptional.',
    author: 'Zara Hussain',
    role: 'Pharmacy Manager',
    company: 'Hussain Pharmacy',
  },
];

export function TestimonialsCarousel() {
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
    <section className="w-full bg-[#FAFAFA] py-20 sm:py-28">
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
              Loved by Pakistani Businesses
            </h2>
            <p className="body text-[#6B6B6B]">
              Join 2,500+ stores, restaurants, and pharmacies
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ translateY: -4 }}
                className="bg-white rounded-[12px] border border-[#E8E8E8] p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#714B67] text-[#714B67]"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="body text-[#2D2D2D] mb-8 flex-grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="border-t border-[#E8E8E8] pt-6">
                  <p className="font-semibold text-[#2D2D2D]">
                    {testimonial.author}
                  </p>
                  <p className="small text-[#9E9E9E]">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <a
              href="#"
              className="small text-[#714B67] font-medium hover:underline transition-all duration-200"
            >
              Read more customer stories →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
