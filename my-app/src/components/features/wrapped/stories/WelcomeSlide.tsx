'use client';

import { motion } from 'framer-motion';
import { Crown, Trophy, Sparkles, Star, Calendar, ChevronRight } from 'lucide-react';
import { useRef, useEffect } from 'react';
import StoryCard from '@/components/ui/Card/StoryCard';
import { itemVariants, containerVariants } from '@/components/shared/animations';
import { CONTAINERS, TYPOGRAPHY } from '@/components/shared/styles';
import { useChessStats } from '@/context/ChessContext';
import { StoryBackground } from '@/components/shared/layouts/StoryLayout';

// Helper for AutoFit Text (Kept as is, it's good logic)
const AutoFitText = ({ text }: { text: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resize = () => {
            const container = containerRef.current;
            const txt = textRef.current;
            if (!container || !txt) return;

            txt.style.transform = 'scale(1)';
            const containerWidth = container.clientWidth;
            const textWidth = txt.scrollWidth;

            if (textWidth > containerWidth) {
                const scale = containerWidth / textWidth;
                txt.style.transform = `scale(${scale})`;
            }
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [text]);

    return (
        <div ref={containerRef} className="w-full flex justify-center items-center overflow-hidden h-16">
            <div
                ref={textRef}
                className="whitespace-nowrap origin-center font-black text-white drop-shadow-md text-5xl md:text-6xl transition-transform duration-200"
                style={{ textShadow: '0 4px 0 rgba(0,0,0,0.2)' }}
            >
                {text}
            </div>
        </div>
    );
};

// Animated Floating Icon Component
const FloatingIcon = ({ children, delay, x, y }: { children: React.ReactNode, delay: number, x: number, y: number }) => (
    <motion.div
        className="absolute opacity-10 text-white pointer-events-none"
        initial={{ x, y }}
        animate={{
            y: [y, y - 20, y],
            rotate: [0, 5, -5, 0]
        }}
        transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    >
        {children}
    </motion.div>
);

export default function WelcomeSlide() {
    const { stats: data } = useChessStats();

    // Calculate Join Year (Fallback to current year if missing)
    const joinYear = data.joinDate ? new Date(data.joinDate * 1000).getFullYear() : 2024;

    return (
        <StoryCard id="slide-welcome" className={CONTAINERS.slideCard}>

            <StoryBackground>
                {/* Dynamic Floating Background Elements */}
                <FloatingIcon x={40} y={80} delay={0}><Crown size={80} /></FloatingIcon>
                <FloatingIcon x={280} y={150} delay={1}><Trophy size={60} /></FloatingIcon>
                <FloatingIcon x={-20} y={400} delay={2}><Star size={50} /></FloatingIcon>
                <FloatingIcon x={250} y={500} delay={1.5}><Sparkles size={70} /></FloatingIcon>

                {/* Large Background Gradient Blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#81b64c] blur-[100px] opacity-20 rounded-full" />
            </StoryBackground>

            <motion.div
                className={CONTAINERS.slideContainer}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* 1. Year Badge */}
                <motion.div
                    variants={itemVariants}
                    className="bg-[#ffc800] text-[#302e2b] px-5 py-1.5 rounded-full font-black text-sm mb-8 shadow-[0_4px_0_rgba(0,0,0,0.2)] border-2 border-white/20 rotate-[-2deg] flex items-center gap-2"
                >
                    <Star size={16} fill="currentColor" /> 2025 WRAPPED
                </motion.div>

                {/* 2. Avatar Area */}
                <motion.div variants={itemVariants} className="relative mb-8">
                    {/* Pulsing Glow Behind Avatar */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-white blur-xl rounded-full"
                    />

                    <div className="relative p-2 bg-white rounded-full shadow-2xl rotate-3">
                        <img
                            src={data.avatarUrl}
                            alt={data.username}
                            className="w-36 h-36 rounded-full object-cover border-4 border-[#81b64c]"
                        />
                    </div>

                    {/* Join Date Badge */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute -bottom-4 -left-4 bg-[#302e2b] text-white px-3 py-1.5 rounded-xl border-2 border-[#81b64c] shadow-lg rotate-[-5deg] flex items-center gap-1.5"
                    >
                        <Calendar size={12} className="text-[#81b64c]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Since {joinYear}</span>
                    </motion.div>

                    {/* Rank/Status Badge */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7, type: "spring" }}
                        className="absolute -bottom-2 -right-2 bg-[#81b64c] text-white p-3 rounded-2xl border-4 border-white shadow-lg rotate-[-10deg]"
                    >
                        <Trophy size={24} fill="currentColor" />
                    </motion.div>
                </motion.div>

                {/* 3. Username */}
                <motion.div variants={itemVariants} className="text-center w-full px-4 mb-4 z-10">
                    <div className="w-full drop-shadow-xl">
                        <AutoFitText text={data.username} />
                    </div>
                </motion.div>

                {/* 4. Subtitle & Call to Action */}
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
                    <p className="text-[#989795] font-bold text-sm uppercase tracking-widest bg-black/20 px-4 py-1 rounded-lg">
                        Your 2025 chess journey!
                    </p>

                    <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex items-center gap-2 text-white/80 text-sm font-bold mt-4"
                    >
                        <span>Click Start to review</span>
                        <div className="bg-white/20 p-1 rounded-full">
                            <ChevronRight size={16} />
                        </div>
                    </motion.div>
                </motion.div>

            </motion.div>
        </StoryCard>
    );
}