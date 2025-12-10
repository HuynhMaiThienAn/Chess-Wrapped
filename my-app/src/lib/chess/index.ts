import { getUserProfile, fetchUserGames } from './data';
import { analyzeGeneral } from './analysis/general';
import { analyzeElo } from './analysis/elo';
import { analyzeOpenings } from './analysis/openings';
import { analyzeFriends } from './analysis/social';
import { analyzeMatches } from './analysis/matches';

export async function generateWrappedStats(username: string) {
    // Fetch Data
    const [profile, games] = await Promise.all([
        getUserProfile(username),
        fetchUserGames(username, '2025')
    ]);

    // Run Analysis
    const general = analyzeGeneral(games, username);
    const elo = analyzeElo(games, username);
    const openings = analyzeOpenings(games, username);
    const social = analyzeFriends(games, username);
    const matches = analyzeMatches(games, username);


    // Collect all unique usernames needed
    const usersToFetch = new Set<string>();
    social.topFriends.forEach(f => usersToFetch.add(f.username));
    matches.impressiveMatches.forEach(m => usersToFetch.add(m.opponent));

    // Create a map of username -> avatarUrl
    const avatarMap = new Map<string, string>();

    await Promise.all(
        Array.from(usersToFetch).map(async (user) => {
            try {
                const p = await getUserProfile(user);
                avatarMap.set(user, p.avatarUrl);
            } catch (e) {
                console.warn(`Failed to fetch avatar for ${user}`);
            }
        })
    );

    const hydratedFriends = social.topFriends.map(f => ({
        ...f,
        avatarUrl: avatarMap.get(f.username) || 'https://www.chess.com/bundles/web/images/user-image.svg'
    }));

    const hydratedMatches = matches.impressiveMatches.map(m => ({
        ...m,
        opponentAvatarUrl: avatarMap.get(m.opponent) || 'https://www.chess.com/bundles/web/images/user-image.svg'
    }));

    return {
        ...profile,
        ...general,
        ...elo,
        ...openings,
        topFriends: hydratedFriends,
        impressiveMatches: hydratedMatches,
        tournamentCount: 0,
        year: 2025
    };
}