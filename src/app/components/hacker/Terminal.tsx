'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface TerminalProps {
  onClose: () => void;
  onLaunchGame: (game: string) => void;
}

interface CommandHistory {
  type: 'input' | 'output';
  content: React.ReactNode;
}

export default function Terminal({ onClose, onLaunchGame }: TerminalProps) {
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoTyping, setIsAutoTyping] = useState(false);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Initial Auto-run "help"
  useEffect(() => {
    const runIntro = async () => {
      setIsAutoTyping(true);
      await new Promise(r => setTimeout(r, 800)); // Delay start
      const cmd = "help";
      for (let i = 0; i < cmd.length; i++) {
        setInput(cmd.substring(0, i + 1));
        await new Promise(r => setTimeout(r, 100)); // Typing speed
      }
      setIsAutoTyping(false);
      await new Promise(r => setTimeout(r, 300)); // Pause before enter
      handleCommand(cmd);
      setInput('');
    };
    runIntro();
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory: CommandHistory[] = [
      ...history,
      { type: 'input', content: `root@munna-portfolio:~$ ${cmd}` }
    ];

    switch (trimmedCmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: (
            <div className="space-y-1 text-zinc-300">
              <p>Available commands (or click to execute):</p>
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <button onClick={() => handleCommand('ls')} className="text-left text-green-400 hover:underline hover:text-green-300 transition-colors">ls</button>
                <span>List directory contents</span>
                
                <button onClick={() => handleCommand('cat contact.txt')} className="text-left text-green-400 hover:underline hover:text-green-300 transition-colors">cat</button>
                <span>Read file content (usage: cat [filename])</span>
                
                <button onClick={() => handleCommand('sudo hire_munna')} className="text-left text-green-400 hover:underline hover:text-green-300 transition-colors">sudo</button>
                <span>Execute as superuser (usage: sudo hire_munna)</span>
                
                <button onClick={() => handleCommand('game')} className="text-left text-green-400 hover:underline hover:text-green-300 transition-colors">game</button>
                <span>List available games</span>

                <button onClick={() => handleCommand('help')} className="text-left text-green-400 hover:underline hover:text-green-300 transition-colors">
                        help
                </button>
                <span>lists available commands</span>
                
                <button onClick={() => handleCommand('clear')} className="text-left text-green-400 hover:underline hover:text-green-300 transition-colors">clear</button>
                <span>Clear terminal</span>
              </div>
            </div>
          )
        });
        break;
      case 'ls':
        newHistory.push({
          type: 'output',
          content: (
            <div className="flex gap-4 text-cyan-400 font-bold flex-wrap">
              <button onClick={() => handleCommand('cat web_skills.txt')} className="hover:underline hover:text-cyan-300">web_skills.txt</button>
              <button onClick={() => handleCommand('cat automation_suite.py')} className="hover:underline hover:text-cyan-300">automation_suite.py</button>
              <button onClick={() => handleCommand('cat contact.txt')} className="hover:underline hover:text-cyan-300">contact.txt</button>
              <button onClick={() => handleCommand('snake')} className="text-green-500 hover:underline hover:text-green-400 font-bold">snake.exe</button>
              <button onClick={() => handleCommand('help')} className="text-green-500 hover:underline hover:text-green-400">
                        help
                    </button>
            </div>
          )
        });
        break;
      case 'cat contact.txt':
        newHistory.push({
          type: 'output',
          content: (
            <div className="text-zinc-300">
              <p>Email: ahmunna.developer@gmail.com</p>
              <p>Location: Bangladesh (Remote Available)</p>
              <p>Status: <span className="text-green-500">Ready to Deploy</span></p>
              <button onClick={() => handleCommand('help')} className="text-green-500 hover:underline hover:text-green-400">
                        help
                    </button>
            </div>
          )
        });
        break;
      case 'cat web_skills.txt':
        newHistory.push({
            type: 'output',
            content: 'Next.js, React, TailwindCSS, TypeScript, Django, PostgreSQL'
        });
        break;
      case 'cat automation_suite.py':
         newHistory.push({
            type: 'output',
            content: 'import py_autogui; # Revenue Doubled successfully.'
        });
        break;
      case 'sudo hire_munna':
        newHistory.push({
          type: 'output',
          content: <span className="text-green-500">Access Granted. Initiating communication protocol...</span>
        });
        setTimeout(() => {
             window.location.href = "mailto:ahmunna.developer@gmail.com";
        }, 1000);
        break;
      case 'game':
        newHistory.push({
          type: 'output',
          content: (
             <div className="text-zinc-300">
               <p>Available Games:</p>
               <ul className="list-disc ml-4 mt-2">
                 <li>
                   <button onClick={() => handleCommand('snake')} className="text-green-500 hover:underline hover:text-green-400 font-bold">snake.exe</button>
                   <span className="text-zinc-500 ml-2">- Classic Snake Game</span>
                 </li>
               </ul>
             </div>
          )
        });
        break;
      case 'snake':
      case 'snake.exe':
      case './snake.exe':
        newHistory.push({
          type: 'output',
          content: <span className="text-green-500">Launching snake.exe...</span>
        });
        setTimeout(() => {
             onLaunchGame('snake');
             onClose(); // Close terminal when launching game
        }, 800);
        break;
      case 'clear':
        setHistory([]);
        return; // Early return to avoid setting history with just the clearing command
      default:
         if (trimmedCmd.startsWith('cat')) {
            newHistory.push({
              type: 'output',
              content: (
                <div>
                    <span className="text-red-400">File not found. Try 'ls' to see available files.</span>
                    <button onClick={() => handleCommand('help')} className="ml-2 px-2 py-0.5 border border-green-500/50 rounded text-green-400 text-xs hover:bg-green-500/20">
                        Help
                    </button>
                </div>
              )
            });
         } else {
            newHistory.push({
            type: 'output',
            content: (
                <div>
                    <span className="text-red-400">Command not found: {cmd}.</span>
                    <button onClick={() => handleCommand('help')} className="ml-2 px-2 py-0.5 border border-green-500/50 rounded text-green-400 text-xs hover:bg-green-500/20">
                        Help
                    </button>
                </div>
            )
            });
         }
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isAutoTyping) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 md:p-4"
    >
      <div className="w-full max-w-[95vw] md:max-w-2xl h-[500px] bg-black/90 border border-green-500/30 rounded-lg shadow-[0_0_30px_rgba(0,255,0,0.1)] flex flex-col font-mono overflow-hidden">
        {/* Header */}
        <div className="h-8 bg-zinc-900 border-b border-green-500/20 flex items-center justify-between px-3">
          <div className="text-xs text-zinc-500 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/50" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <span className="w-3 h-3 rounded-full bg-green-500/50" />
            root@munna-portfolio:~
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div 
          ref={scrollRef}
          className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-2 text-sm md:text-base on-click-focus"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((entry, i) => (
            <div key={i} className="break-words">
              {entry.type === 'input' ? (
                <div className="text-zinc-400">{entry.content}</div>
              ) : (
                <div className="ml-4">{entry.content}</div>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 text-green-500">
            <span className="shrink-0">root@munna-portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-zinc-100 caret-green-500"
              autoFocus
              disabled={isAutoTyping}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
