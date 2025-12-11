'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Swords, Trophy } from 'lucide-react';
import StoryCard from '@/components/ui/StoryCard';
import { StoryHeader, StoryBackground, containerVariants, itemVariants, CONTAINERS } from '../shared';
import PodiumAvatar from './PodiumAvatar';
import { useChessStats } from '@/context/ChessContext';

export default function FriendsSlide() {
    const { stats: data } = useChessStats();

    const top3 = data.topFriends.slice(0, 3);
    const remaining = data.topFriends.slice(3);

    // Color definitions for the podium
    const GOLD = '#ffc800';
    const SILVER = '#a1a1aa';
    const BRONZE = '#cc7030';

    return (
        <StoryCard id="slide-friends" className={CONTAINERS.slideCard}>

            {/* Background Layer */}
            <StoryBackground>
                <div className="absolute top-10 right-10 text-white opacity-5"><Heart size={60} /></div>
                <div className="absolute bottom-10 left-10 text-white opacity-5"><Swords size={50} /></div>
                <div className="absolute bottom-1/4 right-1/4 text-white opacity-5"><Trophy size={40} /></div>
            </StoryBackground>

            {/* Content Layer */}
            <motion.div
                className={CONTAINERS.slideContainer}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <StoryHeader
                    icon={<Users size={24}/>}
                    iconColor="text-[#81b64c]"
                    title="Best Friends :D"
                />

                {/* PODIUM SECTION (Ranks 2, 1, 3) */}
                {top3.length > 0 && (
                    <div className="w-full flex justify-center items-end h-[220px] mb-5 px-4 gap-1 -mt-4">

                        {/* Rank 2 (Silver) - Width slightly reduced */}
                        {top3[1] && (
                            <PodiumAvatar
                                friend={top3[1]}
                                rank={2}
                                color={SILVER}
                                className="w-[29%] h-[150px] bg-[#3d3b38]/40" // Reduced w-[30%] to w-[29%]
                                size={55}
                            />
                        )}

                        {/* Rank 1 (Gold) - Width increased for primary focus */}
                        {top3[0] && (
                            <PodiumAvatar
                                friend={top3[0]}
                                rank={1}
                                color={GOLD}
                                className="w-[38%] h-[190px] bg-[#ffc800]/10 z-10 shadow-2xl pb-4" // Increased w-[36%] to w-[38%]
                                size={75}
                            />
                        )}

                        {/* Rank 3 (Bronze) - Width slightly reduced */}
                        {top3[2] && (
                            <PodiumAvatar
                                friend={top3[2]}
                                rank={3}
                                color={BRONZE}
                                className="w-[29%] h-[130px] bg-[#3d3b38]/40" // Reduced w-[30%] to w-[29%]
                                size={45}
                            />
                        )}
                    </div>
                )}

                {/* REMAINING LIST */}
                {remaining.length > 0 && (
                    <div className="w-full flex flex-col gap-2 px-6">
                        {remaining.map((friend, idx) => (
                            <motion.div
                                key={friend.username}
                                variants={itemVariants}
                                className="flex justify-between items-center bg-[#262421] p-3 rounded-lg border border-[#3e3c39] shadow-sm hover:bg-[#302e2b] transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-[#989795] font-black text-xs w-4 text-center">#{idx + 4}</span>

                                    <img
                                        src={friend.avatarUrl}
                                        alt={friend.username}
                                        className="w-8 h-8 rounded-full border border-[#3e3c39] object-cover"
                                        onError={(e) => { (e.target as HTMLImageElement).src = "https://www.chess.com/bundles/web/images/user-image.svg"; }}
                                    />

                                    {/* FIX: Increased max-w for name display */}
                                    <span className="text-white font-bold text-sm truncate max-w-[150px]">
                                        {friend.username}
                                    </span>
                                </div>
                                <span className="text-[#989795] text-xs font-mono font-bold bg-[#3e3c39]/30 px-2 py-1 rounded-full">
                                    {friend.games} games
                                </span>
                            </motion.div>
                        ))}
                    </div>
                )}

                {top3.length === 0 && (
                    <div className="text-[#989795] italic mt-10">No friends found :(</div>
                )}

            </motion.div>
        </StoryCard>
    );
}