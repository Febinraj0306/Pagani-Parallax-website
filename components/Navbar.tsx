"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-5 px-6 md:px-12 flex justify-between items-center ${
        isScrolled
          ? "bg-pagani-black/70 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Logo */}
      <div className="flex flex-col items-start select-none">
        <span className="font-heading text-lg md:text-xl tracking-[0.25em] font-extrabold text-white">
          PAGANI
        </span>
        <span className="text-[9px] tracking-[0.45em] text-pagani-gold -mt-1 font-medium">
          ZONDA R
        </span>
      </div>

      {/* Center navigation indicator (pure aesthetics) */}
      <div className="hidden md:flex items-center space-x-8 text-xs tracking-[0.2em] font-medium text-white/60">
        <span className="hover:text-pagani-gold transition-colors duration-300 cursor-pointer">OVERVIEW</span>
        <span className="w-1.5 h-1.5 rounded-full bg-pagani-gold/30"></span>
        <span className="hover:text-pagani-gold transition-colors duration-300 cursor-pointer">DESIGN</span>
        <span className="w-1.5 h-1.5 rounded-full bg-pagani-gold/30"></span>
        <span className="hover:text-pagani-gold transition-colors duration-300 cursor-pointer">ENGINE</span>
        <span className="w-1.5 h-1.5 rounded-full bg-pagani-gold/30"></span>
        <span className="hover:text-pagani-gold transition-colors duration-300 cursor-pointer">SPECIFICATIONS</span>
      </div>

      {/* Right CTA */}
      <div className="flex items-center space-x-6">
        <button 
          onClick={() => {
            const footer = document.getElementById("footer");
            if (footer) footer.scrollIntoView({ behavior: "smooth" });
          }}
          className="relative px-5 py-2 overflow-hidden border border-pagani-gold/40 rounded-sm font-heading text-xs tracking-widest font-semibold text-pagani-gold hover:text-pagani-black transition-colors duration-500 group cursor-pointer"
        >
          {/* Hover backdrop fill */}
          <span className="absolute inset-0 w-full h-full bg-pagani-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
          
          <span className="relative z-10">INQUIRE NOW</span>
        </button>
      </div>
    </motion.nav>
  );
}
