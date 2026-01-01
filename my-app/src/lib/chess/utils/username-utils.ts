/**
 * Parses username from a Chess.com profile URL.
 */
export function parseUsernameFromUrl(url: string | undefined, fallback: string): string {
    if (!url) return fallback;
    const parts = url.split('/');
    return parts[parts.length - 1] || fallback;
}
