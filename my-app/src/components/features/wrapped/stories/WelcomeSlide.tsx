'use client';

import { motion } from 'framer-motion';
import { Crown, Trophy, Sparkles } from 'lucide-react';
import { UserData } from '@/types';
import StoryCard from '@/components/ui/StoryCard';
import { itemVariants, containerVariants } from './shared/animations';
import { CONTAINERS, TYPOGRAPHY } from './shared/styles';

const getEloTheme = (currentElo: number) => {
    if (currentElo >= 2000) return {
        color: '#b589ff',
        label: 'Elite Tier',
        icon: <Crown size={18} fill="currentColor" />,
        message: '"You have mastered the chaos of the board."'
    };
    if (currentElo > 1000) return {
        color: '#ffc800',
        label: 'Seasoned Tactician',
        icon: <Trophy size={16} fill="currentColor" />,
        message: '"Tactics flow through you."'
    };
    return {
        color: '#a1a1aa',
        label: 'Rising Star',
        icon: <Sparkles size={16} fill="currentColor" />,
        message: '"Every Grandmaster began as a beginner."'
    };
};

export default function WelcomeSlide({ data }: { data: UserData }) {
    const currentElo = data.eloHistory.length > 0
        ? data.eloHistory[data.eloHistory.length - 1].rating
        : 400;

    const theme = getEloTheme(currentElo);

    return (
        <StoryCard id="slide-welcome" className={CONTAINERS.slideCard}>
            <motion.div
                className={CONTAINERS.slideContainer}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Avatar */}
                <motion.div variants={itemVariants} className="relative mb-8 group">
                    <div className="absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse" style={{ backgroundColor: theme.color }} />
                    <div className="relative">
                        <img
                            src={data.avatarUrl}
                            alt={data.username}
                            className="w-36 h-36 rounded-full border-[6px] object-cover shadow-2xl"
                            style={{ borderColor: theme.color }}
                        />
                        <div className="absolute -bottom-1 -right-1 p-2 rounded-full border-[4px] border-[#262421] bg-[#262421] text-white">
                            <div style={{ color: theme.color }}>{theme.icon}</div>
                        </div>
                    </div>
                </motion.div>

                {/* Typography */}
                <motion.div variants={itemVariants} className="text-center w-full px-4 mb-6">
                    <div className="inline-block px-3 py-1 rounded-full bg-[#262421] border border-[#3e3c39] text-[#989795] text-[10px] font-bold uppercase tracking-widest mb-4 shadow-lg">
                        {data.year} Chess Wrapped
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none break-words drop-shadow-2xl">
                        {data.username}
                    </h1>

                    <div className="mt-3 flex flex-col items-center gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-90" style={{ color: theme.color }}>
                            {theme.label}
                        </span>
                        <span className="text-white font-black text-2xl tracking-tighter">
                            {currentElo} <span className="text-xs font-bold text-[#989795] align-middle">ELO</span>
                        </span>
                    </div>
                </motion.div>

                {/* Message */}
                <motion.div variants={itemVariants} className={TYPOGRAPHY.cardMessage}>
                    <p className={TYPOGRAPHY.comment}>{theme.message}</p>
                </motion.div>

            </motion.div>
        </StoryCard>
    );
}