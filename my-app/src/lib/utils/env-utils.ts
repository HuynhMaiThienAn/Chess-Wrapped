/**
 * Environment detection utilities
 */

export function isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
}

export function isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
}

/**
 * Safe console.error that respects environment
 */
export function logError(message: string, error?: unknown): void {
    if (isDevelopment()) {
        console.error(message, error);
    } else {
        // In production, just log the message without details
        console.error(message);

        // TODO: Send to error tracking service
        // Sentry.captureException(error, { extra: { message } });
    }
}


