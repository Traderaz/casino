"use client";

import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface RouletteSection {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: string;
}

export interface PremiumRouletteWheelProps {
  sections: RouletteSection[];
  onSectionSelect?: (section: RouletteSection) => void;
  isSpinning: boolean;
  selectedSection?: RouletteSection | null;
  className?: string;
}

export const PremiumRouletteWheel = memo(function PremiumRouletteWheel({
  sections,
  onSectionSelect,
  isSpinning,
  selectedSection,
  className = ''
}: PremiumRouletteWheelProps) {
  const [wheelRotation, setWheelRotation] = useState(0);
  const [ballPosition, setBallPosition] = useState({ angle: 0, radius: 140 });
  const [showBall, setShowBall] = useState(true);

  // Calculate section angles (360° / number of sections)
  const sectionAngle = 360 / sections.length;

  useEffect(() => {
    if (isSpinning && selectedSection) {
      // Calculate target angle for selected section (adjusted for top start)
      const targetSectionIndex = sections.findIndex(s => s.id === selectedSection.id);
      const targetAngle = targetSectionIndex * sectionAngle - 90; // Start from top
      
      // Add multiple rotations for dramatic effect
      const finalRotation = 360 * 5 + targetAngle + (Math.random() * 20 - 10); // 5 full rotations + target + small random offset
      
      setWheelRotation(finalRotation);
      
      // Ball animation - starts opposite to final position and settles
      const ballStartAngle = (targetAngle + 180) % 360;
      const ballFinalAngle = targetAngle + (Math.random() * 20 - 10);
      
      setBallPosition({ angle: ballStartAngle, radius: 140 });
      
      // Animate ball settling after wheel stops
      setTimeout(() => {
        setBallPosition({ angle: ballFinalAngle, radius: 120 });
      }, 3000); // Ball settles after wheel stops spinning
    }
  }, [isSpinning, selectedSection, sections, sectionAngle]);

  const getBallPosition = () => {
    const radian = (ballPosition.angle * Math.PI) / 180;
    const x = Math.cos(radian) * ballPosition.radius;
    const y = Math.sin(radian) * ballPosition.radius;
    return { x, y };
  };

  const ballPos = getBallPosition();

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Roulette Table */}
      <div className="relative">
        {/* Table Base */}
        <div 
          className="w-96 h-96 rounded-full relative"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, 
                #2D5016 0%, 
                #1A3009 70%, 
                #0F1A05 100%
              )
            `,
            boxShadow: `
              0 20px 60px rgba(0, 0, 0, 0.8),
              inset 0 4px 8px rgba(255, 255, 255, 0.1),
              inset 0 -4px 8px rgba(0, 0, 0, 0.5)
            `
          }}
        >
          {/* Outer Ring */}
          <div 
            className="absolute inset-4 rounded-full border-4 border-[#D9B45B]"
            style={{
              background: `
                radial-gradient(circle at 50% 50%, 
                  #1A1A1A 0%, 
                  #0D0D0D 100%
                )
              `,
              boxShadow: `
                inset 0 4px 12px rgba(0, 0, 0, 0.8),
                inset 0 -2px 6px rgba(255, 255, 255, 0.1)
              `
            }}
          >
            {/* Spinning Wheel */}
            <motion.div
              className="absolute inset-4 rounded-full relative overflow-hidden"
              style={{ 
                transformOrigin: 'center',
                background: '#1a1a1a'
              }}
              animate={{ rotate: wheelRotation }}
              transition={{
                duration: isSpinning ? 4 : 0,
                ease: isSpinning ? [0.25, 0.46, 0.45, 0.94] : "linear"
              }}
            >
              {/* Single SVG for all sectors */}
              <svg 
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 200 200"
              >
                <defs>
                  {sections.map((section) => (
                    <radialGradient key={section.id} id={`gradient-${section.id}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor={section.color} stopOpacity="0.9" />
                      <stop offset="70%" stopColor={section.color} stopOpacity="0.6" />
                      <stop offset="100%" stopColor={section.color} stopOpacity="0.3" />
                    </radialGradient>
                  ))}
                </defs>
                
                {sections.map((section, index) => {
                  const startAngle = (index * sectionAngle - 90) * (Math.PI / 180);
                  const endAngle = ((index + 1) * sectionAngle - 90) * (Math.PI / 180);
                  
                  const centerX = 100;
                  const centerY = 100;
                  const radius = 85;
                  
                  const x1 = centerX + radius * Math.cos(startAngle);
                  const y1 = centerY + radius * Math.sin(startAngle);
                  const x2 = centerX + radius * Math.cos(endAngle);
                  const y2 = centerY + radius * Math.sin(endAngle);
                  
                  const largeArcFlag = sectionAngle > 180 ? 1 : 0;
                  
                  const pathData = [
                    `M ${centerX} ${centerY}`,
                    `L ${x1} ${y1}`,
                    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    'Z'
                  ].join(' ');
                  
                  return (
                    <path
                      key={section.id}
                      d={pathData}
                      fill={`url(#gradient-${section.id})`}
                      stroke={section.color}
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
              
              {/* Section Labels */}
              {sections.map((section, index) => {
                const labelAngle = index * sectionAngle + sectionAngle / 2 - 90;
                const labelRadius = 60;
                const labelX = 50 + (labelRadius / 100) * 50 * Math.cos((labelAngle * Math.PI) / 180);
                const labelY = 50 + (labelRadius / 100) * 50 * Math.sin((labelAngle * Math.PI) / 180);
                
                return (
                  <div
                    key={`label-${section.id}`}
                    className="absolute flex flex-col items-center justify-center text-center"
                    style={{
                      left: `${labelX}%`,
                      top: `${labelY}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="text-2xl mb-1">{section.icon}</div>
                    <div className="text-white text-xs font-bold leading-tight whitespace-nowrap">
                      {section.title}
                    </div>
                  </div>
                );
              })}
              
              {/* Center Hub */}
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-[#D9B45B]"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, 
                      #D9B45B 0%, 
                      #B8860B 50%, 
                      #8B6914 100%
                    )
                  `,
                  boxShadow: `
                    0 4px 12px rgba(0, 0, 0, 0.6),
                    inset 0 2px 4px rgba(255, 255, 255, 0.3),
                    inset 0 -2px 4px rgba(0, 0, 0, 0.5)
                  `
                }}
              >
                <div className="absolute inset-2 rounded-full bg-black/20" />
              </div>
            </motion.div>
            
            {/* Roulette Ball */}
            <AnimatePresence>
              {showBall && (
                <motion.div
                  className="absolute w-3 h-3 rounded-full z-20"
                  style={{
                    left: `calc(50% + ${ballPos.x}px)`,
                    top: `calc(50% + ${ballPos.y}px)`,
                    background: `
                      radial-gradient(circle at 30% 30%, 
                        #FFFFFF 0%, 
                        #E5E5E5 50%, 
                        #CCCCCC 100%
                      )
                    `,
                    boxShadow: `
                      0 2px 6px rgba(0, 0, 0, 0.8),
                      inset 0 1px 2px rgba(255, 255, 255, 0.8)
                    `,
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    scale: isSpinning ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: isSpinning ? Infinity : 0
                  }}
                />
              )}
            </AnimatePresence>
          </div>
          
          {/* Pointer/Marker */}
          <div 
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '16px solid #D9B45B',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))'
            }}
          />
        </div>
      </div>
      
      {/* Selected Section Display */}
      <AnimatePresence>
        {selectedSection && !isSpinning && (
          <motion.div 
            className="mt-8 max-w-md text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div 
              className="p-6 rounded-2xl border-2 backdrop-blur-sm"
              style={{
                background: `
                  linear-gradient(135deg, 
                    ${selectedSection.color}20 0%, 
                    ${selectedSection.color}10 100%
                  )
                `,
                borderColor: selectedSection.color,
                boxShadow: `
                  0 8px 32px rgba(0, 0, 0, 0.3),
                  0 0 20px ${selectedSection.color}40
                `
              }}
              animate={{ 
                boxShadow: [
                  `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px ${selectedSection.color}40`,
                  `0 12px 40px rgba(0, 0, 0, 0.4), 0 0 30px ${selectedSection.color}60`,
                  `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px ${selectedSection.color}40`
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-4xl mb-4">{selectedSection.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {selectedSection.title}
              </h3>
              <p className="text-[#A6B0BF] leading-relaxed">
                {selectedSection.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
