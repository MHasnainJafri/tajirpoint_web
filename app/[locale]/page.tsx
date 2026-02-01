'use client';

import { useState } from 'react';
import { Header } from '@/components/molecules/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { VideoDemo } from '@/components/sections/VideoDemo';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { IndustryCategorySection } from '@/components/sections/IndustryCategorySection';
import { Integrations } from '@/components/sections/Integrations';
import { PricingSection } from '@/components/sections/PricingSection';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/molecules/Footer';
import { WaitlistModal } from '@/components/molecules/WaitlistModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <Header onGetEarlyAccess={() => setIsModalOpen(true)} />
      <HeroSection onGetEarlyAccess={() => setIsModalOpen(true)} />
      <IndustryCategorySection />
      <TrustBar />
      <VideoDemo />
      <FeaturesSection />
      {/* <Integrations /> Hidden - no integrations yet */}
      <PricingSection onGetEarlyAccess={() => setIsModalOpen(true)} />
      <Testimonials />
      <FAQ />
      <FinalCTA onGetEarlyAccess={() => setIsModalOpen(true)} />
      <Footer />
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
