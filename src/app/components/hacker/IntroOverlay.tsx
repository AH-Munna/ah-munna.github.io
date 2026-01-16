'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function IntroOverlay() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Auto close after 3s
    const timer = setTimeout(() => {
      setShow(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scaleY: 0.005, // CRT turn off effect (collapse vertically)
            scaleX: 1,
            filter: "brightness(5)" // Bright flash before vanishing
          }} 
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative z-10 text-center font-mono">
             <motion.h1 
               className="text-4xl md:text-6xl font-bold text-red-600 mb-2 relative"
               animate={{ 
                 x: [-2, 2, -1, 1, 0],
                 opacity: [1, 0.8, 1, 0.9, 1]
               }}
               transition={{ repeat: Infinity, duration: 0.2 }}
             >
               WARNING
             </motion.h1>
             <h2 className="text-xl md:text-2xl text-red-500/80 tracking-widest mb-8">
               AUTHORIZED ACCESS ONLY
             </h2>
             
             <div className="space-y-1 text-red-900/50 text-sm">
               <p>SYSTEM UNSTABLE</p>
               <p>DO NOT SCROLL BELOW</p>
               <p>DEVELOPER ZONE DETECTED</p>
             </div>
          </div>

          {/* CRT Scanline effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
