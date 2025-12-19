import { User, ChessGame } from '../../types';
import { RawProfileSchema, RawMonthlyGamesSchema } from './schemas';

/**
 * Validates and transforms a raw profile response into a User entity.
 */
export function mapProfileToDomain(username: string, input: unknown): User {
    const result = RawProfileSchema.safeParse(input);

    if (!result.success) {
        console.error(`[Mapper] Profile validation failed for ${username}`, result.error);
        // Fallback for safety - prevents app crash
        return {
            username,
            avatarUrl: "https://www.chess.com/bundles/web/images/user-image.svg",
            joinDate: Date.now() / 1000,
            status: 'basic'
        };
    }

    const data = result.data;

    // Logic to fix URL-based username casing
    return {
        username: data.url.split('/').pop() || username,
        avatarUrl: data.avatar || "https://www.chess.com/bundles/web/images/user-image.svg",
        joinDate: data.joined || 0,
        status: data.status
    };
}

/**
 * Validates and flattens the games list.
 */
export function mapGamesToDomain(input: unknown): ChessGame[] {
    const result = RawMonthlyGamesSchema.safeParse(input);

    if (!result.success) {
        console.warn(`[Mapper] Games validation failed`, result.error);
        return []; // Return empty array so analysis can continue with other months
    }

    // Filter out games without PGNs
    return result.data.games.filter(g => !!g.pgn) as ChessGame[];
}