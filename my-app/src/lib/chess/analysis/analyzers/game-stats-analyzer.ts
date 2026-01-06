import { ChessGame } from '@/types';

export interface GameStatsResult {
    wins: number;
    losses: number;
    draws: number;
}

/**
 * Analyzes basic game statistics including wins, losses, and draws.
 */
export function analyzeGameStats(
    games: ChessGame[],
    username: string
): GameStatsResult {
    let wins = 0;
    let losses = 0;
    let draws = 0;

    const lowerUsername = username.toLowerCase();

    games.forEach(game => {
        const isWhite = game.white.username.toLowerCase() === lowerUsername;
        const userSide = isWhite ? game.white : game.black;
        const result = userSide.result;

        // Count wins, losses, draws
        if (result === 'win') {
            wins++;
        } else if (['repetition', 'stalemate', 'insufficient', 'agreed', 'time', '50move'].includes(result)) {
            draws++;
        } else {
            losses++;
        }
    });

    return {
        wins,
        losses,
        draws
    };
}

