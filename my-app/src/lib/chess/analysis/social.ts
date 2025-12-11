import { ChessGame, FriendStats } from '@/types';

export function analyzeFriends(games: ChessGame[], username: string) {
    const friendsMap: Record<string, number> = {};
    const lowerUsername = username.toLowerCase();

    games.forEach(game => {
        const isWhite = game.white.username.toLowerCase() === lowerUsername;
        const opponent = isWhite ? game.black : game.white;

        if (opponent.username.toLowerCase() === lowerUsername) return;

        friendsMap[opponent.username] = (friendsMap[opponent.username] || 0) + 1;
    });

    // Convert to array and sort by games count
    const topFriends: FriendStats[] = Object.entries(friendsMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([username, count]) => ({
            username,
            games: count,
            avatarUrl: ''
        }));

    return { topFriends };
}