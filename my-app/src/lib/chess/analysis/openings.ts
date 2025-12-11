import { ChessGame, OpeningStat } from '@/types';
import { getOpeningFromPGN, calculateWinRate } from '../util';

interface RawOpening {
    wins: number;
    total: number;
    highestElo: number;
}

export function analyzeOpenings(games: ChessGame[], username: string) {
    const whiteOps: Record<string, RawOpening> = {};
    const blackOps: Record<string, RawOpening> = {};
    const lowerUsername = username.toLowerCase();

    // Helper to process a single game record
    const process = (record: Record<string, RawOpening>, name: string, won: boolean, elo: number) => {
        if (!record[name]) record[name] = { wins: 0, total: 0, highestElo: 0 };
        record[name].total += 1;
        if (won) {
            record[name].wins += 1;
            if (elo > record[name].highestElo) record[name].highestElo = elo;
        }
    };

    const uniqueWhite = new Set<string>();
    const uniqueBlack = new Set<string>();

    games.forEach(game => {
        const rawName = getOpeningFromPGN(game.pgn);
        const name = rawName.split(':')[0].trim();

        if (name === 'Unknown' || name.startsWith('?')) return;

        const isWhite = game.white.username.toLowerCase() === lowerUsername;
        const userSide = isWhite ? game.white : game.black;
        const won = userSide.result === 'win';
        const opponentElo = isWhite ? game.black.rating : game.white.rating;

        if (isWhite) {
            uniqueWhite.add(name);
            process(whiteOps, name, won, opponentElo);
        } else {
            uniqueBlack.add(name);
            process(blackOps, name, won, opponentElo);
        }
    });

    // Helper
    const formatStats = (record: Record<string, RawOpening>, sortType: 'best' | 'worst'): OpeningStat[] => {
        return Object.entries(record)
            .filter(([_, stats]) => stats.total >= 5) // Minimum 5 games to be statistically relevant
            .map(([name, stats]) => ({
                name,
                count: stats.total,
                winRate: calculateWinRate(stats.wins, stats.total),
                highestWinElo: stats.highestElo
            }))
            .sort((a, b) => {
                if (sortType === 'best') return b.count - a.count; // Most played
                return a.winRate - b.winRate; // Lowest winrate first for 'worst'
            })
            .slice(0, 1);
    };

    return {
        uniqueWhiteVariants: uniqueWhite.size,
        uniqueBlackVariants: uniqueBlack.size,
        topOpeningsWhite: formatStats(whiteOps, 'best'),
        topOpeningsBlack: formatStats(blackOps, 'best'),
        worstOpeningsWhite: formatStats(whiteOps, 'worst'),
        worstOpeningsBlack: formatStats(blackOps, 'worst')
    };
}