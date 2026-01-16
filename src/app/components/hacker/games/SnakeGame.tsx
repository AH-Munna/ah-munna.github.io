'use client';

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, RefreshCw, Trophy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const GRID_SIZE = 40; // 40x40 grid (half size boxes)
const INITIAL_SPEED = 100; // Starting speed ms
const MIN_SPEED = 50; // Max speed cap (200% faster)

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  
  // Game State Refs (for loop)
  const snakeRef = useRef<Point[]>([{ x: 20, y: 20 }]);
  const foodRef = useRef<Point>({ x: 15, y: 5 });
  const dirRef = useRef<Direction>('RIGHT');
  const nextDirRef = useRef<Direction>('RIGHT');


  // Load High Score
  useEffect(() => {
    const stored = localStorage.getItem('snake_highscore');
    if (stored) setHighScore(parseInt(stored));
  }, []);

  const spawnFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    // Prevent spawning on snake
    if (snakeRef.current.some(s => s.x === newFood.x && s.y === newFood.y)) {
        spawnFood();
    } else {
        foodRef.current = newFood;
    }
  };

  const endGame = () => {
     setGameOver(true);
     setGameStarted(false);
     if (score > highScore) {
         setHighScore(score);
         localStorage.setItem('snake_highscore', score.toString());
     }
  };

  const resetGame = () => {
      snakeRef.current = [{ x: 20, y: 20 }];
      dirRef.current = 'RIGHT';
      nextDirRef.current = 'RIGHT';
      setScore(0);
      setSpeed(INITIAL_SPEED);
      setGameOver(false);
      setGameStarted(true);
      spawnFood();
  };
  
  // Need to ensure gameLoop doesn't use stale state if it was a closure, 
  // but here it uses Refs so it's fine.
  // HOWEVER, 'gameOver' state in the timeout callback might be stale if used directly?
  // We use Refs for game logic, 'gameOver' state is just for UI.
  // The recursion 'if (!gameOver)' accesses state. State in closure is stale.
  // We should check a Ref for running status.

  // Speed update effect (Main Game Loop)
  useEffect(() => {
      if (!gameStarted || gameOver) return;
      
      const interval = setInterval(gameLoop, speed);
      return () => clearInterval(interval);
  }, [speed, gameStarted, gameOver]);

  const gameLoop = () => {
      
      const snake = snakeRef.current;
      const head = { ...snake[0] };
      const dir = nextDirRef.current;
      dirRef.current = dir;

      switch (dir) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
      }

      // Check Collision (Walls)
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          endGame();
          return;
      }

      // Check Collision (Self)
      if (snake.some(s => s.x === head.x && s.y === head.y)) {
          endGame();
          return;
      }

      snake.unshift(head); // Add new head

      // Check Food
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
          setScore(s => s + 1);
          spawnFood();
      } else {
          snake.pop(); // Remove tail if no food eaten
      }

      draw();
  };

  const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const size = canvas.width / GRID_SIZE;

      // Clear
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid Lines (Subtle)
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 1;
      for (let i = 0; i <= GRID_SIZE; i++) {
          ctx.beginPath();
          ctx.moveTo(i * size, 0);
          ctx.lineTo(i * size, canvas.height);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, i * size);
          ctx.lineTo(canvas.width, i * size);
          ctx.stroke();
      }

      // Food
      ctx.fillStyle = '#ef4444'; // Red
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.fillRect(foodRef.current.x * size + 2, foodRef.current.y * size + 2, size - 4, size - 4);
      ctx.shadowBlur = 0;

      // Snake
      ctx.fillStyle = '#22c55e'; // Green
      snakeRef.current.forEach((segment, i) => {
          // Head is brighter
          if (i === 0) ctx.fillStyle = '#4ade80';
          else ctx.fillStyle = '#22c55e';
          
          ctx.fillRect(segment.x * size + 1, segment.y * size + 1, size - 2, size - 2);
      });
  };

  // Keyboard Controls
  useEffect(() => {
      const handleKey = (e: KeyboardEvent) => {
          if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'a', 's', 'd'].includes(e.key)) {
              e.preventDefault();
          }
          
          switch (e.key) {
              case 'ArrowUp':
              case 'w':
              case 'W':
                  if (dirRef.current !== 'DOWN') nextDirRef.current = 'UP';
                  break;
              case 'ArrowDown':
              case 's':
              case 'S':
                  if (dirRef.current !== 'UP') nextDirRef.current = 'DOWN';
                  break;
              case 'ArrowLeft':
              case 'a':
              case 'A':
                  if (dirRef.current !== 'RIGHT') nextDirRef.current = 'LEFT';
                  break;
              case 'ArrowRight':
              case 'd':
              case 'D':
                  if (dirRef.current !== 'LEFT') nextDirRef.current = 'RIGHT';
                  break;
              case ' ':
                   if (gameOver || !gameStarted) resetGame();
                   break;
          }
      };
      
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
  }, [gameOver, gameStarted]);

  // Swipe Controls
  const touchStart = useRef<{x: number, y: number} | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = endX - touchStart.current.x;
      const diffY = endY - touchStart.current.y;

      if (Math.abs(diffX) > Math.abs(diffY)) {
          // Horizontal
          if (Math.abs(diffX) > 30) { // Min swipe distance
              if (diffX > 0 && dirRef.current !== 'LEFT') nextDirRef.current = 'RIGHT';
              else if (diffX < 0 && dirRef.current !== 'RIGHT') nextDirRef.current = 'LEFT';
          }
      } else {
          // Vertical
          if (Math.abs(diffY) > 30) {
             if (diffY > 0 && dirRef.current !== 'UP') nextDirRef.current = 'DOWN';
             else if (diffY < 0 && dirRef.current !== 'DOWN') nextDirRef.current = 'UP';
          }
      }
      touchStart.current = null;
  };

  // Initial Draw
  useEffect(() => {
     draw();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full justify-center">
        {/* Score Board */}
        <div className="flex gap-8 font-mono text-green-500 mb-2">
            <div className="flex items-center gap-2">
                <span>SCORE:</span>
                <span className="text-xl font-bold">{score}</span>
            </div>
            <div className="flex items-center gap-2 text-green-500/60">
                <Trophy className="w-4 h-4" />
                <span>HI: {highScore}</span>
            </div>
        </div>

        {/* Game Area Wrapper */}
        <div 
          className="relative border-4 border-green-900 rounded bg-black"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
            <canvas 
                ref={canvasRef}
                width={400} // Responsive logic via CSS scale if needed, but keeping simple fixed logic internal, scaled via CSS
                height={400}
                className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] "
            />
            
            {/* Start / Game Over Overlay */}
            {(!gameStarted || gameOver) && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-4">
                    {gameOver && <h3 className="text-red-500 font-bold text-2xl mb-2 glitch-text">GAME OVER</h3>}
                    <button 
                        onClick={resetGame}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-none hover:scale-105 transition-transform"
                    >
                        {gameOver ? <><RefreshCw className="w-5 h-5" /> RETRY</> : 'START GAME'}
                    </button>
                    <p className="mt-4 text-xs text-green-500/50 hidden md:block">Press SPACE or Click to Start</p>
                </div>
            )}
        </div>

        {/* Mobile D-Pad */}
        <div className="md:hidden grid grid-cols-3 gap-2 mt-4">
             <div />
             <button 
               className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center active:bg-green-500/50 border border-white/5"
               onPointerDown={(e) => { e.preventDefault(); if (dirRef.current !== 'DOWN') nextDirRef.current = 'UP'; }}
             >
                 <ArrowUp className="text-white" />
             </button>
             <div />
             
             <button 
               className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center active:bg-green-500/50 border border-white/5"
               onPointerDown={(e) => { e.preventDefault(); if (dirRef.current !== 'RIGHT') nextDirRef.current = 'LEFT'; }}
             >
                 <ArrowLeft className="text-white" />
             </button>
             <button 
               className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center active:bg-green-500/50 border border-white/5"
               onPointerDown={(e) => { e.preventDefault(); if (dirRef.current !== 'UP') nextDirRef.current = 'DOWN'; }}
             >
                 <ArrowDown className="text-white" />
             </button>
             <button 
               className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center active:bg-green-500/50 border border-white/5"
               onPointerDown={(e) => { e.preventDefault(); if (dirRef.current !== 'LEFT') nextDirRef.current = 'RIGHT'; }}
             >
                 <ArrowRight className="text-white" />
             </button>
        </div>
        
        <div className="hidden md:flex text-xs text-green-500/40 gap-8 mt-4 font-mono">
            <span>[W / ARROW UP] Move Up</span>
            <span>[S / ARROW DOWN] Move Down</span>
            <span>[A / ARROW LEFT] Move Left</span>
            <span>[D / ARROW RIGHT] Move Right</span>
        </div>
    </div>
  );
}
