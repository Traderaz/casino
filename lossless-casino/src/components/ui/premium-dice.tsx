"use client";

import { motion } from "framer-motion";
import { useEffect, useState, memo } from "react";

interface PremiumDiceProps {
  values?: [1 | 2 | 3 | 4 | 5 | 6, 1 | 2 | 3 | 4 | 5 | 6, 1 | 2 | 3 | 4 | 5 | 6, 1 | 2 | 3 | 4 | 5 | 6, 1 | 2 | 3 | 4 | 5 | 6, 1 | 2 | 3 | 4 | 5 | 6]; // [front, right, top, back, left, bottom]
  size?: 'small' | 'medium' | 'large';
  className?: string;
  style?: React.CSSProperties;
}

const sizeConfigs = {
  small: { size: 32, dotSize: 3, spacing: 6 },
  medium: { size: 48, dotSize: 4, spacing: 8 },
  large: { size: 64, dotSize: 5, spacing: 10 }
};

// Dice dot patterns for each face
const dotPatterns = {
  1: [[1, 1]], // center
  2: [[0, 0], [2, 2]], // diagonal
  3: [[0, 0], [1, 1], [2, 2]], // diagonal with center
  4: [[0, 0], [0, 2], [2, 0], [2, 2]], // corners
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]], // corners + center
  6: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]] // two columns
};

