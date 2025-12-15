export function parseUsernameFromUrl(url: string | undefined, fallback: string): string {
    if (!url) return fallback;
    const parts = url.split('/');
    return parts[parts.length - 1] || fallback;
}

// src/lib/chess/util.ts

export function getPgnTag(pgn: string | undefined, tag: string): string | null {
    if (!pgn) return null;

    // String search instead of Regex
    const tagKey = `[${tag} "`;
    const startIndex = pgn.indexOf(tagKey);

    if (startIndex === -1) return null;

    const valueStart = startIndex + tagKey.length;
    const valueEnd = pgn.indexOf('"]', valueStart);

    if (valueEnd === -1) return null;

    return pgn.substring(valueStart, valueEnd);
}

export function getOpeningFromPGN(pgn: string | undefined): string {
    if (!pgn) return 'Unknown';

    // 1. Try ECOUrl first (Most reliable on Chess.com)
    // Fix: Used \] instead of \\] to correctly match the closing bracket
    const urlMatch = pgn.match(/\[ECOUrl\s+"([^"]+)"\]/);
    if (urlMatch && urlMatch[1]) {
        const parts = urlMatch[1].split('/');
        const slug = parts[parts.length - 1];
        // Clean up the slug: "Sicilian-Defense-Najdorf" -> "Sicilian Defense Najdorf"
        return slug.replace(/-/g, ' ').replace(/Variation/g, '').trim();
    }

    // 2. Fallback to standard Opening tag
    const openingMatch = pgn.match(/\[Opening\s+"([^"]+)"\]/);
    if (openingMatch && openingMatch[1] && openingMatch[1] !== '?') {
        return openingMatch[1];
    }

    return 'Unknown';
}

export function normalizeAvatar(url: string | undefined): string {
    return url || 'https://www.chess.com/bundles/web/images/user-image.svg';
}

export function calculateWinRate(wins: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((wins / total) * 100);
}