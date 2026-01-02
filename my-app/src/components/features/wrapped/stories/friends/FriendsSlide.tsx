'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Swords, Trophy, Crown } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import StoryCard from '@/components/ui/Card/StoryCard';
import { StoryBackground } from '@/components/shared/layouts/StoryLayout';
import { containerVariants, itemVariants } from '@/components/shared/animations';
import { CONTAINERS, TYPOGRAPHY } from '@/components/shared/styles';
import { useChessStats } from '@/context/ChessContext';

const AutoFitText = ({ text, className = "" }: { text: string, className?: string }) => {
    const textRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const resizeText = () => {
            const container = containerRef.current;
            const txt = textRef.current;
            if (!container || !txt) return;

            // Reset to measure natural width
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
        <div ref={containerRef} className={`w-full overflow-hidden flex justify-center items-center ${className}`}>
            <span
                ref={textRef}
                className="whitespace-nowrap origin-center transition-transform duration-200"
                style={{ transform: `scale(${scale})` }}
            >
                {text}
            </span>
        </div>
    );
};

// 👇 Local Podium Component (Replaces imported PodiumAvatar for full control)
const PodiumItem = ({ friend, rank, color, className, size }: any) => {
    return (
        <motion.div
            className={`flex flex-col items-center justify-end rounded-t-lg relative ${className}`}
            initial={{ height: 0 }}
            animate={{ height: className.match(/h-\[(\d+)px\]/)?.[1] + 'px' || '100%' }}
            transition={{ duration: 0.8, delay: 0.2 + (rank * 0.1), type: 'spring' }}
        >
            {/* Crown for Rank 1 */}
            {rank === 1 && (
                <div className="absolute -top-10 text-[#ffc800] animate-bounce">
                    <Crown size={32} fill="currentColor" />
                </div>
            )}

            {/* Avatar */}
            <div className="relative mb-2">
                <img
                    src={friend.avatarUrl}
                    alt={friend.username}
                    style={{ width: size, height: size, borderColor: color }}
                    className="rounded-full object-cover border-4 shadow-lg bg-[#262421]"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://www.chess.com/bundles/web/images/user-image.svg"; }}
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#262421] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#3e3c39] shadow-sm">
                    #{rank}
                </div>
            </div>

            {/* Name (Scaled) */}
            <div className="w-full px-1 mb-1 text-white font-bold text-xs text-center">
                <AutoFitText text={friend.username} />
            </div>

            {/* Game Count */}
            <div className="text-[9px] text-white/70 font-mono mb-2">
                {friend.games} games
            </div>
        </motion.div>
    );
};

export default function FriendsSlide() {
    const { stats: data } = useChessStats();

    const top3 = data.topFriends.slice(0, 3);
    const remaining = data.topFriends.slice(3, 6); // Top 3-6

    // Colors
    const GOLD = '#ffc800';
    const SILVER = '#a1a1aa';
    const BRONZE = '#cc7030';

    return (
        <StoryCard id="slide-friends" className={CONTAINERS.slideCard}>

            <StoryBackground>
                <div className="absolute top-10 right-10 text-white opacity-5"><Heart size={60} /></div>
                <div className="absolute bottom-10 left-10 text-white opacity-5"><Swords size={50} /></div>
                <div className="absolute bottom-1/4 right-1/4 text-white opacity-5"><Trophy size={40} /></div>
            </StoryBackground>

            <motion.div
                className={CONTAINERS.slideContainer}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* 1. Header: Avatar + Title */}
                <motion.div variants={itemVariants} className="w-full flex justify-start items-center px-4 mb-2 z-10">
                    <div className="p-1 bg-white rounded-full shadow-lg mr-3">
                        <img
                            src={data.avatarUrl}
                            alt={data.username}
                            className="w-12 h-12 rounded-full object-cover border-2 border-[#81b64c]"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-white drop-shadow-md">
                        Best Friends :D
                    </h2>
                </motion.div>

                {/* 2. PODIUM SECTION */}
                {top3.length > 0 ? (
                    <div className="w-full flex justify-center items-end h-[210px] mb-4 px-2 gap-2 -mt-2 z-10">
                        {/* Rank 2 (Silver) */}
                        {top3[1] && (
                            <PodiumItem
                                friend={top3[1]}
                                rank={2}
                                color={SILVER}
                                className="w-[30%] h-[120px] bg-[#3d3b38]/60 border-t-4 border-[#a1a1aa]"
                                size={50}
                            />
                        )}

                        {/* Rank 1 (Gold) */}
                        {top3[0] && (
                            <PodiumItem
                                friend={top3[0]}
                                rank={1}
                                color={GOLD}
                                className="w-[38%] h-[150px] bg-[#ffc800]/20 border-t-4 border-[#ffc800] z-20 shadow-[0_0_20px_rgba(255,200,0,0.2)]"
                                size={70}
                            />
                        )}

                        {/* Rank 3 (Bronze) */}
                        {top3[2] && (
                            <PodiumItem
                                friend={top3[2]}
                                rank={3}
                                color={BRONZE}
                                className="w-[30%] h-[110px] bg-[#3d3b38]/60 border-t-4 border-[#cc7030]"
                                size={45}
                            />
                        )}
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-[#989795] italic">
                        No friends games found.
                    </div>
                )}

                {/* 3. REMAINING LIST */}
                {remaining.length > 0 && (
                    <div className="w-full flex flex-col gap-2 px-1 z-10">
                        {remaining.map((friend, idx) => (
                            <motion.div
                                key={friend.username}
                                variants={itemVariants}
                                className="flex justify-between items-center bg-[#262421] p-2.5 rounded-xl border border-[#3e3c39] shadow-sm"
                            >
                                <div className="flex items-center gap-3 w-[70%]">
                                    <span className="text-[#989795] font-black text-xs w-5 text-center shrink-0">#{idx + 4}</span>

                                    <img
                                        src={friend.avatarUrl}
                                        alt={friend.username}
                                        className="w-8 h-8 rounded-full border border-[#3e3c39] object-cover bg-black/20 shrink-0"
                                        onError={(e) => { (e.target as HTMLImageElement).src = "https://www.chess.com/bundles/web/images/user-image.svg"; }}
                                    />

                                    {/* Name with scaling */}
                                    <div className="flex-1 min-w-0">
                                        <div className="w-full overflow-hidden">
                                            <AutoFitText text={friend.username} className="!justify-start !origin-left" />
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[#989795] text-[10px] font-mono font-bold bg-[#3e3c39]/50 px-2 py-1 rounded-lg shrink-0">
                                    {friend.games} games
                                </span>
                            </motion.div>
                        ))}
                    </div>
                )}

            </motion.div>
        </StoryCard>
    );
}