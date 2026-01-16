'use client';

import { useEffect, useState } from 'react';
import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ScrollNavigation from "./components/ScrollNavigation";
import GlitchButton from "./components/hacker/GlitchButton";
import IntroOverlay from "./components/hacker/IntroOverlay";
import Terminal from "./components/hacker/Terminal";

export default function Home() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [showTrigger, setShowTrigger] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
       const projectsSection = document.getElementById('projects');
       if (projectsSection) {
         const rect = projectsSection.getBoundingClientRect();
         // If projects section is visible or we have passed it
         if (rect.top < window.innerHeight && rect.bottom >= 0) {
            setShowTrigger(true);
         }
       }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-black overflow-x-hidden selection:bg-cyan-500/30">
      <IntroOverlay />
      
      {/* Hacker Mode Elements */}
      {showTrigger && !showTerminal && (
         <GlitchButton onClick={() => setShowTerminal(true)} />
      )}
      {showTerminal && (
         <Terminal onClose={() => setShowTerminal(false)} />
      )}

      <ScrollNavigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}
