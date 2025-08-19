"use client";

import { useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRef } from "react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      setIsAnimating(true);
      
      // Extract numbers from the string
      const numbers = value.match(/[\d,\.]+/g);
      if (numbers && numbers[0]) {
        const numericValue = parseFloat(numbers[0].replace(/,/g, ""));
        const suffix = value.replace(numbers[0], "");
        
        // Slot machine style animation
        let current = 0;
        const duration = 1200; // 1.2 seconds
        const steps = 30;
        const increment = numericValue / steps;
        const stepDuration = duration / steps;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
            setIsAnimating(false);
          }
          
          const formattedNumber = current.toLocaleString(undefined, {
            minimumFractionDigits: numbers[0].includes('.') ? 1 : 0,
            maximumFractionDigits: numbers[0].includes('.') ? 1 : 0,
          });
          
          setDisplayValue(formattedNumber + suffix);
        }, stepDuration);

        return () => clearInterval(timer);
      }
    }
  }, [isInView, value]);

  return (
    <motion.span
      ref={ref}
      className={`${className} ${isAnimating ? 'slot-roll' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {displayValue}
    </motion.span>
  );
}
