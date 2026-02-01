'use client';

import { Header } from '@/components/molecules/Header';
import { Footer } from '@/components/molecules/Footer';
import { motion } from 'framer-motion';
import { Target, Users, Zap, Globe, Award, Heart } from 'lucide-react';

export default function AboutPage() {
  const values = [
    { icon: Target, title: 'Mission-Driven', description: 'Empowering businesses of all sizes with enterprise-grade tools' },
    { icon: Users, title: 'Customer First', description: 'Every feature built based on real merchant feedback' },
    { icon: Zap, title: 'Innovation', description: 'Constantly pushing boundaries in retail technology' },
    { icon: Globe, title: 'Accessibility', description: 'Making powerful POS affordable for everyone' },
    { icon: Award, title: 'Excellence', description: 'Committed to the highest quality standards' },
    { icon: Heart, title: 'Support', description: 'Dedicated team ready to help you succeed' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 mb-20">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-[40px] sm:text-[56px] font-semibold text-[#1d1d1f] tracking-tight leading-tight mb-6">
              About TajirPoint
            </h1>
            <p className="text-[19px] text-[#86868b] max-w-2xl mx-auto leading-relaxed">
              We're building the future of retail technology — making enterprise-grade 
              point of sale accessible to businesses everywhere.
            </p>
          </motion.div>
        </section>

        {/* Story */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[28px] font-semibold text-[#1d1d1f] mb-6">Our Story</h2>
            <div className="space-y-4 text-[17px] text-[#1d1d1f]/70 leading-relaxed">
              <p>
                TajirPoint was born from a simple observation: small and medium businesses 
                deserve the same powerful tools that big retailers use, without the 
                enterprise price tag.
              </p>
              <p>
                We saw merchants struggling with outdated systems, losing sales during 
                internet outages, and spending hours on manual inventory tracking. 
                We knew there had to be a better way.
              </p>
              <p>
                Today, we're building a cloud-based POS platform that works seamlessly 
                online and offline, integrates with the tools you already use, and 
                scales with your business — from a single store to multiple locations.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Values */}
        <section className="bg-[#f5f5f7] py-20 mb-20">
          <div className="max-w-5xl mx-auto px-6">
            <motion.h2 
              className="text-[28px] font-semibold text-[#1d1d1f] text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Values
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={idx}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <Icon className="w-6 h-6 text-[#1d1d1f] stroke-[1.5]" />
                    </div>
                    <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-2">{value.title}</h3>
                    <p className="text-[15px] text-[#86868b]">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[28px] font-semibold text-[#1d1d1f] mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-[17px] text-[#86868b] mb-8">
              Join our early access program and be among the first to experience TajirPoint.
            </p>
            <a 
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#714B67] text-white text-[15px] font-medium rounded-full hover:bg-[#5d3d56] transition-colors"
            >
              Get Early Access
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
