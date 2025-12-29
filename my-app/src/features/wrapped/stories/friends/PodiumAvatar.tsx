import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { FriendStats } from '@/types';

interface Props {
    friend: FriendStats;
    rank: number;
    color: string;
    className?: string;
    size: number;
}

export default function PodiumAvatar({ friend, rank, color, className, size }: Props) {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 10, delay: rank === 1 ? 0.3 : 0.4 }}
            className={`flex flex-col items-center p-2 pt-0 rounded-t-xl relative ${className}`}
            style={{ borderTop: `4px solid ${color}` }}
        >
            {/* Rank Badge (Lifted above the bar with -top-4 and standardized padding) */}
            <div
                className="absolute -top-4 p-2 rounded-full border-[4px] border-[#262421] bg-[#262421] shadow-xl z-20"
                style={{ color }}
            >
                <Trophy size={18} fill="currentColor" />
            </div>

            {/* Avatar (Pushed down with mt-8 to clear the floating badge) */}
            <img
                src={friend.avatarUrl}
                alt={friend.username}
                className="rounded-full border-[4px] object-cover shadow-xl bg-[#262421] z-10 mt-8"
                style={{ width: size, height: size, borderColor: color }}
                onError={(e) => { (e.target as HTMLImageElement).src = "https://www.chess.com/bundles/web/images/user-image.svg"; }}
            />

            {/* Username (Full name assumed from previous context) */}
            <span className="font-bold text-sm mt-2 truncate w-full text-center text-white px-1">
                {friend.username}
            </span>

            {/* Game Count */}
            <span className="text-[#989795] font-mono text-xs font-bold mt-0.5 opacity-80">
                {friend.games} games
            </span>
        </motion.div>
    );
}