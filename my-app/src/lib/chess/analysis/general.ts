import { ChessGame } from '@/types';
import { getPgnTag } from '../util';

export function analyzeGeneral(games: ChessGame[], username: string) {
    let wins = 0;
    let losses = 0;
    let draws = 0;
    let totalSeconds = 0;

    const variantCounts: Record<string, number> = {};
    const lowerUsername = username.toLowerCase();

    games.forEach(game => {
        const isWhite = game.white.username.toLowerCase() === lowerUsername;
        const userSide = isWhite ? game.white : game.black;

        if (userSide.result === 'win') wins++;
        else if (['repetition', 'stalemate', 'insufficient', 'agreed', 'time', '50move'].includes(userSide.result)) draws++;
        else losses++;

        // Time Calculation
        if (game.pgn) {
            const date = getPgnTag(game.pgn, 'Date')?.replace(/\./g, '-');
            const start = getPgnTag(game.pgn, 'StartTime');
            const end = getPgnTag(game.pgn, 'EndTime');

            if (date && start && end) {
                const startTime = new Date(`${date}T${start}Z`).getTime();
                const endTime = new Date(`${date}T${end}Z`).getTime();

                let diff = (endTime - startTime) / 1000;

                // Handle games crossing midnight
                if (diff < 0) diff += 86400;
                if (diff > 0 && diff < 21600) {
                    totalSeconds += diff;
                }
            }
        }

        const mode = game.time_class;
        const modeName = mode.charAt(0).toUpperCase() + mode.slice(1);
        variantCounts[modeName] = (variantCounts[modeName] || 0) + 1;
    });

    // Sort variants by count
    const gamesByVariant = Object.entries(variantCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

    const mostPlayedVariant = gamesByVariant.length > 0 ? gamesByVariant[0].name : 'Chess';

    return {
        totalGames: games.length,
        totalHours: Math.round(totalSeconds / 3600),
        wins,
        losses,
        draws,
        winRate: games.length > 0 ? Math.round((wins / games.length) * 100) : 0,
        gamesByVariant,
        mostPlayedVariant
    };
}