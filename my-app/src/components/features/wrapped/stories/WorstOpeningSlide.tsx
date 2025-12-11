'use client';

import { motion } from 'framer-motion';
import { Skull, AlertTriangle, XCircle, ShieldAlert } from 'lucide-react';
import { OpeningStat } from '@/types';
import StoryCard from '@/components/ui/StoryCard';
import { StoryHeader, StoryBackground, containerVariants, itemVariants, CONTAINERS, TYPOGRAPHY } from './shared';
import { useChessStats } from '@/context/ChessContext';

// 👇 Helper: Compact Row for a single opening (Applied Chunky Style)
const WorstOpeningRow = ({ op }: { op: OpeningStat }) => (
    <motion.div
        variants={itemVariants}
        // Updated styling: Increased rounding, primary dark background, and chunky red shadow
        className="p-3 bg-[#262421] rounded-xl border-2 border-[#302e2b] flex flex-col justify-center shadow-[0_4px_0_#990000] hover:translate-y-0.5 hover:shadow-none transition-all mb-2 min-h-[60px]"

    >
        {/* Name: Full text, wrapping allowed */}
        <div className="text-white text-xs font-bold leading-tight text-left break-words whitespace-normal mb-1">
            {op.name}
        </div>
        {/* Stats */}
        <div className="flex justify-between items-center text-[10px] text-[#989795] font-mono">
            <span>{op.count} games</span>
            <span
                // Updated WR badge style to be more prominent and chunky
                className="text-red-400 font-bold bg-[#302e2b] border border-red-500/50 px-2 py-0.5 rounded-md shadow-inner"
            >
                {op.winRate}% WR
            </span>
        </div>
    </motion.div>
);

// 👇 Helper: Column List (Applied Chunky Style)
const WorstOpeningList = ({ title, list }: { title: string, list: OpeningStat[] }) => (
    <div className="flex-1 min-w-0 flex flex-col">
        <div
            // Updated header style: Larger font, thicker border, more rounding
            className="text-xs font-bold uppercase tracking-widest mb-3 text-center bg-[#211f1c] py-2 rounded-lg border-2 border-red-900/50 text-red-400 shadow-[0_2px_0_#262421]"
        >
            {title}
        </div>
        <div className="flex flex-col">
            {list.map((op) => (
                <WorstOpeningRow key={op.name} op={op} />
            ))}
            {list.length === 0 && (
                <div className="text-[#3e3c39] text-xs italic p-2 text-center">
                    No data found.
                </div>
            )}
        </div>
    </div>
);

export default function WorstOpeningSlide() {
    const { stats: data } = useChessStats();

    // Get top 3 worst for each color
    const worstWhite = data.worstOpeningsWhite.slice(0, 3);
    const worstBlack = data.worstOpeningsBlack.slice(0, 3);

    if (worstWhite.length === 0 && worstBlack.length === 0) return null;

    return (
        <StoryCard id="slide-worst" className={CONTAINERS.slideCard}>

            {/* Background Layer */}
            <StoryBackground>
                <div className="absolute top-10 right-10 text-red-500 opacity-10 animate-float" style={{ animationDelay: '0s' }}><Skull size={80} /></div>
                <div className="absolute bottom-10 left-10 text-red-500 opacity-10 animate-float" style={{ animationDelay: '2s' }}><ShieldAlert size={60} /></div>
                <div className="absolute top-1/2 left-4 text-red-500 opacity-10 animate-float" style={{ animationDelay: '4s' }}><XCircle size={40} /></div>
            </StoryBackground>

            {/* Content Layer */}
            <motion.div
                className={CONTAINERS.slideContainer}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <StoryHeader
                    icon={<AlertTriangle size={24}/>}
                    iconColor="text-red-500" // Use a strong red accent
                    title="Openings you struggled against"
                />

                {/* 2-Column Layout (Updated Divider and Spacing) */}
                <div className="w-full flex gap-3 text-left items-stretch px-4 mt-2 z-10"> {/* Increased px-2 to px-4 */}
                    <WorstOpeningList title="AS WHITE" list={worstWhite} />

                    {/* Vertical Divider: Made bolder to match theme */}
                    <div className="w-1 bg-[#3e3c39] opacity-70 my-1"></div>

                    <WorstOpeningList title="AS BLACK" list={worstBlack} />
                </div>


            </motion.div>
        </StoryCard>
    );
}