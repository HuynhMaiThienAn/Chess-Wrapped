import { ChessGame } from '@/types';
import { formatResult } from './helpers/formatters';
import { calculateMoveCount } from './helpers/pgn-parser';
import { StreakTracker } from './helpers/streak-calculator';
import { HighlightTracker } from './helpers/highlight-tracker';
import { analyzeGameStats } from './analyzers/game-stats-analyzer';
import { analyzeCastling } from './analyzers/castling-analyzer';
import { analyzeTime } from './analyzers/time-analyzer';
import { analyzeVariants } from './analyzers/variant-analyzer';
import { GameHighlight, SpeedHighlight, UpsetHighlight } from './types';

export function analyzeGeneral(games: ChessGame[], username: string) {
    const lowerUsername = username.toLowerCase();

    // Initialize trackers
    const streakTracker = new StreakTracker();
    const highlightTracker = new HighlightTracker();

    // Sort games chronologically
    const sortedGames = [...games].sort((a, b) => a.end_time - b.end_time);

    // Process each game for streaks and highlights
    sortedGames.forEach(game => {
        const isWhite = game.white.username.toLowerCase() === lowerUsername;
        const userSide = isWhite ? game.white : game.black;
        const opponentSide = isWhite ? game.black : game.white;
        const result = userSide.result;

        // Calculate move count
        const moveCount = game.pgn ? calculateMoveCount(game.pgn) : 0;

        // Update streaks
        if (result === 'win') {
            streakTracker.recordWin();

            // Track biggest upset
            const myElo = userSide.rating;
            const opElo = opponentSide.rating;
            const diff = opElo - myElo;
            if (diff > 0) {
                const upsetData: UpsetHighlight = {
                    opponent: opponentSide.username,
                    ratingDiff: diff,
                    myElo,
                    opponentElo: opElo,
                    date: new Date(game.end_time * 1000).toLocaleDateString(),
                    url: game.url
                };
                highlightTracker.updateBiggestUpset(upsetData);
            }

            // Track fastest win
            if (moveCount > 0) {
                const speedData: SpeedHighlight = {
                    opponent: opponentSide.username,
                    moves: moveCount,
                    date: new Date(game.end_time * 1000).toLocaleDateString(),
                    url: game.url
                };
                highlightTracker.updateFastestWin(speedData);
            }
        } else if (['repetition', 'stalemate', 'insufficient', 'agreed', 'time', '50move'].includes(result)) {
            streakTracker.recordDraw();
        } else {
            streakTracker.recordLoss();
        }

        // Track game length highlights
        if (moveCount > 0) {
            const gameData: GameHighlight = {
                opponent: opponentSide.username,
                moves: moveCount,
                result: formatResult(userSide.result),
                date: new Date(game.end_time * 1000).toLocaleDateString(),
                url: game.url,
                pgn: game.pgn
            };

            highlightTracker.updateLongestGame(gameData);
        }
    });

    // Delegate to specialized analyzers
    const gameStats = analyzeGameStats(games, username);
    const castlingStats = analyzeCastling(games, username);
    const timeStats = analyzeTime(games);
    const variantStats = analyzeVariants(games);
    const highlights = highlightTracker.getHighlights();

    // Aggregate and return results
    return {
        totalGames: games.length,
        totalHours: timeStats.totalHours,
        wins: gameStats.wins,
        losses: gameStats.losses,
        draws: gameStats.draws,
        winRate: games.length > 0 ? Math.round((gameStats.wins / games.length) * 100) : 0,
        gamesByVariant: variantStats.gamesByVariant,
        mostPlayedVariant: variantStats.mostPlayedVariant,
        longestWinStreak: streakTracker.getLongestWinStreak(),
        longestLossStreak: streakTracker.getLongestLossStreak(),
        longestDailyStreak: timeStats.longestDailyStreak,

        longestGame: highlights.longestGame,
        biggestUpset: highlights.biggestUpset,
        fastestWin: highlights.fastestWin,
        castling: castlingStats
    };
}