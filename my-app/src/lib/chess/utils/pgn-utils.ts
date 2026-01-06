/**
 * Extracts a specific tag value from a PGN string.
 */
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
