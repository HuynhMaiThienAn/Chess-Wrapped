'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, ShieldAlert } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import StoryCard from '@/components/ui/StoryCard';
import { StoryBackground, containerVariants, itemVariants, CONTAINERS, TYPOGRAPHY } from './shared';
import { useChessStats } from '@/context/ChessContext';

const COLORS = ['#ca3431', '#d64a31', '#e06531', '#ea7e31', '#989795'];

// Helper to auto-scale text (Same as Opening Slide)
const AutoFitText = ({ text }: { text: string }) => {
    const textRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const resizeText = () => {
            const container = containerRef.current;
            const txt = textRef.current;
            if (!container || !txt) return;

            txt.style.transform = 'scale(1)';
            const containerWidth = container.clientWidth;
            const textWidth = txt.scrollWidth;

            if (textWidth > containerWidth) {
                setScale(containerWidth / textWidth);
            } else {
                setScale(1);
            }
        };

        resizeText();
        window.addEventListener('resize', resizeText);
        return () => window.removeEventListener('resize', resizeText);
    }, [text]);

    return (
        <div ref={containerRef} className="w-full overflow-hidden flex items-center">
            <span
                ref={textRef}
                className="text-white text-xs font-bold whitespace-nowrap origin-left transition-transform duration-200"
                style={{ transform: `scale(${scale})` }}
            >
                {text}
            </span>
        </div>
    );
};

export default function WorstOpeningSlide() {
    const { stats: data } = useChessStats();

    // 1. Merge White & Black Worst Openings
    const allWorst = [
        ...data.worstOpeningsWhite,
        ...data.worstOpeningsBlack
    ];

    // 2. Sort by Win Rate (Ascending: Lowest WR is "Worst")
    // If Win Rates are equal, prioritize ones with MORE games (higher count)
    allWorst.sort((a, b) => {
        if (a.winRate === b.winRate) return b.count - a.count;
        return a.winRate - b.winRate;
    });

    // 3. Take Top 5
    const top5Worst = allWorst.slice(0, 6);

    // 4. Prepare Chart Data
    // For "Worst" Openings, the Bar Width represents WIN RATE.
    // A small bar = Low Win Rate (Bad).
    const chartData = top5Worst.map(op => ({
        name: op.name,
        count: op.count,
        winRate: op.winRate
    }));

    const worstName = top5Worst.length > 0 ? top5Worst[0].name : "None";

    return (
        <StoryCard id="slide-worst" className={CONTAINERS.slideCard}>
            <StoryBackground>
                <div className="absolute top-10 right-10 text-red-500 opacity-5"><AlertTriangle size={60} /></div>
                <div className="absolute bottom-10 left-10 text-red-500 opacity-5"><ShieldAlert size={50} /></div>
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">

                {/* Header: Avatar + Title */}
                <motion.div variants={itemVariants} className="w-full flex justify-start items-center px-4 mb-4 z-10">
                    <div className=" bg-white rounded-full shadow-lg mr-3">
                        <img
                            src={data.avatarUrl}
                            alt={data.username}
                            className="w-12 h-12 rounded-full object-cover border-4 border-[#81b64c]"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-white drop-shadow-md">
                        Tough Battles
                    </h2>
                </motion.div>

                {/* Horizontal Bar Graph */}
                <motion.div
                    variants={itemVariants}
                    className="w-full px-6 flex flex-col gap-4 z-10 mb-2 overflow-y-auto max-h-[350px] custom-scrollbar"
                >
                    {chartData.map((item, idx) => {
                        // Bar Width = Win Rate.
                        // If WR is 0, give it 5% so it's visible.
                        let relativeWidth = Math.max(item.winRate, 5);

                        return (
                            <div key={idx} className="w-full">
                                <div className="flex justify-between items-end mb-1 w-full">
                                    <div className="flex-1 min-w-0 mr-2">
                                        <AutoFitText text={item.name} />
                                    </div>
                                    <span className="text-[#989795] text-[10px] font-mono whitespace-nowrap shrink-0">
                                        {item.count} games <span className="text-red-400 font-bold">({item.winRate}%)</span>
                                    </span>
                                </div>
                                <div className="w-full h-3 bg-[#262421] rounded-full overflow-hidden border border-[#3e3c39]">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${relativeWidth}%` }}
                                        transition={{ duration: 1, delay: 0.2 + (idx * 0.1), ease: "easeOut" }}
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                                    />
                                </div>
                            </div>
                        );
                    })}

                    {chartData.length === 0 && (
                        <div className="text-center text-[#989795] italic py-10">
                            No significant data found.
                        </div>
                    )}
                </motion.div>

                {/* Footer Comment */}
                <motion.div variants={itemVariants} className="z-10 px-4 mt-auto mb-2">
                    <div className={TYPOGRAPHY.comment}>
                        <TrendingDown size={18} className="inline mr-2 -mt-1 text-red-400" />
                        "Learn how to deal with these lines now :D"
                    </div>
                </motion.div>

            </motion.div>
        </StoryCard>
    );
}