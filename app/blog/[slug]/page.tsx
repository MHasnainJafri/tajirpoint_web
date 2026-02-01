'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // Sample blog post data - in real app would fetch from DB
  const post = {
    title: 'Getting Started with Cloud POS Systems',
    category: 'POS Systems',
    author: 'Ahmed Khan',
    authorRole: 'POS Expert',
    date: 'January 15, 2025',
    readTime: '5 min read',
    image: '/blog/post-hero.jpg',
    content: `
      <p>Cloud-based POS systems have revolutionized how businesses manage their operations. In this comprehensive guide, we'll walk you through everything you need to know to get started.</p>
      
      <h2>Why Cloud POS?</h2>
      <p>Traditional point-of-sale systems required significant upfront investment and complex setup. Cloud POS systems offer flexibility, scalability, and accessibility from anywhere.</p>
      
      <h3>Key Benefits</h3>
      <ul>
        <li>Real-time data synchronization across all locations</li>
        <li>Automatic backups and security updates</li>
        <li>Access from any device with internet connection</li>
        <li>Seamless integration with other business tools</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>Setting up your cloud POS system is straightforward. Follow these steps to get up and running in minutes.</p>
    `,
    tags: ['POS', 'Cloud Technology', 'Business', 'Retail'],
    relatedPosts: [
      { title: '10 Inventory Management Tips', slug: 'inventory-tips' },
      { title: 'Streamlining Restaurant Operations', slug: 'restaurant-ops' },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white py-12 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
          >
            {/* Category */}
            <span className="inline-block px-3 py-1 bg-[#714B67] text-white text-xs font-medium rounded-full">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-5xl font-bold text-[#2D2D2D] leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-[#6B6B6B]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#E8E8E8] rounded-full" />
                <div>
                  <p className="font-medium text-[#2D2D2D]">{post.author}</p>
                  <p className="text-xs">{post.authorRole}</p>
                </div>
              </div>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            {/* Share Buttons */}
            <div className="flex gap-3">
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
          </motion.div>

          {/* Featured Image */}
          <motion.div
            className="mt-12 h-96 bg-[#F5F5F5] rounded-[12px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 sm:px-8 lg:px-12 py-12">
        <div className="mx-auto max-w-3xl">
          <motion.div
            className="prose prose-lg max-w-none text-[#2D2D2D]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Simplified content rendering */}
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                Cloud-based POS systems have revolutionized how businesses manage their operations. In this comprehensive guide, we'll walk you through everything you need to know to get started.
              </p>

              <h2 className="text-3xl font-bold text-[#2D2D2D] mt-8">Why Cloud POS?</h2>
              <p className="text-lg leading-relaxed">
                Traditional point-of-sale systems required significant upfront investment and complex setup. Cloud POS systems offer flexibility, scalability, and accessibility from anywhere.
              </p>

              <h3 className="text-2xl font-bold text-[#2D2D2D] mt-6">Key Benefits</h3>
              <ul className="space-y-3 ml-6">
                <li className="text-lg">Real-time data synchronization across all locations</li>
                <li className="text-lg">Automatic backups and security updates</li>
                <li className="text-lg">Access from any device with internet connection</li>
                <li className="text-lg">Seamless integration with other business tools</li>
              </ul>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            className="mt-12 pt-8 border-t border-[#E8E8E8]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm font-medium text-[#6B6B6B] mb-3">Tagged in:</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-[#F5F5F5] text-[#6B6B6B] text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Author Bio */}
          <motion.div
            className="mt-12 p-8 bg-[#F5F5F5] rounded-[12px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-[#E8E8E8] rounded-full flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-[#2D2D2D]">{post.author}</h4>
                <p className="text-sm text-[#6B6B6B]">{post.authorRole}</p>
                <p className="text-sm text-[#6B6B6B] mt-2">
                  Expert in POS systems and business technology with 10+ years of experience helping businesses optimize their operations.
                </p>
                <div className="flex gap-3 mt-4">
                  <button className="text-[#714B67] font-medium text-sm">LinkedIn</button>
                  <span className="text-[#E8E8E8]">•</span>
                  <button className="text-[#714B67] font-medium text-sm">Twitter</button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Newsletter CTA */}
          <motion.div
            className="mt-12 p-8 bg-[#714B67] text-white rounded-[12px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-2">Get POS tips delivered to your inbox</h3>
            <p className="text-white/80 mb-4">Subscribe to our newsletter for exclusive insights and strategies.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-lg text-[#2D2D2D]" />
              <button className="px-6 py-3 bg-white text-[#714B67] font-medium rounded-lg hover:bg-[#F5F5F5] transition-all">
                Subscribe
              </button>
            </div>
          </motion.div>

          {/* Related Posts */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-[#2D2D2D] mb-8">You Might Also Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {post.relatedPosts.map((relatedPost) => (
                <a
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="bg-white border border-[#E8E8E8] rounded-[12px] p-6 hover:shadow-lg hover:border-[#714B67] transition-all duration-300 group"
                >
                  <div className="h-32 bg-[#F5F5F5] rounded mb-4" />
                  <h4 className="font-semibold text-[#2D2D2D] group-hover:text-[#714B67] transition-colors">
                    {relatedPost.title}
                  </h4>
                  <p className="text-sm text-[#714B67] mt-2">Read more →</p>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
