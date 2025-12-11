'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import StoryCard from '@/components/ui/StoryCard';
import { StoryHeader, StoryBackground, containerVariants, itemVariants, CONTAINERS } from './shared';
import { useChessStats } from '@/context/ChessContext'; // 👇 Import Hook

export default function JoinDateSlide() {
    const { stats: data } = useChessStats(); // 👇 Use Context

    const { dateStr, daysMember } = useMemo(() => {
        const joinDateObj = new Date(data.joinDate * 1000);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - joinDateObj.getTime());
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
            dateStr: joinDateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            daysMember: days
        };
    }, [data.joinDate]);

    return (
        <StoryCard id="slide-join" className={CONTAINERS.slideCard}>

            <StoryBackground>
                <Clock className="absolute -bottom-10 -right-10 w-64 h-64 text-white opacity-[0.05] -rotate-12" />
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">

                <StoryHeader
                    icon={<Calendar size={40}/>}
                    iconColor="text-[#81b64c]"
                    title="Welcome to the Club!"
                    subtitle="You started your journey on"
                />

                <motion.div variants={itemVariants} className="bg-[#262421] border border-[#3e3c39] rounded-xl p-6 shadow-lg w-full max-w-[280px] mb-8 text-center relative z-10">
                    <div className="text-3xl font-black text-white tracking-tight mb-4">{dateStr}</div>

                    <div className="flex items-center justify-center gap-2 text-[#81b64c] font-bold text-sm bg-[#81b64c]/10 py-2 px-4 rounded-full w-fit mx-auto border border-[#81b64c]/20">
                        <Clock size={16} />
                        <span>{daysMember.toLocaleString()} Days Active</span>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <p className="text-lg italic text-white opacity-80">"A star is born."</p>
                </motion.div>

            </motion.div>
        </StoryCard>
    );
}