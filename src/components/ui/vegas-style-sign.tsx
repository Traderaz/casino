"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export function VegasStyleSign() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="relative mx-auto mb-4"
      style={{ width: '1050px', height: '600px' }}
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Vegas Sign with Image */}
      <div className="relative w-full h-full">
        
        {/* Main Vegas Sign Image */}
        <motion.div
          className="relative w-full h-[480px]"
          animate={{
            filter: [
              'drop-shadow(0 0 30px rgba(255, 215, 0, 0.4))',
              'drop-shadow(0 0 50px rgba(255, 215, 0, 0.6))',
              'drop-shadow(0 0 30px rgba(255, 215, 0, 0.4))'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Image
            src="/lossless casino.png"
            alt="Welcome to Lossless Casino"
            fill
            sizes="1050px"
            priority
            className="object-contain"
            style={{
              filter: 'brightness(1.1) contrast(1.1)'
            }}
          />
        </motion.div>



        {/* Premium bottom accent bar - in front of sign */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 w-[600px] h-2 rounded-full z-20"
          style={{
            bottom: '180px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.8) 20%, rgba(255, 215, 0, 1) 50%, rgba(255, 215, 0, 0.8) 80%, transparent 100%)',
            boxShadow: '0 0 35px rgba(255, 215, 0, 0.7), 0 -12px 35px rgba(255, 215, 0, 0.5)'
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
            scaleX: [0.9, 1.1, 0.9]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}
