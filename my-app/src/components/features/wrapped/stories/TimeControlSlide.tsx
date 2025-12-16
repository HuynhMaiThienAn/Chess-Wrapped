'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Clock, Zap, Trophy, TrendingUp } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import StoryCard from '@/components/ui/StoryCard';
import { StoryBackground, containerVariants, itemVariants, CONTAINERS, TYPOGRAPHY } from './shared';
import { useChessStats } from '@/context/ChessContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
        return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
};

const getTimeControlIcon = (tc: string) => {
    switch (tc.toLowerCase()) {
        case 'bullet': return <Zap size={16} />;
        case 'blitz': return <Clock size={16} />;
        case 'rapid': return <Clock size={16} />;
        case 'daily': return <Clock size={16} />;
        default: return <Clock size={16} />;
    }
};

const COLORS = ['#81b64c', '#ffc800', '#ebecd0', '#ca3431'];

export default function TimeControlSlide() {
    const { stats: data } = useChessStats();
    const [shouldRenderChart, setShouldRenderChart] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShouldRenderChart(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const breakdown = data.timeControlBreakdown || [];

    const pieData = useMemo(() => {
        return breakdown.map(tc => ({
            name: tc.timeControl,
            value: tc.games
        }));
    }, [breakdown]);

    const barData = useMemo(() => {
        return breakdown.map(tc => ({
            timeControl: tc.timeControl,
            winRate: tc.winRate,
            games: tc.games
        }));
    }, [breakdown]);

    const mostPlayed = breakdown[0] || null;
    const bestWinRate = useMemo(() => {
        return breakdown.reduce((best, tc) => 
            tc.winRate > (best?.winRate || 0) ? tc : best, breakdown[0] || null
        );
    }, [breakdown]);

    if (breakdown.length === 0) {
        return (
            <StoryCard id="slide-time-control" className={CONTAINERS.slideCard}>
                <StoryBackground>
                    <div className="absolute top-10 left-10 text-white opacity-5">
                        <Clock size={60} />
                    </div>
                </StoryBackground>
                <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div variants={itemVariants} className="text-center">
                        <Clock size={48} className="text-[#989795] mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">Time Control Breakdown</h2>
                        <p className={TYPOGRAPHY.comment}>No time control data available</p>
                    </motion.div>
                </motion.div>
            </StoryCard>
        );
    }

    return (
        <StoryCard id="slide-time-control" className={CONTAINERS.slideCard}>
            <StoryBackground>
                <div className="absolute top-10 left-10 text-white opacity-5">
                    <Clock size={60} />
                </div>
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">
                {/* Header */}
                <motion.div variants={itemVariants} className="w-full flex justify-start items-center px-4 mb-2 z-10">
                    <div className="bg-white rounded-full shadow-lg mr-3">
                        <img
                            src={data.avatarUrl}
                            alt={data.username}
                            className="w-12 h-12 rounded-full object-cover border-4 border-[#81b64c]"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-white drop-shadow-md">
                        Time Control Stats
                    </h2>
                </motion.div>

                {/* Most Played Highlight */}
                {mostPlayed && (
                    <motion.div variants={itemVariants} className="w-full px-6 mb-3 z-10">
                        <div className="bg-[#262421] border-2 border-[#ffc800] rounded-2xl p-4 flex items-center gap-4 shadow-[0_4px_0_#b38b00]">
                            <div className="bg-[#ffc800] p-3 rounded-xl text-[#302e2b]">
                                <Trophy size={28} fill="currentColor" />
                            </div>
                            <div className="flex flex-col text-left flex-1">
                                <span className="text-[#989795] font-bold text-[10px] uppercase tracking-widest">
                                    Most Played
                                </span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-black text-white leading-none">
                                        {mostPlayed.timeControl}
                                    </span>
                                    <span className="text-[#989795] text-sm">
                                        {mostPlayed.games} games
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Pie Chart - Game Distribution */}
                {shouldRenderChart && pieData.length > 0 && (
                    <motion.div
                        variants={itemVariants}
                        className="w-full h-40 mb-3 z-10 bg-[#262421] rounded-2xl border border-[#3e3c39] p-2"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                                    outerRadius={60}
                                    fill="#8884d8"
                                    dataKey="value"
                                    animationBegin={0}
                                    animationDuration={1000}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </motion.div>
                )}

                {/* Win Rate Bar Chart */}
                {shouldRenderChart && barData.length > 0 && (
                    <motion.div
                        variants={itemVariants}
                        className="w-full h-32 mb-3 z-10 bg-[#262421] rounded-2xl border border-[#3e3c39] p-2"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#3e3c39" />
                                <XAxis 
                                    dataKey="timeControl" 
                                    stroke="#989795"
                                    tick={{ fill: '#989795', fontSize: 10 }}
                                />
                                <YAxis 
                                    stroke="#989795"
                                    tick={{ fill: '#989795', fontSize: 10 }}
                                    domain={[0, 100]}
                                />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1f1d1a', border: '1px solid #ffc800', borderRadius: '8px' }}
                                    formatter={(value: number) => `${value}%`}
                                />
                                <Bar dataKey="winRate" fill="#81b64c" radius={[4, 4, 0, 0]}>
                                    {barData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                )}

                {/* Detailed Stats List */}
                <motion.div variants={itemVariants} className="w-full px-6 flex flex-col gap-2 z-10 mb-2 max-h-[180px] overflow-y-auto">
                    {breakdown.map((tc, idx) => (
                        <motion.div
                            key={tc.timeControl}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className="bg-[#262421] border border-[#3e3c39] rounded-xl p-3"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="text-[#ffc800]">
                                        {getTimeControlIcon(tc.timeControl)}
                                    </div>
                                    <span className="text-white font-bold text-sm">{tc.timeControl}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-[#81b64c] font-black text-lg">{tc.winRate}%</span>
                                    <span className="text-[#989795] text-xs ml-2">win rate</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                                <div>
                                    <span className="text-[#989795]">Games: </span>
                                    <span className="text-white font-bold">{tc.games}</span>
                                </div>
                                <div>
                                    <span className="text-[#989795]">Peak Elo: </span>
                                    <span className="text-white font-bold">{tc.peakElo || 'N/A'}</span>
                                </div>
                                <div>
                                    <span className="text-[#989795]">Avg Time: </span>
                                    <span className="text-white font-bold">{formatDuration(tc.averageGameDuration)}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer Comment */}
                {bestWinRate && (
                    <motion.div variants={itemVariants} className="z-10 mt-2">
                        <div className={TYPOGRAPHY.comment}>
                            Best win rate in {bestWinRate.timeControl} ({bestWinRate.winRate}%)!
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </StoryCard>
    );
}

