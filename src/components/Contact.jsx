// src/components/Contact.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Send, Calendar, FileText, Github, Twitter, Instagram } from 'lucide-react';

// --- Reusable Child Component ---
const GlowCard = ({ children }) => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.6 }}
        className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden group h-full"
    >
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_rgba(60,190,255,0.15)_0%,_rgba(60,190,255,0)_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
        <div className="relative z-10">
            {children}
        </div>
    </motion.div>
);

const Contact = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/SaeedX302" },
    { icon: Twitter, href: "https://x.com/saeedx300" },
    { icon: Instagram, href: "https://www.instagram.com/saeedxdie" },
  ];

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          <Send className="inline-block w-8 h-8 mr-3 text-cyan-400" />
          Let's Collaborate
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
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
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="space-y-6"
          >
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
                {socialLinks.map((social, i) => (
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
};

export default Contact;
