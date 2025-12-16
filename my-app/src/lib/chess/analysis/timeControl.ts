import { ChessGame } from '@/types';
import { getPgnTag } from '../util';

export function analyzeTimeControl(games: ChessGame[], username: string) {
    const lowerUsername = username.toLowerCase();
    const normalize = (mode: string) => mode.charAt(0).toUpperCase() + mode.slice(1);

    interface TimeControlStats {
        games: number;
        wins: number;
        losses: number;
        draws: number;
        totalElo: number;
        eloCount: number;
        peakElo: number;
        totalDuration: number;
        durationCount: number;
    }

    const statsByTimeControl: Record<string, TimeControlStats> = {};

    games.forEach(game => {
        const timeControl = normalize(game.time_class);
        
        if (!statsByTimeControl[timeControl]) {
            statsByTimeControl[timeControl] = {
                games: 0,
                wins: 0,
                losses: 0,
                draws: 0,
                totalElo: 0,
                eloCount: 0,
                peakElo: 0,
                totalDuration: 0,
                durationCount: 0
            };
        }

        const stats = statsByTimeControl[timeControl];
        stats.games++;

        const isWhite = game.white.username.toLowerCase() === lowerUsername;
        const userSide = isWhite ? game.white : game.black;

        if (userSide.result === 'win') {
            stats.wins++;
        } else if (['repetition', 'stalemate', 'insufficient', 'agreed', 'time', '50move'].includes(userSide.result)) {
            stats.draws++;
        } else {
            stats.losses++;
        }

        // Track Elo for rated games
        if (game.rated) {
            const rating = isWhite ? game.white.rating : game.black.rating;
            stats.totalElo += rating;
            stats.eloCount++;
            if (rating > stats.peakElo) {
                stats.peakElo = rating;
            }
        }

        // Calculate game duration from PGN
        if (game.pgn) {
            const date = getPgnTag(game.pgn, 'Date')?.replace(/\./g, '-');
            const start = getPgnTag(game.pgn, 'StartTime');
            const end = getPgnTag(game.pgn, 'EndTime');

            if (date && start && end) {
                try {
                    const startTime = new Date(`${date}T${start}Z`).getTime();
                    const endTime = new Date(`${date}T${end}Z`).getTime();
                    let diff = (endTime - startTime) / 1000;

                    // Handle games crossing midnight
                    if (diff < 0) diff += 86400;
                    
                    // Only count reasonable durations (less than 6 hours)
                    if (diff > 0 && diff < 21600) {
                        stats.totalDuration += diff;
                        stats.durationCount++;
                    }
                } catch (e) {
                    // Invalid date format, skip
                }
            }
        }
    });

    // Convert to array format
    const breakdown = Object.entries(statsByTimeControl).map(([timeControl, stats]) => {
        const winRate = stats.games > 0 
            ? Math.round((stats.wins / stats.games) * 100) 
            : 0;
        
        const averageElo = stats.eloCount > 0
            ? Math.round(stats.totalElo / stats.eloCount)
            : 0;

        const averageGameDuration = stats.durationCount > 0
            ? Math.round(stats.totalDuration / stats.durationCount)
            : 0;

        return {
            timeControl,
            games: stats.games,
            wins: stats.wins,
            losses: stats.losses,
            draws: stats.draws,
            winRate,
            averageElo,
            peakElo: stats.peakElo,
            averageGameDuration
        };
    }).sort((a, b) => b.games - a.games); // Sort by most played

    return { timeControlBreakdown: breakdown };
}

