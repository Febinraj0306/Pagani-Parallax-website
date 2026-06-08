"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <footer id="footer" className="bg-[#0b0b0b] border-t border-white/5 py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Carbon fiber style grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-16">
          
          {/* Brand Info & Mission Statement */}
          <div className="space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex flex-col select-none">
                <span className="font-heading text-2xl md:text-3xl tracking-[0.25em] font-extrabold text-white">
                  PAGANI
                </span>
                <span className="text-[10px] tracking-[0.45em] text-pagani-gold -mt-1 font-medium">
                  AUTOMOBILI MODENA
                </span>
              </div>
              <p className="text-sm text-white/50 tracking-wide leading-relaxed max-w-md">
                Founded on the philosophy of Leonardo da Vinci, Pagani combines Art and Science to craft unique hypercars. The Zonda R represents the absolute culmination of track-only performance and structural purity.
              </p>
            </div>

            {/* Diagnostic metrics */}
            <div className="space-y-2 text-[10px] tracking-widest text-white/30 font-mono hidden lg:block">
              <p>COMMISSION_OFFICE: SAN CESARIO SUL PANARO, MO, ITALY</p>
              <p>SECURE_ENCRYPTION: AES_256_SSL</p>
              <p>INQUIRY_ROUTING: GLOBAL_SALES@PAGANI.COM</p>
            </div>
          </div>

          {/* Commission Inquiry Form */}
          <div className="hud-panel p-8 relative rounded-sm border border-white/5">
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-pagani-gold"></span>
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-pagani-gold"></span>
            
            <h3 className="font-heading text-lg tracking-widest text-white font-extrabold mb-2 uppercase">
              COMMISSION INQUIRY
            </h3>
            <p className="text-xs text-white/40 mb-6 tracking-wide">
              Submit your credentials below to request private sales details and custom builds.
            </p>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <label className="block text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2 font-bold">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Leonardo da Vinci"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 px-4 py-3 text-xs tracking-wider text-white focus:outline-none focus:border-pagani-gold transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2 font-bold">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. leonardo@science.art"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 px-4 py-3 text-xs tracking-wider text-white focus:outline-none focus:border-pagani-gold transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2 font-bold">
                      MESSAGE / SPECS REQUEST
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify track allocation, custom color requests, or delivery requirements..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 px-4 py-3 text-xs tracking-wider text-white focus:outline-none focus:border-pagani-gold transition-colors duration-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-pagani-gold hover:bg-bright-gold text-pagani-black font-heading text-xs tracking-widest font-bold transition-colors duration-300 relative flex items-center justify-center cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-pagani-black border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      "SUBMIT DOSSIER"
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full border border-pagani-gold flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                    <svg className="w-6 h-6 text-pagani-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-heading text-sm font-bold text-white tracking-widest uppercase">
                    INQUIRY TRANSMITTED
                  </h4>
                  <p className="text-xs text-white/50 max-w-xs leading-relaxed">
                    Your request has been securely dispatched. A Pagani Private Client Advisor will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 text-[10px] text-pagani-gold tracking-widest hover:text-white transition-colors duration-300 underline font-bold uppercase cursor-pointer"
                  >
                    SUBMIT ANOTHER REQUEST
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] tracking-wider text-white/40 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} PAGANI AUTOMOBILI S.P.A. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6">
            <span className="hover:text-white cursor-pointer transition-colors duration-300">PRIVACY POLICY</span>
            <span className="hover:text-white cursor-pointer transition-colors duration-300">COOKIE POLICY</span>
            <span className="hover:text-white cursor-pointer transition-colors duration-300">LEGAL STATEMENTS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
