import { ChessGame } from '@/types';

export function analyzeElo(games: ChessGame[], username: string) {
    const blitzCount = games.filter(g => g.time_class === 'blitz').length;
    const targetClass = blitzCount > games.length / 2 ? 'blitz' : 'rapid';

    const history: { date: string; rating: number }[] = [];
    const seenMonths = new Set<string>();

    for (let i = games.length - 1; i >= 0; i--) {
        const game = games[i];
        if (game.time_class !== targetClass || !game.rated) continue;

        const date = new Date(game.end_time * 1000);
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

        if (!seenMonths.has(monthKey)) {
            const isWhite = game.white.username.toLowerCase() === username.toLowerCase();
            const rating = isWhite ? game.white.rating : game.black.rating;

            history.push({
                date: date.toLocaleDateString('en-US', { month: 'short' }),
                rating
            });
            seenMonths.add(monthKey);
        }
    }

    return {
        eloHistory: history.reverse(),
        highestElo: Math.max(...history.map(h => h.rating), 0),
        lowestElo: Math.min(...history.map(h => h.rating), 0)
    };
}