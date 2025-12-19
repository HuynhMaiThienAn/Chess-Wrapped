import { User, ChessGame } from '@/types';
import * as fetchers from './fetcher';
import * as mappers from './mapper';

export async function getUserProfile(username: string): Promise<User> {
    try {
        const rawProfile = await fetchers.fetchRawProfile(username);
        return mappers.mapProfileToDomain(username, rawProfile);
    } catch (error) {
        console.error(`Error fetching profile for ${username}`, error);
        // Fail safe cuz why not
        return mappers.mapProfileToDomain(username, {});
    }
}

export async function fetchUserGames(username: string, year: string): Promise<ChessGame[]> {
    try {
        // Get List of Available Months
        const rawArchives = await fetchers.fetchRawArchives(username);

        // Filter for Requested Year
        const yearUrls = mappers.filterArchivesByYear(rawArchives.archives, year);

        if (yearUrls.length === 0) {
            console.warn(`No games found for ${username} in ${year}`);
            return [];
        }
        const monthlyData = await Promise.all(
            yearUrls.map(url => fetchers.fetchRawMonth(url))
        );
        return mappers.flattenAndSortGames(monthlyData);

    } catch (error) {
        console.error(`Error fetching games for ${username}`, error);
        return [];
    }
}