'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { LucideIcon } from 'lucide-react';
import StoryCard from '@/components/shared/StoryCard';
import { StoryBackground, containerVariants, itemVariants, CONTAINERS } from '../stories/shared';
import { useChessStats } from '@/context/ChessContext';

interface ChartItem {
    name: string;
    count: number;
    [key: string]: any;
}

interface StatsSlideProps {
    id: string;
    title: React.ReactNode;
    icon: LucideIcon;
    iconColor: string;
    data: ChartItem[];
    colors: string[];
    totalLabel: string;
}

/**
 * Generic slide component for displaying statistical breakdowns (Win/Loss/Draw)
 * using a Pie Chart and a list legend.
 */
export default function StatsSlide({
    id,
    title,
    icon: Icon,
    iconColor,
    data: rawData,
    colors,
    totalLabel
}: StatsSlideProps) {
    const { stats } = useChessStats();

    // Filter out zero-count items
    const chartData = (rawData || []).filter(d => d.count > 0);
    const total = chartData.reduce((acc, curr) => acc + curr.count, 0);

    if (total === 0) return null;

    const topItem = chartData[0];
    const topPercentage = ((topItem.count / total) * 100).toFixed(0);

    return (
        <StoryCard id={id} className={CONTAINERS.slideCard}>
            <StoryBackground>
                <div className={`absolute top-10 right-10 opacity-10 ${iconColor}`}>
                    <Icon size={60} />
                </div>
            </StoryBackground>

            <motion.div
                className={CONTAINERS.slideContainer}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header Section: Avatar & Title */}
                <motion.div variants={itemVariants} className="w-full flex flex-col justify-start items-center px-4 mb-2 z-10 -mt-2">
                    <div className="flex items-center justify-center w-full mb-1">
                        <div className="bg-white rounded-full shadow-lg mr-3">
                            <img
                                src={stats.avatarUrl}
                                alt={stats.username}
                                className="w-14 h-14 rounded-full object-cover border-4 border-[#81b64c]"
                            />
                        </div>
                        <h2 className="text-2xl font-black text-white drop-shadow-md leading-none">
                            {title}
                        </h2>
                    </div>
                    <p className="text-[#989795] font-bold text-s uppercase tracking-widest mt-3">
                        {totalLabel}: {total.toLocaleString()}
                    </p>
                </motion.div>

                {/* Chart Section */}
                <motion.div variants={itemVariants} className="w-full h-[260px] relative z-10 -my-5">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={4}
                                dataKey="count"
                                stroke="none"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#262421',
                                    border: '1px solid #3e3c39',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                                itemStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                                formatter={(value: number) => [`${value} games`, 'Count']}
                            />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Label */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <div className="text-2xl font-black text-white">
                            {topPercentage}%
                        </div>
                        <div className="text-[9px] text-[#989795] font-bold uppercase truncate max-w-[100px]">
                            by {topItem.name}
                        </div>
                    </div>
                </motion.div>

                {/* Legend List */}
                <motion.div variants={itemVariants} className="w-full px-6 mt-3 flex flex-col gap-1.5 z-10 overflow-hidden max-h-[160px] pb-4 custom-scrollbar">
                    {chartData.map((item, idx) => (
                        <div key={item.name} className="flex justify-between items-center text-xs py-1 px-2 bg-[#262421] rounded-md border border-[#3e3c39]">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-2 h-2 rounded-full shadow-sm"
                                    style={{ backgroundColor: colors[idx % colors.length] }}
                                />
                                <span className="text-white font-bold text-[10px] uppercase tracking-wide">
                                    by {item.name}
                                </span>
                            </div>
                            <span className="text-[#989795] font-mono text-[10px]">
                                {item.count} <span className="opacity-50">({((item.count / total) * 100).toFixed(1)}%)</span>
                            </span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </StoryCard>
    );
}
