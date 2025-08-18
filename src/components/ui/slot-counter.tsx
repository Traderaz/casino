"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface SlotCounterProps {
  value: string;
  className?: string;
  delay?: number;
}

export function SlotCounter({ value, className = "", delay = 0 }: SlotCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const [isRolling, setIsRolling] = useState(false);
  const [digits, setDigits] = useState<string[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        animateToValue(value);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay]);

  const animateToValue = (targetValue: string) => {
    setIsRolling(true);
    
    // Extract numeric part and suffix
    const match = targetValue.match(/^([\d,\.]+)(.*)$/);
    if (!match) return;
    
    const [, numericPart, suffix] = match;
    const targetNumber = parseFloat(numericPart.replace(/,/g, ""));
    const targetDigits = numericPart.split("");
    
    // Animate each digit position
    let currentNumber = 0;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNumber / steps;
    
    const rollInterval = setInterval(() => {
      currentNumber += increment;
      
      if (currentNumber >= targetNumber) {
        currentNumber = targetNumber;
        clearInterval(rollInterval);
        setIsRolling(false);
      }
      
      // Format the current number
      const formatted = currentNumber.toLocaleString(undefined, {
        minimumFractionDigits: numericPart.includes('.') ? 1 : 0,
        maximumFractionDigits: numericPart.includes('.') ? 1 : 0,
      });
      
      setDisplayValue(formatted + suffix);
      setDigits(formatted.split(""));
    }, duration / steps);
  };

  return (
    <div ref={ref} className={`${className} font-mono tabular-nums`}>
      <div className="relative overflow-hidden">
        {isRolling ? (
          <div className="flex items-center justify-center">
            {digits.map((digit, index) => (
              <motion.span
                key={`${index}-${digit}`}
                className="inline-block"
                initial={{ y: 50, opacity: 0, rotateX: 90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: -50, opacity: 0, rotateX: -90 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: [0.23, 1, 0.32, 1]
                }}
              >
                {digit}
              </motion.span>
            ))}
          </div>
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {displayValue}
          </motion.span>
        )}
        
        {/* Slot machine reel effect overlay */}
        {isRolling && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  transparent 8px,
                  rgba(255, 215, 0, 0.1) 8px,
                  rgba(255, 215, 0, 0.1) 10px
                )
              `
            }}
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
      </div>
    </div>
  );
}
