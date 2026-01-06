import { ChessGame } from '@/types';
import { formatResult } from '../helpers/formatters';
import { MethodCount } from '../types';

export interface GameStatsResult {
    wins: number;
    losses: number;
    draws: number;
    winMethods: MethodCount[];
    lossMethods: MethodCount[];
    drawMethods: MethodCount[];
}

/**
 * Analyzes basic game statistics including wins, losses, draws, and methods.
 */
export function analyzeGameStats(
    games: ChessGame[],
    username: string
): GameStatsResult {
    let wins = 0;
    let losses = 0;
    let draws = 0;

    const winMethods: Record<string, number> = {};
    const lossMethods: Record<string, number> = {};
    const drawMethods: Record<string, number> = {};

    const lowerUsername = username.toLowerCase();

    games.forEach(game => {
        const isWhite = game.white.username.toLowerCase() === lowerUsername;
        const userSide = isWhite ? game.white : game.black;
        const result = userSide.result;

        // Count wins, losses, draws and their methods
        if (result === 'win') {
            wins++;
            const opponentRes = isWhite ? game.black.result : game.white.result;
            const method = formatResult(opponentRes);
            winMethods[method] = (winMethods[method] || 0) + 1;
        } else if (['repetition', 'stalemate', 'insufficient', 'agreed', 'time', '50move'].includes(result)) {
            draws++;
            const method = formatResult(result);
            drawMethods[method] = (drawMethods[method] || 0) + 1;
        } else {
            losses++;
            const method = formatResult(result);
            lossMethods[method] = (lossMethods[method] || 0) + 1;
        }
    });

    const sortMethods = (map: Record<string, number>): MethodCount[] =>
        Object.entries(map)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);

    return {
        wins,
        losses,
        draws,
        winMethods: sortMethods(winMethods),
        lossMethods: sortMethods(lossMethods),
        drawMethods: sortMethods(drawMethods)
    };
}
