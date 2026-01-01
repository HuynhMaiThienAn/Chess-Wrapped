import { User, ChessGame } from '@/types';
import * as fetchers from './fetcher';
import * as mappers from './mapper';
import { checkCache, writeCache } from './cache';
import { MIN_GAMES_TO_CACHE, RATE_LIMIT_DELAY_MS } from './constants';

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

        for (const url of yearUrls) {
            const parts = url.split('/');
            const month = parts[parts.length - 1];

            // 1. CHECK CACHE
            const cacheResult = await checkCache(username, year, month);

            if (cacheResult.shouldUseCache && cacheResult.data) {
                const now = new Date();
                const currentYearStr = now.getFullYear().toString();
                const currentMonthStr = String(now.getMonth() + 1).padStart(2, '0');
                const isCurrentMonth = year === currentYearStr && month === currentMonthStr;

                if (!isCurrentMonth) {
                    console.log(`Cache HIT (Archive): ${month}/${year}`);
                }
                allGames.push(...cacheResult.data);
                continue;
            }

            // 2. FETCH FROM API (Cache Miss or Stale)
            try {
                console.log(`Fetching ${month}/${year} from API...`);
                const data = await fetchers.fetchRawMonth(url);

                allGames.push(...data.games);

                // Only cache if the month is "heavy"
                if (data.games.length >= MIN_GAMES_TO_CACHE) {
                    await writeCache(username, year, month, data.games);
                    await sleep(RATE_LIMIT_DELAY_MS);
                } else {
                    console.log(`Skipping cache for ${username}: ${data.games.length} games (Threshold: ${MIN_GAMES_TO_CACHE})`);
                }

            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                console.warn(`Failed to fetch ${url}: ${errorMessage}`);
            }
        }

        return allGames.sort((a, b) => a.end_time - b.end_time);

    } catch (error) {
        console.error(`Critical Error fetching games for ${username}`, error);
        return [];
    }
}