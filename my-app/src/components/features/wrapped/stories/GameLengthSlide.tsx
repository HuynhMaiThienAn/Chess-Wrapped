'use client';

import { motion } from 'framer-motion';
import { Hourglass, ExternalLink } from 'lucide-react';
import StoryCard from '@/components/ui/Card/StoryCard';
import { containerVariants, itemVariants } from '@/components/shared/animations';
import { CONTAINERS } from '@/components/shared/styles';
import { useChessStats } from '@/context/ChessContext';
import SlideHeader from './shared/SlideHeader';

const defaultAvatar = 'https://www.chess.com/bundles/web/images/user-image.svg';

export default function GameLengthSlide() {
    const { stats: data } = useChessStats();

    // Safety check
    if (!data.longestGame) return null;

    return (
        <StoryCard id="slide-length" className={CONTAINERS.slideCard}>


            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">

                <SlideHeader
                    avatarUrl={data.avatarUrl}
                    username={data.username}
                    title="Longest Game"
                    subtitle="Your greatest marathon battle"
                />

                <motion.div variants={itemVariants} className={`${CONTAINERS.slideContent} flex flex-col items-center gap-6`}>

                    {/* Main Number - Moves */}
                    <div className="flex flex-col items-center">
                        <span className="text-8xl font-black text-white leading-none drop-shadow-xl">
                            {data.longestGame.moves}
                        </span>
                        <span className="text-[#989795] font-bold text-sm uppercase tracking-widest mt-3">
                            Moves
                        </span>
                    </div>

                    {/* Result Box */}
                    <div className="w-full max-w-xs bg-[#262421] border-2 border-[#3e3c39] rounded-xl p-4 flex flex-col items-center gap-2">
                        <span className="text-[#989795] text-xs uppercase font-bold">How it ended</span>
                        <span className="text-white text-lg font-black">{data.longestGame.result}</span>
                        <a
                            href={data.longestGame.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-md text-[9px] font-bold uppercase transition-colors mt-1"
                        >
                            View Game <ExternalLink size={10} />
                        </a>
                    </div>

                </motion.div>

            </motion.div>
        </StoryCard>
    );
}