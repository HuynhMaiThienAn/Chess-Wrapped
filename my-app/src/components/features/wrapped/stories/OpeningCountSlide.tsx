'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, Swords, Castle } from 'lucide-react';
import { UserData } from '@/types';
import StoryCard from '@/components/ui/StoryCard';
import { StoryHeader, StoryBackground, containerVariants, itemVariants, CONTAINERS, TYPOGRAPHY } from './shared';

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#262421] border border-[#3e3c39] p-2 rounded-lg shadow-xl text-center z-50">
                <p className="text-white font-bold text-xs">{payload[0].name}</p>
                <p className="text-[#81b64c] font-black text-[10px]">{payload[0].value} variants</p>
            </div>
        );
    }
    return null;
};

export default function OpeningCountSlide({ data }: { data: UserData }) {
    // Only count unique if > 0
    const w = data.uniqueWhiteVariants || 0;
    const b = data.uniqueBlackVariants || 0;
    const total = w + b;

    const chartData = [
        { name: 'As White', value: w, color: '#ebecd0' },
        { name: 'As Black', value: b, color: '#779556' }
    ];

    return (
        <StoryCard id="slide-repertoire" className={CONTAINERS.slideCard}>

            <StoryBackground>
                <div className="absolute top-4 left-4 text-white opacity-5"><Swords size={50} /></div>
                <div className="absolute bottom-4 right-4 text-white opacity-5"><Castle size={50} /></div>
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">
                <StoryHeader
                    icon={<Shield size={24}/>}
                    iconColor="text-[#81b64c]"
                    title={total.toString()}
                    subtitle="Unique Variants Played"
                />

                {/* Pie Chart */}
                <motion.div variants={itemVariants} className="w-full h-[180px] relative mb-4 z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={75}
                                stroke="#262421"
                                strokeWidth={3}
                                paddingAngle={2}
                            >
                                {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Shield size={38} className="text-[#81b64c]" />
                    </div>
                </motion.div>

                {/* Legend */}
                <motion.div variants={itemVariants} className="flex gap-3 justify-center w-full px-6 mb-4 z-10">
                    {chartData.map((d) => (
                        <div key={d.name} className="flex-1 bg-[#262421] border border-[#3e3c39] p-2 rounded-lg flex flex-col items-center">
                            <span className="text-[10px] font-bold text-[#c1c1c0] uppercase tracking-wide flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full" style={{backgroundColor: d.color}}/>
                                {d.name}
                            </span>
                            <span className="text-xl font-black text-white">{d.value}</span>
                        </div>
                    ))}
                </motion.div>

                <motion.div variants={itemVariants} className={TYPOGRAPHY.cardMessage}>
                    <p className={TYPOGRAPHY.comment}>
                        {total > 50 ? '"A walking theory encyclopedia!"' : '"Building a solid foundation."'}
                    </p>
                </motion.div>
            </motion.div>
        </StoryCard>
    );
}