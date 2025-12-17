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

    games.forEach(game => {
        const isWhite = game.white.username.toLowerCase() === lowerUsername;
        const userSide = isWhite ? game.white : game.black;

        if (userSide.result === 'win') {
            wins++;
            const opponentRes = isWhite ? game.black.result : game.white.result;
            const method = formatResult(opponentRes);
            winMethods[method] = (winMethods[method] || 0) + 1;
        }
        else if (['repetition', 'stalemate', 'insufficient', 'agreed', 'time', '50move'].includes(userSide.result)) {
            draws++;
            const method = formatResult(userSide.result);
            drawMethods[method] = (drawMethods[method] || 0) + 1;
        }
        else {
            losses++;
            const method = formatResult(userSide.result);
            lossMethods[method] = (lossMethods[method] || 0) + 1;
        }

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

    const sortMethods = (map: Record<string, number>) => {
        return Object.entries(map)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    };

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
        mostPlayedVariant,
        winMethods: sortMethods(winMethods),
        lossMethods: sortMethods(lossMethods),
        drawMethods: sortMethods(drawMethods)
    };
}