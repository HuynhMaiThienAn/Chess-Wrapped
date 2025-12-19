import { User, ChessGame } from '@/types';
import * as fetchers from './fetcher';
import * as mappers from './mapper';

// Helper function to pause execution
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
        console.log(`Fetching archives for ${username}...`);
        const rawArchives = await fetchers.fetchRawArchives(username);
        const yearUrls = mappers.filterArchivesByYear(rawArchives.archives, year);

        if (yearUrls.length === 0) {
            console.warn(`No games found for ${username} in ${year}`);
            return [];
        }

        const monthlyData = [];

        // SEQUENTIAL LOOP WITH DELAY
        for (const url of yearUrls) {
            try {
                console.log(`Fetching: ${url}`); // Log progress
                const data = await fetchers.fetchRawMonth(url);
                monthlyData.push(data);

                // WAIT 200ms between requests to be polite to the API
                await sleep(200);

            } catch (err: any) {
                // Improved Logging: Prints the REAL error message
                console.warn(`Failed to fetch ${url}: ${err.message}`);
                if(err.response?.status === 429) {
                    console.error("RATE LIMITED! You need to wait a while.");
                }
            }
        }

        return mappers.flattenAndSortGames(monthlyData);

    } catch (error) {
        console.error(`Error fetching games for ${username}`, error);
        return [];
    }
}