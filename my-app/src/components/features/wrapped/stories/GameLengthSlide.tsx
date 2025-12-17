'use client';

import { motion } from 'framer-motion';
import { Hourglass, Zap, ExternalLink, Timer, Swords } from 'lucide-react';
import StoryCard from '@/components/ui/StoryCard';
import { StoryBackground, containerVariants, itemVariants, CONTAINERS } from './shared';
import { useChessStats } from '@/context/ChessContext';

export default function GameLengthSlide() {
    const { stats: data } = useChessStats();

    // Safety check
    if (!data.longestGame || !data.shortestGame) return null;

    return (
        <StoryCard id="slide-length" className={CONTAINERS.slideCard}>
            <StoryBackground>
                <div className="absolute top-10 left-10 text-white opacity-5"><Hourglass size={60} /></div>
                <div className="absolute bottom-10 right-10 text-white opacity-5"><Zap size={60} /></div>
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">

                {/* Header */}
                <motion.div variants={itemVariants} className="w-full flex flex-col justify-start items-center px-4 mb-6 z-10">
                    <div className="flex items-center justify-center w-full mb-1">
                        <div className="bg-white rounded-full shadow-lg mr-3">
                            <img
                                src={data.avatarUrl}
                                alt={data.username}
                                className="w-14 h-14 rounded-full object-cover border-4 border-[#3b82f6]"
                            />
                        </div>
                        <h2 className="text-3xl font-black text-white drop-shadow-md leading-none">Interesting<br/>Games</h2>
                    </div>
                    <p className="text-[#989795] font-bold text-xs uppercase tracking-widest mt-2">Game Length Analysis</p>
                </motion.div>

                <div className="w-full px-6 flex flex-col gap-4 z-10">

                    {/* 1. LONGEST GAME (Blue) */}
                    <motion.div variants={itemVariants} className="w-full bg-[#3b82f6] rounded-xl p-1 shadow-lg transform rotate-[-1deg] hover:rotate-0 transition-transform duration-300">
                        <div className="bg-[#262421] rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                                <Hourglass className="text-[#3b82f6]" size={20} />
                                <span className="text-[#3b82f6] font-black text-sm uppercase tracking-wider">Longest Game</span>
                            </div>

                            <div className="flex justify-between items-start mb-1">
                                <div>
                                    <div className="text-white text-4xl font-black tabular-nums">{data.longestGame.moves}</div>
                                    <div className="text-[#989795] text-[10px] font-bold uppercase mt-1">Moves</div>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                    <div className="text-[#989795] text-[10px] uppercase font-bold mb-1">VS {data.longestGame.opponent}</div>
                                    <a
                                        href={data.longestGame.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 bg-[#3b82f6]/20 hover:bg-[#3b82f6]/30 text-[#3b82f6] px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-colors"
                                    >
                                        View Game <ExternalLink size={10} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. SHORTEST GAME (Yellow) */}
                    <motion.div variants={itemVariants} className="w-full bg-[#eab308] rounded-xl p-1 shadow-lg transform rotate-[1deg] hover:rotate-0 transition-transform duration-300">
                        <div className="bg-[#262421] rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                                <Zap className="text-[#eab308]" size={20} fill="#eab308" />
                                <span className="text-[#eab308] font-black text-sm uppercase tracking-wider">Shortest Game</span>
                            </div>

                            <div className="flex justify-between items-start mb-1">
                                <div>
                                    <div className="text-white text-4xl font-black tabular-nums">{data.shortestGame.moves}</div>
                                    <div className="text-[#989795] text-[10px] font-bold uppercase mt-1">Moves</div>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                    <div className="text-[#989795] text-[10px] uppercase font-bold mb-1">VS {data.shortestGame.opponent}</div>
                                    <a
                                        href={data.shortestGame.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 bg-[#eab308]/20 hover:bg-[#eab308]/30 text-[#eab308] px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-colors"
                                    >
                                        View Game <ExternalLink size={10} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>

            </motion.div>
        </StoryCard>
    );
}