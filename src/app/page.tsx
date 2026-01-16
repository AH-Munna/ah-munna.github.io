'use client';

import { useEffect, useState } from 'react';
import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ScrollNavigation from "./components/ScrollNavigation";
import DeveloperModeIntro from "./components/hacker/DeveloperModeIntro";
import GlitchButton from "./components/hacker/GlitchButton";
import IntroOverlay from "./components/hacker/IntroOverlay";
import Starfield from "./components/hacker/Starfield";
import Terminal from "./components/hacker/Terminal";
import GameOverlay from "./components/hacker/games/GameOverlay";
import SnakeGame from "./components/hacker/games/SnakeGame";

export default function Home() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isHackerMode, setIsHackerMode] = useState(false);
  const [showDevIntro, setShowDevIntro] = useState(false);
  const [activeGame, setActiveGame] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
       if (hasTriggered) return; // Only trigger once

       const projectsSection = document.getElementById('projects');
       if (projectsSection) {
         const rect = projectsSection.getBoundingClientRect();
         // If projects section is visible
         if (rect.top < window.innerHeight && rect.bottom >= 0) {
            setHasTriggered(true);
            setShowDevIntro(true);
         }
       }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasTriggered]);

  return (
    <main className="min-h-screen bg-transparent relative z-10 overflow-x-hidden selection:bg-cyan-500/30">
      <IntroOverlay />
      
      {/* Hacker Mode Transition & Elements */}
      {showDevIntro && (
        <DeveloperModeIntro onComplete={() => {
            setShowDevIntro(false);
            setIsHackerMode(true);
        }} />
      )}

      {isHackerMode && (
          <>
            <Starfield />
            {!showTerminal && !activeGame && <GlitchButton onClick={() => setShowTerminal(true)} />}
          </>
      )}

      {showTerminal && (
         <Terminal 
            onClose={() => setShowTerminal(false)} 
            onLaunchGame={(game) => setActiveGame(game)}
         />
      )}

      {activeGame === 'snake' && (
          <GameOverlay title="SNAKE.EXE" onClose={() => setActiveGame(null)}>
              <SnakeGame />
          </GameOverlay>
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
