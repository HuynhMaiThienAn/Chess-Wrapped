/**
 * Centralized error messages for consistency and easy localization
 */

export const ERROR_MESSAGES = {
    VALIDATION: {
        USERNAME_REQUIRED: 'Username is required',
        USERNAME_INVALID_FORMAT: 'Invalid username format. Use 3-25 characters (letters, numbers, _, -)',
        USERNAME_TOO_SHORT: 'Username must be at least 3 characters',
        USERNAME_TOO_LONG: 'Username must be 25 characters or less',
        USER_NOT_FOUND: 'User not found on Chess.com!',
        NO_GAMES_FOUND: (year: number) => `No games found for ${year}!`,
        API_ERROR: 'API Connection Error',
        NETWORK_ERROR: 'Network error. Please try again.',
        RATE_LIMIT: 'Please wait before trying again',
        INVALID_INPUT: 'Invalid input provided',
    },
    GENERAL: {
        SOMETHING_WRONG: 'Something went wrong',
        TRY_AGAIN: 'Please try again later',
        LOADING: 'Loading...',
        ERROR_OCCURRED: 'An error occurred',
    },
    FETCH: {
        ARCHIVES_FAILED: 'Failed to fetch game archives',
        PROFILE_FAILED: 'Failed to fetch player profile',
        GAMES_FAILED: 'Failed to fetch games',
    },
} as const;
