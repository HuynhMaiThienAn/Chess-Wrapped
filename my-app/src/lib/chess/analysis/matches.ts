import { ChessGame } from '@/types';

export function analyzeMatches(games: ChessGame[], username: string) {
    const impressiveMatches: any[] = [];
    const lowerUsername = username.toLowerCase();

    games.forEach(game => {
        const isWhite = game.white.username.toLowerCase() === lowerUsername;
        const user = isWhite ? game.white : game.black;
        const opponent = isWhite ? game.black : game.white;

        if (user.result === 'win') {
            const eloGap = opponent.rating - user.rating;

            if (eloGap >= 0) {
                impressiveMatches.push({
                    opponent: opponent.username,
                    opponentElo: opponent.rating,
                    eloGap,
                    date: new Date(game.end_time * 1000).toLocaleDateString(),
                    url: game.url,
                    timeControl: game.time_class,
                    opponentAvatarUrl: null,
                    fen: game.fen
                });
            }
        }
    });

    return {
        impressiveMatches: impressiveMatches.sort((a, b) => b.eloGap - a.eloGap).slice(0, 3)
    };
}