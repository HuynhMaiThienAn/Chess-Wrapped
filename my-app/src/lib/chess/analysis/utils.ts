export const formatResult = (result: string): string => {
    switch (result) {
        case 'win': return 'Win';
        case 'checkmated': return 'Checkmate';
        case 'agreed': return 'Agreement';
        case 'repetition': return 'Repetition';
        case 'timeout': return 'Timeout';
        case 'resigned': return 'Resignation';
        case 'stalemate': return 'Stalemate';
        case 'insufficient': return 'Insufficient Material';
        case '50move': return '50 Move Rule';
        case 'abandoned': return 'Abandonment';
        case 'time': return 'Timeout';
        case 'kingofthehill': return 'KOTH';
        case 'threecheck': return 'Three Check';
        case 'bughouse': return 'Bughouse';
        case 'crazyhouse': return 'Crazyhouse';
        default: return 'Other';
    }
};

export const getPieceFromMove = (move: string): string => {
    const cleanMove = move.replace(/[+#x]/g, '');
    if (cleanMove.startsWith('N')) return 'Knight';
    if (cleanMove.startsWith('B')) return 'Bishop';
    if (cleanMove.startsWith('R')) return 'Rook';
    if (cleanMove.startsWith('Q')) return 'Queen';
    if (cleanMove.startsWith('K')) return 'King';
    if (cleanMove.startsWith('O')) return 'Rook';
    return 'Pawn';
};

// Robust helper to count moves
export const calculateMoveCount = (pgn: string): number => {
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
};
