"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Mail, User, Wallet, Check } from "lucide-react";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  wallet: string;
}

export function EmailModal({ isOpen, onClose }: EmailModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    wallet: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) return;
    
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          setFormData({ name: "", email: "", wallet: "" });
        }, 2000);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setFormData({ name: "", email: "", wallet: "" });
      setIsSuccess(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md panel-glass p-8"
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-[#A6B0BF] hover:text-[#E9EEF5] w-8 h-8"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Success state */}
            {isSuccess ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-[#00E28A]/10 border border-[#00E28A]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-[#00E28A]" />
                </div>
                <h3 className="text-display-lg text-[#E9EEF5] mb-4">
                  You&apos;re on the list!
                </h3>
                <p className="text-body text-[#A6B0BF]">
                  We&apos;ll notify you when lossless jackpot farming goes live.
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-display-lg text-[#E9EEF5] mb-4">
                    Join the List
                  </h3>
                  <p className="text-body text-[#A6B0BF]">
                    Be first to access lossless jackpot farming
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name field */}
                  <div>
                    <label htmlFor="modal-name" className="text-label text-[#A6B0BF] block mb-2">
                      Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#A6B0BF]" />
                      <Input
                        id="modal-name"
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
                    <label htmlFor="modal-email" className="text-label text-[#A6B0BF] block mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#A6B0BF]" />
                      <Input
                        id="modal-email"
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
                    <label htmlFor="modal-wallet" className="text-label text-[#A6B0BF] block mb-2">
                      Wallet Address
                      <span className="text-xs text-[#A6B0BF] ml-2 normal-case">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#A6B0BF]" />
                      <Input
                        id="modal-wallet"
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
                    {isSubmitting ? "Joining..." : "Join Waitlist"}
                  </Button>

                  {/* Privacy note */}
                  <p className="text-xs text-[#A6B0BF] text-center leading-relaxed">
                    We&apos;ll only email you about Lossless Casino updates. No spam, unsubscribe anytime.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}