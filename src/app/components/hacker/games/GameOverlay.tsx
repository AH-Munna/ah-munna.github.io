'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface GameOverlayProps {
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export default function GameOverlay({ onClose, children, title }: GameOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-2 md:p-8"
    >
      <div className="relative w-full max-w-4xl h-full max-h-[90vh] bg-black border-2 border-green-500/50 rounded-lg shadow-[0_0_50px_rgba(0,255,0,0.15)] flex flex-col overflow-hidden">
        {/* CRT Scanline */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-20" />
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-green-500/30 bg-zinc-900/50">
           <h2 className="text-xl font-bold text-green-500 font-mono tracking-wider animate-pulse">{title}</h2>
           <button 
             onClick={onClose}
             className="p-2 hover:bg-green-500/20 rounded-full text-green-500 transition-colors z-30"
           >
             <X className="w-6 h-6" />
           </button>
        </div>

        {/* Game Area */}
        <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-4">
            {children}
        </div>
      </div>
    </motion.div>
  );
}
