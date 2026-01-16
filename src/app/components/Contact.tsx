'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="max-w-4xl mx-auto bg-zinc-900/50 border border-white/10 rounded-3xl p-8 md:p-16 text-center backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to <span className="text-gradient">Collaborate?</span></h2>
          <p className="text-zinc-400 mb-12 max-w-lg mx-auto">
            I am currently available for remote work and freelance opportunities. 
            If you have a project that needs a dedicated engineer, I'd love to hear from you.
          </p>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <Link 
              href="mailto:ahmunna.developer@gmail.com" 
              className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group"
            >
              <div className="p-3 rounded-full bg-white/5 group-hover:bg-cyan-500/20 transition-colors">
                <Mail className="w-5 h-5 text-cyan-400" />
              </div>
              ahmunna.developer@gmail.com
            </Link>

            <div className="flex items-center gap-3 text-zinc-300">
              <div className="p-3 rounded-full bg-white/5">
                <MapPin className="w-5 h-5 text-purple-400" />
              </div>
              Bangladesh (Remote Ready)
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 text-sm text-zinc-600">
            <p>&copy; {new Date().getFullYear()} Ahsanul Haque Munna. Built with Next.js & Tailwind.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
