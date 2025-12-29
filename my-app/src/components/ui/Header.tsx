'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Lightbulb, Zap, Mail, UserPlus, Menu, Instagram, ExternalLink, Star, Github, Volume2, VolumeX, ChessKing } from 'lucide-react';
import { useSound } from '@/context/SoundContext'; // 👇 Import the new hook

// --- 1. MODAL CONTENT DEFINITIONS ---
type ModalContentKey = 'none' | 'guide' | 'features' | 'legal';

const MODAL_CONTENT = {
    guide: {
        title: "How It Works",
        icon: Lightbulb,
        color: 'text-[#81b64c]',
        body: (
            <div className="space-y-4">
                <p>1. Type your chess.com username.</p>
                <p>2. Click START! or press Enter.</p>
                <p>3. Don't have an account? bro just make one :b</p>
            </div>
        )
    },
    features: {
        title: "Key Features",
        icon: Zap,
        color: 'text-[#ffc800]',
        body: (
            <div className="space-y-4">
                <p>It's a year wrap for chess (inspired by Spotify Wrapped). It showcases your chess journey in 2025</p>
                <p className="font-bold text-[#ffc800]">NO SPOILERS HERE {'>'}:)</p>
            </div>
        )
    },
    legal: {
        title: "Legal & Contact",
        icon: Shield,
        color: 'text-white',
        body: (
            <div className="space-y-6 text-sm">
                <div className="bg-[#3e3c39] p-4 rounded-xl border border-white/10">
                    <h4 className="text-[#81b64c] font-bold text-lg mb-2 flex items-center gap-2">
                        <Mail size={16} /> Contact Us
                    </h4>
                    <p className="mb-2">For support, bug reports, or inquiries, please contact me:</p>
                    <a href="mailto:huynhmaithienan.2005@gmail.com" className="text-[#ffc800] hover:underline font-bold break-all">
                        huynhmaithienan.2005@gmail.com
                    </a>
                </div>
                <div>
                    <h4 className="text-white font-bold text-lg mb-2 border-b border-white/20 pb-1">1. Terms of Service</h4>
                    <p className="mb-2 text-justify">
                        <strong>Disclaimer:</strong> ChessWrapped is an independent, open-source hobby project and is <span className="text-[#ffc800]">not affiliated, endorsed, or sponsored by Chess.com</span>.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold text-lg mb-2 border-b border-white/20 pb-1">2. Privacy Policy</h4>
                    <ul className="list-disc list-inside space-y-2 text-[#c3c2c1]">
                        <li><strong>No Data Storage:</strong> We do not store your passwords.</li>
                        <li><strong>Public Data Only:</strong> We only access public API data.</li>
                    </ul>
                </div>
                <div className="pt-4 border-t border-white/10 text-center text-xs text-[#989795]">
                    © 2025 ChessWrapped. All rights reserved.
                </div>
            </div>
        ),
    },
};

type ValidModalKey = Exclude<ModalContentKey, 'none'>;

