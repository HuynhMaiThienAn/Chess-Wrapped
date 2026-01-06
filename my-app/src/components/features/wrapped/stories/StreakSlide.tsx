'use client';

import { motion } from 'framer-motion';
import { Flame, Heart, Swords, Trophy, Flag } from 'lucide-react';
import StoryCard from '@/components/ui/Card/StoryCard';
import { containerVariants, itemVariants } from '@/components/shared/animations';
import { CONTAINERS } from '@/components/shared/styles';
import { useChessStats } from '@/context/ChessContext';

export default function StreakSlide() {
    const { stats: data } = useChessStats();

    return (
        <StoryCard id="slide-streaks" className={CONTAINERS.slideCard}>


            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">

                {/* Header */}
                <motion.div variants={itemVariants} className="w-full flex justify-start items-center px-4 mb-6 z-10">
                    <div className="w-20 h-20 bg-white rounded-full shadow-lg mr-3 flex-shrink-0">
                        <img
                            src={data.avatarUrl}
                            alt={data.username}
                            className="w-20 h-20 rounded-full object-cover border-4 border-[#81b64c]"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-white drop-shadow-md">
                        Your Streak Summary
                    </h2>
                </motion.div>

                <div className="w-full px-6 flex flex-col gap-3 z-10">
                    {/* WIN STREAK */}
                    <motion.div variants={itemVariants} className="w-full bg-[#262421] rounded-xl p-4 border-2 border-[#3e3c39] shadow-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Flame className="text-[#81b64c]" size={24} fill="#81b64c" strokeWidth={2} />
                            <span className="text-white font-black text-base uppercase tracking-wider">Win Streak</span>
                        </div>
                        <div className="flex flex-col items-center justify-center py-2">
                            <div className="text-6xl font-black text-[#81b64c] leading-none drop-shadow-xl">
                                {data.longestWinStreak}
                            </div>
                            <span className="text-[#989795] text-xs uppercase tracking-wider mt-2">Games Won</span>
                        </div>
                    </motion.div>

                    {/* LOSS STREAK */}
                    <motion.div variants={itemVariants} className="w-full bg-[#262421] rounded-xl p-4 border-2 border-[#3e3c39] shadow-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Flag className="text-[#ca3431]" size={24} strokeWidth={2} />
                            <span className="text-white font-black text-base uppercase tracking-wider">Loss Streak</span>
                        </div>
                        <div className="flex flex-col items-center justify-center py-2">
                            <div className="text-6xl font-black text-[#ca3431] leading-none drop-shadow-xl">
                                {data.longestLossStreak}
                            </div>
                            <span className="text-[#989795] text-xs uppercase tracking-wider mt-2">Games Lost</span>
                        </div>
                    </motion.div>

                </div>

            </motion.div>
        </StoryCard>
    );
}
