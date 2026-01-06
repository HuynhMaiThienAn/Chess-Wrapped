'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Github, MessageSquare, Heart, Trophy, Zap, Target, Home, Instagram, Coffee, Star } from 'lucide-react';
import StoryCard from '@/components/ui/Card/StoryCard';
import { containerVariants, itemVariants } from '@/components/shared/animations';
import { CONTAINERS, TYPOGRAPHY } from '@/components/shared/styles';
import { useChessStats } from '@/context/ChessContext';

const defaultAvatar = 'https://www.chess.com/bundles/web/images/user-image.svg';


export default function EndSlide({ onReset }: { onReset: () => void }) {
    const router = useRouter();
    const { stats: data } = useChessStats();

    return (
        <StoryCard id="slide-end" className={CONTAINERS.slideCard}>



            <motion.div
                className={CONTAINERS.slideContainer}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* --- CUSTOM HEADER (Manual layout to remove gray box) --- */}
                <motion.div variants={itemVariants} className="flex flex-col items-center mb-6 z-10 ">

                    {/* Avatar Circle - Same style as Welcome Page */}
                    <div className="relative mb-3 mt-5">
                        <div className="p-1 bg-white rounded-full shadow-2xl rotate-3">
                            <img
                                src={data?.avatarUrl || defaultAvatar}
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover border-4 border-[#ffc800] bg-white"
                                onError={(e) => { (e.target as HTMLImageElement).src = defaultAvatar; }}
                            />
                        </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h2 className={TYPOGRAPHY.headerTitle}>That was cool :D</h2>
                    <div className={TYPOGRAPHY.subHeader}>Good luck next year!</div>
                </motion.div>

                {/* --- BUTTONS SECTION --- */}
                <div className="w-full flex flex-col gap-3 px-6 z-10 -mt-2">

                    {/* 1. Main CTA: Feedback */}
                    <motion.div variants={itemVariants} className="w-full">
                        <button
                            onClick={() => window.open('https://forms.gle/Eweg1RtYs9is9p6x5', '_blank')}
                            className="w-full py-3.5 bg-[#81b64c] hover:bg-[#72a341] text-white font-black uppercase rounded-2xl shadow-[0_4px_0_#457524] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2 border-2 border-[#81b64c] group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <MessageSquare size={22} className="group-hover:rotate-12 transition-transform" fill="currentColor" />
                            <span className="tracking-wide">Share Feedback</span>
                        </button>
                    </motion.div>

                    {/* Divider Text */}
                    <motion.div variants={itemVariants} className="flex items-center gap-2 py-1 opacity-50">
                        <div className="h-px bg-white flex-1" />
                        <span className="text-[10px] uppercase font-bold text-white">Support & Connect</span>
                        <div className="h-px bg-white flex-1" />
                    </motion.div>

                    {/* 2. Grid for Socials */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Buy Me a Coffee */}
                        <motion.div variants={itemVariants}>
                            <a
                                href="https://buymeacoffee.com/ryan.h"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3 bg-[#FFDD00] hover:bg-[#FFEA00] text-[#302e2b] font-black text-xs uppercase rounded-xl shadow-[0_4px_0_#c7a008] active:shadow-none active:translate-y-[4px] transition-all flex flex-col items-center justify-center gap-1 border-2 border-[#FFDD00] h-full"
                            >
                                <Coffee size={20} className="text-[#302e2b]" strokeWidth={2.5} />
                                <span>Buy Coffee</span>
                            </a>
                        </motion.div>

                        {/* Instagram (Solid Color) */}
                        <motion.div variants={itemVariants}>
                            <a
                                href="https://www.instagram.com/huynhmaithienan/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3 bg-[#E1306C] hover:opacity-90 text-white font-black text-xs uppercase rounded-xl shadow-[0_4px_0_#be1e4e] active:shadow-none active:translate-y-[4px] transition-all flex flex-col items-center justify-center gap-1 border-2 border-[#E1306C] h-full relative"
                            >
                                <Instagram size={20} className="text-white" strokeWidth={2.5} />
                                <span>Update News</span>
                            </a>
                        </motion.div>
                    </div>

                    {/* 3. GitHub (Full Width) */}
                    <motion.div variants={itemVariants} className="w-full mt-1">
                        <a
                            href="https://github.com/huynhmaithienan/ChessWrapped"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 bg-[#262421] hover:bg-[#302e2b] text-[#989795] hover:text-white font-bold text-xs rounded-xl border-2 border-[#3e3c39] flex items-center justify-center gap-2 transition-all hover:border-[#ffc800] group"
                        >
                            <Github size={18} className="group-hover:text-white transition-colors" />
                            <span>Star on GitHub</span>
                            <Star size={14} className="text-[#ffc800] fill-[#ffc800] group-hover:scale-110 transition-transform" />
                        </a>
                    </motion.div>

                    {/* 4. Footer Action */}
                    <motion.button
                        onClick={() => router.push('/')}
                        variants={itemVariants}
                        className="w-full py-2 text-[#989795] hover:text-white font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-2 hover:bg-[#ffffff05] rounded-lg transition-colors "
                    >
                        <Home size={14} />
                        Back to Homepage
                    </motion.button>
                </div>

            </motion.div>
        </StoryCard>
    );
}