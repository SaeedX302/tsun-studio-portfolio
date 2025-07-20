// src/components/Contact.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from '@formspree/react';
import { Send, CheckCircle } from 'lucide-react';

// --- Loading Spinner Component ---
const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


// --- New Contact Form Component based on your uploaded file ---
const NewStyledContactForm = () => {
    // Using environment variable for security
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
    const [state, handleSubmit] = useForm(formspreeId);

    const socialLinks = [
        { name: 'Instagram', href: 'https://www.instagram.com/saeedxdie', icon: <svg viewBox="0 0 30 30" className="w-4 h-4 fill-cyan-800 group-hover:fill-white transition-colors duration-300"><path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path></svg> },
        { name: 'Twitter', href: 'https://x.com/saeedx300', icon: <svg viewBox="0 0 512 512" className="w-4 h-4 fill-cyan-800 group-hover:fill-white transition-colors duration-300"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg> },
        { name: 'GitHub', href: 'https://github.com/SaeedX302', icon: <svg viewBox="0 0 496 512" className="w-4 h-4 fill-cyan-800 group-hover:fill-white transition-colors duration-300"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3.3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 0-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.3-6.2-10.1-27.8 2.3-57.4 0 0 21.1-6.9 69.2 25.8 20.1-5.6 41.6-8.3 62.2-8.3 20.6 0 42.1 2.8 62.2 8.3 48.1-32.6 69.2-25.8 69.2-25.8 12.4 29.6 4.6 51.2 2.3 57.4 16 17.6 23.6 31.4 23.6 58.9 0 96.5-58.7 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg> }
    ];

    return (
        <motion.div className="w-[290px] h-[350px] [perspective:1000px] group">
            <motion.div
                whileHover={{ rotateX: 10, rotateY: -15, rotateZ: -5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-full rounded-[50px] bg-gradient-to-br from-cyan-400 to-blue-600 [transform-style:preserve-3d] shadow-2xl shadow-cyan-500/20 group-hover:shadow-blue-500/40"
            >
                {/* Logo Circles */}
                <div className="absolute top-0 right-0 [transform-style:preserve-3d]">
                    <motion.div className="absolute block w-[170px] aspect-square rounded-full top-2 right-2 bg-cyan-300/20 backdrop-blur-sm shadow-xl" style={{ transform: 'translateZ(20px)' }}></motion.div>
                    <motion.div transition={{delay: 0.1}} className="absolute block w-[140px] aspect-square rounded-full top-2.5 right-2.5 bg-cyan-300/20 backdrop-blur-sm shadow-xl" style={{ transform: 'translateZ(40px)' }}></motion.div>
                    <motion.div transition={{delay: 0.2}} className="absolute block w-[110px] aspect-square rounded-full top-[17px] right-[17px] bg-cyan-300/20 backdrop-blur-sm shadow-xl" style={{ transform: 'translateZ(60px)' }}></motion.div>
                    <motion.div transition={{delay: 0.3}} className="absolute block w-[80px] aspect-square rounded-full top-[23px] right-[23px] bg-cyan-300/20 backdrop-blur-sm shadow-xl" style={{ transform: 'translateZ(80px)' }}></motion.div>
                    <motion.div transition={{delay: 0.4}} className="absolute block w-[50px] aspect-square rounded-full top-[30px] right-[30px] grid place-content-center bg-cyan-300/20 backdrop-blur-sm shadow-xl" style={{ transform: 'translateZ(100px)' }}>
                        <Send className="w-6 h-6 text-white" />
                    </motion.div>
                </div>

                {/* Glass Effect */}
                <div className="absolute inset-2 rounded-[45px] rounded-tr-[100%] bg-gradient-to-b from-white/60 to-white/30 border-l border-b border-white/50 [transform-style:preserve-3d]" style={{ transform: 'translateZ(25px)' }}></div>

                {/* Content */}
                <div className="relative w-full h-full p-6 flex flex-col items-center [transform-style:preserve-3d]" style={{ transform: 'translateZ(26px)' }}>
                    {state.succeeded ? (
                        <div className="flex flex-col items-center justify-center text-center h-full text-cyan-900">
                            <CheckCircle className="w-16 h-16 text-cyan-800 mb-4" />
                            <h3 className="text-2xl font-bold">Thank You!</h3>
                            <p className="mt-2 text-sm">Your message has been sent.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="w-full h-full flex flex-col">
                            <h2 className="text-center font-black text-xl text-cyan-900 mb-4">Contact Me</h2>
                            <div className="space-y-3">
                                <input type="text" name="name" placeholder="Name" required className="w-full bg-transparent border-b-2 border-white/50 focus:border-white placeholder:text-cyan-900/70 text-cyan-900 font-bold text-sm p-2 outline-none transition-colors" />
                                <input type="email" name="email" placeholder="Email" required className="w-full bg-transparent border-b-2 border-white/50 focus:border-white placeholder:text-cyan-900/70 text-cyan-900 font-bold text-sm p-2 outline-none transition-colors" />
                                <textarea name="message" placeholder="Message" required rows="2" className="w-full bg-transparent border-b-2 border-white/50 focus:border-white placeholder:text-cyan-900/70 text-cyan-900 font-bold text-sm p-2 outline-none transition-colors resize-none"></textarea>
                            </div>
                            <div className="mt-auto text-center">
                                <button type="submit" disabled={state.submitting} className="py-2 px-12 rounded-full bg-cyan-800 text-white font-semibold shadow-lg hover:bg-cyan-900 transition-all duration-300 hover:-translate-y-0.5 disabled:bg-cyan-950 disabled:cursor-not-allowed flex items-center justify-center">
                                    {state.submitting ? (
                                        <>
                                            <LoadingSpinner />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        'Submit'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                
                {/* Social Buttons at the bottom */}
                <div className="absolute bottom-5 left-0 right-0 px-6 [transform-style:preserve-3d]" style={{ transform: 'translateZ(26px)' }}>
                    <div className="flex justify-center gap-2.5">
                        {socialLinks.map(link => (
                            <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="group">
                                <div className="w-8 h-8 grid place-content-center bg-white rounded-full shadow-md shadow-cyan-900/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-0.5">
                                    {link.icon}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};


const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 flex flex-col items-center justify-center">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                <Send className="inline-block w-8 h-8 mr-3 text-cyan-400" />
                Let's Collaborate
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">Have a project in mind or just want to say hi? Drop me a message. I'd love to hear from you.</p>
        </div>
        <NewStyledContactForm />
    </section>
  );
};

export default Contact;
