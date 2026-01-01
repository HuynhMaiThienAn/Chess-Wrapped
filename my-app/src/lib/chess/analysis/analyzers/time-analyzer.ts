import { ChessGame } from '@/types';
import { calculateLongestDailyStreak } from '../helpers/streak-calculator';

export interface TimeAnalysisResult {
    totalHours: number;
    longestDailyStreak: number;
}

/**
 * Analyzes time-related statistics including total hours played and daily streaks.
 */
export function analyzeTime(games: ChessGame[]): TimeAnalysisResult {
    let totalSeconds = 0;
    const uniqueDays = new Set<string>();

    games.forEach(game => {
        // Track unique playing days
        if (game.end_time) {
            const dayDate = new Date(game.end_time * 1000).toISOString().split('T')[0];
            uniqueDays.add(dayDate);
        }

        // Calculate total time played from PGN timestamps
        if (game.pgn) {
            const dateMatch = game.pgn.match(/\[Date "([^"]+)"\]/);
            const startMatch = game.pgn.match(/\[StartTime "([^"]+)"\]/);
            const endMatch = game.pgn.match(/\[EndTime "([^"]+)"\]/);

            if (dateMatch && startMatch && endMatch) {
                const date = dateMatch[1].replace(/\./g, '-');
                const start = startMatch[1];
                const end = endMatch[1];

                const startTime = new Date(`${date}T${start}Z`).getTime();
                const endTime = new Date(`${date}T${end}Z`).getTime();
                let diff = (endTime - startTime) / 1000;

                // Handle day rollover
                if (diff < 0) diff += 86400;

                // Only count reasonable game durations (< 6 hours)
                if (diff > 0 && diff < 21600) {
                    totalSeconds += diff;
                }
            }
        }
    });

    return {
        totalHours: Math.round(totalSeconds / 3600),
        longestDailyStreak: calculateLongestDailyStreak(uniqueDays)
    };
}
