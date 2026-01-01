/**
 * Robust helper to count moves in a PGN string.
 * Handles various PGN formats and edge cases.
 */
export function calculateMoveCount(pgn: string): number {
    if (!pgn) return 0;

    // 1. Clean up PGN
    let clean = pgn
        // Remove timestamps/comments { ... }
        .replace(/\{[^}]+\}/g, '')
        // Remove variations ( ... ) - basic handling for non-nested
        .replace(/\([^)]+\)/g, '')
        // Remove NAGs $1, $2
        .replace(/\$\d+/g, '')
        // Remove Result at end
        .replace(/(1-0|0-1|1\/2-1\/2|\*)$/, '')
        .trim();

    // 2. Try to find the last move number (e.g. "45." or "45...")
    // This is generally most accurate for standard PGNs
    const moveNumberMatches = clean.match(/(\d+)\.+/g);

    if (moveNumberMatches && moveNumberMatches.length > 0) {
        const lastMatch = moveNumberMatches[moveNumberMatches.length - 1];
        const num = parseInt(lastMatch.replace(/\.+/, ''));
        if (!isNaN(num) && num > 0) return num;
    }

    // 3. Fallback: Token Counting (if numbering is broken)
    // Remove move numbers to count tokens (e4, e5, Nf3)
    clean = clean.replace(/\d+\.+/g, ' ');
    const tokens = clean.split(/\s+/).filter(t => t.length > 0);
    return Math.ceil(tokens.length / 2);
}
