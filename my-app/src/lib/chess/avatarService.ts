import { getUserProfile } from './data';
import { FriendStats, GameStats } from '@/types';

async function fetchInBatches<T, R>(
    items: T[],
    batchSize: number,
    fn: (item: T) => Promise<R>
): Promise<void> {
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        await Promise.all(batch.map(fn));
    }
}

export async function getAvatars(
    friends: FriendStats[],
    matches: GameStats['impressiveMatches']
) {
    // Identify unique users to fetch
    const usersToFetch = new Set<string>();
    friends.forEach(f => usersToFetch.add(f.username));
    matches.forEach(m => usersToFetch.add(m.opponent));

    // Fetch avatars in batches
    const avatarMap = new Map<string, string>();
    const uniqueUsers = Array.from(usersToFetch);

    await fetchInBatches(uniqueUsers, 5, async (user) => {
        try {
            const profile = await getUserProfile(user);
            avatarMap.set(user, profile.avatarUrl);
        } catch (e) {
            console.warn(`Failed to fetch avatar for ${user}`);
        }
    });

    const DEFAULT_AVATAR = 'https://www.chess.com/bundles/web/images/user-image.svg';

    // Attach avatars to the original lists
    const friendsWithAvatars = friends.map(f => ({
        ...f,
        avatarUrl: avatarMap.get(f.username) || DEFAULT_AVATAR
    }));

    const matchesWithAvatars = matches.map(m => ({
        ...m,
        opponentAvatarUrl: avatarMap.get(m.opponent) || DEFAULT_AVATAR
    }));

    return { friendsWithAvatars, matchesWithAvatars };
}