export const PremiumDice = memo(function PremiumDice({ 
  values = [
    Math.ceil(Math.random() * 6) as 1 | 2 | 3 | 4 | 5 | 6,
    Math.ceil(Math.random() * 6) as 1 | 2 | 3 | 4 | 5 | 6,
    Math.ceil(Math.random() * 6) as 1 | 2 | 3 | 4 | 5 | 6,
    Math.ceil(Math.random() * 6) as 1 | 2 | 3 | 4 | 5 | 6,
    Math.ceil(Math.random() * 6) as 1 | 2 | 3 | 4 | 5 | 6,
    Math.ceil(Math.random() * 6) as 1 | 2 | 3 | 4 | 5 | 6
  ], 
  size = 'medium',
  className = "",
  style = {}
}: PremiumDiceProps) {
  const [mounted, setMounted] = useState(false);
  const sizeConfig = sizeConfigs[size];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Validate and clamp values to 1-6 range
  const clampValue = (val: number): 1 | 2 | 3 | 4 | 5 | 6 => {
    const clamped = Math.max(1, Math.min(6, Math.floor(val))) as 1 | 2 | 3 | 4 | 5 | 6;
    return clamped;
  };

  const [frontValue, rightValue, topValue, backValue, leftValue, bottomValue] = values.map(clampValue);

  // Helper function to render dots for any face
  const renderDots = (value: 1 | 2 | 3 | 4 | 5 | 6) => {
    const pattern = dotPatterns[value];
    if (!pattern) {
      console.error(`Invalid dice value: ${value}`);
      return null;
    }
    return (
      <div className="absolute inset-0 p-1">
        <div 
          className="relative w-full h-full"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            gap: `${sizeConfig.spacing * 0.05}px`
          }}
        >
          {Array.from({ length: 9 }, (_, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const shouldShowDot = pattern && pattern.some(([r, c]) => r === row && c === col);
            
            return (
              <div
                key={i}
                className="flex items-center justify-center"
              >
                {shouldShowDot && (
                  <div
                    className="rounded-full"
                    style={{
                      width: sizeConfig.dotSize,
                      height: sizeConfig.dotSize,
                      background: `
                        radial-gradient(circle, 
                          #1A1A1A 0%, 
                          #2D2D2D 70%, 
                          #404040 100%
                        )
                      `,
                      boxShadow: `
                        inset 0 ${sizeConfig.dotSize * 0.1}px ${sizeConfig.dotSize * 0.2}px rgba(0, 0, 0, 0.5),
                        0 ${sizeConfig.dotSize * 0.1}px ${sizeConfig.dotSize * 0.2}px rgba(0, 0, 0, 0.3)
                      `
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ 
        width: sizeConfig.size * 1.4, 
        height: sizeConfig.size * 1.4,
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div
        className="relative"
        style={{
          width: sizeConfig.size,
          height: sizeConfig.size,
          transformStyle: 'preserve-3d',
          ...style
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 rounded-sm border"
          style={{
            background: `
              linear-gradient(135deg, 
                #FFFFFF 0%, 
                #F8F9FA 50%, 
                #E9ECEF 100%
              )
            `,
            borderColor: 'rgba(0, 0, 0, 0.2)',
            boxShadow: `
              inset 0 2px 4px rgba(255, 255, 255, 0.8),
              inset 0 -1px 2px rgba(0, 0, 0, 0.1)
            `,
            transform: `translateZ(${sizeConfig.size / 2}px)`
          }}
        >
          {renderDots(frontValue)}
        </div>

        {/* Right face */}
        <div
          className="absolute inset-0 rounded-sm border"
          style={{
            background: `
              linear-gradient(90deg, 
                #E9ECEF 0%, 
                #DEE2E6 50%, 
                #CED4DA 100%
              )
            `,
            borderColor: 'rgba(0, 0, 0, 0.2)',
            boxShadow: `
              inset 0 2px 4px rgba(255, 255, 255, 0.4),
              inset 0 -1px 2px rgba(0, 0, 0, 0.2)
            `,
            transform: `rotateY(90deg) translateZ(${sizeConfig.size / 2}px)`
          }}
        >
          {renderDots(rightValue)}
        </div>

        {/* Top face */}
        <div
          className="absolute inset-0 rounded-sm border"
          style={{
            background: `
              linear-gradient(180deg, 
                #FFFFFF 0%, 
                #F8F9FA 50%, 
                #E9ECEF 100%
              )
            `,
            borderColor: 'rgba(0, 0, 0, 0.2)',
            boxShadow: `
              inset 0 2px 4px rgba(255, 255, 255, 0.9),
              inset 0 -1px 2px rgba(0, 0, 0, 0.1)
            `,
            transform: `rotateX(90deg) translateZ(${sizeConfig.size / 2}px)`
          }}
        >
          {renderDots(topValue)}
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 rounded-sm border"
          style={{
            background: `
              linear-gradient(225deg, 
                #CED4DA 0%, 
                #ADB5BD 50%, 
                #9CA3AF 100%
              )
            `,
            borderColor: 'rgba(0, 0, 0, 0.3)',
            boxShadow: `
              inset 0 2px 4px rgba(255, 255, 255, 0.2),
              inset 0 -1px 2px rgba(0, 0, 0, 0.3)
            `,
            transform: `rotateY(180deg) translateZ(${sizeConfig.size / 2}px)`
          }}
        >
          {renderDots(backValue)}
        </div>

        {/* Left face */}
        <div
          className="absolute inset-0 rounded-sm border"
          style={{
            background: `
              linear-gradient(270deg, 
                #DEE2E6 0%, 
                #CED4DA 50%, 
                #ADB5BD 100%
              )
            `,
            borderColor: 'rgba(0, 0, 0, 0.3)',
            boxShadow: `
              inset 0 2px 4px rgba(255, 255, 255, 0.3),
              inset 0 -1px 2px rgba(0, 0, 0, 0.2)
            `,
            transform: `rotateY(-90deg) translateZ(${sizeConfig.size / 2}px)`
          }}
        >
          {renderDots(leftValue)}
        </div>

        {/* Bottom face */}
        <div
          className="absolute inset-0 rounded-sm border"
          style={{
            background: `
              linear-gradient(0deg, 
                #ADB5BD 0%, 
                #CED4DA 50%, 
                #DEE2E6 100%
              )
            `,
            borderColor: 'rgba(0, 0, 0, 0.3)',
            boxShadow: `
              inset 0 2px 4px rgba(0, 0, 0, 0.2),
              inset 0 -1px 2px rgba(255, 255, 255, 0.2)
            `,
            transform: `rotateX(-90deg) translateZ(${sizeConfig.size / 2}px)`
          }}
        >
          {renderDots(bottomValue)}
        </div>
      </div>
    </div>
  );
});
