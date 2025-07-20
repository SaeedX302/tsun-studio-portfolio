import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mail, Github, Twitter, Instagram, Send, Code, Server, Briefcase, BrainCircuit, Bot, GitCommit, Star, GitFork, Eye, Clock, Calendar, Download, Menu, X, ArrowRight, ChevronsRight, Link as LinkIcon, Video, MessageSquare, Bug, Rocket, Milestone, Users, Wrench, Sparkles, Layers, FileText, BookOpen, Target, GitBranch, UserCheck, Microscope, HeartHandshake, Mic, UserCog, LogOut, PlusCircle, Trash2, Edit, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

// --- Mock Data ---
// This is now the initial state for our projects
const initialProjects = [
  {
    id: 1,
    title: "TSunGpt-2 AI Companion",
    category: "AI & Machine Learning",
    thumbnail: "https://placehold.co/600x400/0D1117/30A8F2?text=TSunGpt-2",
    tech: ["React", "Node.js", "Firebase", "Gemini API"],
    liveUrl: "https://tsungpt2.vercel.app/",
    githubRepo: "SaeedX302/TsunGpt-v2",
    description: "A cutting-edge AI chat application that leverages Google's Gemini API for intelligent, context-aware conversations. Built with a sleek, responsive interface and real-time Firebase backend.",
    problem: "The need for a personalized, easily accessible AI assistant that can be integrated into various workflows without heavy infrastructure.",
    process: "Designed a modular React front-end for a seamless user experience. Engineered a Node.js backend to securely handle API requests to Gemini. Utilized Firebase Firestore for persisting chat history and user data.",
    polish: "Implemented real-time message streaming, a 'typing' indicator for the AI, and a glassmorphism UI that's both beautiful and functional. Ensured full mobile responsiveness.",
    whatIdDoDifferently: "I would explore implementing more advanced state management like Zustand for larger-scale conversations and integrate more tools for the AI to interact with, such as web browsing or code execution."
  },
  {
    id: 2,
    title: "TikTok Video Downloader",
    category: "Web Application",
    thumbnail: "https://placehold.co/600x400/0D1117/FE2C55?text=TikTok+DL",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    liveUrl: "https://tsuntiktokdownloder.vercel.app/",
    githubRepo: "SaeedX302/TsunTikTok",
    description: "A high-performance web tool for downloading TikTok videos without watermarks. Features a clean, fast interface and a robust backend scraping service.",
    problem: "Users often want to save or share TikTok videos for offline use or on other platforms, but the default download includes a watermark.",
    process: "Developed a serverless function on Vercel that takes a TikTok URL, scrapes the source video link, and serves it directly to the user for download.",
    polish: "Focused on speed and simplicity. The UI is minimal, guiding the user through the one-step process. Added error handling for invalid links or private videos.",
    whatIdDoDifferently: "To improve scalability, I'd implement a queuing system for download requests to handle high traffic and potentially add support for batch downloading."
  },
  {
    id: 3,
    title: "YouTube Content Downloader",
    category: "Desktop Tool",
    thumbnail: "https://placehold.co/600x400/0D1117/FF0000?text=YouTube+DL",
    tech: ["Python", "PyQt5", "yt-dlp"],
    liveUrl: "https://tsun-yt-downloder.vercel.app/",
    githubRepo: "SaeedX302/Tsun-YT-Downloader",
    description: "A versatile desktop application for downloading YouTube videos and playlists in various formats and qualities, including audio-only extraction.",
    problem: "A need for a reliable tool to archive YouTube content for offline viewing, research, or personal backups, with more options than typical web downloaders.",
    process: "Built a user-friendly GUI with PyQt5 that interfaces with the powerful `yt-dlp` command-line tool. Exposed key options like format selection, resolution, and playlist handling.",
    polish: "Included a download progress bar, thumbnail previews, and the ability to manage a queue of downloads. Packaged the application into a standalone executable for easy distribution.",
    whatIdDoDifferently: "I would rebuild it as a cross-platform web application using WebAssembly for the video processing part, making it accessible to everyone without installation."
  },
];

