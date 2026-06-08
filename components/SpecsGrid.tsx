"use client";

import React from "react";
import { motion } from "framer-motion";
import { carSpecs } from "@/data/carData";

export default function SpecsGrid() {
  // Group specifications by category
  const categories = Array.from(new Set(carSpecs.map((spec) => spec.category)));

  return (
    <section className="py-24 px-6 md:px-12 bg-[#121212] border-t border-white/5 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pagani-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-xs font-heading tracking-[0.4em] text-pagani-gold font-bold block mb-3 uppercase">
            SCHEDA TECNICA
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-wider uppercase">
            TECHNICAL SPECIFICATIONS
          </h2>
          <div className="w-20 h-[2px] bg-pagani-gold mt-4"></div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, catIdx) => {
            const categorySpecs = carSpecs.filter((spec) => spec.category === category);

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: catIdx * 0.15, ease: "easeOut" }}
                className="hud-panel p-6 relative rounded-sm border border-white/5 hover:border-pagani-gold/20 hover:shadow-[0_0_30px_rgba(212,175,55,0.05)] transition-all duration-500 group"
              >
                {/* Corner highlights */}
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-pagani-gold/30 group-hover:border-pagani-gold transition-colors duration-500"></span>
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-pagani-gold/30 group-hover:border-pagani-gold transition-colors duration-500"></span>
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-pagani-gold/30 group-hover:border-pagani-gold transition-colors duration-500"></span>
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-pagani-gold/30 group-hover:border-pagani-gold transition-colors duration-500"></span>

                {/* Category Title */}
                <h3 className="font-heading text-xs tracking-[0.25em] text-pagani-gold font-extrabold uppercase mb-6 border-b border-white/5 pb-3">
                  {category}
                </h3>

                {/* Specs List */}
                <div className="space-y-4">
                  {categorySpecs.map((spec, index) => (
                    <div key={index} className="flex flex-col space-y-1">
                      <span className="text-[10px] text-white/40 tracking-wider uppercase font-semibold">
                        {spec.label}
                      </span>
                      <span className="font-heading text-sm text-white font-medium group-hover:text-bright-gold transition-colors duration-500">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
