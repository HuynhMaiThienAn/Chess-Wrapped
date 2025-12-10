'use client';

import { useState } from 'react';
import { Github, BookOpen, BarChart3, Heart, Mail } from 'lucide-react';
import LegalModal from './LegalModal';

export default function Footer() {
    const [isLegalOpen, setLegalOpen] = useState(false);
    const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');

    const openLegal = (tab: 'privacy' | 'terms') => {
        setLegalTab(tab);
        setLegalOpen(true);
    };

    return (
        <>
            <footer className="relative w-full bg-[#18181b] pt-16 pb-8 border-t border-[#ffffff10] overflow-hidden">
                {/* Glow Line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[2px] bg-gradient-to-r from-transparent via-[#81b64c] to-transparent opacity-60 shadow-[0_0_20px_#81b64c]" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                        {/* Brand Section */}
                        <div className="md:col-span-2 space-y-4">
                            <div className="flex items-center gap-3">
                                <img src="/icon.png" alt="ChessWrapped Logo" className="w-8 h-8 rounded-md shadow-md" />
                                <span className="font-black text-xl text-white tracking-tight">
                                    Chess<span className="text-[#81b64c]">Wrapped</span>
                                </span>
                            </div>
                            <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-sm">
                                The visual storytelling tool for chess players. Analyze your year, celebrate your victories, and share your journey.
                            </p>
                        </div>

                        {/* Product Links */}
                        <div className="space-y-4">
                            <h4 className="text-white font-bold tracking-wider text-sm uppercase">Product</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-[#a1a1aa] hover:text-[#81b64c] transition text-sm flex items-center gap-2">
                                        <BookOpen size={14} /> How It Works
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-[#a1a1aa] hover:text-[#81b64c] transition text-sm flex items-center gap-2">
                                        <BarChart3 size={14} /> Features
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-4">
                            <h4 className="text-white font-bold tracking-wider text-sm uppercase">Contact</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="https://github.com/HuynhMaiThienAn/ChessWrapped" target="_blank" rel="noreferrer" className="text-[#a1a1aa] hover:text-white transition text-sm flex items-center gap-2 group">
                                        <Github size={14} className="group-hover:text-[#81b64c] transition-colors" /> GitHub
                                    </a>
                                </li>
                                <li>
                                    <a className="text-[#a1a1aa] hover:text-white transition text-sm flex items-center gap-2 group">
                                        <Mail size={14} className="group-hover:text-[#81b64c] transition-colors" /> Contact Support
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-[#ffffff10] flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-[#52525b] text-xs">
                            <p>&copy; {new Date().getFullYear()} ChessWrapped.</p>
                            <div className="flex gap-4">
                                <button onClick={() => openLegal('privacy')} className="hover:text-[#81b64c] transition cursor-pointer">Privacy Policy</button>
                                <button onClick={() => openLegal('terms')} className="hover:text-[#81b64c] transition cursor-pointer">Terms & Conditions</button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-[#52525b] text-xs font-medium bg-[#27272a] px-3 py-1 rounded-full border border-[#3f3f46]">
                            <span>Built with</span>
                            <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" />
                            <span>for the community</span>
                        </div>
                    </div>
                </div>
            </footer>

            <LegalModal
                isOpen={isLegalOpen}
                onClose={() => setLegalOpen(false)}
                activeTab={legalTab}
            />
        </>
    );
}