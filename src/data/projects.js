// src/data/projects.js

// Separating data from components is crucial for maintainability.
// This data can be fetched from an API, a CMS, or a local file like this.

export const initialProjects = [
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
];

export const skillsData = {
  radar: [
    { subject: 'Frontend', A: 95, fullMark: 100 },
    { subject: 'Backend', A: 85, fullMark: 100 },
    { subject: 'DevOps', A: 70, fullMark: 100 },
    { subject: 'UI/UX', A: 88, fullMark: 100 },
    { subject: 'AI/ML', A: 75, fullMark: 100 },
    { subject: 'Databases', A: 80, fullMark: 100 },
  ],
  languages: [
    { name: "JavaScript", icon: 'Code', snippet: "const greet = (name) => `Hello, ${name}!`;" },
    { name: "Python", icon: 'Bot', snippet: "def greet(name):\n  return f\"Hello, {name}!\"" },
    { name: "TypeScript", icon: 'Code', snippet: "const greet = (name: string): string => `Hello, ${name}!`;" },
    { name: "SQL", icon: 'Server', snippet: "SELECT name FROM users WHERE id = 1;" },
  ],
  tools: ["React", "Node.js", "Next.js", "Firebase", "Vercel", "Docker", "Git", "Figma", "MongoDB", "PostgreSQL"]
};

export const changelogData = [
    {
        version: "v1.6.0",
        date: "July 20, 2025",
        changes: [
            "Feat: Restructured entire application into a modular, multi-framework compatible component architecture.",
            "Feat: Created separate, reusable components for Header, Hero, ProjectShowcase, SkillsPanel, and Contact sections.",
            "Feat: Organized modals and admin panels into dedicated subdirectories (`/modals`, `/admin`).",
            "Refactor: Abstracted static data (projects, skills, changelog) into a dedicated `/data` directory for easier management.",
            "Docs: Added extensive comments in each component file detailing how to switch between different styling methodologies (Tailwind, SASS, Styled Components, CSS Modules).",
        ],
        author: "°【〆༯𝙎ค૯𝙀𝘿】✘",
    },
    {
        version: "v1.5.1",
        date: "July 19, 2025",
        changes: ["Feat: Added 'Open in New Tab' icon to live project preview modal.", "Fix: Ensured all icons are correctly imported and referenced."],
        author: "°【〆༯𝙎ค૯𝙀𝘿】✘",
    },
    {
        version: "v1.5.0",
        date: "July 19, 2025",
        changes: ["Feat: Added a complete Admin Login system.", "Feat: Implemented Admin Panel for full CRUD operations on projects.", "Feat: Projects are now managed via state, making the showcase fully dynamic."],
        author: "°【〆༯𝙎ค૯𝙀𝘿】✘",
    }
];

// src/App.jsx

import React, { useState, useEffect } from 'react';

// Import Data
import { initialProjects, skillsData, changelogData } from './data/projects';

// Import Components
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectShowcase from './components/ProjectShowcase';
import SkillsPanel from './components/SkillsPanel';
import Contact from './components/Contact';
import ChangelogModal from './components/modals/ChangelogModal';
import AdminPanel from './components/admin/AdminPanel';
// You would also import other modals like LoginModal, ProjectModal here

const App = () => {
    const [projects, setProjects] = useState(initialProjects);
    const [isChangelogOpen, setChangelogOpen] = useState(false);
    const [isAdminPanelOpen, setAdminPanelOpen] = useState(false);
    // Add state for other modals, e.g., selectedProject, showLoginModal
    
    const handleAdminOpen = () => setAdminPanelOpen(true);
    const handleLogout = () => setAdminPanelOpen(false); // Simplified for now

    // Smooth scrolling effect
    useEffect(() => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }, []);

    return (
        <div className="bg-black text-white font-sans leading-relaxed selection:bg-cyan-500/50">
            <Header 
                onChangelogOpen={() => setChangelogOpen(true)} 
                onAdminOpen={handleAdminOpen} 
            />
            <main>
                <Hero />
                <ProjectShowcase 
                    projects={projects} 
                    onProjectSelect={(project) => { /* Logic to open project modal */ }} 
                />
                <SkillsPanel skills={skillsData} />
                <Contact />
                {/* Other sections like Experience, CaseStudies would be imported and placed here */}
            </main>
            {/* Footer would be its own component */}
            
            {/* Modals */}
            <ChangelogModal 
                isOpen={isChangelogOpen} 
                onClose={() => setChangelogOpen(false)} 
                changelogData={changelogData}
            />
            <AdminPanel 
                isOpen={isAdminPanelOpen}
                onClose={() => setAdminPanelOpen(false)}
                projects={projects}
                setProjects={setProjects}
                onLogout={handleLogout}
            />
            {/* Other modals like ProjectModal, LoginModal would be here */}
        </div>
    );
};

export default App;
