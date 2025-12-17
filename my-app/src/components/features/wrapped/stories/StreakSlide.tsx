'use client';

import { motion } from 'framer-motion';
import {Flame, Snowflake, Calendar, Heart, Swords, Trophy, Flag} from 'lucide-react';
import StoryCard from '@/components/ui/StoryCard';
import { StoryBackground, containerVariants, itemVariants, CONTAINERS } from './shared';
import { useChessStats } from '@/context/ChessContext';

// Fire Animation (For Win Streak)
const AnimatedFire = () => (
    <div className="relative flex items-center justify-center">
        <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
            <Flame className="text-[#FF0000] relative z-10 drop-shadow-sm" size={24} fill="#FFAA33" />
        </motion.div>
    </div>
);

// Ice Animation (For Loss Streak)
const AnimatedIce = () => (
    <div className="relative flex items-center justify-center">
        <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
            <Flag className="text-[#ca3431] drop-shadow-sm" size={24} />
        </motion.div>
    </div>
);

// Sun/Day Animation (For Daily Streak)
const AnimatedDay = () => (
    <div className="relative flex items-center justify-center">
        <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
            <Calendar className="text-[#eab308] drop-shadow-sm" size={24} />
        </motion.div>
    </div>
);

export default function StreakSlide() {
    const { stats: data } = useChessStats();

    return (
        <StoryCard id="slide-streaks" className={CONTAINERS.slideCard}>
            <StoryBackground>
                <div className="absolute top-10 right-10 text-white opacity-5"><Heart size={60}/></div>
                <div className="absolute bottom-10 left-10 text-white opacity-5"><Swords size={50}/></div>
                <div className="absolute bottom-1/4 right-1/4 text-white opacity-5"><Trophy size={40}/></div>
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">

                {/* Header */}
                <motion.div variants={itemVariants} className="w-full flex flex-col justify-start items-center px-4 mb-4 z-10 -mt-10">
                    <div className="flex items-center justify-center w-full mb-1">
                        <div className="bg-white rounded-full shadow-lg mr-3">
                            <img
                                src={data.avatarUrl}
                                alt={data.username}
                                className="w-14 h-14 rounded-full object-cover border-4 border-[#81b64c]"
                            />
                        </div>
                        <h2 className="text-2xl font-black text-white drop-shadow-md leading-none">Your Streak<br/>Summary</h2>
                    </div>
                    <p className="text-[#989795] font-bold text-xs uppercase tracking-widest mt-1">Consistency Analysis</p>
                </motion.div>

                <div className="w-full px-1 flex flex-col gap-3 z-10">
                    {/* DAILY STREAK */}
                    <motion.div variants={itemVariants} className="w-full bg-[#eab308] rounded-xl p-1 shadow-lg">
                        <div className="bg-[#262421] rounded-lg p-3 flex items-center justify-between">
                            <div className="overflow-hidden">
                                <div className="flex items-center gap-3 mb-1">
                                    <AnimatedDay />
                                    {/* Changed truncate to whitespace-nowrap to ensure title is fully visible */}
                                    <span className="text-[#eab308] font-black text-sm uppercase tracking-wider whitespace-nowrap">Daily Streak</span>
                                </div>
                                <div className="text-white text-[10px] opacity-70 font-medium pl-1 truncate">Days Played in a Row</div>
                            </div>
                            <div className="text-4xl font-black text-white tabular-nums tracking-tight drop-shadow-md">
                                {data.longestDailyStreak}
                            </div>
                        </div>
                    </motion.div>

                    {/* WIN STREAK */}
                    <motion.div variants={itemVariants} className="w-full bg-[#81b64c] rounded-xl p-1 shadow-lg">
                        <div className="bg-[#262421] rounded-lg p-3 flex items-center justify-between">
                            <div className="overflow-hidden">
                                <div className="flex items-center gap-3 mb-1">
                                    <AnimatedFire />
                                    {/* Changed truncate to whitespace-nowrap */}
                                    <span className="text-[#81b64c] font-black text-sm uppercase tracking-wider whitespace-nowrap">Win Streak</span>
                                </div>
                                <div className="text-white text-[10px] opacity-70 font-medium pl-1 truncate">Longest Winning Run</div>
                            </div>
                            <div className="text-4xl font-black text-white tabular-nums tracking-tight drop-shadow-md">
                                {data.longestWinStreak}
                            </div>
                        </div>
                    </motion.div>

                    {/* LOSS STREAK */}
                    <motion.div variants={itemVariants} className="w-full bg-[#ca3431] rounded-xl p-1 shadow-lg">
                        <div className="bg-[#262421] rounded-lg p-3 flex items-center justify-between">
                            <div className="overflow-hidden">
                                <div className="flex items-center gap-3 mb-1">
                                    <AnimatedIce />
                                    {/* Changed truncate to whitespace-nowrap */}
                                    <span className="text-[#ca3431] font-black text-sm uppercase tracking-wider whitespace-nowrap">Loss Streak</span>
                                </div>
                                <div className="text-white text-[10px] opacity-70 font-medium pl-1 truncate">Longest losses</div>
                            </div>
                            <div className="text-4xl font-black text-white tabular-nums tracking-tight drop-shadow-md">
                                {data.longestLossStreak}
                            </div>
                        </div>
                    </motion.div>

                </div>

            </motion.div>
        </StoryCard>
    );
}