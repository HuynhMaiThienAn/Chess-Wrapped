'use client';

import { motion } from 'framer-motion';
import { Crown, Trophy, Sparkles, Star } from 'lucide-react';
import StoryCard from '@/components/ui/StoryCard';
import { itemVariants, containerVariants } from './shared/animations';
import { CONTAINERS, TYPOGRAPHY } from './shared/styles';
import { useChessStats } from '@/context/ChessContext';
import { StoryBackground } from './shared';

export default function WelcomeSlide() {
    const { stats: data } = useChessStats();

    const currentElo = data.eloHistory.length > 0
        ? data.eloHistory[data.eloHistory.length - 1].rating
        : 400;

    return (
        <StoryCard id="slide-welcome" className={CONTAINERS.slideCard}>

            <StoryBackground>
                {/* Extra decor specific to welcome slide */}
                <div className="absolute top-10 right-10 text-[#ffc800] opacity-20 rotate-12">
                    <Crown size={100} fill="currentColor" strokeWidth={0} />
                </div>
            </StoryBackground>

            <motion.div
                className={CONTAINERS.slideContainer}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* 1. Year Badge */}
                <motion.div variants={itemVariants} className="bg-[#ffc800] text-[#302e2b] px-4 py-1 rounded-full font-black text-sm mb-6 shadow-sm border-2 border-white/20 rotate-[-2deg]">
                    <Star size={14} className="inline mr-1 mb-0.5" fill="currentColor"/> 2025 WRAPPED
                </motion.div>

                {/* 2. Avatar Circle */}
                <motion.div variants={itemVariants} className="relative mb-6">
                    <div className="p-2 bg-white rounded-full shadow-lg rotate-3">
                        <img
                            src={data.avatarUrl}
                            alt={data.username}
                            className="w-32 h-32 rounded-full object-cover border-4 border-[#81b64c]"
                        />
                    </div>
                    {/* Rank Icon Badge */}
                    <div className="absolute -bottom-2 -right-2 bg-[#81b64c] text-white p-3 rounded-2xl border-4 border-white shadow-lg rotate-[-10deg]">
                        <Trophy size={24} fill="currentColor" />
                    </div>
                </motion.div>

                {/* 3. Username & Elo */}
                <motion.div variants={itemVariants} className="text-center w-full px-4 mb-2">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-md">
                        {data.username}
                    </h1>
                    <div className="inline-block bg-[#3e3c39] px-6 py-2 rounded-2xl border-2 border-[#ffffff10]">
                        <span className="text-[#989795] font-bold text-sm uppercase mr-2">Current Elo</span>
                        <span className="text-white font-black text-xl">{currentElo}</span>
                    </div>
                </motion.div>

                {/* 4. Fun Footer Comment */}
                <motion.div variants={itemVariants}>
                    <p className={TYPOGRAPHY.comment}>"Ready to see your stats?"</p>
                </motion.div>

            </motion.div>
        </StoryCard>
    );
}