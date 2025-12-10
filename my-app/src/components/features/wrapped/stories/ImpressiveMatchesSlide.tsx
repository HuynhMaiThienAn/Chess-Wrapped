'use client';

import { motion } from 'framer-motion';
import { Crown, Zap, Swords, ArrowUpRight } from 'lucide-react';
import { UserData } from '@/types';
import StoryCard from '@/components/ui/StoryCard';
import { StoryHeader, StoryBackground, containerVariants, itemVariants, CONTAINERS, TYPOGRAPHY } from './shared';

const defaultAvatar = 'https://www.chess.com/bundles/web/images/user-image.svg';

const getGapMessage = (gap: number) => {
    if (gap > 2000) return "um... u cheated, right?";
    if (gap > 1000) return "Bro thought he is HIM";
    if (gap > 500) return "Aiyo that's krazy bro";
    if (gap > 400) return "Bro is lock in >:)";
    if (gap > 300) return "Okay, you got the skill right there :)";
    if (gap > 200) return "Impressive!";
    if (gap > 100) return "That's cool :D";
    if (gap >= 0) return "Fair fight";
    return "A great win!";
};

export default function ImpressiveMatchesSlide({ data }: { data: UserData }) {
    const topMatches = data.impressiveMatches.slice(0, 3);
    const maxGap = topMatches[0]?.eloGap || 0;
    const customMessage = getGapMessage(maxGap);

    return (
        <StoryCard id="slide-impressive" className={CONTAINERS.slideCard}>

            {/* Background Layer */}
            <StoryBackground>
                <div className="absolute top-10 left-10 text-white opacity-5"><Crown size={60} /></div>
                <div className="absolute bottom-10 right-10 text-white opacity-5"><Swords size={50} /></div>
                <div className="absolute top-1/2 right-4 text-white opacity-5"><Zap size={40} /></div>
            </StoryBackground>

            {/* Content Layer */}
            <motion.div
                className={CONTAINERS.slideContainer}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <StoryHeader
                    icon={<Crown size={24} />}
                    iconColor="text-[#ffc800]"
                    title="Giant Slayers"
                    subtitle="(Your best wins so far!)"
                />

                {/* Matches List */}
                <div className="w-full flex flex-col gap-3 mb-6 px-4 z-10">
                    {topMatches.map((match, idx) => {
                        const userMatchElo = match.opponentElo - match.eloGap;

                        return (
                            <motion.a
                                key={idx}
                                variants={itemVariants}
                                href={match.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-4 bg-[#262421] rounded-xl border border-[#3e3c39] shadow-md transition hover:scale-[1.02] hover:border-[#81b64c] group"
                            >
                                <div className="flex justify-between items-center">
                                    {/* Left: Avatar & Name */}
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={match.opponentAvatarUrl || defaultAvatar}
                                            alt={match.opponent}
                                            className="w-10 h-10 rounded-full border-2 border-[#ffc800] object-cover"
                                            onError={(e) => { (e.target as HTMLImageElement).src = defaultAvatar; }}
                                        />

                                        <div className="flex flex-col text-left">
                                            <span className="text-white font-bold text-base leading-tight whitespace-nowrap flex items-center gap-2">
                                                vs {match.opponent}
                                                <span className="text-[#989795] text-[10px] font-bold bg-[#3e3c39]/50 px-1.5 py-0.5 rounded-full">
                                                    {match.opponentElo}
                                                </span>
                                            </span>

                                            <span className="text-[#989795] text-xs font-medium mt-0.5 group-hover:text-[#81b64c] transition-colors">
                                                Your Elo: {userMatchElo}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right: Gap & Time */}
                                    <div className="flex flex-col items-end">
                                        <span className="text-[#81b64c] font-black text-xl flex items-center gap-1">
                                            <ArrowUpRight size={20} /> +{match.eloGap}
                                        </span>
                                        <span className="text-[#989795] text-[10px] font-mono uppercase mt-0.5">
                                            {match.timeControl}
                                        </span>
                                    </div>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>

                {/* Footer Message */}
                <motion.div variants={itemVariants} className={TYPOGRAPHY.cardMessage}>
                    <p className={TYPOGRAPHY.comment}>
                        "{customMessage}"
                    </p>
                </motion.div>
            </motion.div>
        </StoryCard>
    );
}