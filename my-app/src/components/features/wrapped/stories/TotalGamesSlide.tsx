'use client';

import { Clock, Rocket, Zap, Swords } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import StoryCard from '@/components/ui/StoryCard';
import { StoryHeader, StoryBackground, containerVariants, itemVariants, CONTAINERS, TYPOGRAPHY } from './shared';
import { useChessStats } from '@/context/ChessContext';

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#262421] border-2 border-[#3e3c39] p-3 rounded-xl shadow-2xl text-center font-bubbly">
                <p className="text-white font-bold text-xs mb-1">{label}</p> {/* Reduced to text-xs */}
                <p className="text-[#81b64c] font-black text-lg"> {/* Reduced to text-lg */}
                    {payload[0].value} <span className="text-xs text-[#989795]">games</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function TotalGamesSlide() {
    const { stats: data } = useChessStats();

    return (
        <StoryCard id="slide-games" className={CONTAINERS.slideCard}>
            <StoryBackground>
                <div className="absolute top-10 left-10 text-white opacity-5 animate-float"><Swords size={60} /></div>
                <div className="absolute bottom-10 right-10 text-white opacity-5 animate-float" style={{ animationDelay: '3s' }}><Zap size={50} /></div>
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">

                <motion.div variants={itemVariants} className="text-center z-10">
                    <StoryHeader
                        icon={<Rocket size={20} />}
                        iconColor="text-[#81b64c]"
                        title="Total Games Played"
                    />
                    <motion.div variants={itemVariants}>
                        <div className={`${TYPOGRAPHY.bigStat} text-[#ffc800] -mt-5`}>
                            {data.totalGames.toLocaleString()}
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div variants={itemVariants} className="w-full my-1 px-6 z-10">
                    <div className="bg-[#262421] border-2 border-[#3e3c39] rounded-3xl p-2 flex items-center justify-between shadow-[0_6px_0_#262421] transition-shadow duration-300">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#81b64c]/30 p-3 rounded-xl shadow-inner">
                                <Clock size={24} className="text-[#302e2b]" />
                            </div>
                            <div className="text-left">
                                <div className={`${TYPOGRAPHY.subHeader} !text-[#81b64c]`}>Time Invested</div>
                                <div className="text-2xl font-black text-white leading-none mt-1"> {/* Reduced from text-3xl */}
                                    ~{data.totalHours} <span className="text-sm font-medium text-[#989795]">Hours</span> {/* Reduced from text-lg */}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="w-full h-32 pr-6 relative z-10 mt-5">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.gamesByVariant} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }} barCategoryGap={8}>
                            <YAxis
                                type="category"
                                dataKey="name"
                                width={60}
                                tick={{ fill: '#c1c1c0', fontSize: 12, fontWeight: 700 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <XAxis type="number" hide />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
                            <Bar
                                dataKey="count"
                                radius={[10, 10, 10, 10]}
                                barSize={28}
                            >
                                {data.gamesByVariant.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={index === 0 ? '#ffc800' : '#4b4845'}
                                    />
                                ))}
                                <LabelList
                                    dataKey="count"
                                    position="right"
                                    fill="#ffffff"
                                    fontSize={12} /* Reduced from 14 */
                                    fontWeight={900}
                                    offset={10}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </motion.div>
        </StoryCard>
    );
}