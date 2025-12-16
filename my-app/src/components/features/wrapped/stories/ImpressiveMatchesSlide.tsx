'use client';

import { motion } from 'framer-motion';
import {Crown, Swords, Skull, ExternalLink, ChessKingIcon} from 'lucide-react';
import StoryCard from '@/components/ui/StoryCard';
import { StoryHeader, StoryBackground, containerVariants, itemVariants, CONTAINERS } from './shared';
import { useChessStats } from '@/context/ChessContext';

const defaultAvatar = 'https://www.chess.com/bundles/web/images/user-image.svg';

export default function ImpressiveMatchesSlide() {
    const { stats: data } = useChessStats();

    // Get Top 3
    const topMatches = data.impressiveMatches?.slice(0, 3) || [];

    if (topMatches.length === 0) return null;

    return (
        <StoryCard id="slide-impressive" className={CONTAINERS.slideCard}>

            {/* Background Layer */}
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
                    icon={<ChessKingIcon />}
                    iconColor="text-[#ffc800]"
                    title="Impressive Matches"
                />

                {/* 2. SCROLLABLE LIST OF 3 MATCHES */}
                <motion.div
                    variants={itemVariants}
                    className="w-full px-4 flex flex-col gap-4 z-10 overflow-y-auto max-h-[420px] custom-scrollbar pb-4"
                >
                    {topMatches.map((match, idx) => {
                        // Calculate user's Elo at that time
                        const userMatchElo = match.opponentElo - match.eloGap;

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2 }}
                                className="w-full bg-[#262421] border-2 border-[#3e3c39] rounded-2xl p-3 flex flex-col items-center shadow-lg relative overflow-hidden group hover:border-[#81b64c] transition-colors"
                            >
                                {/* Splatter Effect */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

                                <div className="flex items-center justify-between w-full relative z-10 gap-2">

                                    {/* LEFT: YOU */}
                                    <div className="flex flex-col items-center w-[30%]">
                                        <div className="relative mb-1">
                                            <img
                                                src={data.avatarUrl || defaultAvatar}
                                                alt="You"
                                                className="w-10 h-10 rounded-xl border-2 border-[#81b64c] object-cover shadow-sm bg-black/20"
                                                onError={(e) => { (e.target as HTMLImageElement).src = defaultAvatar; }}
                                            />
                                            {/* Winner Crown */}
                                            <div className="absolute -top-1.5 -left-1.5 bg-[#ffc800] text-[#262421] p-0.5 rounded-full border border-[#262421] shadow-sm">
                                                <Crown size={8} fill="currentColor" />
                                            </div>
                                        </div>
                                        <span className="text-white font-bold text-[10px] truncate w-full text-center">You</span>
                                        <span className="text-[#989795] font-mono text-[9px] font-bold">{userMatchElo}</span>
                                    </div>

                                    {/* CENTER: INFO */}
                                    <div className="flex flex-col items-center justify-center w-[40%]">
                                        <span className="text-[#ffc800] font-black text-xl italic leading-none">VS</span>
                                        <span className="text-[#81b64c] text-[10px] font-black bg-[#81b64c]/10 px-1.5 py-0.5 rounded mt-1 whitespace-nowrap">
                                            +{match.eloGap} ELO
                                        </span>
                                        <a
                                            href={match.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 text-[#989795] hover:text-white flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide group-hover:underline decoration-[#81b64c]"
                                        >
                                            View Game <ExternalLink size={8} />
                                        </a>
                                    </div>

                                    {/* RIGHT: OPPONENT */}
                                    <div className="flex flex-col items-center w-[30%]">
                                        <div className="relative mb-1">
                                            <img
                                                src={match.opponentAvatarUrl || defaultAvatar}
                                                alt={match.opponent}
                                                className="w-10 h-10 rounded-xl border-2 border-red-500 object-cover shadow-sm bg-black/20"
                                                onError={(e) => { (e.target as HTMLImageElement).src = defaultAvatar; }}
                                            />
                                            {/* Defeated Icon */}
                                            <div className="absolute -top-1.5 -right-1.5 bg-red-600 text-white p-0.5 rounded-full border border-[#262421] shadow-sm">
                                                <Swords size={8} />
                                            </div>
                                        </div>
                                        <span className="text-white font-bold text-[10px] truncate w-full text-center">{match.opponent}</span>
                                        <span className="text-red-400 font-mono text-[9px] font-bold">{match.opponentElo}</span>
                                    </div>

                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </motion.div>
        </StoryCard>
    );
}