'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Target } from 'lucide-react';
import StoryCard from '@/components/ui/StoryCard';
import { StoryHeader, StoryBackground, containerVariants, itemVariants, CONTAINERS, TYPOGRAPHY } from '../shared';
import TournamentRow from './TournamentRow';
import { useChessStats } from '@/context/ChessContext'; // 👇 Import Hook

export default function TournamentsSlide() {
    const { stats: data } = useChessStats(); // 👇 Use Context

    const summary = data.tournamentSummary || [];

    let comment = "Testing your mettle.";
    if (data.tournamentCount > 5) comment = "A true competitive spirit!";
    if (data.tournamentCount > 10) comment = "You live for the leaderboard.";

    return (
        <StoryCard id="slide-tourney" className={CONTAINERS.slideCard}>

            {/* Background Layer */}
            <StoryBackground>
                <div className="absolute top-10 left-10 text-white opacity-5"><Medal size={60} /></div>
                <div className="absolute bottom-10 right-10 text-white opacity-5"><Target size={50} /></div>
                <div className="absolute top-1/2 right-4 text-white opacity-5"><Trophy size={40} /></div>
            </StoryBackground>

            {/* Content Layer */}
            <motion.div
                className={CONTAINERS.slideContainer}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <StoryHeader
                    icon={<Trophy size={24} />}
                    iconColor="text-[#ffc800]"
                    title="Tournament Breakdown"
                    subtitle={`Total Entries: ${data.tournamentCount}`}
                />

                {/* Tournament List */}
                <div className="w-full flex flex-col gap-3 mb-6 px-4">
                    {summary.length > 0 ? (
                        summary.map((t, idx) => (
                            <TournamentRow
                                key={t.variant}
                                {...t}
                                idx={idx}
                            />
                        ))
                    ) : (
                        <motion.div variants={itemVariants} className="bg-[#262421] p-4 rounded-xl text-center text-[#989795] italic">
                            No detailed tournament data found.
                        </motion.div>
                    )}
                </div>

                {/* Footer Message */}
                <motion.div variants={itemVariants} className={TYPOGRAPHY.cardMessage}>
                    <p className={TYPOGRAPHY.comment}>
                        "{comment}"
                    </p>
                </motion.div>

            </motion.div>
        </StoryCard>
    );
}