'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Star, Github, X, Shield, Lightbulb, Zap, ChessKing, AlertTriangle } from 'lucide-react';

// --- 1. MODAL CONTENT DEFINITIONS (Unchanged) ---
type ModalContentKey = 'none' | 'guide' | 'features' | 'feedback' | 'legal';

const MODAL_CONTENT = {
    // ... [Content definitions remain the same] ...
    guide: {
        title: "How It Works: Get Started",
        icon: Lightbulb,
        color: 'text-[#81b64c]',
        body: "1. Simply type your Chess.com username into the card on the homepage.\n2. Click START! or press Enter.\n3. We fetch your 2025 archived games (no login required).\n4. The system analyzes your Elo, best games, and blunders, presenting them slide-by-slide.",
    },
    features: {
        title: "Key Features Preview",
        icon: Zap,
        color: 'text-[#ffc800]',
        body: "• Visual Elo Rollercoaster: See your rating fluctuate weekly.\n• Opening Analysis: Discover your highest win-rate openings.\n• Nemesis Identification: We track the opponent who beat you the most.\n• Shareable Story: Generate a single, viral image card of your stats.",
    },
    feedback: {
        title: "Send Your Feedback",
        icon: Star,
        color: 'text-[#ffc800]',
        body: "Thank up you for wanting to contribute! Due to the rapid development phase, please submit feedback via our GitHub issues page for now. We appreciate your input!",
    },
    legal: {
        title: "Terms, Privacy & Contact",
        icon: Shield,
        color: 'text-white',
        body: (
            <>
                <p className="text-white text-lg mb-4 font-bold border-b border-[#81b64c]/50 pb-2">Publishing Information</p>

                <p className="text-[#81b64c] mb-2 font-bold">Disclaimer:</p>
                <p className="text-[#989795] mb-4">This project is an independent analysis tool and is not officially affiliated with Chess.com. Data is fetched via public APIs.</p>

                <p className="text-[#81b64c] mb-2 font-bold">Policy Links (Placeholders):</p>
                <ul className="list-disc list-inside text-[#c3c2c1] ml-4 space-y-1 mb-4">
                    <li><a href="/terms" target="_blank" className="underline hover:text-[#ffc800]">Terms of Service</a></li>
                    <li><a href="/privacy" target="_blank" className="underline hover:text-[#ffc800]">Privacy Policy</a></li>
                </ul>

                <p className="text-[#989795] text-xs mt-4">© 2025 ChessWrapped. All rights reserved.</p>
            </>
        ),
    },
};

// --- 2. REUSABLE MODAL COMPONENT (Unchanged) ---
const HeaderModal = ({ contentKey, onClose }: { contentKey: ModalContentKey, onClose: () => void }) => {
    if (contentKey === 'none') return null;

    const content = MODAL_CONTENT[contentKey as ValidModalKey];
    const Icon = content.icon;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center font-bubbly p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-[#262421] rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-white/20"
                    initial={{ scale: 0.8, y: -50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: -50 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                            <Icon size={32} className={`${content.color} drop-shadow-md`} />
                            <h3 className="text-2xl font-bold text-white">{content.title}</h3>
                        </div>
                        <button onClick={onClose} className="text-white/80 hover:text-white transition-colors p-2 rounded-full">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="text-left text-[#c3c2c1] whitespace-pre-line">{content.body}</div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
type ValidModalKey = Exclude<ModalContentKey, 'none'>;


// --- 3. MAIN HEADER COMPONENT ---
export default function Header() {
    const [modalContent, setModalContent] = useState<ModalContentKey>('none');

    const handleModalOpen = (key: ModalContentKey) => {
        setModalContent(key);
    };

    const handleModalClose = () => {
        setModalContent('none');
    };

    return (
        <header className="w-full fixed top-0 z-50 py-3 font-bubbly">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center bg-[#302e2b] rounded-full shadow-xl border-4 border-[#262421]">

                {/* 1. Logo/Home Link */}
                <Link href="/" className="flex items-center gap-2 p-2 transition-transform hover:scale-105">
                    <div className="bg-[#81b64c] p-2 rounded-full shadow-md">
                        <ChessKing size={20} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="text-2xl font-black text-white tracking-tight">
                        Chess<span className="text-[#ffc800]">Wrapped</span>
                    </span>
                </Link>

                {/* 2. Nav Links (Core Info Links) */}
                <nav className="flex items-center gap-2 md:gap-4 text-sm font-bold text-white/80">

                    {/* How It Works */}
                    <button
                        onClick={() => handleModalOpen('guide')}
                        className="hover:text-[#ffc800] transition-colors p-2 rounded-lg"
                    >
                        How It Works
                    </button>

                    {/* Features */}
                    <button
                        onClick={() => handleModalOpen('features')}
                        className="hover:text-[#ffc800] transition-colors p-2 rounded-lg"
                    >
                        Features
                    </button>

                    {/* Policy & Legal */}
                    <button
                        onClick={() => handleModalOpen('legal')}
                        className="hover:text-[#ffc800] transition-colors p-2 rounded-lg flex items-center gap-1"
                    >
                        Policy & Legal
                    </button>

                    {/* The 'Don't Click' Button */}
                    <button
                        onClick={() => handleModalOpen('legal')}
                        className="hover:text-[#ffc800] transition-colors p-2 rounded-lg flex items-center gap-1"
                    >
                        What
                    </button>

                </nav>

                {/* 3. Action Buttons (Feedback & GitHub - Chunkily Styled) */}
                <div className="flex gap-2">

                    {/* Feedback Button (Yellow Chunky) */}
                    <button
                        onClick={() => handleModalOpen('feedback')}
                        className="bg-[#ffc800] hover:bg-[#e6b800] text-[#302e2b] font-bold px-4 py-2 rounded-full shadow-[0_4px_0_#b38b00] active:shadow-none active:translate-y-[4px] transition-all flex items-center gap-2 border-2 border-[#ffc800]"
                    >
                        <Star size={16} fill="currentColor" /> Feedback
                    </button>

                    {/* GitHub Button (Dark/Charcoal Chunky Style) */}
                    <Link
                        href="https://github.com/your-repo-link"
                        target="_blank"
                        className="bg-[#3e3c39] hover:bg-[#52525b] text-white font-bold px-4 py-2 rounded-full shadow-[0_4px_0_#262421] active:shadow-none active:translate-y-[4px] transition-all flex items-center gap-2 border-2 border-[#3e3c39]"
                    >
                        <Github size={16} /> GitHub
                    </Link>

                </div>
            </div>

            {/* Modal Renderer */}
            <HeaderModal contentKey={modalContent} onClose={handleModalClose} />
        </header>
    );
}