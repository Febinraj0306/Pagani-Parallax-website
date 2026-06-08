"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

interface ZondaScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath?: string;
}

export default function ZondaScrollCanvas({
  scrollYProgress,
  totalFrames,
}: ZondaScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(totalFrames).fill(null)
  );
  const [initialReady, setInitialReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [fullyLoaded, setFullyLoaded] = useState(false);

  const getFramePath = useCallback(
    (index: number) => {
      const pad = String(index).padStart(3, "0");
      return `/frames-webp/ezgif-frame-${pad}.webp`;
    },
    []
  );

  // Render a specific frame onto the canvas
  const renderFrame = useCallback(
    (scrollVal: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Find the best available frame (fall back to nearest loaded frame)
      const targetIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(scrollVal * totalFrames))
      );

      let img = imagesRef.current[targetIndex];

      // If target frame isn't loaded yet, find the nearest loaded frame
      if (!img || !img.complete) {
        let searchRadius = 1;
        while (searchRadius < totalFrames) {
          const before = targetIndex - searchRadius;
          const after = targetIndex + searchRadius;
          if (before >= 0 && imagesRef.current[before]?.complete) {
            img = imagesRef.current[before];
            break;
          }
          if (
            after < totalFrames &&
            imagesRef.current[after]?.complete
          ) {
            img = imagesRef.current[after];
            break;
          }
          searchRadius++;
        }
      }

      if (!img) return;

      const canvasWidth = rect.width;
      const canvasHeight = rect.height;
      const imgRatio = img.width / img.height;

      const drawWidth = canvasWidth;
      const drawHeight = canvasWidth / imgRatio;
      const drawX = 0;

      let drawY;
      if (drawHeight <= canvasHeight) {
        drawY = (canvasHeight - drawHeight) / 2;
      } else {
        const vAlign = 0.82;
        drawY = (canvasHeight - drawHeight) * vAlign;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawHUDGrid(ctx, canvasWidth, canvasHeight);
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    },
    [totalFrames]
  );

  // Draw subtle grid background
  const drawHUDGrid = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number
  ) => {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
    ctx.lineWidth = 1;
    const gridSpacing = 60;
    for (let x = 0; x < w; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };

  // PHASE 1: Load the first frame immediately for instant display
  useEffect(() => {
    const img = new Image();
    img.src = getFramePath(1);
    img.onload = () => {
      imagesRef.current[0] = img;
      setInitialReady(true);
      setLoadProgress(1);
      renderFrame(scrollYProgress.get());
    };
  }, [getFramePath, renderFrame, scrollYProgress]);

  // PHASE 2: Once first frame is ready, load the rest in batches
  useEffect(() => {
    if (!initialReady) return;

    let active = true;
    let loadedCount = 1; // Frame 1 already loaded
    const BATCH_SIZE = 15;

    const loadBatch = async (startIdx: number) => {
      if (!active) return;

      const batch: Promise<void>[] = [];
      const end = Math.min(startIdx + BATCH_SIZE, totalFrames);

      for (let i = startIdx; i < end; i++) {
        if (imagesRef.current[i]) {
          loadedCount++;
          continue;
        }

        batch.push(
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = getFramePath(i + 1); // 1-indexed filenames
            img.onload = () => {
              if (!active) return;
              imagesRef.current[i] = img;
              loadedCount++;
              setLoadProgress(
                Math.round((loadedCount / totalFrames) * 100)
              );
              resolve();
            };
            img.onerror = () => {
              loadedCount++;
              resolve();
            };
          })
        );
      }

      await Promise.all(batch);

      if (active && end < totalFrames) {
        // Use requestIdleCallback or setTimeout to avoid blocking main thread
        if ("requestIdleCallback" in window) {
          (window as Window).requestIdleCallback(() => loadBatch(end));
        } else {
          setTimeout(() => loadBatch(end), 16);
        }
      } else if (active) {
        setFullyLoaded(true);
      }
    };

    // Start loading from frame 2 (index 1)
    loadBatch(1);

    return () => {
      active = false;
    };
  }, [initialReady, totalFrames, getFramePath]);

  // Sync scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (initialReady) {
      renderFrame(latest);
    }
  });

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      if (initialReady) {
        renderFrame(scrollYProgress.get());
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initialReady, scrollYProgress, renderFrame]);

  // Show loading only if the very first frame hasn't arrived yet
  const showLoader = !initialReady;

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-pagani-black select-none">
      {/* Loading Overlay — only blocks until first frame is ready */}
      {showLoader && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-pagani-black z-30 px-6">
          <div className="w-full max-w-md p-6 border border-pagani-gold/20 bg-pagani-black/50 backdrop-blur-md relative overflow-hidden">
            {/* Corner styling lines */}
            <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-pagani-gold"></span>
            <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-pagani-gold"></span>
            <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-pagani-gold"></span>
            <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-pagani-gold"></span>

            <div className="flex justify-between items-center mb-4">
              <span className="font-heading text-xs tracking-widest text-pagani-gold font-bold">
                SYSTEM INITIALIZATION
              </span>
              <span className="font-heading text-xs text-pagani-gold font-medium">
                LOADING...
              </span>
            </div>

            {/* Animated shimmer bar */}
            <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
              <div className="h-full bg-pagani-gold w-1/3 animate-[shimmer_1s_ease-in-out_infinite] shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
            </div>

            <div className="mt-4 flex justify-between text-[10px] text-white/40 tracking-wider font-body">
              <span>LOADING ZONDA_R_ASSETS</span>
              <span>WEBP OPTIMIZED</span>
            </div>
          </div>
        </div>
      )}

      {/* Background progress indicator (shows while remaining frames load) */}
      {initialReady && !fullyLoaded && (
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20 flex items-center space-x-2">
          <div className="w-16 h-[2px] bg-white/10 relative overflow-hidden">
            <div
              className="h-full bg-pagani-gold/60 transition-all duration-200"
              style={{ width: `${loadProgress}%` }}
            ></div>
          </div>
          <span className="text-[9px] text-white/30 tracking-wider font-body">
            {loadProgress}%
          </span>
        </div>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block transition-opacity duration-500"
        style={{ opacity: initialReady ? 1 : 0 }}
      />
    </div>
  );
}

