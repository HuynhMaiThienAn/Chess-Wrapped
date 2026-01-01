import { db } from '@/lib/db';
import { ChessGame } from '@/types';
import { CACHE_FRESHNESS_HOURS } from './constants';

interface CachedData {
    games: ChessGame[];
    updated_at: string;
}

interface CacheCheckResult {
    shouldUseCache: boolean;
    data: ChessGame[] | null;
}

/**
 * Checks if cached data exists and is fresh enough to use.
 */
export async function checkCache(
    username: string,
    year: string,
    month: string
): Promise<CacheCheckResult> {
    const { data: cached } = await db
        .from('game_archives')
        .select('games, updated_at')
        .eq('username', username)
        .eq('year', year)
        .eq('month', month)
        .single() as { data: CachedData | null };

    if (!cached || !cached.games) {
        return { shouldUseCache: false, data: null };
    }

    // Determine if this is the current month
    const now = new Date();
    const currentYearStr = now.getFullYear().toString();
    const currentMonthStr = String(now.getMonth() + 1).padStart(2, '0');
    const isCurrentMonth = year === currentYearStr && month === currentMonthStr;

    // Past months: Always safe to cache
    if (!isCurrentMonth) {
        return { shouldUseCache: true, data: cached.games };
    }

    // Current month: Check if cache is fresh (< 12 hours old)
    const lastUpdate = new Date(cached.updated_at).getTime();
    const hoursSinceUpdate = (Date.now() - lastUpdate) / (1000 * 60 * 60);

    if (hoursSinceUpdate < CACHE_FRESHNESS_HOURS) {
        console.log(`Cache HIT (Fresh): ${month}/${year}`);
        return { shouldUseCache: true, data: cached.games };
    } else {
        console.log(`Cache STALE (>${CACHE_FRESHNESS_HOURS}h old): ${month}/${year} - Refetching...`);
        return { shouldUseCache: false, data: null };
    }
}

/**
 * Writes game data to the cache.
 */
export async function writeCache(
    username: string,
    year: string,
    month: string,
    games: ChessGame[]
): Promise<void> {
    console.log(`Caching LARGE month for ${username}: ${games.length} games`);

    await (db.from('game_archives') as unknown as {
        upsert: (data: Record<string, unknown>, options: Record<string, string>) => Promise<void>;
    }).upsert({
        username: username,
        year: year,
        month: month,
        games: games,
        updated_at: new Date().toISOString()
    }, { onConflict: 'username, year, month' });
}
