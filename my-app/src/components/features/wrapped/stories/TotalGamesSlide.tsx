'use client';

import { Clock, Rocket, Zap, Swords, Hourglass } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import StoryCard from '@/components/ui/StoryCard';
import { StoryBackground, containerVariants, itemVariants, CONTAINERS, TYPOGRAPHY } from './shared';
import { useChessStats } from '@/context/ChessContext';

// 1. Faster CountUp Component
const CountUpNumber = ({ value }: { value: number }) => {
    const motionValue = useMotionValue(0);
    const spring = useSpring(motionValue, { stiffness: 200, damping: 20 });
    const display = useTransform(spring, (latest) => Math.round(latest).toLocaleString());

    useEffect(() => {
        motionValue.set(0);
        const timer = setTimeout(() => {
            motionValue.set(value);
        }, 100);
        return () => clearTimeout(timer);
    }, [motionValue, value]);

    return <motion.span>{display}</motion.span>;
};

const getTimeComment = (hours: number) => {
    if (hours < 10) return "What?";
    if (hours < 30) return "That's it?";
    if (hours < 50) return "Really :p";
    if (hours < 60) return "Not bad";
    if (hours < 70) return "Bare minimum";
    if (hours < 80) return "Average :)";
    if (hours < 90) return "Above average :D";
    if (hours < 100) return "Bro is locked in :D";
    if (hours < 150) return "Impressive :>";
    if (hours < 200) return "Krazy";
    if (hours < 300) return "How =))??";
    return "Go touch grass bro :b";
};

const RANK_COLORS = ['#81b64c', '#989795', '#ca3431'];

export default function TotalGamesSlide() {
    const { stats: data } = useChessStats();

    // --- 1. CALCULATE WIN/LOSS/DRAW DATA ---
    const total = data.totalGames > 0 ? data.totalGames : 1;
    const winPct = ((data.wins / total) * 100).toFixed(1);
    const drawPct = ((data.draws / total) * 100).toFixed(1);
    const lossPct = ((data.losses / total) * 100).toFixed(1);

    const winW = parseFloat(winPct) > 0 ? `${Math.max(parseFloat(winPct), 2)}%` : '0%';
    const drawW = parseFloat(drawPct) > 0 ? `${Math.max(parseFloat(drawPct), 2)}%` : '0%';

    // --- 2. CALCULATE VARIANT DATA (SORTED) ---
    const getVariantCount = (name: string) => data.gamesByVariant.find(v => v.name === name)?.count || 0;

    const variants = [
        { name: 'Blitz', count: getVariantCount('Blitz') },
        { name: 'Rapid', count: getVariantCount('Rapid') },
        { name: 'Bullet', count: getVariantCount('Bullet') },
    ];

    // Sort descending by count (Largest -> Smallest)
    const sortedVariants = variants.sort((a, b) => b.count - a.count);

    const variantTotal = sortedVariants.reduce((sum, v) => sum + v.count, 0) || 1;

    // Calculate dynamic widths and labels based on sorted order
    const first = sortedVariants[0];
    const second = sortedVariants[1];
    const third = sortedVariants[2];

    const firstPct = ((first.count / variantTotal) * 100).toFixed(1);
    const secondPct = ((second.count / variantTotal) * 100).toFixed(1);
    const thirdPct = ((third.count / variantTotal) * 100).toFixed(1);

    // Widths
    const firstW = parseFloat(firstPct) > 0 ? `${Math.max(parseFloat(firstPct), 2)}%` : '0%';
    const secondW = parseFloat(secondPct) > 0 ? `${Math.max(parseFloat(secondPct), 2)}%` : '0%';

    const color1 = RANK_COLORS[0];
    const color2 = RANK_COLORS[1];
    const color3 = RANK_COLORS[2];

    return (
        <StoryCard id="slide-games" className={CONTAINERS.slideCard}>
            <StoryBackground>
                <div className="absolute top-10 left-10 text-white opacity-5 animate-float"><Swords size={60} /></div>
                <div className="absolute bottom-10 right-10 text-white opacity-5 animate-float" style={{ animationDelay: '3s' }}><Zap size={50} /></div>
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">

                {/* Header */}
                <motion.div variants={itemVariants} className="w-full flex justify-start items-center px-4 mb-2 z-10">
                    <div className=" bg-white rounded-full shadow-lg mr-3">
                        <img
                            src={data.avatarUrl}
                            alt={data.username}
                            className="w-20 h-15 rounded-full object-cover border-4 border-[#81b64c]"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-white drop-shadow-md">
                        Total Games Played
                    </h2>
                </motion.div>

                {/* --- MAIN CONTENT AREA --- */}
                <div className="w-full px-6 flex flex-col gap-6 z-10">

                    {/* 1. BIG TOTAL NUMBER */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center justify-center py-2">
                        <span className="text-7xl font-black text-white leading-none drop-shadow-xl">
                            <CountUpNumber value={data.totalGames} />
                        </span>
                        <span className="text-[#989795] font-bold text-sm uppercase tracking-widest mt-2">
                            Total Games
                        </span>
                    </motion.div>

                    {/* 2. BAR CHART: PERFORMANCE (Win/Draw/Loss) */}
                    <motion.div variants={itemVariants} className="w-full">
                        <div className="flex justify-between items-end mb-1 text-xs">
                            <div className="text-left">
                                <div className="text-[#81b64c] font-black text-lg">{winPct}%</div>
                                <div className="text-[#989795] font-bold text-[10px] uppercase">{data.wins.toLocaleString()} Won</div>
                            </div>
                            <div className="text-center">
                                <div className="text-[#989795] font-black text-lg">{drawPct}%</div>
                                <div className="text-[#52525b] font-bold text-[10px] uppercase">{data.draws.toLocaleString()} Drawn</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[#ca3431] font-black text-lg">{lossPct}%</div>
                                <div className="text-[#989795] font-bold text-[10px] uppercase">{data.losses.toLocaleString()} Lost</div>
                            </div>
                        </div>

                        <div className="w-full h-4 bg-[#262421] rounded-full flex overflow-hidden border border-[#3e3c39] mb-1">
                            <motion.div initial={{ width: 0 }} animate={{ width: winW }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-[#81b64c]" />
                            <motion.div initial={{ width: 0 }} animate={{ width: drawW }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-[#989795]" />
                            <motion.div initial={{ width: 0 }} animate={{ flex: 1 }} transition={{ duration: 1, delay: 0.6 }} className="h-full bg-[#ca3431]" />
                        </div>
                    </motion.div>
                </div>

                {/* Footer Comment */}
                <motion.div variants={itemVariants} className="z-10 ">
                    <div className={TYPOGRAPHY.comment}>
                        <Hourglass size={15} className="inline mr-2 -mt-1" />
                        You have played for {data.totalHours} hours. {getTimeComment(data.totalHours)}
                    </div>
                </motion.div>

            </motion.div>
        </StoryCard>
    );
}