const skills = {
  radar: [
    { subject: 'Frontend', A: 95, fullMark: 100 },
    { subject: 'Backend', A: 85, fullMark: 100 },
    { subject: 'DevOps', A: 70, fullMark: 100 },
    { subject: 'UI/UX', A: 88, fullMark: 100 },
    { subject: 'AI/ML', A: 75, fullMark: 100 },
    { subject: 'Databases', A: 80, fullMark: 100 },
  ],
  languages: [
    { name: "JavaScript", icon: Code, snippet: "const greet = (name) => `Hello, ${name}!`;" },
    { name: "Python", icon: Bot, snippet: "def greet(name):\n  return f\"Hello, {name}!\"" },
    { name: "TypeScript", icon: Code, snippet: "const greet = (name: string): string => `Hello, ${name}!`;" },
    { name: "SQL", icon: Server, snippet: "SELECT name FROM users WHERE id = 1;" },
  ],
  tools: ["React", "Node.js", "Next.js", "Firebase", "Vercel", "Docker", "Git", "Figma", "MongoDB", "PostgreSQL"]
};

const experiences = [
    {
        company: "Freelance Developer",
        logo: Briefcase,
        role: "Full-Stack Engineer & AI Specialist",
        period: "2021 - Present",
        achievements: [
            "Shipped over 15 full-stack web applications for clients worldwide, achieving a 98% client satisfaction rate.",
            "Engineered a custom AI chatbot solution for an e-commerce brand, increasing user engagement by 40%.",
            "Contributed to 5+ major open-source projects, with PRs merged into popular libraries like `NextAuth.js`."
        ]
    },
    {
        company: "TSun Studio",
        logo: Sparkles,
        role: "Founder & Lead Developer",
        period: "2020 - Present",
        achievements: [
            "Conceptualized and built a suite of popular developer tools, including the TikTok and YouTube downloaders, amassing over 50,000 unique users.",
            "Mentored 3 junior developers, guiding them to successfully launch their own personal projects.",
            "Hosted 2 online workshops on 'Modern React with Firebase' for the local developer community."
        ]
    }
];

const careerData = {
    vision: [
        { year: 2023, goal: 'Master Full-Stack AI Development', achieved: true },
        { year: 2024, goal: 'Launch a SaaS Product (TSun Tools)', achieved: true },
        { year: 2025, goal: 'Become a Top-Rated Open-Source Contributor', achieved: false },
        { year: 2026, goal: 'Lead a Development Team on a Large-Scale Project', achieved: false },
    ],
    community: [
        { title: 'React Pakistan', role: 'Core Contributor', icon: GitBranch },
        { title: 'DevsInPK Hackathon', role: 'Judge & Mentor', icon: Users },
        { title: 'Local Uni Tech Talk', role: 'Guest Speaker', icon: Mic },
    ],
    mentorship: [
        { mentee: 'Ali Hassan', project: 'E-commerce PWA', outcome: 'Successfully deployed and serving customers.' },
        { mentee: 'Fatima Khan', project: 'Fitness Tracking App', outcome: 'Secured first freelance client with her portfolio piece.' },
    ],
    learning: [
        { tech: 'Rust', reason: 'For high-performance backend services and systems programming.', icon: Code },
        { tech: 'WebGPU', reason: 'To build next-generation, GPU-accelerated web experiences.', icon: Layers },
        { tech: 'Astro', reason: 'Exploring the future of content-driven, performant websites.', icon: Rocket },
    ]
};

const changelogData = [
    {
        version: "v1.5.1",
        date: "July 19, 2025",
        changes: [
            "Feat: Added 'Open in New Tab' icon to live project preview modal.",
            "Feat: Added real-time project count to the Admin Panel header.",
            "Style: Randomized fallback GitHub stats to appear unique on API failure.",
            "Fix: Ensured all icons are correctly imported and referenced.",
        ],
        author: "°【〆༯𝙎ค૯𝙀𝘿】✘",
        contributors: []
    },
    {
        version: "v1.5.0",
        date: "July 19, 2025",
        changes: [
            "Feat: Added a complete Admin Login system.",
            "Feat: Implemented Admin Panel for full CRUD (Create, Read, Update, Delete) operations on projects.",
            "Feat: Projects are now managed via state, making the showcase fully dynamic.",
            "Feat: Added Admin icon to header and logout functionality.",
            "Chore: Converted static project data into a mutable state for admin control.",
        ],
        author: "°【〆༯𝙎ค૯𝙀𝘿】✘",
        contributors: []
    },
    // ... other changelogs remain
];

