"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import ZondaScrollCanvas from "@/components/ZondaScrollCanvas";
import ZondaExperience from "@/components/ZondaExperience";
import SpecsGrid from "@/components/SpecsGrid";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook scroll tracking to the 600vh height container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="bg-pagani-black min-h-screen">
      <Navbar />

      {/* STICKY SEQUENCE CONTAINER (Locks viewport for 600vh to play animation) */}
      <section ref={containerRef} className="h-[600vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Background Canvas (Z-Index: 0 inside canvas wrapper) */}
          <ZondaScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={300}
          />

          {/* Sci-Fi HUD Overlay (Z-Index: 10) */}
          <ZondaExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* CONTINUOUS NATURAL CONTENT (Scrolls up once sequence completes) */}
      <div className="relative z-20 bg-pagani-black shadow-[0_-30px_60px_rgba(0,0,0,0.9)]">
        <SpecsGrid />
        <Features />
        <Footer />
      </div>
    </main>
  );
}

