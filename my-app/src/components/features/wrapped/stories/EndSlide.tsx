'use client';

import { motion } from 'framer-motion';
import { Github, MessageSquare, Heart, Trophy, Zap, Target } from 'lucide-react';
import StoryCard from '@/components/ui/StoryCard';
import { StoryHeader, StoryBackground, containerVariants, itemVariants, CONTAINERS } from './shared';

export default function EndSlide({ onReset }: { onReset: () => void }) {
    return (
        <StoryCard id="slide-end" className={CONTAINERS.slideCard}>

            <StoryBackground>
                <div className="absolute top-1/4 left-1/4 text-white opacity-5"><Trophy size={60} /></div>
                <div className="absolute bottom-1/4 right-1/4 text-white opacity-5"><Heart size={50} /></div>
                <div className="absolute top-10 right-10 text-white opacity-5"><Zap size={40} /></div>
                <div className="absolute bottom-10 left-10 text-white opacity-5"><Target size={45} /></div>
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">
                <StoryHeader
                    icon={<Trophy size={24}/>}
                    iconColor="text-[#ffc800]"
                    title="See you next year!"
                    subtitle="Keep pushing those pawns."
                />

                {/* Feedback Button */}
                <motion.div variants={itemVariants} className="w-full max-w-sm mb-6 px-4">
                    <button
                        onClick={() => window.open('https://forms.gle/Eweg1RtYs9is9p6x5', '_blank')}
                        className="w-full py-3 bg-[#81b64c] text-white font-black uppercase rounded-lg hover:bg-[#a3d160] transition shadow-md flex items-center justify-center gap-2 group"
                    >
                        <MessageSquare size={18} className="group-hover:scale-110 transition"/>
                        Share Feedback
                    </button>
                    <p className="text-[#989795] text-xs mt-2 text-center">(Opens Google Form)</p>
                </motion.div>

                {/* GitHub Link */}
                <motion.div variants={itemVariants} className="w-full max-w-sm px-4 mb-8 text-center">
                    <a
                        href="https://github.com/huynhmaithienan/ChessWrapped"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#262421] border border-[#3e3c39] text-white font-bold text-sm hover:bg-[#3d3b38] transition"
                    >
                        <Github size={18} className="text-[#ffc800]"/>
                        Star the repo!
                        <Heart size={16} className="text-red-500 fill-red-500 animate-pulse"/>
                    </a>
                </motion.div>

                {/* Watch Again */}
                <motion.button
                    onClick={onReset}
                    variants={itemVariants}
                    className="text-[#989795] text-xs underline hover:text-white uppercase tracking-widest font-bold"
                >
                    Watch Again
                </motion.button>
            </motion.div>
        </StoryCard>
    );
}