// --- 2. REUSABLE MODAL COMPONENT ---
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
                    className="bg-[#262421] rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border-4 border-white/20 flex flex-col max-h-[85vh]"
                    initial={{ scale: 0.8, y: -50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: -50 }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-start mb-4 shrink-0">
                        <div className="flex items-center gap-3">
                            <Icon size={28} className={`${content.color} drop-shadow-md`} />
                            <h3 className="text-2xl font-bold text-white">{content.title}</h3>
                        </div>
                        <button onClick={onClose} className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="text-left text-[#c3c2c1] overflow-y-auto pr-2 custom-scrollbar">
                        {content.body}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// --- 3. MENU ITEM ---
const MenuItem = ({ href, icon: Icon, label, colorClass, onClick }: any) => (
    <Link
        href={href}
        target="_blank"
        onClick={onClick}
        className={`flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group w-full text-left`}
    >
        <div className={`p-2 rounded-lg ${colorClass} text-white shadow-sm group-hover:scale-110 transition-transform`}>
            <Icon size={18} />
        </div>
        <span className="font-bold text-white text-sm">{label}</span>
        <ExternalLink size={14} className="ml-auto text-white/30 group-hover:text-white/70" />
    </Link>
);

// --- 4. MAIN HEADER ---
export default function Header() {
    const [modalContent, setModalContent] = useState<ModalContentKey>('none');
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // 👇 Use Global Sound Hook
    const { isMuted, toggleMute, playSound } = useSound();

    const handleHover = () => {
        playSound('/hover.mp3');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="w-full fixed top-0 z-50 py-3 font-bubbly">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center bg-[#302e2b] rounded-full shadow-xl border-4 border-[#262421] relative">

                {/* 1. Logo */}
                <Link
                    href="/"
                    onMouseEnter={handleHover}
                    className="flex items-center gap-2 p-2 transition-transform hover:scale-105"
                >
                    <div className="bg-[#81b64c] p-2 rounded-full shadow-md">
                        <ChessKing size={20} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="text-2xl font-black text-white tracking-tight">
                        Chess<span className="text-[#ffc800]">Wrapped</span>
                    </span>
                </Link>

                {/* 2. Nav Links (Desktop) */}
                <nav className="hidden md:flex items-center gap-4 text-sm font-bold text-white/80">
                    <button onMouseEnter={handleHover} onClick={() => setModalContent('guide')} className="hover:text-[#ffc800] transition-colors">How It Works</button>
                    <button onMouseEnter={handleHover} onClick={() => setModalContent('features')} className="hover:text-[#ffc800] transition-colors">Features</button>
                    <button onMouseEnter={handleHover} onClick={() => setModalContent('legal')} className="hover:text-[#ffc800] transition-colors">Legal</button>
                </nav>

                {/* 3. Controls Container (Volume + Burger) */}
                <div className="flex items-center gap-2">

                    {/* 👇 Updated Volume Button (Click to Mute All) */}
                    <button
                        onClick={() => {
                            toggleMute();
                            if (isMuted) playSound('/hover.mp3'); // Play sound immediately on unmute
                        }}
                        className={`p-3 rounded-full transition-all border-2 ${isMuted ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-[#3e3c39] text-white border-[#52525b] hover:bg-[#52525b]'}`}
                        title={isMuted ? "Unmute Sound" : "Mute Sound"}
                    >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>

                    {/* Burger Menu */}
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => {
                                setMenuOpen(!menuOpen);
                                handleHover();
                            }}
                            className={`p-3 rounded-full transition-all border-2 ${menuOpen ? 'bg-[#ffc800] text-[#302e2b] border-[#ffc800]' : 'bg-[#3e3c39] text-white border-[#52525b] hover:bg-[#52525b]'}`}
                        >
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>

                        <AnimatePresence>
                            {menuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 top-14 w-60 bg-[#262421] border-4 border-[#3e3c39] rounded-2xl shadow-2xl p-2 z-[60] flex flex-col gap-1"
                                >
                                    <MenuItem
                                        href="https://www.chess.com/member/aan_huynh"
                                        icon={UserPlus}
                                        label="Add Friend"
                                        colorClass="bg-[#81b64c]"
                                        onClick={() => setMenuOpen(false)}
                                    />
                                    <MenuItem
                                        href="https://forms.gle/Eweg1RtYs9is9p6x5"
                                        icon={Star}
                                        label="Feedback"
                                        colorClass="bg-[#ffc800] text-[#302e2b]"
                                        onClick={() => setMenuOpen(false)}
                                    />
                                    <MenuItem
                                        href="https://github.com/huynhmaithienan/Chess-wrapped"
                                        icon={Github}
                                        label="GitHub"
                                        colorClass="bg-[#3e3c39]"
                                        onClick={() => setMenuOpen(false)}
                                    />
                                    <MenuItem
                                        href="https://www.instagram.com/huynhmaithienan/"
                                        icon={Instagram}
                                        label="Instagram"
                                        colorClass="bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"
                                        onClick={() => setMenuOpen(false)}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <HeaderModal contentKey={modalContent} onClose={() => setModalContent('none')} />
        </header>
    );
}