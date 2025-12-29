'use client';

import { Skull } from 'lucide-react';
import StatsSlide from '@/features/wrapped/components/StatsSlide';
import { useChessStats } from '@/context/ChessContext';

const COLORS = [
    '#ca3431',
    '#f58b51',
    '#8b5cf6',
    '#3b82f6',
    '#facc15',
];

export default function LossSlide() {
    const { stats } = useChessStats();

    return (
        <StatsSlide
            id="slide-loss-methods"
            title={<>How did<br />you lose?</>}
            icon={Skull}
            iconColor="text-[#ca3431]"
            data={stats.lossMethods || []}
            colors={COLORS}
            totalLabel="Total Losses"
        />
    );
}