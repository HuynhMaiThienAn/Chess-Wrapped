import { User, ChessGame } from '@/types';
import { RawProfileResponse, RawMonthlyGamesResponse } from './types';
import { parseUsernameFromUrl } from '../utils/username-utils';
import { normalizeAvatar } from '../utils/avatar-utils';

export function mapProfileToDomain(username: string, raw: RawProfileResponse): User {
    return {
        username: parseUsernameFromUrl(raw.url, username),
        avatarUrl: normalizeAvatar(raw.avatar),
        joinDate: raw.joined || 0,
        status: raw.status || 'basic' // too poor to afford diamond :(
    };
}

export function filterArchivesByYear(archives: string[], year: string): string[] {
    return archives.filter(url => url.includes(`/${year}/`));
}

export function flattenAndSortGames(monthlyResponses: RawMonthlyGamesResponse[]): ChessGame[] {
    return monthlyResponses
        .flatMap(res => res.games)
        .sort((a, b) => a.end_time - b.end_time);
}