// src/components/modals/ChangelogModal.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, ChevronsRight } from 'lucide-react';

const ChangelogModal = ({ isOpen, onClose, changelogData }) => {
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

export default ChangelogModal;
