import { ChessGame } from '@/types';
import { getPgnTag } from '../util';

const formatResult = (result: string): string => {
    switch (result) {
        case 'win': return 'Win';
        case 'checkmated': return 'Checkmate';
        case 'agreed': return 'Agreement';
        case 'repetition': return 'Repetition';
        case 'timeout': return 'Timeout';
        case 'resigned': return 'Resignation';
        case 'stalemate': return 'Stalemate';
        case 'insufficient': return 'Insufficient Material';
        case '50move': return '50 Move Rule';
        case 'abandoned': return 'Abandonment';
        case 'time': return 'Timeout';
        case 'kingofthehill': return 'KOTH';
        case 'threecheck': return 'Three Check';
        case 'bughouse': return 'Bughouse';
        case 'crazyhouse': return 'Crazyhouse';
        default: return 'Other';
    }
};

export function analyzeGeneral(games: ChessGame[], username: string) {
    let wins = 0;
    let losses = 0;
    let draws = 0;
    let totalSeconds = 0;

    const variantCounts: Record<string, number> = {};
    const lowerUsername = username.toLowerCase();

    const winMethods: Record<string, number> = {};
    const lossMethods: Record<string, number> = {};
    const drawMethods: Record<string, number> = {};

    let currentWinStreak = 0;
    let longestWinStreak = 0;
    let currentLossStreak = 0;
    let longestLossStreak = 0;

    // Daily Streak Logic Prep
    const uniqueDays = new Set<string>();

    // 1. Sort games by Date (Oldest to Newest)
    const sortedGames = [...games].sort((a, b) => a.end_time - b.end_time);

    sortedGames.forEach(game => {
        const isWhite = game.white.username.toLowerCase() === lowerUsername;
        const userSide = isWhite ? game.white : game.black;
        const result = userSide.result;

        // --- STREAKS & STATS ---
        if (result === 'win') {
            wins++;
            const opponentRes = isWhite ? game.black.result : game.white.result;
            const method = formatResult(opponentRes);
            winMethods[method] = (winMethods[method] || 0) + 1;

            currentWinStreak++;
            currentLossStreak = 0;
            if (currentWinStreak > longestWinStreak) longestWinStreak = currentWinStreak;

        } else if (['repetition', 'stalemate', 'insufficient', 'agreed', 'time', '50move'].includes(result)) {
            draws++;
            const method = formatResult(result);
            drawMethods[method] = (drawMethods[method] || 0) + 1;
            currentWinStreak = 0;
            currentLossStreak = 0;

        } else {
            losses++;
            const method = formatResult(result);
            lossMethods[method] = (lossMethods[method] || 0) + 1;
            currentLossStreak++;
            currentWinStreak = 0;
            if (currentLossStreak > longestLossStreak) longestLossStreak = currentLossStreak;
        }

        // --- TIME & DATES ---
        if (game.end_time) {
            // Collect unique days for daily streak calculation
            const dayDate = new Date(game.end_time * 1000).toISOString().split('T')[0];
            uniqueDays.add(dayDate);
        }

        if (game.pgn) {
            const date = getPgnTag(game.pgn, 'Date')?.replace(/\./g, '-');
            const start = getPgnTag(game.pgn, 'StartTime');
            const end = getPgnTag(game.pgn, 'EndTime');

            if (date && start && end) {
                const startTime = new Date(`${date}T${start}Z`).getTime();
                const endTime = new Date(`${date}T${end}Z`).getTime();
                let diff = (endTime - startTime) / 1000;
                if (diff < 0) diff += 86400;
                if (diff > 0 && diff < 21600) totalSeconds += diff;
            }
        }

        const mode = game.time_class;
        const modeName = mode.charAt(0).toUpperCase() + mode.slice(1);
        variantCounts[modeName] = (variantCounts[modeName] || 0) + 1;
    });

    // --- CALCULATE LONGEST DAILY STREAK ---
    const sortedDays = Array.from(uniqueDays).sort();
    let longestDailyStreak = 0;
    let tempDaily = 0;

    for (let i = 0; i < sortedDays.length; i++) {
        if (i > 0) {
            const prev = new Date(sortedDays[i-1]);
            const curr = new Date(sortedDays[i]);
            // Calculate difference in days
            const diffTime = Math.abs(curr.getTime() - prev.getTime());
            const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                tempDaily++;
            } else {
                tempDaily = 1;
            }
        } else {
            tempDaily = 1;
        }
        longestDailyStreak = Math.max(longestDailyStreak, tempDaily);
    }

    const sortMethods = (map: Record<string, number>) => Object.entries(map).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
    const gamesByVariant = Object.entries(variantCounts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

    return {
        totalGames: games.length,
        totalHours: Math.round(totalSeconds / 3600),
        wins,
        losses,
        draws,
        winRate: games.length > 0 ? Math.round((wins / games.length) * 100) : 0,
        gamesByVariant,
        mostPlayedVariant: gamesByVariant.length > 0 ? gamesByVariant[0].name : 'Chess',
        longestWinStreak,
        longestLossStreak,
        longestDailyStreak,
        winMethods: sortMethods(winMethods),
        lossMethods: sortMethods(lossMethods),
        drawMethods: sortMethods(drawMethods)
    };
}