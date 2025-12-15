import { apiRequest } from '@/lib/api-client';
import { RawProfileResponse, RawArchivesResponse, RawMonthlyGamesResponse } from './types';

export async function fetchRawProfile(username: string): Promise<RawProfileResponse> {
    return apiRequest<RawProfileResponse>(`/player/${username}`, 'GET');
}

export async function fetchRawArchives(username: string): Promise<RawArchivesResponse> {
    return apiRequest<RawArchivesResponse>(`/player/${username}/games/archives`, 'GET');
}

export async function fetchRawMonth(url: string): Promise<RawMonthlyGamesResponse> {
    return apiRequest<RawMonthlyGamesResponse>(url, 'GET');
}