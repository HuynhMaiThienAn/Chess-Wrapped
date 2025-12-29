'use client';

import { Handshake } from 'lucide-react';
import StatsSlide from '@/features/wrapped/components/StatsSlide';
import { useChessStats } from '@/context/ChessContext';

const COLORS = [
    '#989795',
    '#e2e8f0',
    '#64748b',
    '#a78bfa',
    '#fbbf24',
];

export default function DrawSlide() {
    const { stats } = useChessStats();

    return (
        <StatsSlide
            id="slide-draw-methods"
            title={<>How did<br />you draw?</>}
            icon={Handshake}
            iconColor="text-[#989795]"
            data={stats.drawMethods || []}
            colors={COLORS}
            totalLabel="Total Draws"
        />
    );
}