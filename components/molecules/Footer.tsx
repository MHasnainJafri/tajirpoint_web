'use client';

import React from 'react';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    [t('product')]: [
      { label: t('features'), href: '/#features' },
      { label: t('pricing'), href: '/#pricing' },
      { label: t('industries'), href: '/#industries' },
    ],
    [t('company')]: [
      { label: t('about'), href: '/about' },
      { label: t('blog'), href: '/blog' },
      { label: t('contact'), href: '/contact' },
    ],
    [t('legal')]: [
      { label: t('privacy'), href: '/privacy' },
      { label: t('terms'), href: '/terms' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-5 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <a href="/" className="flex items-center space-x-2">
              <Image
                src="/tajirpoint-logo.png"
                alt="TajirPoint"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-semibold text-foreground">TajirPoint</span>
            </a>
            <p className="text-sm text-muted-foreground">
              {t('description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold text-foreground text-sm">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {t('copyright')}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{t('language')}:</span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
