'use client';

import { motion } from 'framer-motion';
import { Target, TrendingUp, Award, AlertCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import StoryCard from '@/components/ui/StoryCard';
import { StoryBackground, containerVariants, itemVariants, CONTAINERS, TYPOGRAPHY } from './shared';
import { useChessStats } from '@/context/ChessContext';

// Animated accuracy meter component
const AccuracyMeter = ({ value, label, delay = 0 }: { value: number; label: string; delay?: number }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        setDisplayValue(0);
        const timer = setTimeout(() => {
            setDisplayValue(value);
        }, delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    const getColor = (acc: number) => {
        if (acc >= 80) return '#81b64c'; // Green
        if (acc >= 65) return '#ffc800'; // Yellow
        if (acc >= 50) return '#ebecd0'; // Light
        return '#ca3431'; // Red
    };

    const color = getColor(value);
    const percentage = Math.min(100, Math.max(0, value));

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-2">
                <span className="text-white text-sm font-bold">{label}</span>
                <motion.span 
                    className="text-white text-lg font-black" 
                    style={{ color }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.3 }}
                >
                    {Math.round(displayValue)}%
                </motion.span>
            </div>
            <div className="w-full h-4 bg-[#262421] rounded-full overflow-hidden border border-[#3e3c39]">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.5, delay: delay / 1000, ease: "easeOut" }}
                    style={{ backgroundColor: color }}
                    className="h-full rounded-full relative overflow-hidden"
                >
                    <motion.div
                        animate={{
                            x: ['-100%', '100%'],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                </motion.div>
            </div>
        </div>
    );
};

const getAccuracyComment = (accuracy: number) => {
    if (accuracy >= 85) return "Grandmaster level precision!";
    if (accuracy >= 75) return "Excellent accuracy!";
    if (accuracy >= 65) return "Solid play!";
    if (accuracy >= 55) return "Room for improvement";
    return "Keep practicing!";
};

export default function AccuracySlide() {
    const { stats: data } = useChessStats();

    const accuracyData = data.averageAccuracy || {};
    const bestTimeControl = data.bestTimeControl || null;
    const bestGame = data.bestAccuracyGame;
    const worstGame = data.worstAccuracyGame;

    // Prepare data for display
    const timeControls = useMemo(() => {
        return Object.entries(accuracyData)
            .map(([tc, acc]) => ({ timeControl: tc, accuracy: acc }))
            .sort((a, b) => b.accuracy - a.accuracy);
    }, [accuracyData]);

    const overallAverage = useMemo(() => {
        const values = Object.values(accuracyData);
        if (values.length === 0) return 0;
        return Math.round(values.reduce((sum, acc) => sum + acc, 0) / values.length);
    }, [accuracyData]);

    if (timeControls.length === 0) {
        return (
        <StoryCard id="slide-accuracy" className={CONTAINERS.slideCard}>
            <StoryBackground>
                <div className="absolute top-10 right-10 text-white opacity-5">
                    <Target size={60} />
                </div>
            </StoryBackground>
            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div variants={itemVariants} className="text-center">
                        <AlertCircle size={48} className="text-[#989795] mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">Accuracy Data</h2>
                        <p className={TYPOGRAPHY.comment}>Not enough accuracy data available</p>
                    </motion.div>
                </motion.div>
            </StoryCard>
        );
    }

    return (
        <StoryCard id="slide-accuracy" className={CONTAINERS.slideCard}>
            <StoryBackground>
                <div className="absolute top-10 right-10 text-white opacity-5">
                    <Target size={60} />
                </div>
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">
                {/* Header */}
                <motion.div variants={itemVariants} className="w-full flex justify-start items-center px-4 mb-4 z-10">
                    <div className="bg-white rounded-full shadow-lg mr-3">
                        <img
                            src={data.avatarUrl}
                            alt={data.username}
                            className="w-12 h-12 rounded-full object-cover border-4 border-[#81b64c]"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-white drop-shadow-md">
                        Move Accuracy
                    </h2>
                </motion.div>

                {/* Overall Average */}
                <motion.div variants={itemVariants} className="w-full px-6 mb-4 z-10">
                    <div className="bg-[#262421] border-2 border-[#ffc800] rounded-2xl p-4 flex items-center gap-4 shadow-[0_4px_0_#b38b00]">
                        <div className="bg-[#ffc800] p-3 rounded-xl text-[#302e2b]">
                            <TrendingUp size={28} fill="currentColor" />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-[#989795] font-bold text-[10px] uppercase tracking-widest">
                                Overall Average
                            </span>
                            <span className="text-4xl font-black text-white leading-none">
                                {overallAverage}%
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Accuracy Meters by Time Control */}
                <motion.div variants={itemVariants} className="w-full px-6 flex flex-col gap-4 z-10 mb-4">
                    {timeControls.map((tc, idx) => (
                        <motion.div
                            key={tc.timeControl}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                        >
                            <AccuracyMeter
                                value={tc.accuracy}
                                label={tc.timeControl}
                                delay={300 + idx * 100}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Best/Worst Games */}
                {(bestGame || worstGame) && (
                    <motion.div variants={itemVariants} className="w-full px-6 z-10">
                        <div className="grid grid-cols-2 gap-2">
                            {bestGame && (
                                <div className="bg-[#81b64c]/20 border-2 border-[#81b64c] rounded-xl p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Award size={16} className="text-[#81b64c]" />
                                        <span className="text-[#81b64c] text-xs font-bold">Best Game</span>
                                    </div>
                                    <div className="text-white font-black text-lg">{bestGame.accuracy}%</div>
                                    <div className="text-[#989795] text-[10px]">{bestGame.timeControl}</div>
                                </div>
                            )}
                            {worstGame && (
                                <div className="bg-[#ca3431]/20 border-2 border-[#ca3431] rounded-xl p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <AlertCircle size={16} className="text-[#ca3431]" />
                                        <span className="text-[#ca3431] text-xs font-bold">Worst Game</span>
                                    </div>
                                    <div className="text-white font-black text-lg">{worstGame.accuracy}%</div>
                                    <div className="text-[#989795] text-[10px]">{worstGame.timeControl}</div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Footer Comment */}
                {bestTimeControl && (
                    <motion.div variants={itemVariants} className="z-10 mt-2">
                        <div className={TYPOGRAPHY.comment}>
                            Best accuracy in {bestTimeControl}! {getAccuracyComment(accuracyData[bestTimeControl] || 0)}
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </StoryCard>
    );
}

