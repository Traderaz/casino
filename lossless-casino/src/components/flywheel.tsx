"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { content } from "@/lib/content";
import { ArrowRight, RotateCw } from "lucide-react";
import { PremiumPokerChip } from "@/components/ui/premium-poker-chip";
import { CasinoBackground } from "@/components/ui/casino-background";

export function Flywheel() {
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  
  // Poker chip colors for each step
  const chipColors: Array<'green' | 'red' | 'gold' | 'purple' | 'blue'> = [
    'green',
    'red', 
    'gold',
    'purple',
    'blue'
  ];
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Casino Background */}
      <CasinoBackground variant="section" opacity={0.10} />
      
      {/* Separator */}
      <div className="separator absolute top-0 left-0 right-0 z-20" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <RotateCw className="w-6 h-6 text-[#00E28A]" />
              <h2 className="text-display-lg text-[#E9EEF5]">
                {content.flywheel.title}
              </h2>
            </div>
            <p className="text-body text-[#A6B0BF] max-w-2xl mx-auto mb-8">
              {content.flywheel.subtitle}
            </p>
            <p className="text-sm text-[#A6B0BF]">
              Click on any poker chip to see the details
            </p>
          </motion.div>

          {/* Circular Flywheel */}
          <div className="relative">
            
            {/* Desktop layout - Linear with Stacked Animation */}
            <div className="hidden lg:block">
              <div className="flex items-center justify-center gap-6 mb-12">
                {content.flywheel.steps.map((step, index) => {
                  const chip = chipColors[index % chipColors.length];
                  const isSelected = selectedChip === index;
                  
                  return (
                    <div key={index} className="flex items-center">
                      
                      {/* 3D Poker Chip with Stacked Animation */}
                      <motion.div
                        className="relative"
                        initial={{ 
                          opacity: 0, 
                          scale: 0.5,
                          x: -(index * 200), // Start stacked at center
                          y: 0
                        }}
                        whileInView={{ 
                          opacity: 1, 
                          scale: 1,
                          x: 0, // Separate to final positions
                          y: 0
                        }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ 
                          duration: 0.8, 
                          ease: [0.23, 1, 0.32, 1],
                          delay: index * 0.15
                        }}
                      >
                        <PremiumPokerChip
                          color={chip}
                          value={index + 1}
                          size="large"
                          isSelected={isSelected}
                          onClick={() => setSelectedChip(isSelected ? null : index)}
                        />
                        
                        {/* Chip label */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <span className="text-xs text-[#A6B0BF] font-semibold">
                            {step.label}
                          </span>
                        </div>
                      </motion.div>

                      {/* Arrow (except for last item) */}
                      {index < content.flywheel.steps.length - 1 && (
                        <motion.div
                          className="mx-6"
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ 
                            duration: 0.3, 
                            ease: "easeOut",
                            delay: index * 0.15 + 0.4
                          }}
                        >
                          <ArrowRight className="w-6 h-6 text-casino-gold" />
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Cycle completion indicator */}
              <motion.div
                className="flex justify-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.4, 
                  ease: "easeOut",
                  delay: 1.2
                }}
              >
                <div className="flex items-center gap-3 text-[#A6B0BF] bg-white/5 px-6 py-3 rounded-full border border-white/10">
                  <RotateCw className="w-4 h-4 text-casino-green animate-spin" style={{ animationDuration: '3s' }} />
                  <span className="text-sm font-medium">Self-reinforcing growth cycle</span>
                </div>
              </motion.div>
              
              {/* Selected chip details */}
              {selectedChip !== null && (
                <motion.div
                  className="max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 p-8 backdrop-blur-sm shadow-2xl">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <PremiumPokerChip
                          color={chipColors[selectedChip]}
                          value={selectedChip + 1}
                          size="small"
                          isSelected={false}
                        />
                        <h3 className="text-2xl font-bold text-white">
                          {content.flywheel.steps[selectedChip].label}
                        </h3>
                      </div>
                      <p className="text-[#A6B0BF] text-lg leading-relaxed">
                        {content.flywheel.steps[selectedChip].description}
                      </p>
                      <button
                        onClick={() => setSelectedChip(null)}
                        className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm font-medium transition-colors duration-200 border border-white/20"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Mobile layout - Poker Chips */}
            <div className="lg:hidden">
              <div className="grid grid-cols-2 gap-6 mb-8">
                {content.flywheel.steps.map((step, index) => {
                  const chip = chipColors[index % chipColors.length];
                  const isSelected = selectedChip === index;
                  
                  return (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        duration: 0.4, 
                        ease: "easeOut",
                        delay: index * 0.1
                      }}
                    >
                      {/* Mobile 3D Poker Chip */}
                      <div className="mb-3">
                        <PremiumPokerChip
                          color={chip}
                          value={index + 1}
                          size="medium"
                          isSelected={isSelected}
                          onClick={() => setSelectedChip(isSelected ? null : index)}
                          className="mx-auto"
                        />
                      </div>
                      
                      {/* Chip label */}
                      <div className="text-xs text-[#A6B0BF] font-semibold">
                        {step.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Mobile selected chip details */}
              {selectedChip !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 p-6 backdrop-blur-sm shadow-2xl">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <PremiumPokerChip
                          color={chipColors[selectedChip]}
                          value={selectedChip + 1}
                          size="small"
                          isSelected={false}
                        />
                        <h3 className="text-xl font-bold text-white">
                          {content.flywheel.steps[selectedChip].label}
                        </h3>
                      </div>
                      <p className="text-[#A6B0BF] leading-relaxed mb-4">
                        {content.flywheel.steps[selectedChip].description}
                      </p>
                      <button
                        onClick={() => setSelectedChip(null)}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm font-medium transition-colors duration-200 border border-white/20"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Mobile cycle indicator */}
              <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.4, 
                  ease: "easeOut",
                  delay: 0.6
                }}
              >
                <div className="flex items-center gap-2 text-[#A6B0BF] bg-white/5 px-3 py-2 rounded-full border border-white/10">
                  <RotateCw className="w-4 h-4 text-casino-green" />
                  <span className="text-sm font-medium">Cycle repeats</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}