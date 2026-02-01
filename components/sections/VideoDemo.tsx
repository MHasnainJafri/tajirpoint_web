'use client';

import { useState } from "react"

import React from 'react';
import { motion } from 'framer-motion';

export function VideoDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
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
    <section className="w-full bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div className="text-center space-y-4" variants={itemVariants}>
            <h2 className="h2 text-[#2D2D2D]">
              See TajirPoint in Action
            </h2>
            <p className="body text-[#6B6B6B]">
              2-minute overview of key features
            </p>
          </motion.div>

          {/* Video Container */}
          <motion.div
            className="relative w-full aspect-video bg-[#2D2D2D] rounded-[12px] shadow-lg overflow-hidden border border-[#E8E8E8] flex items-center justify-center cursor-pointer group"
            variants={itemVariants}
            whileHover={{ translateY: -4 }}
          >
            {/* Play Button */}
            <motion.button
              className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#714B67] ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </motion.button>
          </motion.div>

          {/* CTA Link Below */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <p className="body text-[#6B6B6B]">
              Want a personalized demo?{' '}
              <a href="#contact" className="font-medium text-[#714B67] hover:underline transition-all duration-200">
                Schedule a call →
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
