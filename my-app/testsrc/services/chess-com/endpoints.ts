import { apiClient } from '../api/client';
import { mapProfileToDomain, mapGamesToDomain } from './mappers';
import { RawArchivesSchema } from './schemas';
import { User, ChessGame } from '../../types';

export const fetchUserProfile = async (username: string): Promise<User> => {
    try {
        const { data } = await apiClient.get(`/player/${username}`);
        return mapProfileToDomain(username, data);
    } catch (error) {
        console.error(`Error fetching profile for ${username}:`, error);
        throw new Error('Failed to fetch user profile');
    }
};

export const fetchArchives = async (username: string): Promise<string[]> => {
    try {
        const { data } = await apiClient.get(`/player/${username}/games/archives`);
        // Quick inline validation for simple arrays
        const result = RawArchivesSchema.safeParse(data);
        return result.success ? result.data.archives : [];
    } catch (error) {
        return [];
    }
};

export const fetchGamesByUrl = async (url: string): Promise<ChessGame[]> => {
    try {
        const { data } = await apiClient.get(url);
        return mapGamesToDomain(data);
    } catch (error) {
        console.error(`Error fetching games from ${url}:`, error);
        return [];
    }
};