"use client";

import { useState } from "react";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { WhyItWorks } from "@/components/why-it-works";
import { Flywheel } from "@/components/flywheel";
import { Roadmap } from "@/components/roadmap";
import { CTAPanel } from "@/components/cta-panel";
import { Footer } from "@/components/footer";
import { EmailModal } from "@/components/email-modal";

export default function Home() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const handleJoinClick = () => {
    setIsEmailModalOpen(true);
  };

  const handleCTASubmit = (data: { name: string; email: string; wallet?: string }) => {
    console.log('CTA form submitted:', data);
    // Handle successful submission (e.g., show toast, analytics)
  };

  return (
    <main className="min-h-screen bg-[#0B0D10]">
      <Hero onJoinClick={handleJoinClick} />
      <Features />
      <WhyItWorks />
      <Flywheel />
      <Roadmap />
      <CTAPanel onSubmit={handleCTASubmit} />
      <Footer />
      
      <EmailModal 
        isOpen={isEmailModalOpen} 
        onClose={() => setIsEmailModalOpen(false)} 
      />
    </main>
  );
}