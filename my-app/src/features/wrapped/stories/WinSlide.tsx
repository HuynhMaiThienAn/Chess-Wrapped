'use client';

import { Trophy } from 'lucide-react';
import StatsSlide from '@/features/wrapped/components/StatsSlide';
import { useChessStats } from '@/context/ChessContext';

const COLORS = [
    '#81b64c',
    '#ffc800',
    '#2c8c99',
    '#9e5ec2',
    '#eb6b65',
];

export default function WinSlide() {
    const { stats } = useChessStats();

    return (
        <StatsSlide
            id="slide-win-methods"
            title={<>How did<br />you win?</>}
            icon={Trophy}
            iconColor="text-[#81b64c]"
            data={stats.winMethods || []}
            colors={COLORS}
            totalLabel="Total Wins"
        />
    );
}