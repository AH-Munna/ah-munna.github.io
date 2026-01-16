'use client';

import { motion } from 'framer-motion';
import { Bot, Database, ExternalLink, Gamepad2, Github, Workflow } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: 'Vampire Space Survivor',
    category: 'Game Development',
    image: '/img/game-thumb.jpg', 
    description: 'A physics-based survival game built with Godot Engine. Features complex state management, enemy AI behavior trees, and optimized particle systems for performance.',
    tech: ['Godot Engine', 'GDScript', 'Physics Engine'],
    links: {
      github: 'https://github.com/AH-Munna/vampire-space-survivor',
      demo: 'https://github.com/AH-Munna/vampire-space-survivor'
    },
    icon: <Gamepad2 className="w-6 h-6" />
  },
  {
    title: 'Marketing Automation Suite',
    category: 'Automation & Scripts',
    description: 'A Python-based desktop application using Tkinter and PyAutoGUI. Automates repetitive social media workflows, reducing manual labor by 80% and doubling client revenue.',
    tech: ['Python', 'Tkinter', 'PyAutoGUI', 'Playwright'],
    links: {
      github: 'https://github.com/AH-Munna/automation',
    },
    icon: <Workflow className="w-6 h-6" />
  },
  {
    title: 'LLM Self Conversation',
    category: 'AI Research',
    description: 'An experimental framework allowing two LLM personas to hold autonomous, evolving conversations. Built to test limitations of system prompts and context retention.',
    tech: ['Python', 'OpenAI API', 'Prompt Engineering'],
    links: {
      github: 'https://github.com/AH-Munna/llm-self-conversation',
    },
    icon: <Bot className="w-6 h-6" />
  },
  {
    title: 'Nexis Enterprise SaaS',
    category: 'Full Stack Web App',
    description: 'Contributed to core architecture of HRM and School Management Systems. Implemented role-based auth, payroll calculation modules, and real-time attendance tracking.',
    tech: ['Next.js', 'Django', 'PostgreSQL', 'Redux'],
    links: {
      demo: 'https://www.nexisltd.com/'
    },
    icon: <Database className="w-6 h-6" />
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-zinc-900/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-16 text-center">Featured <span className="text-gradient">Projects</span></h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all hover:-translate-y-1 cursor-pointer"
              >
                  {/* Make entire card clickable via overlay link if link exists */}
                  {(project.links.demo || project.links.github) && (
                      <Link 
                        href={project.links.demo || project.links.github || '#'} 
                        target="_blank"
                        className="absolute inset-0 z-0"
                        aria-label={`View ${project.title}`}
                      />
                  )}

                <div className="p-8 relative z-10 pointer-events-none">
                  <div className="flex justify-between items-start mb-6 pointer-events-auto">
                    <div className="p-3 bg-white/5 rounded-lg text-cyan-400 group-hover:text-white transition-colors">
                      {project.icon}
                    </div>
                    <div className="flex gap-3">
                      {project.links.github && (
                        <Link href={project.links.github} target="_blank" className="text-zinc-500 hover:text-white transition-colors">
                          <Github className="w-5 h-5" />
                        </Link>
                      )}
                      {project.links.demo && (
                        <Link href={project.links.demo} target="_blank" className="text-zinc-500 hover:text-white transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-sm text-cyan-500/80 mb-4">{project.category}</p>
                  <p className="text-zinc-400 mb-6 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded bg-white/5 text-zinc-300 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
