/**
 * Formats a chess game result into a human-readable string.
 */
export function formatResult(result: string): string {
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
}

/**
 * Extracts the piece type from a chess move in algebraic notation.
 */
export function getPieceFromMove(move: string): string {
    const cleanMove = move.replace(/[+#x]/g, '');
    if (cleanMove.startsWith('N')) return 'Knight';
    if (cleanMove.startsWith('B')) return 'Bishop';
    if (cleanMove.startsWith('R')) return 'Rook';
    if (cleanMove.startsWith('Q')) return 'Queen';
    if (cleanMove.startsWith('K')) return 'King';
    if (cleanMove.startsWith('O')) return 'Rook';
    return 'Pawn';
}
