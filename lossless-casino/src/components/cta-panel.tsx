"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { content } from "@/lib/content";
import { Mail, User, Wallet } from "lucide-react";
import { CasinoBackground } from "@/components/ui/casino-background";

interface CTAPanelProps {
  onSubmit?: (data: { name: string; email: string; wallet?: string }) => void;
}

export function CTAPanel({ onSubmit }: CTAPanelProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    wallet: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call the API endpoint
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        onSubmit?.(formData);
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#0B0D10]" />
          <div className="separator absolute top-0 left-0 right-0" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              className="panel-glass p-12"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-16 h-16 bg-[#00E28A]/10 border border-[#00E28A]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-[#00E28A]" />
              </div>
              <h3 className="text-display-lg text-[#E9EEF5] mb-4">
                You&apos;re on the list!
              </h3>
              <p className="text-body text-[#A6B0BF]">
                We&apos;ll notify you when lossless jackpot farming goes live.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Casino Background */}
      <CasinoBackground variant="section" opacity={0.10} />
      
      {/* Separator */}
      <div className="separator absolute top-0 left-0 right-0 z-20" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-display-lg text-[#E9EEF5] mb-4">
              {content.cta.title}
            </h2>
            <p className="text-body text-[#A6B0BF]">
              {content.cta.subtitle}
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            className="panel-glass p-8"
            initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name field */}
              <div>
                <label htmlFor="name" className="text-label text-[#A6B0BF] block mb-2">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#A6B0BF]" />
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                    className="pl-10 h-12 bg-white/4 border-white/8 text-[#E9EEF5] placeholder:text-[#A6B0BF] focus:border-[#00E28A]/50 focus:ring-[#00E28A]/20"
                    placeholder="Your name"
                  />
                </div>
              </div>

              {/* Email field */}
              <div>
                <label htmlFor="email" className="text-label text-[#A6B0BF] block mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#A6B0BF]" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                    className="pl-10 h-12 bg-white/4 border-white/8 text-[#E9EEF5] placeholder:text-[#A6B0BF] focus:border-[#00E28A]/50 focus:ring-[#00E28A]/20"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Wallet field (optional) */}
              <div>
                <label htmlFor="wallet" className="text-label text-[#A6B0BF] block mb-2">
                  Wallet Address
                  <span className="text-xs text-[#A6B0BF] ml-2 normal-case">(Optional)</span>
                </label>
                <div className="relative">
                  <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#A6B0BF]" />
                  <Input
                    id="wallet"
                    type="text"
                    value={formData.wallet}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('wallet', e.target.value)}
                    className="pl-10 h-12 bg-white/4 border-white/8 text-[#E9EEF5] placeholder:text-[#A6B0BF] focus:border-[#00E28A]/50 focus:ring-[#00E28A]/20"
                    placeholder="Optional"
                  />
                </div>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email}
                className="w-full h-12 bg-[#00E28A] text-[#0B0D10] font-medium rounded-full border border-white/10 hover:bg-[#0cf0a0] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-emerald-500"
              >
                {isSubmitting ? "Joining..." : content.cta.form.submit}
              </Button>

              {/* Privacy note */}
              <p className="text-xs text-[#A6B0BF] text-center leading-relaxed">
                We&apos;ll only email you about Lossless Casino updates. No spam, unsubscribe anytime.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
