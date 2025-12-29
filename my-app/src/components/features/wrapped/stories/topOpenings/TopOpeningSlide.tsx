'use client';

import { motion } from 'framer-motion';
import { Swords, Castle, Target } from 'lucide-react';
import { useRef, useEffect, useState } from 'react'; // Added hooks
import StoryCard from '@/components/ui/StoryCard';
import { StoryBackground, containerVariants, itemVariants, CONTAINERS, TYPOGRAPHY } from '../shared';
import { useChessStats } from '@/context/ChessContext';

// Colors for the bars
const COLORS = ['#81b64c', '#ffc800', '#ebecd0', '#ca3431', '#7c7b79', '#3e3c39'];

const getOpeningComment = (openingName: string) => {
    const name = openingName.toLowerCase();

    if (name.includes('sicilian')) return "Aggressive play style >:)";
    if (name.includes('london')) return "PLs play Queen Gambit instead (me see London me resign)";
    if (name.includes('caro')) return "Did you sac a rook yet? :)";
    if (name.includes('french')) return "You love counter attack, don't u?";
    if (name.includes('italian')) return "You love theory moves :>";
    if (name.includes('king\'s indian')) return "You love solid position, don't u?";
    if (name.includes('scandinavian')) return "me see pawn me take :D";

    return "A unique style that only u played :D";
};

// 👇 1. New Helper Component: Auto-Scales text to fit width
const AutoFitText = ({ text }: { text: string }) => {
    const textRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const resizeText = () => {
            const container = containerRef.current;
            const txt = textRef.current;
            if (!container || !txt) return;

            // Reset scale to measure natural size
            txt.style.transform = 'scale(1)';

            const containerWidth = container.clientWidth;
            const textWidth = txt.scrollWidth;

            if (textWidth > containerWidth) {
                setScale(containerWidth / textWidth);
            } else {
                setScale(1);
            }
        };

        // Run initially and on resize
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

export default function TopOpeningSlide() {
    const { stats: data } = useChessStats();

    // 1. Merge & Sort
    const allOpenings = [
        ...data.topOpeningsWhite,
        ...data.topOpeningsBlack
    ].sort((a, b) => b.count - a.count);

    // 2. Prepare Data
    const top5 = allOpenings.slice(0, 5);
    const totalGames = data.totalGames || 1;

    const chartData = top5.map(op => ({
        name: op.name,
        value: op.count,
        percentOfTotal: (op.count / totalGames) * 100
    }));

    const topOpeningName = top5.length > 0 ? top5[0].name : "Unknown";

    const maxVal = chartData.length > 0 ? chartData[0].value : 1;

    return (
        <StoryCard id="slide-top-openings" className={CONTAINERS.slideCard}>
            <StoryBackground>
                <div className="absolute top-10 left-10 text-white opacity-5"><Swords size={50} /></div>
                <div className="absolute bottom-10 right-10 text-white opacity-5"><Target size={40} /></div>
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">

                {/* 1. Header */}
                <motion.div variants={itemVariants} className="w-full flex justify-start items-center px-4 mb-4 z-10">
                    <div className="bg-white rounded-full shadow-lg mr-3">
                        <img
                            src={data.avatarUrl}
                            alt={data.username}
                            className="w-14 h-12 rounded-full object-cover border-4 border-[#81b64c]"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-white drop-shadow-md">
                        Favorite Openings
                    </h2>
                </motion.div>

                {/* 2. Horizontal Bar Graph */}
                <motion.div
                    variants={itemVariants}
                    className="w-full px-1 flex flex-col gap-4 z-10 mb-2 overflow-hidden max-h-[350px]"
                >
                    {chartData.map((item, idx) => {
                        // Calculate width relative to your #1 opening
                        let relativeWidth = (item.value / maxVal) * 100;
                        if (relativeWidth > 100) relativeWidth = 100;

                        return (
                            <div key={idx} className="w-full">
                                {/* Label Row */}
                                <div className="flex justify-between items-end mb-1 w-full">
                                    <div className="flex-1 min-w-0 mr-2">
                                        <AutoFitText text={item.name} />
                                    </div>

                                    <span className="text-[#989795] text-[10px] font-mono whitespace-nowrap shrink-0">
                                        {item.value} <span className="opacity-50">({item.percentOfTotal.toFixed(1)}%)</span>
                                    </span>
                                </div>

                                {/* Bar Container */}
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
                            No opening data found.
                        </div>
                    )}
                </motion.div>

                <motion.div variants={itemVariants} className="z-10 px-4 mb-2 mt-3">
                    <div className={TYPOGRAPHY.comment}>
                        "{getOpeningComment(topOpeningName)}"
                    </div>
                </motion.div>

            </motion.div>
        </StoryCard>
    );
}