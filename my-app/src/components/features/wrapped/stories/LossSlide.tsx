'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Skull } from 'lucide-react';
import StoryCard from '@/components/ui/StoryCard';
import { StoryBackground, containerVariants, itemVariants, CONTAINERS } from './shared';
import { useChessStats } from '@/context/ChessContext';

const COLORS = [
    '#ca3431',
    '#f58b51',
    '#8b5cf6',
    '#3b82f6',
    '#facc15',
];

export default function LossSlide() {
    const { stats: data } = useChessStats();

    const chartData = (data.lossMethods || []).filter(d => d.count > 0);
    const total = chartData.reduce((acc, curr) => acc + curr.count, 0);

    if (total === 0) return null;

    return (
        <StoryCard id="slide-loss-methods" className={CONTAINERS.slideCard}>
            <StoryBackground>
                <div className="absolute top-10 right-10 opacity-10 text-[#ca3431]">
                    <Skull size={60} />
                </div>
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">

                <motion.div variants={itemVariants} className="w-full flex flex-col justify-start items-center px-4 mb-2 z-10 -mt-2">
                    <div className="flex items-center justify-center w-full mb-1">
                        <div className="bg-white rounded-full shadow-lg mr-3">
                            <img
                                src={data.avatarUrl}
                                alt={data.username}
                                className="w-14 h-14 rounded-full object-cover border-4 border-[#81b64c]"
                            />
                        </div>
                        <h2 className="text-3xl font-black text-white drop-shadow-md leading-none">How did<br/>you lose?</h2>
                    </div>
                    <p className="text-[#989795] font-bold text-s uppercase tracking-widest mt-5">Total Losses: {total.toLocaleString()}</p>
                </motion.div>

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

                <motion.div variants={itemVariants} className="w-full px-6 mt-3 flex flex-col gap-1.5 z-10 overflow-hidden max-h-[160px] pb-4">
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