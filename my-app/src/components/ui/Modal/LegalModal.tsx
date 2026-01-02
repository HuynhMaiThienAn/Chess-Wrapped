'use client';

import { X, Shield, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react'; // Added import for React

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    activeTab: 'privacy' | 'terms';
}

export default function LegalModal({ isOpen, onClose, activeTab }: LegalModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {/* Import Font Globally for Modal */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&display=swap');
                .font-bubbly { font-family: 'Fredoka', sans-serif; }
            `}</style>

            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-bubbly">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                />

                {/* Modal (Applied Theme Styles) */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    // Increased padding, rounded corners, and added chunky border
                    className="relative w-full max-w-2xl bg-[#262421] border-4 border-[#3e3c39] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b-4 border-[#262421] bg-[#1f1d1a]">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            {/* Larger icon size */}
                            {activeTab === 'privacy'
                                ? <Shield size={24} className="text-[#81b64c]"/>
                                : <FileText size={24} className="text-[#ffc800]"/>}
                            {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                        </h3>
                        <button onClick={onClose} className="text-[#989795] hover:text-white transition p-1 rounded-full bg-[#3e3c39] hover:bg-[#81b64c]">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8 overflow-y-auto text-[#c3c2c1] space-y-6 leading-relaxed text-sm md:text-base">
                        {activeTab === 'privacy' ? (
                            <>
                                <p className="text-white font-bold text-lg mb-4 border-b border-[#3e3c39] pb-2">
                                    Last Updated: December 2025
                                </p>

                                <p>
                                    <strong>1. Data Collection:</strong> ChessWrapped is a stateless application. We do not store, sell, or share your Chess.com username, game history, or any personal data on our servers. All data is fetched in real-time from the public Chess.com API and processed locally in your browser.
                                </p>
                                <p>
                                    <strong>2. Third-Party Services:</strong> This application retrieves data from Chess.com. By using this service, you acknowledge that your public game data is being accessed via the Chess.com Public API.
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-white font-bold text-lg mb-4 border-b border-[#3e3c39] pb-2">
                                    General Conditions
                                </p>
                                <p>
                                    <strong>1. Disclaimer:</strong> ChessWrapped is an unofficial, fan-made project. It is <strong>not affiliated with Chess.com</strong>.
                                </p>
                                <p>
                                    <strong>2. Usage:</strong> This service is provided "as is" without warranty of any kind. Use of the service is at your own risk.
                                </p>
                                <p>
                                    <strong>3. Rate Limiting:</strong> Please do not spam the "Generate" button. We respect Chess.com's API rate limits and reserve the right to temporarily restrict access if usage patterns suggest abuse.
                                </p>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}