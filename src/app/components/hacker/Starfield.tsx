'use client';

import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars: { x: number; y: number; z: number; pz: number }[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Re-init stars if needed, or just let them loop
      if (stars.length === 0) {
        stars = Array.from({ length: 400 }, () => ({
            x: Math.random() * width - width / 2,
            y: Math.random() * height - height / 2,
            z: Math.random() * width,
            pz: 0 // previous z
        }));
      }
    };

    const update = () => {
      const isMobile = width < 768;
      const speed = isMobile ? 2.5 : 8; // 10x slower for mobile (25/10), 3x slower for desktop (25/3)
      
      // Fill background
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)"; // Trail effect
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = "#ffffff";
      
      const cx = width / 2;
      const cy = height / 2;

      for (const star of stars) {
        star.pz = star.z;
        star.z -= speed;

        if (star.z < 1) {
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
          star.z = width;
          star.pz = width;
        }

        const sx = cx + (star.x / star.z) * width;
        const sy = cy + (star.y / star.z) * width;
        
        const r = (1 - star.z / width) * 2; // Size based on distance

        // Draw star
        ctx.beginPath();
        ctx.arc(sx, sy, r > 0 ? r : 0, 0, 2 * Math.PI);
        ctx.fill();

        // Optional: Draw trail
        /*
        const psx = cx + (star.x / star.pz) * width;
        const psy = cy + (star.y / star.pz) * width;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = r;
        ctx.beginPath();
        ctx.moveTo(psx, psy);
        ctx.lineTo(sx, sy);
        ctx.stroke();
        */
      }

      requestAnimationFrame(update);
    };

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(update);

    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-80" />;
}
