import { apiClient } from '../api/client';

/**
 * Batched fetching of avatars (if you need to fetch many friends)
 * Chess.com doesn't have a batch endpoint, so we run parallel requests.
 */
export async function fetchAvatars(usernames: string[]): Promise<Record<string, string>> {
    const uniqueUsers = Array.from(new Set(usernames));
    const avatarMap: Record<string, string> = {};

    // Limit concurrency to avoid rate limiting
    const chunkHelp = async (subset: string[]) => {
        const promises = subset.map(async (user) => {
            try {
                const { data } = await apiClient.get(`/player/${user}`);
                if (data.avatar) {
                    avatarMap[user] = data.avatar;
                }
            } catch (e) {}
        });
        await Promise.all(promises);
    };

    // Process in chunks of 5
    for (let i = 0; i < uniqueUsers.length; i += 5) {
        await chunkHelp(uniqueUsers.slice(i, i + 5));
    }

    return avatarMap;
}