export function parseUsernameFromUrl(url: string | undefined, fallback: string): string {
    if (!url) return fallback;
    const parts = url.split('/');
    return parts[parts.length - 1] || fallback;
}

export function getPgnTag(pgn: string | undefined, tag: string): string | null {
    if (!pgn) return null;

    const tagKey = `[${tag} "`;
    const startIndex = pgn.indexOf(tagKey);

    if (startIndex === -1) return null;

    const valueStart = startIndex + tagKey.length;
    const valueEnd = pgn.indexOf('"]', valueStart);

    if (valueEnd === -1) return null;

    return pgn.substring(valueStart, valueEnd);
}

// 👇 UPDATED: Added logic to strip "with ..."
export function getOpeningFromPGN(pgn: string | undefined): string {
    if (!pgn) return 'Unknown';

    let name = '';

    // 1. Try ECOUrl first
    const urlMatch = pgn.match(/\[ECOUrl\s+"([^"]+)"\]/);
    if (urlMatch && urlMatch[1]) {
        const parts = urlMatch[1].split('/');
        let slug = parts[parts.length - 1];
        // Strip trailing move sequences from URL slug
        slug = slug.replace(/(-[0-9]+-[a-zA-Z0-9]+)+$/g, '');
        name = decodeURIComponent(slug).replace(/-/g, ' ');
    }
    // 2. Fallback to Opening Tag
    else {
        const openingMatch = pgn.match(/\[Opening\s+"([^"]+)"\]/);
        if (openingMatch && openingMatch[1] && openingMatch[1] !== '?') {
            name = openingMatch[1];
        }
    }

    if (!name || name === 'Unknown') return 'Unknown';

    // --- CLEANUP PIPELINE ---

    // 1. Remove "Variation"
    name = name.replace(/\bVariation\b/gi, '');

    // 2. 👇 NEW: Remove "with" and everything after it (e.g. "Modern Defense with 1-e4")
    name = name.replace(/\s+with\b.*/i, '');

    // 3. Remove punctuation
    name = name.replace(/[:|,]/g, '');

    // 4. Remove Numbered Moves (e.g. "1.e4", "1-d4")
    name = name.replace(/\b\d+[\.\-]+\s*(\.{3})?\s*\S+/g, '');

    // 5. Remove Ellipsis Moves (e.g. "...g6")
    name = name.replace(/\.{3}\s*\S+/g, '');

    // 6. Remove Standalone Notation
    const moveRegex = /\b(O-O(-O)?|[NBKQR]?[a-h]?[1-8]?x?[a-h][1-8])\b/g;
    name = name.replace(moveRegex, '');

    return name.replace(/\s+/g, ' ').trim();
}

export function normalizeAvatar(url: string | undefined): string {
    return url || 'https://www.chess.com/bundles/web/images/user-image.svg';
}

export function calculateWinRate(wins: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((wins / total) * 100);
}