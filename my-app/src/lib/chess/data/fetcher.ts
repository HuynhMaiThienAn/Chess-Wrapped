import { apiRequest } from '@/lib/api-client';
import { RawProfileResponse, RawArchivesResponse, RawMonthlyGamesResponse } from './types';
import redis from '@/lib/redis';

export async function fetchRawProfile(username: string): Promise<RawProfileResponse> {
    return apiRequest<RawProfileResponse>(`/player/${username}`);
}

export async function fetchRawArchives(username: string): Promise<RawArchivesResponse> {
    return apiRequest<RawArchivesResponse>(`/player/${username}/games/archives`);
}

export async function fetchRawMonth(url: string): Promise<RawMonthlyGamesResponse> {
    try {
        const cache = await redis.get(url);

        if (cache) {
            console.log(`[REDIS] Cache HIT for ${url}`);
            return JSON.parse(cache);
        }

        console.log(`[REDIS] Cache MISS for ${url}`);

        const data = await apiRequest<RawMonthlyGamesResponse>(url, {
            cache: 'no-store'
        });

        await redis.set(url, JSON.stringify(data), 'EX', 86400);

        return data;
    } catch (error) {
        console.error(`Redis Error for ${url}:`, error);
        // Fallback if Redis fails
        return apiRequest<RawMonthlyGamesResponse>(url, { cache: 'no-store' });
    }
}