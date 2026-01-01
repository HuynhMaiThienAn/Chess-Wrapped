import { ChessGame } from '@/types';
import { CastlingStats } from '../types';

/**
 * Analyzes castling patterns in games.
 */
export function analyzeCastling(
    games: ChessGame[],
    username: string
): CastlingStats {
    const castling: CastlingStats = {
        kingside: 0,
        queenside: 0,
        noCastle: 0
    };

    const lowerUsername = username.toLowerCase();

    games.forEach(game => {
        if (!game.pgn) return;

        const isWhite = game.white.username.toLowerCase() === lowerUsername;
        const clean = game.pgn
            .replace(/\{[^}]+\}/g, '')
            .replace(/\d+\.+/g, '')
            .trim();
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
        if (!castled) {
            castling.noCastle++;
        }
    });

    return castling;
}
