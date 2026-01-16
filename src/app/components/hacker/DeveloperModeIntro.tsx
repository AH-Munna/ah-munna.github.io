'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface DeveloperModeIntroProps {
  onComplete: () => void;
}

export default function DeveloperModeIntro({ onComplete }: DeveloperModeIntroProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden font-mono"
        >
          {/* Glitchy Text Effect */}
          <div className="relative">
             <motion.h1 
               className="text-3xl md:text-6xl font-bold text-green-500 mb-4 tracking-tighter"
               animate={{ 
                 x: [-2, 2, -2, 2, 0],
                 opacity: [1, 0.8, 1, 0.5, 1],
                 textShadow: [
                   "2px 0 red, -2px 0 blue",
                   "-2px 0 red, 2px 0 blue",
                   "0px 0 red, 0px 0 blue"
                 ]
               }}
               transition={{ duration: 0.2, repeat: Infinity }}
             >
               ENTERING DEVELOPER MODE
             </motion.h1>
          </div>
          
          <motion.div 
            className="w-64 h-2 bg-zinc-800 rounded-full mt-8 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
             <motion.div 
               className="h-full bg-green-500"
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ duration: 1.8, ease: "linear" }}
             />
          </motion.div>

          <p className="text-green-500/50 mt-4 text-xs animate-pulse">
            LOADING ASSETS...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
