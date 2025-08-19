"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { Twitter, MessageCircle, Github } from "lucide-react";

const socialIcons = {
  twitter: Twitter,
  discord: MessageCircle,
  github: Github
};

export function Footer() {
  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0B0D10]" />
        <div className="separator absolute top-0 left-0 right-0" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Main footer content */}
          <div className="grid lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-6">
                <h3 className="text-display-md text-[#E9EEF5] mb-2">
                  {content.brand.name}
                </h3>
                <p className="text-sm text-[#A6B0BF] leading-relaxed">
                  {content.brand.tagline}
                </p>
              </div>

              {/* Social links */}
              <div className="flex gap-4">
                {content.footer.social.map((social, index) => {
                  const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-white/4 border border-white/8 rounded-lg flex items-center justify-center text-[#A6B0BF] hover:text-[#00E28A] hover:border-[#00E28A]/20 transition-colors duration-200 focus-visible:outline-emerald-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Product links */}
            <motion.div
              initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <h4 className="text-label text-[#E9EEF5] mb-4">Product</h4>
              <ul className="space-y-3">
                {content.footer.links.product.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-[#A6B0BF] hover:text-[#E9EEF5] transition-colors duration-200 focus-visible:outline-emerald-500"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company links */}
            <motion.div
              initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <h4 className="text-label text-[#E9EEF5] mb-4">Company</h4>
              <ul className="space-y-3">
                {content.footer.links.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-[#A6B0BF] hover:text-[#E9EEF5] transition-colors duration-200 focus-visible:outline-emerald-500"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal links */}
            <motion.div
              initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <h4 className="text-label text-[#E9EEF5] mb-4">Legal</h4>
              <ul className="space-y-3">
                {content.footer.links.legal.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-[#A6B0BF] hover:text-[#E9EEF5] transition-colors duration-200 focus-visible:outline-emerald-500"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            className="pt-8 border-t border-white/8"
            initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-[#A6B0BF]">
                {content.footer.copyright}
              </p>
              
              {/* Risk disclosure */}
              <p className="text-xs text-[#A6B0BF] max-w-md text-center md:text-right leading-relaxed">
                High-risk investment. Principal protection mechanisms may not guarantee against all losses.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}