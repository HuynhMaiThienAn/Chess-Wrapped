'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Trophy } from 'lucide-react';
import StoryCard from '@/components/ui/Card/StoryCard';
import { StoryBackground } from '@/components/shared/layouts/StoryLayout';
import { containerVariants, itemVariants } from '@/components/shared/animations';
import { CONTAINERS } from '@/components/shared/styles';
import { useChessStats } from '@/context/ChessContext';
import SlideHeader from './shared/SlideHeader';

const COLORS = [
    '#81b64c',
    '#ffc800',
    '#2c8c99',
    '#9e5ec2',
    '#eb6b65',
];

export default function WinTerminationSlide() {
    const { stats: data } = useChessStats();

    const chartData = (data.winMethods || []).filter(d => d.count > 0);
    const total = chartData.reduce((acc, curr) => acc + curr.count, 0);

    if (total === 0) return null;

    return (
        <StoryCard id="slide-win-methods" className={CONTAINERS.slideCard}>
            <StoryBackground>
                <div className="absolute top-10 right-10 opacity-10 text-[#81b64c]">
                    <Trophy size={60} />
                </div>
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">

                <SlideHeader
                    avatarUrl={data.avatarUrl}
                    username={data.username}
                    title="How did you win?"
                    subtitle={`Total wins: ${total.toLocaleString()}`}
                />

                <motion.div variants={itemVariants} className="w-full h-[260px] relative z-10 -my-2">
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
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#262421', border: '1px solid #3e3c39', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                                formatter={(value: number) => [`${value} games`, 'Count']}
                            />
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <div className="text-2xl font-black text-white">
                            {((chartData[0].count / total) * 100).toFixed(0)}%
                        </div>
                        <div className="text-[9px] text-[#989795] font-bold uppercase truncate max-w-[100px]">
                            by {chartData[0].name}
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className={`${CONTAINERS.slideContent} mt-4 flex flex-col gap-1.5 overflow-hidden max-h-[160px] custom-scrollbar pb-4`}>
                    {chartData.map((item, idx) => (
                        <div key={item.name} className="flex justify-between items-center text-xs py-1 px-2 bg-[#262421] rounded-md border border-[#3e3c39]">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                                <span className="text-white font-bold text-[10px] uppercase tracking-wide">by {item.name}</span>
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