'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, LineChart as LineChartIcon } from 'lucide-react';
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
import StoryCard from '@/components/ui/StoryCard';
import { StoryHeader, StoryBackground, containerVariants, itemVariants, CONTAINERS } from './shared';
import { useChessStats } from '@/context/ChessContext';

export default function EloGraphSlide() {
    const { stats: data } = useChessStats();

    // 1. Add state to delay chart rendering
    const [shouldRenderChart, setShouldRenderChart] = useState(false);

    // 2. Use Effect to set state to true after slide animation (~500ms)
    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldRenderChart(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const hasHistory = data.eloHistory && data.eloHistory.length > 0;

    const ratings = hasHistory ? data.eloHistory.map(e => e.rating) : [0];
    const peak = Math.max(...ratings, 0);
    const lowest = Math.min(...ratings, 0);
    const isPositive = data.eloChange >= 0;

    const yMin = Math.max(0, lowest - 100);
    const yMax = peak + 100;

    return (
        <StoryCard id="slide-elo" className={CONTAINERS.slideCard}>
            <StoryBackground>
                <div className="absolute top-10 left-10 text-white opacity-5 animate-float"><LineChartIcon size={60} /></div>
                <div className="absolute bottom-20 right-10 text-white opacity-5 animate-float" style={{ animationDelay: '2s' }}><TrendingUp size={50} /></div>
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">
                <StoryHeader
                    icon={<TrendingUp size={24} />}
                    iconColor={isPositive ? "text-[#81b64c]" : "text-red-500"}
                    title={`${data.mostPlayedVariant} Rating`}
                />

                <motion.div variants={itemVariants} className="w-full h-48 mb-6 relative z-10">
                    {hasHistory ? (
                        <div className="w-full h-full">
                            {/* 3. Only render ResponsiveContainer when shouldRenderChart is true */}
                            {shouldRenderChart && (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data.eloHistory} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3e3c39" />
                                        <XAxis
                                            dataKey="date"
                                            stroke="#989795"
                                            tick={{ fill: '#989795', fontSize: 10, fontWeight: 600 }}
                                            tickLine={false}
                                            axisLine={false}
                                            minTickGap={30}
                                        />
                                        <YAxis
                                            domain={[yMin, yMax]}
                                            stroke="#989795"
                                            tick={{ fill: '#989795', fontSize: 10, fontWeight: 600 }}
                                            tickLine={false}
                                            axisLine={false}
                                            width={40}
                                        />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#262421', border: '1px solid #3e3c39', borderRadius: '8px', color: '#fff' }}
                                            itemStyle={{ color: isPositive ? '#81b64c' : '#cc3333' }}
                                            formatter={(value: number) => [value, 'Rating']}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="rating"
                                            stroke={isPositive ? "#81b64c" : "#cc3333"}
                                            strokeWidth={3}
                                            dot={{ r: 0 }}
                                            activeDot={{ r: 6, fill: isPositive ? '#81b64c' : '#cc3333', stroke: '#fff' }}

                                            // Animation settings
                                            isAnimationActive={true}
                                            animationDuration={2000}
                                            animationEasing="ease-out"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg text-[#989795]">
                            No rating history available for visualization.
                        </div>
                    )}
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center justify-center gap-8 mb-6 w-full">
                    <div className="text-center">
                        <div className="text-[#989795] text-[10px] uppercase font-bold tracking-widest mb-1">Year Change</div>
                        <div className={`text-3xl font-black ${isPositive ? 'text-[#81b64c]' : 'text-red-500'}`}>
                            {data.eloChange > 0 ? '+' : ''}{data.eloChange}
                        </div>
                    </div>
                    <div className="w-px h-10 bg-[#3e3c39]"></div>
                    <div className="text-center">
                        <div className="text-[#989795] text-[10px] uppercase font-bold tracking-widest mb-1">Peak Rating</div>
                        <div className="text-3xl font-black text-white">{peak}</div>
                    </div>
                </motion.div>
            </motion.div>
        </StoryCard>
    );
}