import { User, ChessGame } from '@/types';
import * as fetchers from './fetcher';
import * as mappers from './mapper';
import { db } from '@/lib/db';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getUserProfile(username: string): Promise<User> {
    try {
        const rawProfile = await fetchers.fetchRawProfile(username);
        return mappers.mapProfileToDomain(username, rawProfile);
    } catch (error) {
        console.error(`Error fetching profile for ${username}`, error);
        return mappers.mapProfileToDomain(username, {});
    }
}

export async function fetchUserGames(username: string, year: string): Promise<ChessGame[]> {
    try {
        console.log(`\nStarting fetch for ${username} (${year})...`);
        const rawArchives = await fetchers.fetchRawArchives(username);
        const yearUrls = mappers.filterArchivesByYear(rawArchives.archives, year);

        if (yearUrls.length === 0) return [];

        const allGames: ChessGame[] = [];

        // Helper to check if a month is the current real-world month
        const now = new Date();
        const currentYearStr = now.getFullYear().toString();
        const currentMonthStr = String(now.getMonth() + 1).padStart(2, '0');

        for (const url of yearUrls) {
            const parts = url.split('/');
            const month = parts[parts.length - 1];

            // 1. CHECK DATABASE (CACHE)
            const { data: cached } = await db
                .from('game_archives')
                .select('games, updated_at')
                .eq('username', username)
                .eq('year', year)
                .eq('month', month)
                .single() as any;

            let shouldUseCache = false;

            if (cached && cached.games) {
                // A. Past months: Always safe to cache
                if (year !== currentYearStr || month !== currentMonthStr) {
                    shouldUseCache = true;
                }
                // B. Current month < 12 hours old
                else {
                    const lastUpdate = new Date(cached.updated_at).getTime();
                    const hoursSinceUpdate = (Date.now() - lastUpdate) / (1000 * 60 * 60);

                    if (hoursSinceUpdate < 12) {
                        shouldUseCache = true;
                        console.log(`Cache HIT (Fresh): ${month}/${year}`);
                    } else {
                        console.log(`Cache STALE (>12h old): ${month}/${year} - Refetching...`);
                    }
                }
            }

            if (shouldUseCache && cached) {
                if (year !== currentYearStr || month !== currentMonthStr) {
                    console.log(`Cache HIT (Archive): ${month}/${year}`);
                }
                allGames.push(...cached.games);
                continue;
            }

            // 2. FETCH FROM API (Cache Miss or Stale)
            try {
                console.log(`Fetching ${month}/${year} from API...`);
                const data = await fetchers.fetchRawMonth(url);

                allGames.push(...data.games);

                // 3. UPSERT TO DATABASE
                await db.from('game_archives').upsert({
                    username: username,
                    year: year,
                    month: month,
                    games: data.games,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'username, year, month' });

                await sleep(200);

            } catch (err: any) {
                console.warn(`Failed to fetch ${url}: ${err.message}`);
            }
        }

        return allGames.sort((a, b) => a.end_time - b.end_time);

    } catch (error) {
        console.error(`Critical Error fetching games for ${username}`, error);
        return [];
    }
}