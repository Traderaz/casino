"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import { CasinoBackground } from "@/components/ui/casino-background";

const whyItWorksPoints = [
  "Your principal earns steady yield in blue-chip protocols",
  "Only the yield enters high-risk jackpot games", 
  "Win big or lose small—principal stays protected",
  "Automated yield farming maximizes your returns",
  "Smart contracts ensure transparent operations",
  "Insurance fund protects against protocol risks",
  "Multiple yield strategies diversify your exposure",
  "Real-time monitoring of all positions"
];

export function WhyItWorks() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentPoints, setCurrentPoints] = useState([
    whyItWorksPoints[0],
    whyItWorksPoints[1],
    whyItWorksPoints[2]
  ]);
  const [leverPulled, setLeverPulled] = useState(false);

  const pullLever = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setLeverPulled(true);
    
    // Animate lever back
    setTimeout(() => setLeverPulled(false), 200);
    
    // Spin for 2.5 seconds then show new results
    setTimeout(() => {
      const shuffled = [...whyItWorksPoints].sort(() => Math.random() - 0.5);
      setCurrentPoints(shuffled.slice(0, 3));
      setIsSpinning(false);
    }, 2500);
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-[#0B0D10]">
      {/* Casino Background */}
      <CasinoBackground variant="section" opacity={0.08} />
      
      {/* Separator */}
      <div className="separator absolute top-0 left-0 right-0 z-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-display-lg text-[#E9EEF5] mb-4">
            Why it <span className="text-casino-gold">works</span>
          </h2>
          <p className="text-body text-[#A6B0BF] max-w-2xl mx-auto mb-8">
            Pull the lever to discover different reasons why <span className="text-casino-green">lossless gaming</span> is revolutionary
          </p>
        </motion.div>

        {/* Slot Machine */}
                <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            {/* Professional Slot Machine Interface */}
            <div className="relative bg-gradient-to-b from-[#12151B] to-[#0B0D10] rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden">

              {/* Professional Slot Reels */}
              <div className="p-12">
                <div className="grid grid-cols-3 gap-8">
                  {[0, 1, 2].map((reelIndex) => (
                    <div key={reelIndex} className="relative">
                      {/* Reel Container */}
                      <div className="bg-black/40 rounded-xl border border-white/10 h-96 overflow-hidden relative backdrop-blur-sm">
                        {/* Reel Content */}
                        <div className="absolute inset-0 flex flex-col justify-center">
                          <AnimatePresence mode="wait">
                            {isSpinning ? (
                              <motion.div
                                key={`spinning-${reelIndex}`}
                                className="flex flex-col"
                                initial={{ y: 0 }}
                                animate={{ y: [-800, 0] }}
                                transition={{ 
                                  duration: 0.08, 
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                              >
                                {/* Show spinning symbols */}
                                {Array.from({ length: 15 }).map((_, i) => {
                                  const symbols = ['♦', '♠', '♥', '♣', '7'];
                                  const symbol = symbols[i % symbols.length];
                                  const isRed = symbol === '♥' || symbol === '♦';
                                  const isGold = symbol === '7';
                                  
                                  return (
                                    <div key={i} className="h-28 flex items-center justify-center">
                                      <span className={`text-6xl font-bold ${
                                        isGold ? 'text-casino-gold' : 
                                        isRed ? 'text-casino-red' : 'text-casino-green'
                                      }`} style={{ 
                                        textShadow: '0 0 15px rgba(255,255,255,0.5)'
                                      }}>
                                        {symbol}
                                      </span>
                                    </div>
                                  );
                                })}
                              </motion.div>
                            ) : (
                              <motion.div
                                key={`result-${reelIndex}-${currentPoints[reelIndex]}`}
                                className="h-full flex flex-col justify-center relative"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ 
                                  duration: 0.6, 
                                  delay: reelIndex * 0.2,
                                  ease: "easeOut"
                                }}
                              >
                                {/* Top rotating symbols */}
                                <div className="flex-1 flex flex-col justify-center space-y-2 opacity-20">
                                  {Array.from({ length: 2 }).map((_, i) => {
                                    const symbols = ['♦', '♠', '♥', '♣', '7'];
                                    const symbol = symbols[(reelIndex + i + 1) % symbols.length];
                                    const isRed = symbol === '♥' || symbol === '♦';
                                    const isGold = symbol === '7';
                                    
                                    return (
                                      <motion.div
                                        key={`top-${i}`}
                                        className="text-center"
                                        animate={{ 
                                          rotateY: [0, 360],
                                          scale: [0.8, 1, 0.8]
                                        }}
                                        transition={{
                                          duration: 3 + (i * 0.5) + (reelIndex * 0.3),
                                          repeat: Infinity,
                                          ease: "linear"
                                        }}
                                      >
                                        <span className={`text-3xl font-bold ${
                                          isGold ? 'text-casino-gold' : 
                                          isRed ? 'text-casino-red' : 'text-casino-green'
                                        }`}>
                                          {symbol}
                                        </span>
                                      </motion.div>
                                    );
                                  })}
                                </div>
                                
                                {/* Main content area */}
                                <div className="flex-1 flex items-center justify-center p-8">
                                  <span className="text-white text-lg leading-relaxed text-center block max-w-full font-medium">
                                    {currentPoints[reelIndex]}
                                  </span>
                                </div>
                                
                                {/* Bottom rotating symbols */}
                                <div className="flex-1 flex flex-col justify-center space-y-2 opacity-20">
                                  {Array.from({ length: 2 }).map((_, i) => {
                                    const symbols = ['♦', '♠', '♥', '♣', '7'];
                                    const symbol = symbols[(reelIndex + i + 3) % symbols.length];
                                    const isRed = symbol === '♥' || symbol === '♦';
                                    const isGold = symbol === '7';
                                    
                                    return (
                                      <motion.div
                                        key={`bottom-${i}`}
                                        className="text-center"
                                        animate={{ 
                                          rotateY: [360, 0],
                                          scale: [1, 0.8, 1]
                                        }}
                                        transition={{
                                          duration: 2.5 + (i * 0.4) + (reelIndex * 0.2),
                                          repeat: Infinity,
                                          ease: "linear"
                                        }}
                                      >
                                        <span className={`text-3xl font-bold ${
                                          isGold ? 'text-casino-gold' : 
                                          isRed ? 'text-casino-red' : 'text-casino-green'
                                        }`}>
                                          {symbol}
                                        </span>
                                      </motion.div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        
                        {/* Professional Reel Highlight */}
                        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-24">
                          <div className="h-full border-t border-b border-casino-gold/30 bg-gradient-to-r from-transparent via-casino-gold/5 to-transparent" />
                        </div>
                        
                        {/* Subtle Corner Indicators */}
                        <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-400/60 rounded-full animate-pulse" />
                        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-casino-gold/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                      </div>
                      
                      {/* Reel Label */}
                      <div className="text-center mt-4">
                        <span className="text-muted text-sm font-mono uppercase tracking-wider">
                          Point {reelIndex + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Control Panel */}
              <div className="p-8 border-t border-white/5 bg-gradient-to-b from-white/2 to-transparent">
                <div className="flex justify-center">
                  <button
                    onClick={pullLever}
                    disabled={isSpinning}
                    className="relative group"
                  >
                    <motion.div
                      className="px-10 py-5 bg-gradient-to-b from-casino-green to-emerald-600 rounded-2xl border border-white/20 shadow-lg cursor-pointer flex items-center gap-4 backdrop-blur-sm"
                      animate={{ 
                        scale: leverPulled ? 0.95 : 1,
                      }}
                      transition={{ duration: 0.1 }}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: '0 8px 32px rgba(0, 227, 138, 0.3)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Spin Icon */}
                      <motion.div
                        className="w-6 h-6"
                        animate={{ rotate: isSpinning ? 360 : 0 }}
                        transition={{ 
                          duration: 0.8, 
                          repeat: isSpinning ? Infinity : 0,
                          ease: "linear"
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white">
                          <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2M6.34 6.34l-1.41-1.41M19.07 19.07l-1.41-1.41M17.66 6.34l1.41-1.41M4.93 19.07l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </motion.div>
                      
                      <span className="text-white font-semibold text-lg">
                        {isSpinning ? "Spinning..." : "Pull Lever"}
                      </span>
                      
                      {/* Button Shine */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-60" />
                    </motion.div>
                  </button>
                </div>
                
                {/* Status Indicator */}
                <div className="text-center mt-4">
                  <motion.div
                    className="inline-flex items-center gap-2 text-muted text-xs"
                    animate={{ opacity: isSpinning ? 0.6 : 1 }}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${isSpinning ? 'bg-casino-gold animate-pulse' : 'bg-emerald-400'}`} />
                    <span>{isSpinning ? "Randomizing points..." : "Ready to spin"}</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}