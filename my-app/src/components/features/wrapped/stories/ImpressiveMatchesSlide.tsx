'use client';

import { motion } from 'framer-motion';
import { Crown, Zap, Swords, Share2, Skull } from 'lucide-react';
import StoryCard from '@/components/ui/StoryCard';
import { StoryHeader, StoryBackground, containerVariants, itemVariants, CONTAINERS, TYPOGRAPHY } from './shared';
import { useChessStats } from '@/context/ChessContext';

const defaultAvatar = 'https://www.chess.com/bundles/web/images/user-image.svg';

export default function ImpressiveMatchesSlide() {
    const { stats: data } = useChessStats();
    const bestMatch = data.impressiveMatches?.[0];

    if (!bestMatch) return null;

    const userMatchElo = bestMatch.opponentElo - bestMatch.eloGap;

    return (
        <StoryCard id="slide-impressive" className={CONTAINERS.slideCard}>

            {/* Background Layer - More aggressive "Battle" theme */}
            <StoryBackground>
                <div className="absolute top-10 right-10 text-white opacity-5"><Swords size={80} /></div>
                <div className="absolute bottom-20 left-10 text-white opacity-5"><Skull size={60} /></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-[0.03] scale-150"><Crown size={200} /></div>
            </StoryBackground>

            <motion.div
                className={CONTAINERS.slideContainer}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* 1. Header */}
                <StoryHeader
                    icon={<Crown size={24} />}
                    iconColor="text-[#ffc800]"
                    title="Most impressive match!"
                />

                {/* 2. MAIN "BOSS CARD" VISUAL */}
                <motion.div
                    variants={itemVariants}
                    className="w-full px-6 mb-2 z-10 flex flex-col items-center"
                >

                    {/* The "VS" Card */}
                    <div className="w-full bg-[#262421] border-4 border-[#3e3c39] rounded-3xl p-5 flex flex-col items-center shadow-xl relative overflow-hidden">

                        {/* Background Splatter effect */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />

                        <div className="flex items-center justify-between w-full relative z-10 gap-2">

                            {/* LEFT: YOU (The Hero) */}
                            <div className="flex flex-col items-center">
                                <div className="relative mb-2">
                                    <img
                                        src={data.avatarUrl || defaultAvatar}
                                        alt="You"
                                        className="w-16 h-16 rounded-2xl border-4 border-[#81b64c] object-cover shadow-md bg-black/20"
                                        onError={(e) => { (e.target as HTMLImageElement).src = defaultAvatar; }}
                                    />
                                    {/* Winner Crown Badge */}
                                    <div className="absolute -top-2 -left-2 bg-[#ffc800] text-[#262421] p-1 rounded-full border-2 border-[#262421] shadow-sm">
                                        <Crown size={12} fill="currentColor" />
                                    </div>
                                </div>
                                <span className="text-white font-bold text-xs truncate max-w-[80px] text-center">You</span>
                                <span className="text-[#989795] font-mono text-xs font-bold">{userMatchElo}</span>
                            </div>

                            {/* CENTER: VS */}
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-[#ffc800] font-black text-3xl italic">VS</span>
                                <span className="text-white/20 text-[10px] font-bold tracking-widest uppercase mt-1">
                                    {bestMatch.timeControl}
                                </span>
                            </div>

                            {/* RIGHT: OPPONENT (The Boss) */}
                            <div className="flex flex-col items-center">
                                <div className="relative mb-2">
                                    <img
                                        src={bestMatch.opponentAvatarUrl || defaultAvatar}
                                        alt={bestMatch.opponent}
                                        className="w-16 h-16 rounded-2xl border-4 border-red-500 object-cover shadow-md bg-black/20"
                                        onError={(e) => { (e.target as HTMLImageElement).src = defaultAvatar; }}
                                    />
                                    {/* "Defeated" X mark */}
                                    <div className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full border-2 border-[#262421] shadow-sm">
                                        <Swords size={12} />
                                    </div>
                                </div>
                                <span className="text-white font-bold text-xs truncate max-w-[80px] text-center">{bestMatch.opponent}</span>
                                <span className="text-red-400 font-mono text-xs font-bold">{bestMatch.opponentElo}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 3. "VICTORY" BANNER */}
                <motion.div variants={itemVariants} className="z-10 mb-2">
                    <div className="bg-[#81b64c] text-white font-black text-lg px-8 py-1 rounded-full shadow-[0_4px_0_#4a6e25] border-2 border-[#a3d66b]">
                        VICTORY
                    </div>
                </motion.div>

                {/* 4. ANALYZE BUTTON */}
                <motion.div variants={itemVariants} className="w-full px-6 z-10">
                    <a
                        href={bestMatch.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-[#3e3c39] hover:bg-[#4a4845] text-[#989795] hover:text-white font-bold rounded-xl border-2 border-[#52504d] transition-all group"
                    >
                        <Share2 size={18} className="group-hover:scale-110 transition-transform" />
                        Analyze Match
                    </a>
                </motion.div>
            </motion.div>
        </StoryCard>
    );
}