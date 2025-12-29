import { ChessGame } from '@/types';
import { getPgnTag } from '../util';
import { formatResult, getPieceFromMove, calculateMoveCount } from './utils';
import { GameHighlight, UpsetHighlight, SpeedHighlight } from './types';

export function analyzeGeneral(games: ChessGame[], username: string) {
    let wins = 0;
    let losses = 0;
    let draws = 0;
    let totalSeconds = 0;

    let longestGame: GameHighlight | undefined = undefined;
    let shortestGame: GameHighlight | undefined = undefined;
    let biggestUpset: UpsetHighlight | undefined = undefined;
    let fastestWin: SpeedHighlight | undefined = undefined;

    const castling = { kingside: 0, queenside: 0, noCastle: 0 };

    const checkmateCounts: Record<string, number> = {};
    const variantCounts: Record<string, number> = {};
    const lowerUsername = username.toLowerCase();

    const winMethods: Record<string, number> = {};
    const lossMethods: Record<string, number> = {};
    const drawMethods: Record<string, number> = {};

    let currentWinStreak = 0;
    let longestWinStreak = 0;
    let currentLossStreak = 0;
    let longestLossStreak = 0;

    const uniqueDays = new Set<string>();

    const sortedGames = [...games].sort((a, b) => a.end_time - b.end_time);

    sortedGames.forEach(game => {
        const isWhite = game.white.username.toLowerCase() === lowerUsername;
        const userSide = isWhite ? game.white : game.black;
        const opponentSide = isWhite ? game.black : game.white;
        const result = userSide.result;

        let moveCount = 0;
        if (game.pgn) {
            moveCount = calculateMoveCount(game.pgn);
        }

        if (userSide.result === 'checkmated' && game.pgn) {
            const cleanPgn = game.pgn
                .replace(/\{[^}]+\}/g, '')
                .replace(/1-0|0-1|1\/2-1\/2/g, '')
                .trim();
            const moves = cleanPgn.split(/\s+/);
            const mateMove = moves.find(m => m.includes('#'));
            if (mateMove) {
                const piece = getPieceFromMove(mateMove);
                checkmateCounts[piece] = (checkmateCounts[piece] || 0) + 1;
            }
        }

        if (result === 'win') {
            wins++;
            const opponentRes = isWhite ? game.black.result : game.white.result;
            const method = formatResult(opponentRes);
            winMethods[method] = (winMethods[method] || 0) + 1;

            currentWinStreak++;
            currentLossStreak = 0;
            if (currentWinStreak > longestWinStreak) longestWinStreak = currentWinStreak;

            const myElo = userSide.rating;
            const opElo = opponentSide.rating;
            const diff = opElo - myElo;
            if (diff > 0 && (!biggestUpset || diff > biggestUpset.ratingDiff)) {
                biggestUpset = {
                    opponent: opponentSide.username,
                    ratingDiff: diff,
                    myElo,
                    opponentElo: opElo,
                    date: new Date(game.end_time * 1000).toLocaleDateString(),
                    url: game.url
                };
            }

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

        if (moveCount > 0) {
            const gameData = {
                opponent: opponentSide.username,
                moves: moveCount,
                result: formatResult(userSide.result),
                date: new Date(game.end_time * 1000).toLocaleDateString(),
                url: game.url
            };

            if (!longestGame || moveCount > longestGame.moves) {
                longestGame = gameData;
            }

            const invalidShortResults = ['abandoned', 'aborted', 'unknown'];
            if (!invalidShortResults.includes(userSide.result) && moveCount > 0) {
                if (!shortestGame || moveCount < shortestGame.moves) {
                    shortestGame = gameData;
                }
            }

            if (result === 'win' && moveCount > 0) {
                if (!fastestWin || moveCount < (fastestWin as SpeedHighlight).moves) {
                    fastestWin = {
                        opponent: opponentSide.username,
                        moves: moveCount,
                        date: new Date(game.end_time * 1000).toLocaleDateString(),
                        url: game.url
                    };
                }
            }
        }

        if (game.pgn) {
            const clean = game.pgn.replace(/\{[^}]+\}/g, '').replace(/\d+\.+/g, '').trim();
            const moves = clean.split(/\s+/);
            let castled = false;
            for (let i = 0; i < moves.length; i++) {
                const isUserMove = isWhite ? (i % 2 === 0) : (i % 2 !== 0);
                if (isUserMove) {
                    if (moves[i] === 'O-O') {
                        castling.kingside++;
                        castled = true;
                        break;
                    } else if (moves[i] === 'O-O-O') {
                        castling.queenside++;
                        castled = true;
                        break;
                    }
                }
            }
            if (!castled) castling.noCastle++;
        }

        if (game.end_time) {
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

    const sortedDays = Array.from(uniqueDays).sort();
    let longestDailyStreak = 0;
    let tempDaily = 0;
    for (let i = 0; i < sortedDays.length; i++) {
        if (i > 0) {
            const prev = new Date(sortedDays[i - 1]);
            const curr = new Date(sortedDays[i]);
            const diffTime = Math.abs(curr.getTime() - prev.getTime());
            const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) tempDaily++;
            else tempDaily = 1;
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
        drawMethods: sortMethods(drawMethods),
        checkmateByPiece: Object.entries(checkmateCounts)
            .map(([piece, count]) => ({ piece, count }))
            .sort((a, b) => b.count - a.count),
        longestGame,
        shortestGame,
        biggestUpset,
        fastestWin,
        castling
    };
}