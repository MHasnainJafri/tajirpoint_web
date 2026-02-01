'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/components/molecules/Header';
import { Footer } from '@/components/molecules/Footer';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Sample blog posts data - in production, this would come from a CMS
const blogPosts = [
  {
    slug: 'how-to-choose-pos-system',
    title: 'How to Choose the Right POS System for Your Business',
    excerpt: 'A comprehensive guide to selecting a point-of-sale system that fits your business needs, budget, and growth plans.',
    image: '/blog/pos-guide.jpg',
    category: 'Guides',
    date: '2025-01-28',
    readTime: '8 min read',
    author: 'TajirPoint Team',
  },
  {
    slug: 'retail-trends-2025',
    title: '5 Retail Trends That Will Define 2025',
    excerpt: 'From AI-powered inventory management to omnichannel experiences, discover what is shaping the future of retail.',
    image: '/blog/retail-trends.jpg',
    category: 'Industry Insights',
    date: '2025-01-25',
    readTime: '6 min read',
    author: 'Sarah Ahmed',
  },
  {
    slug: 'inventory-management-tips',
    title: '10 Inventory Management Tips for Small Businesses',
    excerpt: 'Learn proven strategies to optimize your stock levels, reduce waste, and improve cash flow.',
    image: '/blog/inventory.jpg',
    category: 'Tips & Tricks',
    date: '2025-01-20',
    readTime: '5 min read',
    author: 'Ali Hassan',
  },
  {
    slug: 'offline-mode-importance',
    title: 'Why Offline Mode is Critical for POS Systems',
    excerpt: 'Internet outages should not stop your business. Learn why offline capability is essential for modern retail.',
    image: '/blog/offline-mode.jpg',
    category: 'Product',
    date: '2025-01-15',
    readTime: '4 min read',
    author: 'TajirPoint Team',
  },
];

const categories = ['All', 'Guides', 'Industry Insights', 'Tips & Tricks', 'Product', 'Case Studies'];

export default function BlogPage() {
  const t = useTranslations('blog');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === 'All'
                    ? 'bg-[#714B67] text-white'
                    : 'bg-muted text-muted-foreground hover:bg-[#714B67]/10'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Featured Post */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href={`/blog/${blogPosts[0].slug}`}>
              <div className="relative bg-gradient-to-r from-[#714B67] to-[#8B5A7C] rounded-2xl overflow-hidden group">
                <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                  <div className="flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm rounded-full w-fit mb-4">
                      {blogPosts[0].category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:underline">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-white/80 mb-6">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-white/70 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {blogPosts[0].date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {blogPosts[0].readTime}
                      </span>
                    </div>
                  </div>
                  <div className="relative h-64 md:h-auto rounded-xl overflow-hidden bg-white/10">
                    <div className="absolute inset-0 flex items-center justify-center text-white/30">
                      <span className="text-lg">Featured Image</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-48 bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <span className="text-sm">Blog Image</span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <span className="inline-block px-2 py-1 bg-[#714B67]/10 text-[#714B67] text-xs rounded-full mb-3">
                        {post.category}
                      </span>
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-[#714B67] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <motion.div
            className="mt-16 bg-muted rounded-2xl p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-3">
              {t('newsletter.title')}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              {t('newsletter.description')}
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[#714B67]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#714B67] text-white font-medium rounded-lg hover:bg-[#5a3b52] transition-colors flex items-center justify-center gap-2"
              >
                {t('newsletter.subscribe')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
