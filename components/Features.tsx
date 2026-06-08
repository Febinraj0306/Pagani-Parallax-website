"use client";

import React from "react";
import { motion } from "framer-motion";
import { carFeatures } from "@/data/carData";

export default function Features() {
  return (
    <section className="py-32 px-6 md:px-12 bg-pagani-black relative overflow-hidden">
      {/* Background decoration lines */}
      <div className="absolute inset-0 flex justify-around pointer-events-none opacity-5">
        <div className="w-[1px] h-full bg-white"></div>
        <div className="w-[1px] h-full bg-white"></div>
        <div className="w-[1px] h-full bg-white"></div>
        <div className="w-[1px] h-full bg-white"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-24 flex flex-col items-center text-center">
          <span className="text-xs font-heading tracking-[0.4em] text-pagani-gold font-bold block mb-3 uppercase">
            DESIGN FILOSOFIA
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-wider uppercase">
            ENGINEERING CAPABILITIES
          </h2>
          <div className="w-20 h-[2px] bg-pagani-gold mt-4"></div>
        </div>

        {/* Feature Cards Grid (Alternating side layout) */}
        <div className="space-y-24 md:space-y-36">
          {carFeatures.map((feature, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={feature.id}
                className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Text Block */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex-1 space-y-6"
                >
                  <div className="flex items-center space-x-4">
                    <span className="font-heading text-xs text-pagani-gold font-bold tracking-[0.3em]">
                      0{index + 1} // TECH_INNOVATION
                    </span>
                    <span className="w-8 h-[1px] bg-pagani-gold/40"></span>
                  </div>
                  
                  <h3 className="font-heading text-2xl md:text-4xl font-extrabold text-white tracking-wide uppercase">
                    {feature.title}
                  </h3>

                  <p className="text-sm md:text-base text-white/60 tracking-wide leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>

                {/* Metric Graphic Block */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex-1 w-full flex justify-center"
                >
                  <div className="hud-panel w-full max-w-md p-8 relative rounded-sm border border-white/5 flex flex-col items-center justify-center text-center py-12 group hover:border-pagani-gold/25 transition-colors duration-500">
                    {/* Corner highlights */}
                    <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-pagani-gold/20 group-hover:border-pagani-gold transition-colors duration-500"></span>
                    <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-pagani-gold/20 group-hover:border-pagani-gold transition-colors duration-500"></span>
                    <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-pagani-gold/20 group-hover:border-pagani-gold transition-colors duration-500"></span>
                    <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-pagani-gold/20 group-hover:border-pagani-gold transition-colors duration-500"></span>

                    {/* Metric Text */}
                    <span className="font-heading text-4xl md:text-6xl font-black text-white tracking-tight hud-glow group-hover:text-pagani-gold transition-colors duration-500">
                      {feature.metric}
                    </span>

                    {/* Metric Label */}
                    <span className="mt-4 text-[10px] md:text-xs font-heading tracking-[0.25em] text-white/40 uppercase">
                      {feature.metricLabel}
                    </span>

                    {/* Diagnostic graph decoration */}
                    <div className="w-full h-8 mt-6 border-t border-dashed border-white/10 flex items-center justify-between px-4 text-[8px] font-mono text-white/20">
                      <span>SYS_RPM: OK</span>
                      <div className="flex space-x-1 h-3 items-end">
                        <div className="w-[2px] h-[3px] bg-pagani-gold/40"></div>
                        <div className="w-[2px] h-[6px] bg-pagani-gold/40"></div>
                        <div className="w-[2px] h-[4px] bg-pagani-gold/40"></div>
                        <div className="w-[2px] h-[8px] bg-pagani-gold/70"></div>
                        <div className="w-[2px] h-[10px] bg-pagani-gold"></div>
                        <div className="w-[2px] h-[5px] bg-pagani-gold/40"></div>
                      </div>
                      <span>CTRL_LOOP: VAL</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
