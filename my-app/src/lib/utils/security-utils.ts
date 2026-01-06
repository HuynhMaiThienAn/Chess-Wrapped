/**
 * Security utilities for input sanitization and validation
 */

/**
 * Sanitize username to prevent XSS attacks
 * - Remove HTML tags
 * - Remove script tags
 * - Limit to alphanumeric, hyphen, underscore
 */
export function sanitizeUsername(username: string): string {
    if (!username) return '';

    // Remove any HTML tags
    const withoutTags = username.replace(/<[^>]*>/g, '');

    // Chess.com usernames are alphanumeric + hyphen/underscore
    const sanitized = withoutTags.replace(/[^a-zA-Z0-9_-]/g, '');

    // Limit length to Chess.com's max username length
    return sanitized.slice(0, 50);
}

/**
 * Validate username format against Chess.com rules
 * - 3-25 characters
 * - Letters, numbers, hyphen, underscore only
 */
export function isValidUsername(username: string): boolean {
    if (!username) return false;

    const usernameRegex = /^[a-zA-Z0-9_-]{3,25}$/;
    return usernameRegex.test(username);
}

/**
 * Escape HTML special characters to prevent XSS in metadata
 */
export function escapeHtml(text: string): string {
    if (!text) return '';

    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };

    return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Check if string contains path traversal attempts
 */
export function hasPathTraversal(input: string): boolean {
    return input.includes('..') || input.includes('/') || input.includes('\\');
}

/**
 * Sanitize and validate username for safe usage
 * Returns sanitized username or throws error if invalid
 */
export function validateAndSanitizeUsername(username: string): string {
    const sanitized = sanitizeUsername(username);

    if (!isValidUsername(sanitized)) {
        throw new Error('Invalid username format');
    }

    if (hasPathTraversal(sanitized)) {
        throw new Error('Invalid username');
    }

    return sanitized;
}
