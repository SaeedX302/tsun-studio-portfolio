// src/components/admin/AdminPanel.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X, PlusCircle, Edit, Trash2 } from 'lucide-react';

const AdminPanel = ({ isOpen, onClose, projects, setProjects, onLogout }) => {
    const [isFormVisible, setFormVisible] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    
    // Define a default structure for a new project
    const newProjectTemplate = { 
        title: '', category: '', thumbnail: 'https://placehold.co/600x400/0D1117/30A8F2?text=New+Project', 
        tech: '', liveUrl: '', githubRepo: '', description: '', problem: '', process: '', polish: '', whatIdDoDifferently: '' 
    };

    const [formData, setFormData] = useState(newProjectTemplate);
    
    useEffect(() => {
        if (editingProject) {
            setFormData({ ...editingProject, tech: editingProject.tech.join(', ') });
            setFormVisible(true);
        } else {
            setFormData(newProjectTemplate);
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
        // Use a more robust confirmation than window.confirm in a real app
        if (confirm('Are you sure you want to delete this project?')) {
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
                                        {Object.keys(newProjectTemplate).map(key => (
                                            <input 
                                                key={key}
                                                name={key} 
                                                value={formData[key]} 
                                                onChange={handleInputChange} 
                                                placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                                className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-2 text-white" 
                                                required 
                                            />
                                        ))}
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

export default AdminPanel;
