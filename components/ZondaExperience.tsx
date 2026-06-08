"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, MotionValue, useMotionValueEvent } from "framer-motion";
import { hudPhases } from "@/data/carData";

interface ZondaExperienceProps {
  scrollYProgress: MotionValue<number>;
}

export default function ZondaExperience({ scrollYProgress }: ZondaExperienceProps) {
  const [phase, setPhase] = useState<"hero" | "design" | "engine">("hero");
  
  // Refs for high-performance direct DOM telemetry updates (no react re-render lag)
  const rotationTextRef = useRef<HTMLSpanElement>(null);
  const frameTextRef = useRef<HTMLSpanElement>(null);
  const telemetryBarRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 1. Determine Phase
    if (latest < 0.33) {
      if (phase !== "hero") setPhase("hero");
    } else if (latest < 0.66) {
      if (phase !== "design") setPhase("design");
    } else {
      if (phase !== "engine") setPhase("engine");
    }

    // 2. Direct DOM update for live telemetry (keeps scroll 60fps)
    if (rotationTextRef.current) {
      rotationTextRef.current.innerText = `${Math.round(latest * 360)}°`;
    }
    if (frameTextRef.current) {
      const frameNum = Math.min(300, Math.max(1, Math.floor(latest * 300) + 1));
      frameTextRef.current.innerText = String(frameNum).padStart(3, "0");
    }
    if (telemetryBarRef.current) {
      telemetryBarRef.current.style.width = `${latest * 100}%`;
    }
  });

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-10 font-body">
      {/* Sci-Fi Screen Borders & Corner Accents */}
      <div className="absolute inset-4 md:inset-8 border border-white/5 pointer-events-none">
        {/* Corner Brackets */}
        <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-pagani-gold/40"></span>
        <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-pagani-gold/40"></span>
        <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-pagani-gold/40"></span>
        <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-pagani-gold/40"></span>
        
        {/* Top-mid grid coordinates */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.3em] text-white/30 hidden md:block">
          SYS_REF // LAT_44.78 // LON_10.95 (MODENA, IT)
        </div>
      </div>

      {/* Target Crosshair Centered Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 md:w-72 md:h-72 border border-white/5 rounded-full relative flex items-center justify-center">
          {/* Target tracking box */}
          <div className="w-16 h-16 border border-pagani-gold/20 relative animate-pulse">
            <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-pagani-gold"></span>
            <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-pagani-gold"></span>
            <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-pagani-gold"></span>
            <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-pagani-gold"></span>
          </div>
          {/* Diagnostic circle */}
          <svg className="absolute w-full h-full animate-[spin_100s_linear_infinite] opacity-20" viewBox="0 0 100 100">
            <circle cx="52" cy="52" r="46" stroke="#D4AF37" strokeWidth="0.5" fill="none" strokeDasharray="4,8" />
          </svg>
        </div>
      </div>

      {/* Live Technical Telemetry Bar - Bottom screen */}
      <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12 h-6 flex justify-between items-center text-[10px] text-white/50 border-t border-white/5 pt-3">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1">
            <span className="text-pagani-gold font-bold">FRAME:</span>
            <span ref={frameTextRef} className="font-heading text-white">001</span>
          </div>
          <div className="flex space-x-1">
            <span className="text-pagani-gold font-bold">ROTATION:</span>
            <span ref={rotationTextRef} className="font-heading text-white">0°</span>
          </div>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline font-mono">STATUS: SCANNING_ACTIVE</span>
        </div>

        {/* Scroll Progress Bar */}
        <div className="w-32 md:w-64 h-[2px] bg-white/10 relative overflow-hidden">
          <div ref={telemetryBarRef} className="absolute left-0 top-0 h-full bg-pagani-gold w-0 transition-all duration-75"></div>
        </div>
      </div>

      {/* Phase Content Transitions */}
      <div className="absolute inset-0 px-8 md:px-16 pt-24 pb-20 flex flex-col justify-between">
        
        {/* Top telemetry diagnostic block */}
        <div className="flex justify-between items-start">
          <div className="hud-panel p-3 text-[10px] tracking-wider border-l-2 border-pagani-gold text-white/60">
            <p className="font-heading text-white font-bold text-xs mb-1">TELEMETRIA ATTIVA</p>
            <p>AUTO_ROTATE: ON (SCROLL)</p>
            <p>CHASSIS_STABILITY: 100%</p>
            <p>DOWNFORCE_VAL: MAX</p>
          </div>

          <div className="hud-panel p-3 text-[10px] text-right tracking-wider border-r-2 border-pagani-gold text-white/60 hidden sm:block">
            <p className="font-heading text-white font-bold text-xs mb-1">SPEC_REPORT</p>
            <p>ZONDA R - GEN 1</p>
            <p>CARB-T_HP62 MONO</p>
            <p>TRACK_USE_ONLY</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative w-full h-[60%] flex items-center">
          <AnimatePresence mode="wait">
            
            {/* Phase 1: HERO */}
            {phase === "hero" && (
              <motion.div
                key="hero"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-md pointer-events-auto"
              >
                <span className="text-xs font-heading tracking-[0.4em] text-pagani-gold font-bold block mb-2">
                  {hudPhases.hero.subtitle}
                </span>
                <h1 className="text-4xl md:text-6xl font-black font-heading text-white tracking-wider leading-none mb-4">
                  {hudPhases.hero.model}
                </h1>
                
                {/* Horizontal spacer line */}
                <div className="w-16 h-[2px] bg-pagani-gold mb-4"></div>
                
                <p className="text-sm md:text-base text-white/70 tracking-wide mb-6 leading-relaxed">
                  {hudPhases.hero.tagline}
                </p>

                <div className="flex space-x-6 mb-6">
                  <div>
                    <span className="text-[10px] tracking-widest text-white/40 block">PRICE</span>
                    <span className="text-lg font-heading text-white font-bold">{hudPhases.hero.price}</span>
                  </div>
                  <div>
                    <span className="text-[10px] tracking-widest text-white/40 block">AVAILABILITY</span>
                    <span className="text-lg font-heading text-pagani-gold font-bold">{hudPhases.hero.availability}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const footer = document.getElementById("footer");
                    if (footer) footer.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-3 bg-pagani-gold text-pagani-black font-heading text-xs tracking-widest font-bold hover:bg-bright-gold transition-colors duration-300 rounded-sm cursor-pointer shadow-[0_4px_20px_rgba(212,175,55,0.2)]"
                >
                  REQUEST DISCLOSURE
                </button>
              </motion.div>
            )}

            {/* Phase 2: DESIGN */}
            {phase === "design" && (
              <motion.div
                key="design"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-md pointer-events-auto"
              >
                <span className="text-xs font-heading tracking-[0.4em] text-pagani-gold font-bold block mb-2">
                  PHASE 02 // DESIGN SYSTEM
                </span>
                <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-wider mb-4">
                  CARBON MONOCOQUE
                </h2>
                
                <div className="w-16 h-[2px] bg-pagani-gold mb-4"></div>

                <p className="text-sm text-white/70 tracking-wide leading-relaxed mb-6">
                  {hudPhases.design.description}
                </p>

                {/* Spec List */}
                <div className="space-y-3">
                  {hudPhases.design.details.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-white/5 pb-1">
                      <span className="text-[10px] text-white/40 tracking-widest">{item.label}</span>
                      <span className="text-xs font-heading text-pagani-gold font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Phase 3: ENGINE */}
            {phase === "engine" && (
              <motion.div
                key="engine"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-md ml-auto text-right pointer-events-auto"
              >
                <span className="text-xs font-heading tracking-[0.4em] text-pagani-gold font-bold block mb-2">
                  PHASE 03 // INTERNAL HEART
                </span>
                <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-wider mb-4">
                  AMG V12 POWERUNIT
                </h2>
                
                <div className="w-16 h-[2px] bg-pagani-gold ml-auto mb-4"></div>

                <p className="text-sm text-white/70 tracking-wide leading-relaxed mb-6">
                  {hudPhases.engine.description}
                </p>

                {/* Specs right-aligned */}
                <div className="space-y-3">
                  {hudPhases.engine.specs.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-white/5 pb-1">
                      <span className="text-[10px] text-white/40 tracking-widest">{item.label}</span>
                      <span className="text-xs font-heading text-pagani-gold font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Scroll down mouse animation indicator */}
        <div className="w-full flex justify-center items-center">
          {phase === "hero" && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.5, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="w-[16px] h-[28px] border-2 border-white/30 rounded-full flex justify-center p-1">
                <div className="w-[2px] h-[6px] bg-white rounded-full animate-bounce"></div>
              </div>
              <span className="text-[9px] tracking-[0.3em] text-white/40 uppercase">SCROLL TO SPIN</span>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
