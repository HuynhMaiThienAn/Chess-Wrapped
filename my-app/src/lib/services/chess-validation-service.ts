/**
 * Service for validating Chess.com users and their game archives
 */

import { isValidUsername, hasPathTraversal, sanitizeUsername } from '@/lib/utils/security-utils';
import { ERROR_MESSAGES } from '@/lib/constants/error-messages';
import {
    ChessComArchivesResponse,
    ChessComPlayerResponse,
    isChessComArchivesResponse,
    isChessComPlayerResponse
} from '@/lib/types/chess-api.types';
import { logError } from '@/lib/utils/env-utils';

export interface ValidationResult {
    valid: boolean;
    error?: string;
    username?: string;
}

export class ChessValidationService {
    private static readonly BASE_URL = 'https://api.chess.com/pub/player';
    private static readonly USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,25}$/;

    /**
     * Validate if Chess.com user exists
     */
    static async validateUser(username: string): Promise<ValidationResult> {
        if (!username?.trim()) {
            return { valid: false, error: ERROR_MESSAGES.VALIDATION.USERNAME_REQUIRED };
        }

        const cleanUsername = sanitizeUsername(username.trim().toLowerCase());

        // Validate format BEFORE making API call
        if (!isValidUsername(cleanUsername)) {
            return {
                valid: false,
                error: ERROR_MESSAGES.VALIDATION.USERNAME_INVALID_FORMAT,
            };
        }

        // Prevent path traversal attempts
        if (hasPathTraversal(cleanUsername)) {
            return { valid: false, error: ERROR_MESSAGES.VALIDATION.INVALID_INPUT };
        }

        try {
            const response = await fetch(
                `${this.BASE_URL}/${cleanUsername}`,
                {
                    headers: { 'User-Agent': 'ChessWrapped/1.0' },
                    // Don't cache validation requests
                    cache: 'no-store',
                }
            );

            if (response.status === 404) {
                return {
                    valid: false,
                    error: ERROR_MESSAGES.VALIDATION.USER_NOT_FOUND,
                };
            }

            if (!response.ok) {
                return {
                    valid: false,
                    error: ERROR_MESSAGES.VALIDATION.API_ERROR,
                };
            }

            // Validate response type
            const data: unknown = await response.json();

            if (!isChessComPlayerResponse(data)) {
                logError('Invalid Chess.com player response', data);
                return {
                    valid: false,
                    error: ERROR_MESSAGES.VALIDATION.API_ERROR,
                };
            }

            return { valid: true, username: cleanUsername };
        } catch (error) {
            logError('Chess.com validation error', error);

            // Check if it's a timeout error
            if (error instanceof Error && error.name === 'TimeoutError') {
                return {
                    valid: false,
                    error: 'Request timeout. Please try again.',
                };
            }

            return {
                valid: false,
                error: ERROR_MESSAGES.VALIDATION.NETWORK_ERROR,
            };
        }
    }

    /**
     * Check if user has games for a specific year
     */
    static async hasGamesForYear(
        username: string,
        year: number = 2025
    ): Promise<ValidationResult> {
        try {
            const response = await fetch(
                `${this.BASE_URL}/${username}/games/archives`,
                {
                    headers: { 'User-Agent': 'ChessWrapped/1.0' },
                    cache: 'no-store',
                }
            );

            if (!response.ok) {
                return {
                    valid: false,
                    error: ERROR_MESSAGES.FETCH.ARCHIVES_FAILED,
                };
            }

            const data: unknown = await response.json();

            // Validate response type
            if (!isChessComArchivesResponse(data)) {
                logError('Invalid Chess.com archives response', data);
                return {
                    valid: false,
                    error: ERROR_MESSAGES.FETCH.ARCHIVES_FAILED,
                };
            }

            const yearString = `/${year}/`;
            const hasGames = data.archives.some((url) => url.includes(yearString));

            if (!hasGames) {
                return {
                    valid: false,
                    error: ERROR_MESSAGES.VALIDATION.NO_GAMES_FOUND(year),
                };
            }

            return { valid: true, username };
        } catch (error) {
            logError('Archive check error', error);

            if (error instanceof Error && error.name === 'TimeoutError') {
                return {
                    valid: false,
                    error: 'Request timeout. Please try again.',
                };
            }

            return {
                valid: false,
                error: ERROR_MESSAGES.FETCH.ARCHIVES_FAILED,
            };
        }
    }

    /**
     * Complete validation: user exists AND has games for year
     */
    static async validateComplete(
        username: string,
        year: number = 2025
    ): Promise<ValidationResult> {
        // Step 1: Validate user exists
        const userValidation = await this.validateUser(username);
        if (!userValidation.valid) {
            return userValidation;
        }

        // Step 2: Check for games
        const gamesValidation = await this.hasGamesForYear(
            userValidation.username!,
            year
        );

        return gamesValidation;
    }
}
