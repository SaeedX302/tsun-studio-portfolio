// src/components/Hero.jsx

import React from 'react';
import { motion } from 'framer-motion';

// --- Child Component for Particles ---
// For modularity, even complex animations can be components.
const HeroParticles = () => (
    <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
                key={i}
                className="absolute rounded-full bg-cyan-500/50"
                initial={{ 
                    x: `${Math.random() * 100}vw`, 
                    y: `${Math.random() * 100}vh`,
                    scale: 0,
                    opacity: 0,
                }}
                animate={{
                    x: `${Math.random() * 100}vw`,
                    y: `${Math.random() * 100}vh`,
                    scale: [0, Math.random() * 0.8 + 0.2, 0],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'linear',
                    delay: Math.random() * 5,
                }}
                style={{
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                }}
            />
        ))}
    </div>
);


const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden pt-20">
      <HeroParticles />
      <div className="absolute inset-0 bg-black bg-grid-white/[0.05]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.3)_0%,_rgba(14,165,233,0)_40%)]"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-4"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tighter">
          A Portfolio That’s Not Just Seen
          <br />
          <span className="text-cyan-400">— It’s Experienced.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          ⚡️ Powered by React + Tailwind + Lucide Icons. Made with 🫀 by <span className="font-bold text-white">〆༯𝙎ค૯𝙀𝘿✘</span>
        </p>
        <motion.a 
          href="#projects"
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(14, 165, 233, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 inline-block bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300"
        >
          Explore My Work
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
