import { describe, it, expect, vi } from 'vitest';
import { generateWrappedStats } from '@/lib/chess/index';
import * as dataModule from '@/lib/chess/data';
import * as avatarService from '@/lib/chess/avatarService';

// Mock dependencies
vi.mock('@/lib/chess/data');
vi.mock('@/lib/chess/avatarService');
vi.mock('@/lib/db', () => ({ db: {} })); // Prevent Supabase initialization
vi.mock('@/lib/api-client', () => ({ apiRequest: vi.fn() })); // Prevent Axios initialization

describe('generateWrappedStats', () => {

    it('should orchestrate analysis correctly', async () => {
        // Setup Mocks
        const mockProfile = { username: 'testuser', avatarUrl: 'http://img.com/a.jpg' };
        // 3 games: 2 in same tournament, 1 in another
        const mockGames: any[] = [
            {
                pgn: '[Event "Titled Tuesday Tournament"][Date "2025.01.01"][Result "1-0"]',
                white: { username: 'testuser', result: 'win', rating: 1200 },
                black: { username: 'opponent1', result: 'checkmated', rating: 1100 },
                timeControl: '600',
                time_class: 'blitz',
                end_time: 1735689600, // 2025-01-01
                url: 'http://game.com/1'
            },
            {
                pgn: '[Event "Titled Tuesday Tournament"][Date "2025.01.01"][Result "0-1"]',
                white: { username: 'opponent2', result: 'win', rating: 1300 },
                black: { username: 'testuser', result: 'resigned', rating: 1200 },
                timeControl: '600',
                time_class: 'blitz',
                end_time: 1735693200,
                url: 'http://game.com/2'
            },
            {
                pgn: '[Event "Daily Arena"][Date "2025.02.01"][Result "1/2-1/2"]',
                white: { username: 'testuser', result: 'agreed', rating: 1200 },
                black: { username: 'opponent3', result: 'agreed', rating: 1200 },
                timeControl: '600',
                time_class: 'rapid',
                end_time: 1738368000,
                url: 'http://game.com/3'
            }
        ];

        vi.spyOn(dataModule, 'getUserProfile').mockResolvedValue(mockProfile as any);
        vi.spyOn(dataModule, 'fetchUserGames').mockResolvedValue(mockGames as any);
        vi.spyOn(avatarService, 'getAvatars').mockResolvedValue({
            friendsWithAvatars: [],
            matchesWithAvatars: []
        });

        // Execute
        const result = await generateWrappedStats('testuser');

        // Verify Data Fetching
        expect(dataModule.getUserProfile).toHaveBeenCalledWith('testuser');
        expect(dataModule.fetchUserGames).toHaveBeenCalledWith('testuser', '2025');

        // Verify Tournament Count Logic (2 unique events by name+date?)
        // Event 1: "Titled Tuesday Tournament" on "2025.01.01"
        // Event 2: "Titled Tuesday Tournament" on "2025.01.01" -> Same event instance?
        // Logic says: uniqueTournaments.add(`${eventName}|${date}`);
        // So 2 games in same tournament = 1 count.
        // Event 3: "Daily Arena" on "2025.02.01" -> New count.
        // Total should be 2.
        expect(result.tournamentCount).toBe(2);

        // Verify Basic Profile Merge
        expect(result.username).toBe('testuser');
        expect(result.year).toBe(2025);
    });

});
