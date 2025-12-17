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

const getPieceFromMove = (move: string): string => {
    const cleanMove = move.replace(/[+#x]/g, '');
    if (cleanMove.startsWith('N')) return 'Knight';
    if (cleanMove.startsWith('B')) return 'Bishop';
    if (cleanMove.startsWith('R')) return 'Rook';
    if (cleanMove.startsWith('Q')) return 'Queen';
    if (cleanMove.startsWith('K')) return 'King';
    if (cleanMove.startsWith('O')) return 'Rook';
    return 'Pawn';
};

// Robust helper to count moves by cleaning PGN
const calculateMoveCount = (pgn: string): number => {
    if (!pgn) return 0;

    let clean = pgn
        .replace(/\{[^}]+\}/g, '')     // Remove comments/timestamps {[%clk...]}
        .replace(/\([^)]+\)/g, '')     // Remove variations (...)
        .replace(/\$\d+/g, '')         // Remove NAGs ($1, $2...)
        .replace(/\d+\.+/g, ' ')       // Remove move numbers (1. or 1...)
        .replace(/(1-0|0-1|1\/2-1\/2|\*)$/, '') // Remove result at end
        .trim();

    // Split by whitespace and filter empty strings
    const tokens = clean.split(/\s+/).filter(t => t.length > 0);

    // Total plies (half-moves) / 2 = Full Moves. Round up (e.g. 3 plies = 2 moves)
    return Math.ceil(tokens.length / 2);
};

export function analyzeGeneral(games: ChessGame[], username: string) {
    let wins = 0;
    let losses = 0;
    let draws = 0;
    let totalSeconds = 0;

    // Trackers for Highlights
    let longestGame: { moves: any; opponent?: string; result?: string; date?: string; url?: string; } | null = null;
    let shortestGame: { moves: any; opponent?: string; result?: string; date?: string; url?: string; } | null = null;
    let biggestUpset: { ratingDiff: any; opponent?: string; myElo?: number; opponentElo?: number; date?: string; url?: string; } | null = null;
    let fastestWin: { moves: any; opponent?: string; result?: string; date?: string; url?: string; } | null = null;
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

        // --- PRE-CALCULATE MOVE COUNT (Used for multiple stats) ---
        let moveCount = 0;
        if (game.pgn) {
            moveCount = calculateMoveCount(game.pgn);
        }

        // --- CHECKMATE ANALYSIS ---
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

        // --- STREAKS & STATS ---
        if (result === 'win') {
            wins++;
            const opponentRes = isWhite ? game.black.result : game.white.result;
            const method = formatResult(opponentRes);
            winMethods[method] = (winMethods[method] || 0) + 1;

            currentWinStreak++;
            currentLossStreak = 0;
            if (currentWinStreak > longestWinStreak) longestWinStreak = currentWinStreak;

            // Upset Calculation
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

        // --- GAME LENGTH & HIGHLIGHTS ---
        if (moveCount > 0) {
            const gameData = {
                opponent: opponentSide.username,
                moves: moveCount,
                result: formatResult(userSide.result),
                date: new Date(game.end_time * 1000).toLocaleDateString(),
                url: game.url
            };

            // Longest Game
            if (!longestGame || moveCount > longestGame.moves) {
                longestGame = gameData;
            }

            // Shortest Game
            // Strictly check for decisive games (not aborted/drawn) and > 1 move
            const isDecisive = ['win', 'checkmated', 'resigned', 'timeout', 'time'].includes(userSide.result);
            if (isDecisive && moveCount >= 2) {
                if (!shortestGame || moveCount < shortestGame.moves) {
                    shortestGame = gameData;
                }
            }

            // Fastest Win
            if (result === 'win' && moveCount >= 2) {
                if (!fastestWin || moveCount < fastestWin.moves) {
                    fastestWin = gameData;
                }
            }
        }

        // --- CASTLING ---
        if (game.pgn) {
            const clean = game.pgn.replace(/\{[^}]+\}/g, '').replace(/\d+\.+/g, '').trim();
            const moves = clean.split(/\s+/);
            let castled = false;
            for (let i = 0; i < moves.length; i++) {
                // If White, indices 0, 2, 4... If Black, 1, 3, 5...
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

        // --- TIME & DATES ---
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

    // --- DAILY STREAK ---
    const sortedDays = Array.from(uniqueDays).sort();
    let longestDailyStreak = 0;
    let tempDaily = 0;
    for (let i = 0; i < sortedDays.length; i++) {
        if (i > 0) {
            const prev = new Date(sortedDays[i-1]);
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