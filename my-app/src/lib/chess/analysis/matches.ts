import { ChessGame } from '@/types';

export function analyzeMatches(games: ChessGame[], username: string) {
    // 1. Deduplication Set
    const seenUrls = new Set<string>();

    const candidates = games.filter(game => {
        // A. Check for duplicates immediately
        if (seenUrls.has(game.url)) return false;
        seenUrls.add(game.url);

        const isWhite = game.white.username.toLowerCase() === username.toLowerCase();
        const userSide = isWhite ? game.white : game.black;
        const opponentSide = isWhite ? game.black : game.white;

        // B. Must be a Win
        if (userSide.result !== 'win') return false;

        // C. No Bot matches
        if (opponentSide.username.toLowerCase().includes('bot')) return false;

        // D. Check Move Count > 10 (Avoids early aborts)
        const moveCount = (game.pgn.match(/\d+\./g) || []).length;
        if (moveCount <= 10) return false;

        return true;
    });

    // 2. Map & Calculate Elo Gap
    const mapped = candidates.map(game => {
        const isWhite = game.white.username.toLowerCase() === username.toLowerCase();
        const userRating = isWhite ? game.white.rating : game.black.rating;
        const oppRating = isWhite ? game.black.rating : game.white.rating;
        const opponent = isWhite ? game.black : game.white;

        return {
            opponent: opponent.username,
            opponentElo: oppRating,
            eloGap: oppRating - userRating, // Positive = Upset
            date: new Date(game.end_time * 1000).toLocaleDateString(),
            url: game.url,
            timeControl: game.time_class,
            opponentAvatarUrl: '', // Will be filled by avatarService later
            fen: game.fen
        };
    });

    // 3. Sort by Elo Gap (Descending) and take Top 5
    return mapped.sort((a, b) => b.eloGap - a.eloGap).slice(0, 5);
}