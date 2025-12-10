export function parseUsernameFromUrl(url: string | undefined, fallback: string): string {
    if (!url) return fallback;
    const parts = url.split('/');
    return parts[parts.length - 1] || fallback;
}

export function getPgnTag(pgn: string | undefined, tag: string): string | null {
    if (!pgn) return null;
    // Regex looks for [TagName "Value"]
    const match = pgn.match(new RegExp(`\\[${tag} "([^"]+)"\\]`));
    return match ? match[1] : null;
}

export function getOpeningFromPGN(pgn: string | undefined): string {
    if (!pgn) return 'Unknown';
    const openingMatch = pgn.match(/\[Opening "([^"]+)"\]/);
    if (openingMatch && openingMatch[1]) {
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