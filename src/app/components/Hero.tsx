'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 text-center z-10 flex flex-col items-center">
        
        {/* Profile Image */}
        <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 relative"
        >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-white/10 overflow-hidden relative z-10">
                {/* Use a placeholder for now, or the uploaded image if I knew the path. User said 'add a circular image box'. */}
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600">
                    <img src="img/profile_square.jpg" alt="Profile" className="object-cover" />
                </div>
                {/* <Image src="/img/profile.jpg" alt="Profile" fill className="object-cover" /> */}
            </div>
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full -z-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm font-light text-cyan-400 mb-6 backdrop-blur-md">
            Available for Hire
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Hi, I'm <span className="text-gradient">Munna</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10 font-light">
            Mid-Level <span className="text-white font-medium">Full Stack Developer</span> & 
            <span className="text-white font-medium"> Automation Engineer</span>.
            <br className="hidden md:block" />
            I build scalable SaaS products and high-performance tools.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16">
            <a 
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2 cursor-pointer"
            >
              View Work <ArrowDown className="w-4 h-4" />
            </a>
            <Link 
              href="mailto:ahmunna.developer@gmail.com"
              className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md flex items-center gap-2"
            >
              Contact Me <Mail className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex gap-6 justify-center">
            <Link href="https://github.com/AH-Munna" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
              <Github className="w-6 h-6" />
            </Link>
            <Link href="https://linkedin.com/in/ah-munna" target="_blank" className="text-zinc-400 hover:text-blue-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
