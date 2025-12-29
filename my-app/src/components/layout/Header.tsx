'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, Instagram, Star, Github, Volume2, VolumeX, ChessKing, UserPlus } from 'lucide-react';
import { useSound } from '@/context/SoundContext';
import HeaderModal, { ModalContentKey } from './HeaderModal';
import MenuItem from './MenuItem';

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