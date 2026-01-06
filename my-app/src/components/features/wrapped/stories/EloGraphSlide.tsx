'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import StoryCard from '@/components/ui/Card/StoryCard';
import { containerVariants, itemVariants } from '@/components/shared/animations';
import { CONTAINERS } from '@/components/shared/styles';
import { useChessStats } from '@/context/ChessContext';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const RANK_COLORS = ['#81b64c', '#ffffff', '#ca3431']; // Green, White, Red

const getPeakComment = (rating: number) => {
    if (rating < 800) return "Not bad :)";
    if (rating < 1200) return "Above average :D";
    if (rating < 1600) return "Half way to Grandmaster :D";
    if (rating < 2000) return "Impressive :D";
    if (rating < 2400) return "Krazy :)";
    return "The GOAT!!!";
};

export default function EloGraphSlide() {
    const { stats: data } = useChessStats();
    const [shouldRenderChart, setShouldRenderChart] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShouldRenderChart(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const fullHistory = useMemo(() => {
        const rawHistory = data.eloHistory || [];
        return MONTHS.map((monthName, index) => {
            const existingData = rawHistory.find(h => h.monthIndex === index);
            return {
                date: monthName,
                monthIndex: index,
                Blitz: existingData?.Blitz ?? null,
                Rapid: existingData?.Rapid ?? null,
                Bullet: existingData?.Bullet ?? null,
            };
        });
    }, [data.eloHistory]);

    // Sorting logic (By Current Rating: Highest -> Lowest)
    const sortedModes = useMemo(() => {
        const modes = ['Blitz', 'Rapid', 'Bullet'] as const;

        const getLatestRating = (mode: string) => {
            for (let i = fullHistory.length - 1; i >= 0; i--) {
                const val = fullHistory[i][mode as 'Blitz' | 'Rapid' | 'Bullet'];
                if (val !== null && val !== undefined) return val;
            }
            return 0;
        };

        return [...modes].sort((a, b) => getLatestRating(b) - getLatestRating(a));
    }, [fullHistory]);

    const getChange = (key: 'Blitz' | 'Rapid' | 'Bullet') => {
        // @ts-ignore
        return data.eloChange?.[key] ?? 0;
    };

    const stats = {
        Blitz: { change: getChange('Blitz') },
        Rapid: { change: getChange('Rapid') },
        Bullet: { change: getChange('Bullet') },
    };

    // Chart.js configuration
    const chartData = {
        labels: MONTHS,
        datasets: sortedModes.map((mode, index) => ({
            label: mode,
            data: fullHistory.map(h => h[mode]),
            borderColor: RANK_COLORS[index],
            backgroundColor: RANK_COLORS[index],
            borderWidth: 3,
            pointRadius: 3,
            pointHoverRadius: 6,
            tension: 0.4,
            spanGaps: true,
        }))
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#262421',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#ffc800',
                borderWidth: 1,
                padding: 10,
                displayColors: true,
            },
        },
        scales: {
            y: {
                grid: {
                    color: '#3e3c39',
                    drawBorder: false,
                },
                ticks: {
                    color: '#989795',
                    font: {
                        size: 10,
                        weight: 'bold' as const,
                    },
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#989795',
                    font: {
                        size: 9,
                    },
                },
            },
        },
        interaction: {
            intersect: false,
            mode: 'index' as const,
        },
    };

    return (
        <StoryCard id="slide-elo" className={CONTAINERS.slideCard}>


            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">

                {/* Header */}
                <motion.div variants={itemVariants} className="w-full flex justify-start items-center px-4 mb-4 z-10">
                    <div className="w-20 h-20 bg-white rounded-full shadow-lg mr-3 flex-shrink-0">
                        <img
                            src={data.avatarUrl}
                            alt={data.username}
                            className="w-20 h-20 rounded-full object-cover border-4 border-[#81b64c]"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-white drop-shadow-md">
                        Rating History
                    </h2>
                </motion.div>

                {/* Peak ELO Display */}
                <motion.div variants={itemVariants} className="flex flex-col items-center justify-center py-3 z-10">
                    <span className="text-7xl font-black text-white leading-none drop-shadow-xl">
                        {/* @ts-ignore */}
                        {data.peakElo || 0}
                    </span>
                    <span className="text-[#989795] font-bold text-sm uppercase tracking-widest mt-2">
                        Peak Rating
                    </span>
                </motion.div>

                {/* Legend (Sorted by ELO) */}
                <motion.div variants={itemVariants} className="flex gap-4 mb-3 justify-center z-10">
                    {sortedModes.map((mode, index) => {
                        const deviation = stats[mode].change;

                        return (
                            <div key={mode} className="flex flex-col items-center bg-[#262421] px-3 py-2 rounded-lg border border-[#3e3c39]">
                                <span className="text-[10px] font-bold uppercase mb-1" style={{ color: RANK_COLORS[index] }}>
                                    {mode}
                                </span>
                                <div className="flex items-center gap-1 text-white font-bold text-sm">
                                    {deviation > 0 ? (
                                        <ArrowUp size={14} className="text-[#81b64c]" />
                                    ) : deviation < 0 ? (
                                        <ArrowDown size={14} className="text-[#ca3431]" />
                                    ) : (
                                        <Minus size={14} className="text-[#989795]" />
                                    )}
                                    {Math.abs(deviation)}
                                </div>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Graph */}
                <motion.div
                    variants={itemVariants}
                    className="w-full h-48 relative z-10 bg-[#262421] rounded-xl border border-[#3e3c39] p-3 shadow-lg"
                >
                    {shouldRenderChart && (
                        <Line data={chartData} options={chartOptions} />
                    )}
                </motion.div>

            </motion.div>
        </StoryCard>
    );
}