'use client';

import clsx from 'clsx';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, Code, Home, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const navItems = [
  { id: 'hero', icon: <Home className="w-4 h-4" />, label: 'Home' },
  { id: 'about', icon: <User className="w-4 h-4" />, label: 'About' },
  { id: 'experience', icon: <Briefcase className="w-4 h-4" />, label: 'History' },
  { id: 'projects', icon: <Code className="w-4 h-4" />, label: 'Work' },
  { id: 'contact', icon: <Mail className="w-4 h-4" />, label: 'Contact' },
];

export default function ScrollNavigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-50 md:hidden"
        style={{ scaleX }}
      />
      
      {/* Mobile Top Icons (Glassmorphism) */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 md:hidden flex gap-4 px-6 py-3 rounded-full glass border border-white/10 bg-black/50 backdrop-blur-lg">
         {navItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                 e.preventDefault();
                 document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                 setActiveSection(item.id);
              }}
              className={clsx(
                "p-2 rounded-full transition-all duration-300",
                activeSection === item.id ? "bg-cyan-500/20 text-cyan-400" : "text-zinc-500"
              )}
            >
              {item.icon}
            </Link>
         ))}
      </div>

      {/* Desktop Left Vertical Timeline */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-8 z-50">
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-zinc-800 -z-10" />
        
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
                 e.preventDefault();
                 document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                 setActiveSection(item.id);
              }}
            className="group flex items-center gap-4 relative"
          >
            <div
              className={clsx(
                "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 bg-black",
                activeSection === item.id 
                  ? "border-cyan-500 text-cyan-400 scale-110 shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
                  : "border-zinc-800 text-zinc-600 group-hover:border-zinc-600 group-hover:text-zinc-400"
              )}
            >
              {item.icon}
            </div>
            
            <span 
              className={clsx(
                "absolute left-14 px-3 py-1 rounded bg-zinc-900 border border-white/10 text-sm opacity-0 -translate-x-2 transition-all duration-300 pointer-events-none whitespace-nowrap",
                "group-hover:opacity-100 group-hover:translate-x-0"
              )}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
