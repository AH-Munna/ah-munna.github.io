'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    role: 'Independent Software Developer',
    company: 'Self-Employed',
    period: 'June 2024 – Present',
    description: 'Focusing on high-impact automation and R&D.',
    achievements: [
      'Engineered a Godot-based simulation game (Vampire Space Survivor) focusing on complex state management.',
      'Developed Python automation suites for digital marketing clients, reducing manual workflow by 80% and doubling revenue.',
      'Conducted R&D on Large Language Models (LLMs), building conversational AI systems.'
    ]
  },
  {
    role: 'Full Stack Web Developer',
    company: 'Nexis Limited',
    period: 'Mar 2023 – June 2024',
    description: 'Core developer for enterprise SaaS products.',
    achievements: [
      'Led development of HRM and School Management Systems using Django and Next.js.',
      'Designed database schemas and implemented security protocols.',
      'acted as Team Lead, mentoring junior developers and managing sprint goals.'
    ]
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Nexis Limited',
    period: 'Dec 2022 – Feb 2023',
    description: 'Started professional career in a fast-paced agile environment.',
    achievements: [
      'Developed responsive frontend interfaces using Next.js and Tailwind CSS.',
      'Collaborated with backend teams to integrate REST APIs.',
      'Learned version control and professional code review standards.'
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-16 text-center">Professional <span className="text-gradient">Journey</span></h2>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-700 before:to-transparent">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Icon Marker */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-zinc-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                </div>
                
                {/* Content Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-cyan-500/30 transition-colors shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between mb-4 sm:items-center">
                    <h3 className="font-bold text-lg text-white">{exp.role}</h3>
                    <time className="text-xs font-medium text-zinc-500 uppercase flex items-center gap-1 mt-1 sm:mt-0">
                      <Calendar className="w-3 h-3" /> {exp.period}
                    </time>
                  </div>
                  <p className="text-cyan-400 text-sm mb-4 font-medium">{exp.company}</p>
                  <p className="text-zinc-400 text-sm mb-4">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="text-zinc-400 text-sm pl-4 relative before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-zinc-600 before:rounded-full">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
