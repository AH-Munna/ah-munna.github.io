'use client';

import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface GlitchButtonProps {
    onClick: () => void;
}

export default function GlitchButton({ onClick }: GlitchButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
          opacity: 1, 
          scale: 1,
          y: [0, -20, 0, 20, 0], // Float up and down
      }}
      transition={{ 
          opacity: { duration: 0.5 },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" } // Slow float
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed right-6 bottom-20 md:right-10 md:bottom-10 z-50 p-4 bg-black border-2 border-red-500 rounded-lg shadow-[0_0_15px_rgba(255,0,0,0.5)] group overflow-hidden"
    >
        {/* Glitch BG */}
        <div className="absolute inset-0 bg-red-500/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300 skew-x-12" />
        
        <Terminal className="w-6 h-6 text-red-500 relative z-10" />
        
        {/* Pulse Ring */}
        <span className="absolute inset-0 w-full h-full border border-red-500 rounded-lg animate-ping opacity-20" />
    </motion.button>
  );
}
