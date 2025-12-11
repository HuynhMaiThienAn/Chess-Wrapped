'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; // 1. Import useRouter
import { Github, MessageSquare, Heart, Trophy, Zap, Target, Home } from 'lucide-react';
import StoryCard from '@/components/ui/StoryCard';
import { StoryHeader, StoryBackground, containerVariants, itemVariants, CONTAINERS } from './shared';
import { useChessStats } from '@/context/ChessContext';

const defaultAvatar = 'https://www.chess.com/bundles/web/images/user-image.svg';

export default function EndSlide({ onReset }: { onReset: () => void }) {
    const router = useRouter(); // 2. Initialize router
    const { stats: data } = useChessStats();

    return (
        <StoryCard id="slide-end" className={CONTAINERS.slideCard}>

            <StoryBackground>
                <div className="absolute top-1/4 left-1/4 text-white opacity-5"><Trophy size={60} /></div>
                <div className="absolute bottom-1/4 right-1/4 text-white opacity-5"><Heart size={50} /></div>
                <div className="absolute top-10 right-10 text-white opacity-5"><Zap size={40} /></div>
                <div className="absolute bottom-10 left-10 text-white opacity-5"><Target size={45} /></div>
            </StoryBackground>

            <motion.div
                className={CONTAINERS.slideContainer}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <StoryHeader
                    icon={
                        <div className="w-16 h-16 rounded-full border-2 border-[#ffc800] overflow-hidden shadow-sm">
                            <img
                                src={data?.avatarUrl || defaultAvatar}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).src = defaultAvatar; }}
                            />
                        </div>
                    }
                    iconColor=""
                    title="That was cool :D"
                    subtitle="See you next year"
                />

                <div className="w-full flex flex-col gap-4 px-6 z-10 mt-2">

                    {/* 1. Feedback Button */}
                    <motion.div variants={itemVariants} className="w-full">
                        <button
                            onClick={() => window.open('https://forms.gle/Eweg1RtYs9is9p6x5', '_blank')}
                            className="w-full py-3 bg-[#81b64c] hover:bg-[#72a341] text-white font-black uppercase rounded-xl shadow-[0_4px_0_#457524] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2 border-2 border-[#81b64c] group"
                        >
                            <MessageSquare size={20} className="group-hover:rotate-12 transition-transform"/>
                            Share Feedback
                        </button>
                        <p className="text-[#989795] text-[10px] font-bold mt-1.5 text-center opacity-70">
                            Help us improve for 2026!
                        </p>
                    </motion.div>

                    {/* 2. GitHub Button */}
                    <motion.div variants={itemVariants} className="w-full">
                        <a
                            href="https://github.com/huynhmaithienan/ChessWrapped"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 bg-[#262421] hover:bg-[#302e2b] text-white font-bold rounded-xl border-2 border-[#3e3c39] shadow-md flex items-center justify-center gap-2 transition-all hover:border-[#ffc800] group"
                        >
                            <Github size={20} className="text-white group-hover:text-[#ffc800] transition-colors"/>
                            <span>Star on GitHub</span>
                            <Heart size={16} className="text-red-500 fill-red-500 animate-pulse ml-1"/>
                        </a>
                    </motion.div>

                    <div className="w-full h-px bg-[#3e3c39]/50 my-1"></div>

                    {/* 3. Back to Home */}
                    <motion.button
                        onClick={() => router.push('/')} // 3. Use router.push to go to home
                        variants={itemVariants}
                        className="w-full py-3 text-[#989795] hover:text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-[#ffffff05] rounded-lg transition-colors"
                    >
                        <Home size={16} /> {/* Removed invalid href prop */}
                        Back to Homepage
                    </motion.button>
                </div>

            </motion.div>
        </StoryCard>
    );
}