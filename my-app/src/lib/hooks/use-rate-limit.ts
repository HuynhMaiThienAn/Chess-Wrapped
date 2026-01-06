'use client';

import { useRef } from 'react';

type AsyncFunction = (...args: any[]) => Promise<any>;

interface UseRateLimitOptions {
    delayMs?: number;
    maxAttempts?: number;
}

/**
 * Rate limiting hook for preventing spam/abuse
 * @param fn Function to rate limit
 * @param options Configuration options
 */
export function useRateLimit(
    fn: AsyncFunction,
    options: UseRateLimitOptions = {}
) {
    const { delayMs = 2000, maxAttempts = 5 } = options;

    const lastCallRef = useRef<number>(0);
    const attemptCountRef = useRef<number>(0);
    const resetTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    return async (...args: any[]) => {
        const now = Date.now();
        const timeSinceLastCall = now - lastCallRef.current;

        // Reset attempt count after delay period
        if (timeSinceLastCall > delayMs * 2) {
            attemptCountRef.current = 0;
        }

        // Check if too many attempts
        if (attemptCountRef.current >= maxAttempts) {
            throw new Error('Too many attempts. Please wait before trying again.');
        }

        // Check if called too soon
        if (timeSinceLastCall < delayMs) {
            throw new Error(`Please wait ${Math.ceil((delayMs - timeSinceLastCall) / 1000)} seconds before trying again.`);
        }

        lastCallRef.current = now;
        attemptCountRef.current++;

        // Schedule reset
        if (resetTimeoutRef.current) {
            clearTimeout(resetTimeoutRef.current);
        }
        resetTimeoutRef.current = setTimeout(() => {
            attemptCountRef.current = 0;
        }, delayMs * 2);

        return fn(...args);
    };
}
