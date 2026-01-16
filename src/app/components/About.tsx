'use client';

import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Globe, Smartphone, Terminal } from 'lucide-react';

const skills = [
  { name: 'Python & Django', icon: <Code2 className="w-5 h-5" />, level: 'Advanced' },
  { name: 'Next.js & React', icon: <Globe className="w-5 h-5" />, level: 'Advanced' },
  { name: 'React Native', icon: <Smartphone className="w-5 h-5" />, level: 'Intermediate' },
  { name: 'TypeScript', icon: <Terminal className="w-5 h-5" />, level: 'Advanced' },
  { name: 'SQL & Database', icon: <Database className="w-5 h-5" />, level: 'Advanced' },
  { name: 'LLM & AI Integration', icon: <Cpu className="w-5 h-5" />, level: 'R&D' },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-zinc-900/20 relative z-10 backdrop-blur-[1px]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">About <span className="text-gradient">Me</span></h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 text-zinc-400">
              <p>
                I am a software engineer who loves to build. Whether it's a SaaS platform for a company, a physics-based game for fun, or an automation script that doubles a client's revenue—I find joy in solving problems with code.
              </p>
              <p>
                With over 4 years of coding experience, I have transitioned from a Frontend Intern to a Full Stack Developer, and now an Independent Engineer exploring the frontiers of AI and Game Development.
              </p>
              <p>
                I don't just write code; I care about the product, the user, and the impact.
              </p>
            </div>

            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" /> Technical Arsenal
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                    <span className="text-cyan-400">{skill.icon}</span>
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
