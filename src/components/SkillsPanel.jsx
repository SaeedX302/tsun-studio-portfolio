// src/components/SkillsPanel.jsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Code, Bot, Server } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

// --- Reusable Child Components ---

const GlowCard = ({ children, className = '' }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.5 }}
        className={`relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden group ${className}`}
    >
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_rgba(60,190,255,0.15)_0%,_rgba(60,190,255,0)_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
        <div className="relative z-10 h-full flex flex-col">
            {children}
        </div>
    </motion.div>
);

const TypingEffect = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const ref = useRef(null);

    const startTyping = useCallback(() => {
        if (isTyping) return;
        setIsTyping(true);
        let i = 0;
        const intervalId = setInterval(() => {
            setDisplayedText(text.substring(0, i + 1));
            i++;
            if (i >= text.length) {
                clearInterval(intervalId);
                setIsTyping(false);
            }
        }, 50);
    }, [text, isTyping]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startTyping();
                }
            },
            { threshold: 0.8 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, startTyping]);
    
    return <pre ref={ref} className="font-mono text-sm text-gray-300"><span className="text-cyan-400">{'>'}</span> {displayedText}<span className="animate-pulse">_</span></pre>;
};

// --- Main Component ---

const SkillsPanel = ({ skills }) => {
  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          <BrainCircuit className="inline-block w-8 h-8 mr-3 text-cyan-400" />
          Skills & Tools
        </h2>
        <p className="text-lg text-gray-400 text-center mb-12">Every tool in the belt — visualized with taste.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GlowCard>
            <h3 className="text-xl font-bold text-white mb-4">Tech Mastery</h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skills.radar}>
                  <defs>
                    <linearGradient id="skillGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 14 }} />
                  <Radar name="Mastery" dataKey="A" stroke="#06b6d4" fill="url(#skillGradient)" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlowCard>
          
          <div className="space-y-8">
            <GlowCard>
              <h3 className="text-xl font-bold text-white mb-4">Languages</h3>
              <div className="space-y-4">
                {skills.languages.map(lang => (
                  <div key={lang.name} className="bg-black/20 p-4 rounded-lg hover:bg-black/40 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3 mb-2">
                      <lang.icon className="w-6 h-6 text-cyan-400" />
                      <span className="text-white font-semibold">{lang.name}</span>
                    </div>
                    <TypingEffect text={lang.snippet} />
                  </div>
                ))}
              </div>
            </GlowCard>
            
            <GlowCard>
              <h3 className="text-xl font-bold text-white mb-4">Frameworks & Tools</h3>
              <div className="flex flex-wrap gap-3">
                {skills.tools.map(tool => (
                  <span key={tool} className="bg-white/10 text-gray-300 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-white/20 hover:text-white transition-all">
                    {tool}
                  </span>
                ))}
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsPanel;
