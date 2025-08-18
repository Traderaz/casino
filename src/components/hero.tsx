"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { content } from "@/lib/content";
import { CasinoBackground } from "@/components/ui/casino-background";
import { VegasStyleSign } from "@/components/ui/vegas-style-sign";

interface HeroProps {
  onJoinClick: () => void;
}

const trustIcons = {
  shield: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
      <path d="M12 2L3 7V12C3 16.55 6.84 20.74 9.91 21.84C10.61 22.05 11.3 22.05 12 22.05C12.7 22.05 13.39 22.05 14.09 21.84C17.16 20.74 21 16.55 21 12V7L12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  vault: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  solana: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
      <path d="M4 8L8 4L20 4C21.1 4 22 4.9 22 6L22 10L18 14L6 14C4.9 14 4 13.1 4 12L4 8Z" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M4 14L8 10L20 10C21.1 10 22 10.9 22 12L22 16L18 20L6 20C4.9 20 4 19.1 4 18L4 14Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  )
};



export function Hero({ onJoinClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Casino Background */}
      <CasinoBackground variant="hero" opacity={0.20} />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        {/* Vegas Style Sign */}
        <VegasStyleSign />
        
        {/* Main headline */}
        <motion.h1 
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-5 -mt-32"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
          initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          Risk your{" "}
          <span className="text-casino-green" style={{ textShadow: '0 0 20px rgba(0, 179, 102, 0.3)' }}>
            {content.hero.accentWord}
          </span>
          {", "}not your{" "}
          <span className="text-casino-gold">stack</span>.
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl text-[#A6B0BF] mb-8 max-w-3xl mx-auto leading-relaxed"
          style={{ fontFamily: 'var(--font-inter)' }}
          initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          {content.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
          initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
        >
          <Button
            onClick={onJoinClick}
            className="casino-green hover:opacity-90 text-white border border-casino-green h-12 px-8 rounded-2xl font-semibold text-base min-w-[160px] transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            style={{ fontFamily: 'var(--font-inter)', boxShadow: '0 0 20px rgba(0, 179, 102, 0.3)' }}
          >
            {content.hero.ctas.primary}
          </Button>
          <Button
            variant="outline"
            className="bg-transparent hover:bg-casino-gold/10 text-[#E9EEF5] border border-casino-gold/30 hover:border-casino-gold h-12 px-8 rounded-2xl font-semibold text-base min-w-[160px] transition-all duration-200 hover:scale-105"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {content.hero.ctas.secondary}
          </Button>
        </motion.div>

        {/* Enhanced Trust strip */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        >
          {[
            { ...content.hero.trust[0], variant: "audited" },
            { ...content.hero.trust[1], variant: "vault" },
            { ...content.hero.trust[2], variant: "solana" }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className={`chip-pill trust-badge-${item.variant}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className={index === 0 ? "text-casino-green" : index === 1 ? "text-casino-gold" : "text-casino-red"}>
                {trustIcons[item.icon as keyof typeof trustIcons]()}
              </div>
              <span className="text-[#E9EEF5] font-semibold" style={{ fontFamily: 'var(--font-inter)' }}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}