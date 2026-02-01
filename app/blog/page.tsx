'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'getting-started-with-pos',
    title: 'Getting Started with Cloud POS Systems',
    excerpt: 'Learn the fundamentals of modern point-of-sale systems and how they can transform your business.',
    category: 'POS Systems',
    author: 'Ahmed Khan',
    date: 'Jan 15, 2025',
    readTime: '5 min read',
    image: '/blog/hero-1.jpg',
    tags: ['POS', 'Business', 'Technology'],
  },
  {
    id: '2',
    slug: 'retail-inventory-tips',
    title: '10 Inventory Management Tips for Retail Stores',
    excerpt: 'Master inventory management with these proven strategies that reduce waste and improve profitability.',
    category: 'Retail Tips',
    author: 'Sarah Johnson',
    date: 'Jan 12, 2025',
    readTime: '7 min read',
    image: '/blog/hero-2.jpg',
    tags: ['Inventory', 'Retail', 'Tips'],
  },
  {
    id: '3',
    slug: 'restaurant-management',
    title: 'Streamlining Restaurant Operations with POS',
    excerpt: 'Discover how modern POS systems help restaurants reduce costs and improve customer experience.',
    category: 'Restaurant Management',
    author: 'Mike Chen',
    date: 'Jan 10, 2025',
    readTime: '6 min read',
    image: '/blog/hero-3.jpg',
    tags: ['Restaurant', 'Operations', 'Efficiency'],
  },
];

const categories = ['All Posts', 'POS Systems', 'Retail Tips', 'Restaurant Management', 'Pharmacy', 'Industry News', 'Growth Strategies'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All Posts' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white py-20 px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <motion.h1
            className="text-5xl font-bold text-[#2D2D2D]"
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
          >
            TajirPoint Blog
          </motion.h1>
          <motion.p
            className="text-lg text-[#6B6B6B]"
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 0.1 }}
          >
            Insights on business management, POS systems, and growth strategies
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="mt-8 max-w-md mx-auto"
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#714B67]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category Filter */}
      <motion.div
        className="px-6 sm:px-8 lg:px-12 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mx-auto max-w-6xl flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium ${
                selectedCategory === category
                  ? 'bg-[#714B67] text-white'
                  : 'bg-[#F5F5F5] text-[#6B6B6B] hover:bg-[#714B67] hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Blog Grid */}
      <div className="px-6 sm:px-8 lg:px-12 py-12">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {filteredPosts.map((post, idx) => (
              <motion.a
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-white border border-[#E8E8E8] rounded-[12px] overflow-hidden hover:shadow-lg hover:border-[#714B67] transition-all duration-300 group h-full flex flex-col"
                whileHover={{ translateY: -4 }}
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Image */}
                <div className="h-40 bg-[#F5F5F5] overflow-hidden group-hover:scale-105 transition-transform duration-300" />

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-[#714B67] text-white text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#2D2D2D] mb-2 line-clamp-2 group-hover:text-[#714B67] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-sm text-[#6B6B6B] mb-4 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="border-t border-[#E8E8E8] pt-4 text-xs text-[#9E9E9E]">
                    <div className="flex items-center justify-between">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="mt-2">{post.date}</div>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-[#F5F5F5] text-[#6B6B6B] text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#6B6B6B] text-lg">No posts found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
