'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUp, ArrowDown, Minus, Crown } from 'lucide-react';
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';
import StoryCard from '@/components/ui/StoryCard';
import { StoryBackground, containerVariants, itemVariants, CONTAINERS } from './shared';
import { useChessStats } from '@/context/ChessContext';

// Helper for Peak Comment
const getPeakComment = (rating: number) => {
    if (rating < 800) return "Not bad :)";
    if (rating < 1200) return "Above average :D";
    if (rating < 1600) return "Half way to Grandmaster :D";
    if (rating < 2000) return "Impressive :D";
    if (rating < 2400) return "Krazy :)";
    return "The GOAT!!!";
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const RANK_COLORS = ['#81b64c', '#ffffff', '#ca3431']; // Green, White, Red

export default function EloGraphSlide() {
    const { stats: data } = useChessStats();
    const [shouldRenderChart, setShouldRenderChart] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShouldRenderChart(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const fullHistory = useMemo(() => {
        const rawHistory = data.eloHistory || [];
        return MONTHS.map((monthName, index) => {
            const existingData = rawHistory.find(h => h.monthIndex === index);
            return {
                date: monthName,
                monthIndex: index,
                Blitz: existingData?.Blitz ?? null,
                Rapid: existingData?.Rapid ?? null,
                Bullet: existingData?.Bullet ?? null,
            };
        });
    }, [data.eloHistory]);

    // --- 2. SORTING LOGIC (By Current Rating: Highest -> Lowest) ---
    const sortedModes = useMemo(() => {
        const modes = ['Blitz', 'Rapid', 'Bullet'] as const;

        // Find the latest valid rating for each mode
        const getLatestRating = (mode: string) => {
            for (let i = fullHistory.length - 1; i >= 0; i--) {
                const val = fullHistory[i][mode as 'Blitz' | 'Rapid' | 'Bullet'];
                if (val !== null && val !== undefined) return val;
            }
            return 0;
        };

        return [...modes].sort((a, b) => getLatestRating(b) - getLatestRating(a));
    }, [fullHistory]);

    // --- 3. STATS CALCULATION ---
    const getMinMax = (key: 'Blitz' | 'Rapid' | 'Bullet') => {
        const values = fullHistory.map(h => h[key]).filter(v => v !== null) as number[];
        if (values.length === 0) return { min: 0, max: 0 };
        return { min: Math.min(...values), max: Math.max(...values) };
    };

    const getChange = (key: 'Blitz' | 'Rapid' | 'Bullet') => {
        // @ts-ignore
        return data.eloChange?.[key] ?? 0;
    };

    const stats = {
        Blitz: { ...getMinMax('Blitz'), change: getChange('Blitz') },
        Rapid: { ...getMinMax('Rapid'), change: getChange('Rapid') },
        Bullet: { ...getMinMax('Bullet'), change: getChange('Bullet') },
    };

    const allRatings = fullHistory.flatMap(h => [h.Blitz, h.Rapid, h.Bullet]).filter(Number) as number[];
    const yMin = allRatings.length ? Math.max(0, Math.min(...allRatings) - 100) : 0;
    const yMax = allRatings.length ? Math.max(...allRatings) + 100 : 2000;

    const CustomLabel = (props: any) => {
        const { x, y, value, variantName } = props;
        const stat = stats[variantName as 'Blitz' | 'Rapid' | 'Bullet'];
        if (!stat || value === null) return null;

        const isMin = value === stat.min;
        const isMax = value === stat.max;

        if (!isMin && !isMax) return null;

        // Determine color based on rank
        const rankIndex = sortedModes.indexOf(variantName);
        const color = RANK_COLORS[rankIndex];

        let dy = 0;
        if (isMax) {
            // If it's a peak, default to UP, but stagger by rank
            dy = -10 - (2 - rankIndex) * 5;
        } else {
            // If it's a valley, default to DOWN, but stagger
            dy = 15 + rankIndex * 5;
        }

        return (
            <text
                x={x}
                y={y}
                dy={dy}
                fill={color}
                fontSize={9}
                fontWeight="900"
                textAnchor="middle"
                stroke="#262421" strokeWidth={3} paintOrder="stroke"
            >
                {value}
            </text>
        );
    };

    return (
        <StoryCard id="slide-elo" className={CONTAINERS.slideCard}>
            <StoryBackground>
                <div className="absolute top-10 left-10 text-white opacity-5 animate-float"><TrendingUp size={60} /></div>
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">

                {/* Header */}
                <motion.div variants={itemVariants} className="w-full flex justify-start items-center px-4 mb-2 z-10">
                    <div className=" bg-white rounded-full shadow-lg mr-3">
                        <img
                            src={data.avatarUrl}
                            alt={data.username}
                            className="w-12 h-12 rounded-full object-cover border-4 border-[#81b64c]"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-white drop-shadow-md">
                        Rating History
                    </h2>
                </motion.div>

                {/* Legend (Sorted by ELO) */}
                <motion.div variants={itemVariants} className="flex gap-4 mb-2 z-10 bg-[#262421] p-3 rounded-xl border border-[#3e3c39] shadow-lg">
                    {sortedModes.map((mode, index) => {
                        // 👇 UPDATED: Use the Year Change (Start vs End)
                        const deviation = stats[mode].change;

                        return (
                            <div key={mode} className="flex flex-col items-center">
                                <span className="text-[10px] font-bold uppercase mb-1" style={{ color: RANK_COLORS[index] }}>
                                    {mode}
                                </span>
                                <div className="flex items-center gap-1 text-white font-bold text-sm">
                                    {deviation > 0 ? (
                                        <ArrowUp size={14} className="text-[#81b64c]" /> // Green Up
                                    ) : deviation < 0 ? (
                                        <ArrowDown size={14} className="text-[#ca3431]" /> // Red Down
                                    ) : (
                                        <Minus size={14} className="text-[#989795]" /> // Grey Dash
                                    )}
                                    {Math.abs(deviation)}
                                </div>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Graph */}
                <motion.div
                    variants={itemVariants}
                    className="w-[100%] h-40 mb-2 relative z-10 bg-[#262421] rounded-2xl border border-[#3e3c39] p-2 shadow-inner"
                >
                    {shouldRenderChart && (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={fullHistory} margin={{ top: 15, right: 15, bottom: 0, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3e3c39" opacity={0.5} />
                                <XAxis
                                    dataKey="date"
                                    stroke="#989795"
                                    tick={{ fill: '#989795', fontSize: 9 }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={5}
                                    interval={0}
                                />
                                <YAxis
                                    domain={[yMin, yMax]}
                                    stroke="#989795"
                                    tick={{ fill: '#989795', fontSize: 9, fontWeight: 'bold' }}
                                    tickLine={false}
                                    axisLine={false}
                                    width={35}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f1d1a', border: '1px solid #ffc800', borderRadius: '8px' }}
                                    itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                                />
                                {/* Lines (Sorted) */}
                                {sortedModes.map((mode, index) => (
                                    <Line
                                        key={mode}
                                        type="monotone"
                                        dataKey={mode}
                                        stroke={RANK_COLORS[index]}
                                        strokeWidth={3}
                                        dot={{ r: 2, fill: RANK_COLORS[index], strokeWidth: 0 }}
                                        activeDot={{ 
                                            r: 6, 
                                            stroke: '#fff', 
                                            strokeWidth: 2,
                                            fill: RANK_COLORS[index],
                                            style: { filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.5))' }
                                        }}
                                        connectNulls
                                        animationDuration={1500}
                                        animationBegin={index * 200}
                                    >
                                        <LabelList content={(props: any) => <CustomLabel {...props} variantName={mode} />} />
                                    </Line>
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </motion.div>

                {/* Footer */}
                <motion.div variants={itemVariants} className="w-full px-6 z-10">
                    <div
                        className="bg-[#262421] border-2 border-[#ffc800] rounded-2xl p-4 flex items-center gap-4 shadow-[0_4px_0_#b38b00] relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none"/>
                        <div className="bg-[#ffc800] p-3 rounded-xl text-[#302e2b]">
                            <Crown size={28} fill="currentColor"/>
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-[#989795] font-bold text-[10px] uppercase tracking-widest">
                                Peak Rating
                            </span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-white leading-none">
                                    {/* @ts-ignore */}
                                    {data.peakElo || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 text-center">
                        <span className="text-[#ffc800] font-bold text-xs italic truncate max-w-[120px]">
                            {/* @ts-ignore */}
                            "{getPeakComment(data.peakElo || 0)}"
                        </span>
                    </div>
                </motion.div>

            </motion.div>
        </StoryCard>
    );
}