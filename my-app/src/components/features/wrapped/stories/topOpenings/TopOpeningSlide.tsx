'use client';

import { motion } from 'framer-motion';
import { Swords, Castle, Zap, Target, Medal, TrendingUp } from 'lucide-react';
import { OpeningStat } from '@/types';
import StoryCard from '@/components/ui/StoryCard';
import { StoryHeader, StoryBackground, containerVariants, itemVariants, CONTAINERS, TYPOGRAPHY } from '../shared';
import OpeningRow from './OpeningRow';
import { useChessStats } from '@/context/ChessContext';

// Existing OpeningList component
const OpeningList = ({ title, list, colorClass }: { title: string, list: OpeningStat[], colorClass: string }) => (
    <div className="flex-1 min-w-0 flex flex-col">
        <div
            className={`text-xs font-bold uppercase tracking-widest mb-3 text-center bg-[#262421] py-2 rounded-lg border-2 border-[#3e3c39] ${colorClass} shadow-[0_3px_0_#262421]`}
        >
            {title}
        </div>
        <div className="flex flex-col gap-2 flex-1">
            {list.map((op, idx) => <OpeningRow key={op.name} op={op} idx={idx} colorClass={colorClass} />)}
            {list.length === 0 && <div className="text-[#3e3c39] text-xs italic p-2 text-center">No games found.</div>}
        </div>
    </div>
);

export default function TopOpeningSlide() {
    const { stats: data } = useChessStats();

    // --- LOGIC: Determine Primary Opening & Generate Comment/Roast ---
    const topWhite = data.topOpeningsWhite?.[0];
    const topBlack = data.topOpeningsBlack?.[0];

    let primaryOpening: OpeningStat | null = null;
    let sidePlayed: 'White' | 'Black' = 'White';

    if (topWhite && topBlack) {
        primaryOpening = (topWhite.count >= topBlack.count) ? topWhite : topBlack;
        sidePlayed = (topWhite.count >= topBlack.count) ? 'White' : 'Black';
    } else if (topWhite) {
        primaryOpening = topWhite;
    } else if (topBlack) {
        primaryOpening = topBlack;
        sidePlayed = 'Black';
    }

    // ------------------------------------------------------------------

    return (
        <StoryCard id="slide-top-openings" className={CONTAINERS.slideCard}>
            <StoryBackground>
                <div className="absolute top-10 left-10 text-white opacity-5"><Swords size={50} /></div>
                <div className="absolute top-1/4 right-5 text-white opacity-5"><Target size={40} /></div>
                <div className="absolute bottom-10 left-5 text-white opacity-5"><Zap size={30} /></div>
                <div className="absolute bottom-1/4 right-1/4 text-white opacity-5"><Castle size={45} /></div>
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">

                {/* Main Header */}

                <StoryHeader
                    icon={<Swords size={20} />}
                    iconColor="text-[#ffc800]"
                    title="Your Opening Repertoire"
                />

                {/* --- FEATURED OPENING BOX (Most Interesting Part) --- */}
                <motion.div variants={itemVariants} className="w-full my-3 px-4 z-10 -mt-5">
                    {primaryOpening ? (
                        <div className="bg-[#262421] border-4 border-[#ffc800] rounded-3xl p-4 flex flex-col items-center shadow-[0_4px_0_#b38b00] active:shadow-none transition-all relative overflow-hidden">

                            {/* Background Pattern for Feature Box */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#ffc800] opacity-50"></div>

                            {/* Feature Title */}
                            <p className="text-[#989795] text-[10px] uppercase font-bold tracking-widest mb-1">
                                Signature Opening ({sidePlayed})
                            </p>
                            <h3 className="text-xl font-black text-white text-center leading-tight mb-3 px-2 -mt-1">
                                {primaryOpening.name}
                            </h3>

                            {/* Stats Row inside Feature Box */}
                            <div className="flex justify-around gap-4 mt-2 pt-2 border-t border-[#3e3c39] w-full">
                                <div className="text-center -mt-1">
                                    <Medal size={16} className="text-[#ffc800] mx-auto mb-0.5" />
                                    <div className="text-lg font-black text-white">{primaryOpening.winRate}%</div>
                                    <div className="text-[9px] font-bold text-[#989795] uppercase">Win Rate</div>
                                </div>

                                <div className="w-px bg-[#3e3c39] opacity-50"></div>

                                <div className="text-center -mt-1">
                                    <TrendingUp size={16} className="text-[#81b64c] mx-auto mb-0.5" />
                                    <div className="text-lg font-black text-white">{primaryOpening.highestWinElo}</div>
                                    <div className="text-[9px] font-bold text-[#989795] uppercase">Best Win</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-[#989795] text-sm py-4">No significant opening data found.</div>
                    )}
                </motion.div>

                {/* --- LISTS (Condensed) --- */}
                <div className="w-full flex gap-3 text-left items-stretch px-4">
                    <OpeningList title="AS WHITE" list={data.topOpeningsWhite.slice(0, 3)} colorClass="text-[#ffc800]" />
                    <div className="w-1 bg-[#3e3c39] opacity-70 my-1"></div>
                    <OpeningList title="AS BLACK" list={data.topOpeningsBlack.slice(0, 3)} colorClass="text-[#989795]" />
                </div>
            </motion.div>
        </StoryCard>
    );
}