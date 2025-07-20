// src/components/CaseStudies.jsx

import React, from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layers, Sparkles, Wrench, Rocket, BrainCircuit } from 'lucide-react';

// --- Reusable Animated Detail Card ---
// This component will be used for Problem, Process, etc.
const DetailCard = ({ icon: Icon, title, content, customClassName }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="p-6 bg-black/20 border border-white/10 rounded-xl"
    >
        <h4 className={`font-bold text-white flex items-center mb-2 ${customClassName}`}>
            <Icon className="w-5 h-5 mr-2" />
            {title}
        </h4>
        <p className="text-gray-400 text-sm">{content}</p>
    </motion.div>
);

// --- The Main Animated Case Study for a Single Project ---
const AnimatedSingleCaseStudy = ({ project, index }) => {
    const targetRef = React.useRef(null);
    
    // useScroll will track the scroll progress within the targetRef
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    // We create different motion values based on scroll progress
    // These will control the drawing of the SVG paths
    const pathLength1 = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
    const pathLength2 = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
    const pathLength3 = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
    const pathLength4 = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);

    const details = [
        { icon: Sparkles, title: "The Problem", content: project.problem, color: "text-yellow-400" },
        { icon: Wrench, title: "The Process", content: project.process, color: "text-cyan-400" },
        { icon: Rocket, title: "The Polish", content: project.polish, color: "text-green-400" },
        { icon: BrainCircuit, title: "What I'd Do Differently", content: project.whatIdDoDifferently, color: "text-purple-400" }
    ];

    // Determine the order for the two-column layout
    const isReversed = index % 2 !== 0;

    return (
        <div ref={targetRef} className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start my-24">
            {/* --- SVG Lines for Animation --- */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full hidden lg:block">
                <svg width="100%" height="100%" viewBox="0 0 400 600" preserveAspectRatio="none">
                    {/* The paths are defined to connect the main card to the detail cards */}
                    {/* The `motion.path` component animates the `pathLength` */}
                    <motion.path
                        d={isReversed ? "M 50,80 C 50,200 350,100 350,150" : "M 350,80 C 350,200 50,100 50,150"}
                        fill="none"
                        stroke="url(#line-gradient)"
                        strokeWidth="2"
                        style={{ pathLength: pathLength1 }}
                    />
                    <motion.path
                        d={isReversed ? "M 50,230 C 50,320 350,250 350,300" : "M 350,230 C 350,320 50,250 50,300"}
                        fill="none"
                        stroke="url(#line-gradient)"
                        strokeWidth="2"
                        style={{ pathLength: pathLength2 }}
                    />
                     <motion.path
                        d={isReversed ? "M 50,380 C 50,450 350,400 350,450" : "M 350,380 C 350,450 50,400 50,450"}
                        fill="none"
                        stroke="url(#line-gradient)"
                        strokeWidth="2"
                        style={{ pathLength: pathLength3 }}
                    />
                     <motion.path
                        d={isReversed ? "M 50,530 C 50,580 350,550 350,600" : "M 350,530 C 350,580 50,550 50,600"}
                        fill="none"
                        stroke="url(#line-gradient)"
                        strokeWidth="2"
                        style={{ pathLength: pathLength4 }}
                    />
                    <defs>
                        <linearGradient id="line-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="600">
                            <stop stopColor="#06b6d4" />
                            <stop offset="1" stopColor="#8b5cf6" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            
            {/* --- Main Project Card --- */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`sticky top-24 ${isReversed ? 'lg:order-2' : ''}`}
            >
                <div className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <p className="text-cyan-400 font-bold mb-2">Case Study #{project.id}</p>
                    <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
                    <p className="text-gray-300 mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map(t => <span key={t} className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded">{t}</span>)}
                    </div>
                </div>
            </motion.div>

            {/* --- Detail Cards Column --- */}
            <div className={`space-y-8 ${isReversed ? 'lg:order-1' : ''}`}>
                {details.map((detail, i) => (
                    <DetailCard 
                        key={i}
                        icon={detail.icon}
                        title={detail.title}
                        content={detail.content}
                        customClassName={detail.color}
                    />
                ))}
            </div>
        </div>
    );
};


// --- The Main Section Component ---
const CaseStudies = ({ projects }) => {
    return (
        <section id="case-studies" className="py-20 md:py-32 bg-gray-950 overflow-hidden">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                    <Layers className="inline-block w-8 h-8 mr-3 text-cyan-400" />
                    In-Depth Case Studies
                </h2>
                <p className="text-lg text-gray-400 text-center mb-12">Problem → Process → Polish — told like a story.</p>
                
                {/* We map over the projects and render the animated component for each */}
                {projects.slice(0, 2).map((project, index) => (
                    <AnimatedSingleCaseStudy key={project.id} project={project} index={index} />
                ))}
            </div>
        </section>
    );
};

export default CaseStudies;