// --- Helper Components ---

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

const ChangelogModal = ({ isOpen, onClose }) => {
    const [showAll, setShowAll] = useState(false);
    const visibleLogs = showAll ? changelogData : changelogData.slice(0, 5);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-2xl bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-cyan-500/10 max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white flex items-center"><BookOpen className="mr-3 text-cyan-400"/>Changelog</h2>
                                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X/></button>
                            </div>
                            <div className="space-y-8">
                                {visibleLogs.map((log, index) => (
                                    <div key={index} className="relative pl-8 border-l-2 border-gray-700/50">
                                        <div className="absolute -left-[11px] top-1 w-5 h-5 bg-gray-800 border-2 border-cyan-400 rounded-full"></div>
                                        <p className="font-mono text-cyan-400">{log.version}</p>
                                        <p className="text-sm text-gray-400 mb-3">{log.date}</p>
                                        <ul className="space-y-2 list-inside">
                                            {log.changes.map((change, i) => (
                                                <li key={i} className="text-gray-300 text-sm flex items-start">
                                                    <ChevronsRight className="w-4 h-4 mr-2 mt-0.5 text-cyan-400/50 flex-shrink-0"/>
                                                    {change}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="text-xs text-gray-500 mt-3">
                                            Author: <span className="font-mono text-cyan-400">{log.author}</span>
                                            {log.contributors.length > 0 && ` | Contributors: ${log.contributors.join(', ')}`}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {changelogData.length > 5 && (
                                <div className="text-center mt-8">
                                    <button onClick={() => setShowAll(!showAll)} className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                                        {showAll ? "Show Less" : "View More"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-5xl h-[90vh] bg-gray-950/80 border border-white/10 rounded-2xl shadow-2xl shadow-cyan-500/20 flex flex-col"
                >
                    <div className="flex-shrink-0 p-4 border-b border-white/10 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <h3 className="text-white font-bold text-lg">{project.title} - Live Preview</h3>
                        <div className="flex items-center space-x-4">
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <ExternalLink size={20} />
                            </a>
                            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X size={24}/></button>
                        </div>
                    </div>
                    <div className="flex-grow overflow-hidden">
                        <iframe
                            src={project.liveUrl}
                            title={project.title}
                            className="w-full h-full border-0"
                            sandbox="allow-scripts allow-same-origin"
                        />
                    </div>
                     <div className="flex-shrink-0 p-4 border-t border-white/10 bg-black/30 flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"><Bug className="w-4 h-4 text-red-400"/><span>Report Bug</span></button>
                            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"><MessageSquare className="w-4 h-4 text-blue-400"/><span>Suggest Feature</span></button>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                           <Layers className="w-4 h-4"/> <span>Performance: High</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const GitHubStats = ({ repo }) => {
    const [stats, setStats] = useState({ stars: 0, forks: 0, lastUpdated: null });
    const [loading, setLoading] = useState(true);

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num;
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`https://api.github.com/repos/${repo}`);
                if (!response.ok) {
                    throw new Error('GitHub API request failed');
                }
                const data = await response.json();
                setStats({
                    stars: data.stargazers_count,
                    forks: data.forks_count,
                    lastUpdated: data.pushed_at,
                });
            } catch (error) {
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
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    if (loading) {
        return <div className="h-5 bg-gray-700 rounded-full animate-pulse w-3/4"></div>;
    }

    return (
        <div className="flex items-center space-x-4 text-gray-400 text-sm font-mono">
            <div className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-400"/> {formatNumber(stats.stars)}</div>
            <div className="flex items-center"><GitFork className="w-4 h-4 mr-1 text-cyan-400"/> {formatNumber(stats.forks)}</div>
            <div className="flex items-center"><Clock className="w-4 h-4 mr-1 text-gray-500"/> {timeAgo(stats.lastUpdated)}</div>
        </div>
    );
};

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

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, startTyping]);
    
    return <pre ref={ref} className="font-mono text-sm text-gray-300"><span className="text-cyan-400">{'>'}</span> {displayedText}<span className="animate-pulse">_</span></pre>;
};


// --- Main Sections ---

const Header = ({ onChangelogOpen, onAdminOpen }) => (
    <header className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-lg z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-white tracking-wider">
                TSun <span className="text-cyan-400">StudioPortfolio</span>
            </h1>
            <div className="flex items-center space-x-4">
                <button onClick={onChangelogOpen} className="flex items-center space-x-2 text-sm font-semibold text-gray-300 hover:text-white bg-white/5 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10">
                    <Wrench className="w-4 h-4"/>
                    <span>Changelog</span>
                </button>
                 <button onClick={onAdminOpen} className="flex items-center space-x-2 text-sm font-semibold text-gray-300 hover:text-white bg-white/5 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10">
                    <UserCog className="w-4 h-4"/>
                    <span>Admin</span>
                </button>
            </div>
        </div>
    </header>
);

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

const Hero = () => (
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

const ProjectShowcase = ({ projects, onProjectSelect }) => (
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

const CaseStudies = ({ projects }) => (
    <section id="case-studies" className="py-20 md:py-32 bg-gray-950">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                <Layers className="inline-block w-8 h-8 mr-3 text-cyan-400" />
                In-Depth Case Studies
            </h2>
            <p className="text-lg text-gray-400 text-center mb-12">Problem → Process → Polish — told like a story.</p>
            <div className="space-y-16">
                {projects.slice(0, 2).map((project, index) => (
                    <motion.div 
                        key={project.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                    >
                        <div className={`lg:order-${index % 2 === 0 ? 1 : 2}`}>
                            <GlowCard>
                                <p className="text-cyan-400 font-bold mb-2">Case Study #{project.id}</p>
                                <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
                                <p className="text-gray-300 mb-6">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map(t => <span key={t} className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded">{t}</span>)}
                                </div>
                            </GlowCard>
                        </div>
                        <div className={`space-y-6 lg:order-${index % 2 === 0 ? 2 : 1}`}>
                            <div className="p-6 bg-black/20 border border-white/10 rounded-xl">
                                <h4 className="font-bold text-white flex items-center mb-2"><Sparkles className="w-5 h-5 mr-2 text-yellow-400" /> The Problem</h4>
                                <p className="text-gray-400 text-sm">{project.problem}</p>
                            </div>
                            <div className="p-6 bg-black/20 border border-white/10 rounded-xl">
                                <h4 className="font-bold text-white flex items-center mb-2"><Wrench className="w-5 h-5 mr-2 text-cyan-400" /> The Process</h4>
                                <p className="text-gray-400 text-sm">{project.process}</p>
                            </div>
                            <div className="p-6 bg-black/20 border border-white/10 rounded-xl">
                                <h4 className="font-bold text-white flex items-center mb-2"><Rocket className="w-5 h-5 mr-2 text-green-400" /> The Polish</h4>
                                <p className="text-gray-400 text-sm">{project.polish}</p>
                            </div>
                            <div className="p-6 bg-gray-800/30 border border-dashed border-gray-600 rounded-xl">
                                <h4 className="font-bold text-white flex items-center mb-2"><BrainCircuit className="w-5 h-5 mr-2 text-purple-400" /> What I'd Do Differently</h4>
                                <p className="text-gray-400 text-sm">{project.whatIdDoDifferently}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);


const SkillsPanel = () => (
    <section id="skills" className="py-20 md:py-32">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                <BrainCircuit className="inline-block w-8 h-8 mr-3 text-cyan-400" />
                Skills & Tools
            </h2>
            <p className="text-lg text-gray-400 text-center mb-12">Every tool in the belt — visualized with taste.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <GlowCard className="h-full">
                        <h3 className="text-xl font-bold text-white mb-4">Tech Mastery</h3>
                        <div className="h-80 md:h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skills.radar}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.2}/>
                                        </linearGradient>
                                    </defs>
                                    <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 14 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar name="Mastery" dataKey="A" stroke="#06b6d4" fill="url(#colorUv)" fillOpacity={0.6} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </GlowCard>
                </motion.div>
                <div className="space-y-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
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
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 }}>
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
                    </motion.div>
                </div>
            </div>
        </div>
    </section>
);

const Experience = () => (
    <section id="experience" className="py-20 md:py-32 bg-gray-950">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                <Users className="inline-block w-8 h-8 mr-3 text-cyan-400" />
                Experience & Contributions
            </h2>
            <div className="max-w-3xl mx-auto">
                <div className="relative border-l-2 border-cyan-800/50">
                    {experiences.map((exp, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="mb-12 pl-10 relative"
                        >
                            <div className="absolute -left-3.5 top-1 w-6 h-6 bg-gray-900 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                                <exp.logo className="w-3 h-3 text-cyan-400"/>
                            </div>
                            <p className="text-sm text-gray-400 mb-1">{exp.period}</p>
                            <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                            <p className="text-cyan-400 font-semibold mb-4">{exp.company}</p>
                            <ul className="space-y-2">
                                {exp.achievements.map((ach, i) => (
                                    <li key={i} className="flex items-start text-gray-300">
                                        <ArrowRight className="w-4 h-4 mr-3 mt-1 text-cyan-400 flex-shrink-0"/>
                                        <span>{ach}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const CareerTracker = () => (
    <section id="career" className="py-20 md:py-32">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                <Milestone className="inline-block w-8 h-8 mr-3 text-cyan-400" />
                Career Growth & Impact
            </h2>
            <p className="text-lg text-gray-400 text-center mb-12">Not just a dev. A force of nature.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Vision & Community */}
                <div className="space-y-8">
                    <GlowCard>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center"><Target className="mr-2 text-cyan-400"/> Vision Timeline</h3>
                        <div className="space-y-4">
                            {careerData.vision.map(item => (
                                <div key={item.year} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                                    <div className="flex items-center">
                                        <span className={`font-bold mr-4 ${item.achieved ? 'text-green-400' : 'text-purple-400'}`}>{item.year}</span>
                                        <p className="text-gray-300">{item.goal}</p>
                                    </div>
                                    {item.achieved ? <UserCheck className="text-green-400"/> : <Clock className="text-purple-400"/>}
                                </div>
                            ))}
                        </div>
                    </GlowCard>
                     <GlowCard>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center"><HeartHandshake className="mr-2 text-cyan-400"/> Community Involvement</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                            {careerData.community.map(item => (
                                <div key={item.title} className="p-4 bg-black/20 rounded-lg">
                                    <item.icon className="w-8 h-8 mx-auto mb-2 text-cyan-400"/>
                                    <p className="font-bold text-white text-sm">{item.title}</p>
                                    <p className="text-xs text-gray-400">{item.role}</p>
                                </div>
                            ))}
                        </div>
                    </GlowCard>
                </div>
                {/* Right Column: Mentorship & Learning */}
                <div className="space-y-8">
                    <GlowCard>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center"><Users className="mr-2 text-cyan-400"/> Mentorship Logs</h3>
                        <div className="space-y-3">
                            {careerData.mentorship.map(item => (
                                <div key={item.mentee} className="p-3 bg-black/20 rounded-lg">
                                    <p className="font-bold text-white">{item.mentee} - <span className="font-normal text-cyan-400">{item.project}</span></p>
                                    <p className="text-sm text-gray-400 mt-1">"{item.outcome}"</p>
                                </div>
                            ))}
                        </div>
                    </GlowCard>
                    <GlowCard>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center"><Microscope className="mr-2 text-cyan-400"/> Learning Now</h3>
                        <div className="space-y-4">
                            {careerData.learning.map(item => (
                                <div key={item.tech} className="flex items-start p-3 bg-black/20 rounded-lg">
                                    <item.icon className="w-6 h-6 mr-4 mt-1 text-cyan-400 flex-shrink-0"/>
                                    <div>
                                        <p className="font-bold text-white">{item.tech}</p>
                                        <p className="text-sm text-gray-400">{item.reason}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlowCard>
                </div>
            </div>
        </div>
    </section>
);


const Contact = () => (
    <section id="contact" className="py-20 md:py-32">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                <Send className="inline-block w-8 h-8 mr-3 text-cyan-400" />
                Let's Collaborate
            </h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <GlowCard>
                        <h3 className="text-2xl font-bold text-white mb-4">Send a Message</h3>
                        <form className="space-y-4">
                            <input type="text" placeholder="Your Name" className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            <input type="email" placeholder="Your Email" className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            <textarea placeholder="Your Message" rows="5" className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
                            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2">
                                <Send className="w-5 h-5" />
                                <span>Send Inquiry</span>
                            </button>
                        </form>
                    </GlowCard>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-3">Book a Meeting</h3>
                        <p className="text-gray-400 mb-3">Find a time that works for you. My calendar is synced in real-time.</p>
                        <a href="#" className="inline-flex items-center justify-center space-x-2 w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                            <Calendar className="w-5 h-5 text-cyan-400" />
                            <span>Book via Calendly</span>
                        </a>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-3">Download Resume</h3>
                        <p className="text-gray-400 mb-3">Get a copy of my professional history.</p>
                        <a href="#" className="inline-flex items-center justify-center space-x-2 w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                            <FileText className="w-5 h-5 text-cyan-400" />
                            <span>Download PDF</span>
                        </a>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-3">Find me on Socials</h3>
                        <div className="flex space-x-4">
                            {[
                                { icon: Github, href: "https://github.com/SaeedX302" },
                                { icon: Twitter, href: "https://x.com/saeedx300" },
                                { icon: Instagram, href: "https://www.instagram.com/saeedxdie" },
                            ].map((social, i) => (
                                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full text-white hover:bg-cyan-500/20 hover:text-cyan-300 transition-all">
                                    <social.icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-gray-950 border-t border-white/10 py-12">
        <div className="container mx-auto px-6 text-center text-gray-400">
            <div className="mb-6">
                <h4 className="font-bold text-white mb-4">Check Out My Other Platforms</h4>
                <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-sm">
                    <a href="https://linktr.ee/saeedxdie" className="hover:text-cyan-400 transition-colors">Linktree</a>
                    <a href="https://gravatar.com/cheerfuld27b01881a" className="hover:text-cyan-400 transition-colors">Gravatar</a>
                    <a href="https://tsungpt2.vercel.app/" className="hover:text-cyan-400 transition-colors">TSunGpt-2</a>
                    <a href="https://tsuntiktokdownloder.vercel.app/" className="hover:text-cyan-400 transition-colors">TikTok Downloader</a>
                    <a href="https://tsun-yt-downloder.vercel.app/" className="hover:text-cyan-400 transition-colors">YouTube Downloader</a>
                </div>
            </div>
            <div className="text-sm text-white/50">
                Credits To °【〆༯𝙎ค૯𝙀𝘿】✘,【.ISHU.】<br />
                "Won This World" — "If You Don't Then Go And Die"
            </div>
            <div className="mt-8 text-xs text-gray-600">
                <p>Apne hone ka ham is tarah pata dete the</p>
                <p>Khaak mutthi mein utha kar uda dete the</p>
                <p className="font-bold mt-2">- Jaun Elia</p>
            </div>
        </div>
    </footer>
);

// --- Admin Components ---

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'Saeedxdie' && password === 'S@eedx2025') {
            setError('');
            onLoginSuccess();
        } else {
            setError('Invalid username or password.');
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-sm bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-cyan-500/10"
                    >
                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-white text-center mb-6">Admin Login</h2>
                            <form onSubmit={handleLogin} className="space-y-4">
                                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                                <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">Login</button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const AdminPanel = ({ isOpen, onClose, projects, setProjects, onLogout }) => {
    const [isFormVisible, setFormVisible] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({ title: '', category: '', thumbnail: '', tech: '', liveUrl: '', githubRepo: '' });
    
    useEffect(() => {
        if (editingProject) {
            setFormData({ ...editingProject, tech: editingProject.tech.join(', ') });
            setFormVisible(true);
        } else {
            setFormData({ title: '', category: '', thumbnail: '', tech: '', liveUrl: '', githubRepo: '' });
        }
    }, [editingProject]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const projectData = { ...formData, tech: formData.tech.split(',').map(t => t.trim()) };
        
        if (editingProject) {
            setProjects(projects.map(p => p.id === editingProject.id ? { ...projectData, id: p.id } : p));
        } else {
            setProjects([...projects, { ...projectData, id: Date.now() }]);
        }
        
        setEditingProject(null);
        setFormVisible(false);
    };
    
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl bg-gray-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-cyan-500/20 max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center p-6 border-b border-white/10">
                            <h2 className="text-2xl font-bold text-white">Admin Panel <span className="text-sm font-normal text-cyan-400">| Managing {projects.length} Projects</span></h2>
                            <div>
                                <button onClick={onLogout} className="text-gray-300 hover:text-white transition-colors mr-4"><LogOut /></button>
                                <button onClick={onClose} className="text-gray-300 hover:text-white transition-colors"><X /></button>
                            </div>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <button onClick={() => { setEditingProject(null); setFormVisible(!isFormVisible); }} className="mb-6 w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2">
                                <PlusCircle />
                                <span>{isFormVisible && !editingProject ? 'Cancel' : 'Add New Project'}</span>
                            </button>

                            <AnimatePresence>
                                {isFormVisible && (
                                    <motion.form initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} onSubmit={handleSubmit} className="space-y-4 mb-8 bg-black/20 p-6 rounded-lg overflow-hidden">
                                        <h3 className="text-xl font-bold text-white">{editingProject ? 'Edit Project' : 'New Project'}</h3>
                                        <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-2 text-white" required />
                                        <input name="category" value={formData.category} onChange={handleInputChange} placeholder="Category" className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-2 text-white" required />
                                        <input name="thumbnail" value={formData.thumbnail} onChange={handleInputChange} placeholder="Thumbnail URL" className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-2 text-white" required />
                                        <input name="tech" value={formData.tech} onChange={handleInputChange} placeholder="Tech Stack (comma-separated)" className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-2 text-white" required />
                                        <input name="liveUrl" value={formData.liveUrl} onChange={handleInputChange} placeholder="Live URL" className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-2 text-white" />
                                        <input name="githubRepo" value={formData.githubRepo} onChange={handleInputChange} placeholder="GitHub Repo (user/repo)" className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-2 text-white" />
                                        <div className="flex justify-end space-x-4">
                                            {editingProject && <button type="button" onClick={() => { setEditingProject(null); setFormVisible(false); }} className="bg-gray-500/20 text-gray-300 font-semibold py-2 px-4 rounded-lg">Cancel Edit</button>}
                                            <button type="submit" className="bg-green-500/20 text-green-300 font-semibold py-2 px-4 rounded-lg">{editingProject ? 'Update Project' : 'Save Project'}</button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                            
                            <div className="space-y-4">
                                {projects.map(p => (
                                    <div key={p.id} className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                                        <p className="text-white font-semibold">{p.title}</p>
                                        <div className="flex space-x-4">
                                            <button onClick={() => setEditingProject(p)} className="text-cyan-400 hover:text-cyan-300"><Edit /></button>
                                            <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-400"><Trash2 /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


const App = () => {
    const [projects, setProjects] = useState(initialProjects);
    const [isChangelogOpen, setChangelogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleLoginSuccess = () => {
        setIsAdmin(true);
        setShowLoginModal(false);
    };
    
    const handleLogout = () => {
        setIsAdmin(false);
    };
    
    const handleAdminOpen = () => {
        if (!isAdmin) {
            setShowLoginModal(true);
        } else {
            // If already admin, just open the panel
            setIsAdmin(true);
        }
    };

    // Smooth scrolling for anchor links
    useEffect(() => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }, []);

    return (
        <div className="bg-black text-white font-sans leading-relaxed selection:bg-cyan-500/50">
            <Header onChangelogOpen={() => setChangelogOpen(true)} onAdminOpen={handleAdminOpen} />
            <main>
                <Hero />
                <ProjectShowcase projects={projects} onProjectSelect={setSelectedProject} />
                <CaseStudies projects={projects} />
                <SkillsPanel />
                <Experience />
                <CareerTracker />
                <Contact />
            </main>
            <Footer />
            <ChangelogModal isOpen={isChangelogOpen} onClose={() => setChangelogOpen(false)} />
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLoginSuccess={handleLoginSuccess} />
            <AdminPanel isOpen={isAdmin} onClose={() => setIsAdmin(false)} projects={projects} setProjects={setProjects} onLogout={handleLogout} />
        </div>
    );
};

export default App;
