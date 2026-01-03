/**
 * Environment detection utilities
 */

export function isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
}

export function isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
}

export function isTest(): boolean {
    return process.env.NODE_ENV === 'test';
}

/**
 * Get the base URL for the application
 */
export function getBaseUrl(): string {
    if (process.env.NEXT_PUBLIC_URL) {
        return process.env.NEXT_PUBLIC_URL;
    }

    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
        return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    }

    return 'http://localhost:3000';
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

/**
 * Safe console.log for debugging
 */
export function logDebug(message: string, data?: unknown): void {
    if (isDevelopment()) {
        console.log(message, data);
    }
}
