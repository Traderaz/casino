"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { CheckCircle, Circle, Clock, Dice1, Spade, Crown, Smartphone } from "lucide-react";
import { CasinoBackground } from "@/components/ui/casino-background";

const statusIcons = {
  active: CheckCircle,
  upcoming: Clock,
  future: Circle
};

// Casino-themed icons for each phase
const phaseIcons = {
  0: Dice1,      // Jackpot Farming MVP
  1: Spade,      // Multi-game Lobby  
  2: Crown,      // Lossless Casino
  3: Smartphone  // Mobile & Multi-chain
};

const statusColors = {
  active: "#00E28A",
  upcoming: "#D9B45B", 
  future: "#A6B0BF"
};

export function Roadmap() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Casino Background */}
      <CasinoBackground variant="section" opacity={0.15} />
      
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
            <h2 className="text-display-lg text-[#E9EEF5] mb-4">
              {content.roadmap.title}
            </h2>
            <p className="text-body text-[#A6B0BF] max-w-2xl mx-auto">
              {content.roadmap.subtitle}
            </p>
          </motion.div>

          {/* Roadmap track */}
          <div className="relative">
            
            {/* Desktop horizontal layout */}
            <div className="hidden lg:block">
              
              {/* Enhanced Casino Track line */}
              <div className="absolute top-20 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D9B45B] to-transparent opacity-40" />
              <div className="absolute top-[79px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <div className="grid grid-cols-4 gap-8">
                {content.roadmap.phases.map((phase, index) => {
                  const StatusIcon = statusIcons[phase.status as keyof typeof statusIcons];
                  const statusColor = statusColors[phase.status as keyof typeof statusColors];
                  
                  return (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        duration: 0.28, 
                        ease: [0.16, 1, 0.3, 1],
                        delay: index * 0.1
                      }}
                    >
                      
                      {/* Casino-themed Phase indicator */}
                      <div className="relative mb-8">
                        {/* Main phase icon with casino styling */}
                        <motion.div 
                          className="w-16 h-16 rounded-full border-3 flex items-center justify-center mx-auto relative z-10 shadow-2xl"
                          style={{ 
                            borderColor: statusColor,
                            background: `
                              radial-gradient(circle at 30% 30%, 
                                rgba(255,255,255,0.1) 0%, 
                                ${statusColor}22 50%, 
                                #0B0D10 100%
                              )
                            `,
                            boxShadow: `
                              0 8px 32px ${statusColor}44,
                              inset 0 2px 4px rgba(255,255,255,0.2),
                              inset 0 -2px 4px rgba(0,0,0,0.3)
                            `
                          }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {/* Casino icon for the phase */}
                          {(() => {
                            const PhaseIcon = phaseIcons[index as keyof typeof phaseIcons];
                            return <PhaseIcon className="w-7 h-7" style={{ color: statusColor }} />;
                          })()}
                        </motion.div>
                        
                        {/* Status indicator overlay */}
                        <div 
                          className="absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-[#0B0D10] flex items-center justify-center z-20"
                          style={{ 
                            backgroundColor: statusColor,
                            boxShadow: `0 2px 8px ${statusColor}66`
                          }}
                        >
                          <StatusIcon className="w-3 h-3 text-[#0B0D10]" />
                        </div>
                        
                        {/* Phase label with casino styling */}
                        <div 
                          className="absolute -top-14 left-1/2 transform -translate-x-1/2 text-xs font-bold px-3 py-1.5 rounded-full border-2 backdrop-blur-sm"
                          style={{ 
                            color: statusColor,
                            borderColor: statusColor,
                            backgroundColor: `${statusColor}15`,
                            textShadow: `0 0 8px ${statusColor}88`
                          }}
                        >
                          {phase.phase}
                        </div>
                      </div>

                      {/* Enhanced Casino Content Card */}
                      <motion.div 
                        className="relative p-6 min-h-[160px] flex flex-col justify-between rounded-2xl backdrop-blur-sm border overflow-hidden"
                        style={{
                          background: `
                            linear-gradient(135deg, 
                              rgba(255,255,255,0.08) 0%, 
                              rgba(255,255,255,0.02) 100%
                            )
                          `,
                          borderColor: `${statusColor}33`,
                          boxShadow: `
                            0 8px 32px rgba(0,0,0,0.3),
                            inset 0 1px 0 rgba(255,255,255,0.1),
                            0 0 0 1px ${statusColor}22
                          `
                        }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: `
                            0 12px 40px rgba(0,0,0,0.4),
                            inset 0 1px 0 rgba(255,255,255,0.15),
                            0 0 0 1px ${statusColor}44,
                            0 0 20px ${statusColor}33
                          `
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Casino accent corner */}
                        <div 
                          className="absolute top-0 right-0 w-16 h-16 opacity-20"
                          style={{
                            background: `radial-gradient(circle at 0% 100%, ${statusColor} 0%, transparent 70%)`
                          }}
                        />
                        
                        <div className="relative z-10">
                          <h3 className="text-display-md text-[#E9EEF5] mb-3 leading-tight font-bold">
                            {phase.title}
                          </h3>
                          <p className="text-sm text-[#A6B0BF] leading-relaxed mb-4">
                            {phase.description}
                          </p>
                        </div>
                        
                        <div 
                          className="text-xs font-bold px-3 py-1.5 rounded-full self-start"
                          style={{
                            color: statusColor,
                            backgroundColor: `${statusColor}22`,
                            border: `1px solid ${statusColor}44`
                          }}
                        >
                          {phase.timeline}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile vertical layout */}
            <div className="lg:hidden space-y-6">
              {content.roadmap.phases.map((phase, index) => {
                const StatusIcon = statusIcons[phase.status as keyof typeof statusIcons];
                const statusColor = statusColors[phase.status as keyof typeof statusColors];
                
                return (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.28, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.1
                    }}
                  >
                    
                    {/* Connector line */}
                    {index < content.roadmap.phases.length - 1 && (
                      <div className="absolute left-4 top-8 bottom-0 w-[1px] bg-white/8" />
                    )}

                    <div className="flex gap-4">
                      
                      {/* Casino-themed Phase indicator - Mobile */}
                      <div className="flex flex-col items-center flex-shrink-0">
                        <motion.div 
                          className="w-12 h-12 rounded-full border-2 flex items-center justify-center relative z-10 shadow-xl"
                          style={{ 
                            borderColor: statusColor,
                            background: `
                              radial-gradient(circle at 30% 30%, 
                                rgba(255,255,255,0.1) 0%, 
                                ${statusColor}22 50%, 
                                #0B0D10 100%
                              )
                            `,
                            boxShadow: `
                              0 6px 24px ${statusColor}44,
                              inset 0 1px 2px rgba(255,255,255,0.2),
                              inset 0 -1px 2px rgba(0,0,0,0.3)
                            `
                          }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {/* Casino icon for mobile */}
                          {(() => {
                            const PhaseIcon = phaseIcons[index as keyof typeof phaseIcons];
                            return <PhaseIcon className="w-5 h-5" style={{ color: statusColor }} />;
                          })()}
                        </motion.div>
                        
                        {/* Status indicator overlay - Mobile */}
                        <div 
                          className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full border-2 border-[#0B0D10] flex items-center justify-center z-20"
                          style={{ 
                            backgroundColor: statusColor,
                            boxShadow: `0 2px 6px ${statusColor}66`
                          }}
                        >
                          <StatusIcon className="w-2.5 h-2.5 text-[#0B0D10]" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-3 mb-3">
                          <div 
                            className="text-xs font-bold px-3 py-1.5 rounded-full border backdrop-blur-sm"
                            style={{ 
                              color: statusColor,
                              borderColor: statusColor,
                              backgroundColor: `${statusColor}15`,
                              textShadow: `0 0 6px ${statusColor}88`
                            }}
                          >
                            {phase.phase}
                          </div>
                          <div 
                            className="text-xs font-bold px-2 py-1 rounded-full"
                            style={{
                              color: statusColor,
                              backgroundColor: `${statusColor}22`
                            }}
                          >
                            {phase.timeline}
                          </div>
                        </div>
                        
                        <motion.div 
                          className="relative p-4 rounded-xl backdrop-blur-sm border overflow-hidden"
                          style={{
                            background: `
                              linear-gradient(135deg, 
                                rgba(255,255,255,0.06) 0%, 
                                rgba(255,255,255,0.02) 100%
                              )
                            `,
                            borderColor: `${statusColor}33`,
                            boxShadow: `
                              0 4px 16px rgba(0,0,0,0.2),
                              inset 0 1px 0 rgba(255,255,255,0.08),
                              0 0 0 1px ${statusColor}22
                            `
                          }}
                          whileHover={{
                            scale: 1.01,
                            boxShadow: `
                              0 6px 20px rgba(0,0,0,0.3),
                              inset 0 1px 0 rgba(255,255,255,0.12),
                              0 0 0 1px ${statusColor}44,
                              0 0 12px ${statusColor}33
                            `
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {/* Mobile casino accent */}
                          <div 
                            className="absolute top-0 right-0 w-12 h-12 opacity-15"
                            style={{
                              background: `radial-gradient(circle at 0% 100%, ${statusColor} 0%, transparent 70%)`
                            }}
                          />
                          
                          <div className="relative z-10">
                            <h3 className="text-display-md text-[#E9EEF5] mb-2 font-bold">
                              {phase.title}
                            </h3>
                            <p className="text-sm text-[#A6B0BF] leading-relaxed">
                              {phase.description}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}