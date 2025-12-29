'use client';

import { motion } from 'framer-motion';
import { Skull, ChessQueen, ChessRook, ChessBishop, ChessKnight, ChessPawn } from 'lucide-react';
import StoryCard from '@/components/shared/StoryCard';
import { StoryBackground, containerVariants, itemVariants, CONTAINERS } from './shared';
import { useChessStats } from '@/context/ChessContext';

export default function MatedBySlide() {
    const { stats: data } = useChessStats();

    // If no checkmate data, skip
    if (!data.checkmateByPiece || data.checkmateByPiece.length === 0) return null;

    const topNemesis = data.checkmateByPiece[0];

    // Helper to get Icon and Color (Using Lucide Chess Icons)
    const getPieceStyle = (name: string) => {
        switch (name) {
            case 'Queen': return { icon: <ChessQueen size={36} strokeWidth={1.5} />, color: '#ca3431' };
            case 'Rook': return { icon: <ChessRook size={36} strokeWidth={1.5} />, color: '#f58b51' };
            case 'Bishop': return { icon: <ChessBishop size={36} strokeWidth={1.5} />, color: '#8b5cf6' };
            case 'Knight': return { icon: <ChessKnight size={36} strokeWidth={1.5} />, color: '#3b82f6' };
            case 'Pawn': return { icon: <ChessPawn size={36} strokeWidth={1.5} />, color: '#81b64c' };
            default: return { icon: <Skull size={36} strokeWidth={1.5} />, color: '#989795' };
        }
    };

    const style = getPieceStyle(topNemesis.piece);

    return (
        <StoryCard id="slide-executioner" className={CONTAINERS.slideCard}>
            <StoryBackground>
                <div className="absolute top-10 right-10 opacity-10 text-white">
                    <Skull size={80} />
                </div>
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">

                {/* Header */}
                <motion.div variants={itemVariants} className="w-full flex flex-col justify-start items-center px-4 mb-4 z-10">
                    <div className="flex items-center justify-center w-full mb-1">
                        <div className="bg-white rounded-full shadow-lg mr-3">
                            <img
                                src={data.avatarUrl}
                                alt={data.username}
                                className="w-14 h-14 rounded-full object-cover border-4 border-[#81b64c]"
                            />
                        </div>
                        <h2 className="text-2xl font-black text-white drop-shadow-md leading-none">Checkmate<br/>Counter</h2>
                    </div>
                    <p className="text-[#989795] font-bold text-xs uppercase tracking-widest mt-2">Which pieces checkmated you?</p>
                </motion.div>

                {/* Main Card */}
                <motion.div variants={itemVariants} className="z-10 relative mb-4">
                    <div
                        className="w-40 h-40 rounded-full flex flex-col items-center justify-center shadow-2xl border-[6px] border-[#FFFFFf]"
                        style={{ backgroundColor: style.color }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className="text-[#FFFFFF] mb-1"
                        >
                            {style.icon}
                        </motion.div>
                        <div className="text-[#FFFFFF] font-black text-xl ">
                            {topNemesis.piece}
                        </div>
                        <div className="text-[#FFFFFF]/70 font-bold text-[10px] mt-0.5">
                            {topNemesis.count} Times
                        </div>
                    </div>

                    {/* "Wanted" Label */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#262421] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 whitespace-nowrap">
                        Most Dangerous
                    </div>
                </motion.div>

                {/* Stats List */}
                <motion.div variants={itemVariants} className="w-full px-8 mt-4 z-10">
                    <div className="flex flex-col gap-2">
                        {data.checkmateByPiece.slice(1, 4).map((item, idx) => (
                            <div key={item.piece} className="flex justify-between items-center text-xs py-2 px-3 bg-[#262421] rounded-lg border border-[#3e3c39]">
                                <div className="flex items-center gap-2">
                                    <span className="text-[#989795] font-bold">#{idx + 2}</span>
                                    <span className="text-white font-bold uppercase">{item.piece}</span>
                                </div>
                                <span className="text-[#989795] font-mono">{item.count} times</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </motion.div>
        </StoryCard>
    );
}