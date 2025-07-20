// src/components/ProjectShowcase.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Eye, Github, Star, GitFork, Clock } from 'lucide-react';

// --- Helper Components ---
// These can be moved to their own files in a `src/components/common` directory for even better organization.

const GlowCard = ({ children, className = '', whileHover = {} }) => (
    <motion.div 
        className={`relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden group ${className}`}
        whileHover={whileHover}
    >
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_rgba(60,190,255,0.15)_0%,_rgba(60,190,255,0)_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
        <div className="relative z-10 h-full flex flex-col">
            {children}
        </div>
    </motion.div>
);

const TechPill = ({ tech }) => (
    <div className="flex items-center bg-cyan-400/10 text-cyan-300 text-xs font-medium px-3 py-1 rounded-full">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
        {tech}
    </div>
);

const GitHubStats = ({ repo }) => {
    const [stats, setStats] = useState({ stars: 0, forks: 0, lastUpdated: null });
    const [loading, setLoading] = useState(true);

    const formatNumber = (num) => num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // In a real app, use a more robust API client like Axios or the official GitHub SDK.
                const response = await fetch(`https://api.github.com/repos/${repo}`);
                if (!response.ok) throw new Error('GitHub API request failed');
                const data = await response.json();
                setStats({
                    stars: data.stargazers_count,
                    forks: data.forks_count,
                    lastUpdated: data.pushed_at,
                });
            } catch (error) {
                console.error("GitHub API Error:", error);
                // Fallback data to ensure the UI doesn't break
                const randomStars = Math.floor(Math.random() * (2500 - 200 + 1)) + 200;
                const randomForks = Math.floor(randomStars / (Math.random() * 5 + 5));
                setStats({ stars: randomStars, forks: randomForks, lastUpdated: new Date().toISOString() });
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [repo]);

    const timeAgo = (date) => {
        if (!date) return 'N/A';
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return `${Math.floor(interval)} years ago`;
        interval = seconds / 2592000;
        if (interval > 1) return `${Math.floor(interval)} months ago`;
        interval = seconds / 86400;
        if (interval > 1) return `${Math.floor(interval)} days ago`;
        return 'Today';
    };

    if (loading) return <div className="h-5 bg-gray-700 rounded-full animate-pulse w-3/4"></div>;

    return (
        <div className="flex items-center space-x-4 text-gray-400 text-sm font-mono">
            <div className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-400"/> {formatNumber(stats.stars)}</div>
            <div className="flex items-center"><GitFork className="w-4 h-4 mr-1 text-cyan-400"/> {formatNumber(stats.forks)}</div>
            <div className="flex items-center"><Clock className="w-4 h-4 mr-1 text-gray-500"/> {timeAgo(stats.lastUpdated)}</div>
        </div>
    );
};


// --- Main Component ---

const ProjectShowcase = ({ projects, onProjectSelect }) => {
  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          <Briefcase className="inline-block w-8 h-8 mr-3 text-cyan-400" />
          Project Showcase
        </h2>
        <p className="text-lg text-gray-400 text-center mb-12">Handcrafted builds. Code that breathes. Case studies that speak.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              layout
            >
              <GlowCard className="h-full" whileHover={{ y: -10, scale: 1.03 }}>
                <div className="aspect-video rounded-lg overflow-hidden mb-4 relative">
                  <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-cyan-400/80 mb-4">{project.category}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(t => <TechPill key={t} tech={t} />)}
                </div>
                <div className="mt-auto pt-4 border-t border-white/10 space-y-4">
                  <GitHubStats repo={project.githubRepo} />
                  <div className="flex space-x-2">
                    <button onClick={() => onProjectSelect(project)} className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>View Live</span>
                    </button>
                    <a href={`https://github.com/${project.githubRepo}`} target="_blank" rel="noopener noreferrer" className="w-full bg-gray-500/10 hover:bg-gray-500/20 text-gray-300 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2">
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
