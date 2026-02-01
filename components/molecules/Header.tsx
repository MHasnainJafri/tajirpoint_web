'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/atoms/Button';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  onGetEarlyAccess?: () => void;
}

export function Header({ onGetEarlyAccess }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations('header');

  const navigationItems = [
    { label: t('features'), href: '#features' },
    { label: t('industries'), href: '#industries' },
    { label: t('pricing'), href: '#pricing' },
    { label: t('blog'), href: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.a
          href="/"
          className="flex items-center gap-2 sm:gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
            <Image
              src="/tajirpoint-logo.png"
              alt="TajirPoint Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-foreground text-base sm:text-lg leading-tight">
              TajirPoint
            </div>
            <div className="text-xs text-muted-foreground">Enterprise POS</div>
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <motion.div 
          className="hidden items-center gap-10 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {navigationItems.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </motion.div>

        {/* Right Actions */}
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* CTA Button */}
          <motion.button
            onClick={onGetEarlyAccess}
            className="hidden sm:inline-flex items-center justify-center h-10 px-6 bg-[#714B67] text-white font-medium rounded-lg hover:bg-[#5a3b52] transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('getStarted')}
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex md:hidden rounded-lg border border-border/50 p-2 text-foreground transition-colors hover:bg-muted"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </motion.div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="border-t border-[#E8E8E8] bg-white/90 px-4 py-4 sm:px-6 md:hidden backdrop-blur-xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col gap-3">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[#6B6B6B] transition-colors hover:text-[#714B67] px-3 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button 
              onClick={() => { setMobileMenuOpen(false); onGetEarlyAccess?.(); }}
              className="w-full h-10 px-6 bg-[#714B67] text-white font-medium rounded-lg hover:bg-[#5a3b52] transition-all duration-200 mt-2"
            >
              {t('getStarted')}
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
