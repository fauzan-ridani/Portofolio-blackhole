"use client";

import { useEffect, useRef } from "react";
import { createBlackHole } from "../lib/blackHole";

/**
 * Latar black hole fullscreen (fixed, di belakang semua konten).
 * Semua animasi & parallax dijalankan engine di lib/blackHole.js,
 * komponen ini hanya menyediakan DOM dan cleanup.
 */
export default function BlackHole() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const auraRef = useRef(null);

  useEffect(() => {
    const destroy = createBlackHole({
      root: rootRef.current,
      canvas: canvasRef.current,
      glow: glowRef.current,
      aura: auraRef.current,
    });

    return destroy;
  }, []);

  return (
    <div ref={rootRef} className="bh" aria-hidden="true">
      <canvas ref={canvasRef} className="bh-canvas" />
      <div className="bh-vignette" />
      <div ref={auraRef} className="bh-aura" />
      <div ref={glowRef} className="bh-glow" />
      <div className="bh-scan" />
      <div className="bh-edge-fade" />
    </div>
  );
}
