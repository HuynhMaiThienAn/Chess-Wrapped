'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import StoryCard from '@/components/ui/Card/StoryCard';
import { StoryBackground } from '@/components/shared/layouts/StoryLayout';
import { containerVariants, itemVariants } from '@/components/shared/animations';
import { CONTAINERS } from '@/components/shared/styles';
import { useChessStats } from '@/context/ChessContext';
import SlideHeader from './shared/SlideHeader';

const AutoFitText = ({ text }: { text: string }) => {
    const textRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const resizeText = () => {
            const container = containerRef.current;
            const txt = textRef.current;
            if (!container || !txt) return;

            txt.style.transform = 'scale(1)';
            const containerWidth = container.clientWidth;
            const textWidth = txt.scrollWidth;

            if (textWidth > containerWidth) {
                setScale(containerWidth / textWidth);
            } else {
                setScale(1);
            }
        };

        resizeText();
        window.addEventListener('resize', resizeText);
        return () => window.removeEventListener('resize', resizeText);
    }, [text]);

    return (
        <div ref={containerRef} className="w-full overflow-hidden flex items-center">
            <span
                ref={textRef}
                className="text-white text-xs font-bold whitespace-nowrap origin-left transition-transform duration-200"
                style={{ transform: `scale(${scale})` }}
            >
                {text}
            </span>
        </div>
    );
};

export default function WorstOpeningSlide() {
    const { stats: data } = useChessStats();

    const allWorst = [
        ...data.worstOpeningsWhite,
        ...data.worstOpeningsBlack
    ];

    allWorst.sort((a, b) => {
        if (a.winRate === b.winRate) return b.count - a.count;
        return a.winRate - b.winRate;
    });

    const top4Worst = allWorst.slice(0, 4);
    const totalGames = top4Worst.reduce((sum, op) => sum + op.count, 0);

    return (
        <StoryCard id="slide-worst" className={CONTAINERS.slideCard}>
            <StoryBackground>
                <div className="absolute top-10 right-10 text-red-500 opacity-5"><AlertTriangle size={60} /></div>
                <div className="absolute bottom-10 left-10 text-red-500 opacity-5"><ShieldAlert size={50} /></div>
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">

                <SlideHeader
                    avatarUrl={data.avatarUrl}
                    username={data.username}
                    title="Your weakness :("
                    subtitle={`${totalGames} games analyzed`}
                />

                <motion.div
                    variants={itemVariants}
                    className={`${CONTAINERS.slideContent} flex flex-col gap-5 mb-2 overflow-hidden max-h-[400px]`}
                >
                    {top4Worst.map((item, idx) => {
                        const total = item.count;
                        const wins = Math.round((item.winRate / 100) * total);
                        const draws = Math.round((item.drawRate / 100) * total);
                        const losses = Math.round((item.lossRate / 100) * total);

                        return (
                            <div key={idx} className="w-full">
                                <div className="flex justify-between items-end mb-1.5 w-full">
                                    <div className="flex-1 min-w-0 mr-2">
                                        <AutoFitText text={item.name} />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-1 text-[10px] font-bold">
                                    <span className="text-[#81b64c]">{item.winRate}% WON</span>
                                    <span className="text-[#989795]">{item.drawRate}% DRAWN</span>
                                    <span className="text-[#ca3431]">{item.lossRate}% LOST</span>
                                </div>

                                <div className="flex justify-between items-center mb-1 text-[10px] font-mono text-[#989795]">
                                    <span>{wins} won</span>
                                    <span>{draws} drawn</span>
                                    <span>{losses} lost</span>
                                </div>

                                <div className="w-full h-4 bg-[#262421] rounded-lg overflow-hidden border-2 border-[#3e3c39] flex">
                                    {item.winRate > 0 && (
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.winRate}%` }}
                                            transition={{ duration: 1, delay: 0.2 + (idx * 0.1), ease: "easeOut" }}
                                            className="h-full bg-[#81b64c]"
                                        />
                                    )}
                                    {item.drawRate > 0 && (
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.drawRate}%` }}
                                            transition={{ duration: 1, delay: 0.3 + (idx * 0.1), ease: "easeOut" }}
                                            className="h-full bg-[#989795]"
                                        />
                                    )}
                                    {item.lossRate > 0 && (
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.lossRate}%` }}
                                            transition={{ duration: 1, delay: 0.4 + (idx * 0.1), ease: "easeOut" }}
                                            className="h-full bg-[#ca3431]"
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {top4Worst.length === 0 && (
                        <div className="text-center text-[#989795] italic py-10">
                            No significant data found.
                        </div>
                    )}
                </motion.div>

            </motion.div>
        </StoryCard>
    );
}