import { getUserProfile, fetchUserGames } from './data';
import { analyzeGeneral } from './analysis/general';
import { analyzeElo } from './analysis/elo';
import { analyzeOpenings } from './analysis/openings';
import { analyzeFriends } from './analysis/social';
import { analyzeMatches } from './analysis/matches';
import { getAvatars } from './avatarService';

const TARGET_YEAR = '2025';

export async function generateWrappedStats(username: string) {
    // Fetch Main Data
    const [profile, games] = await Promise.all([
        getUserProfile(username),
        fetchUserGames(username, TARGET_YEAR)
    ]);

    // Run Analysis
    const general = analyzeGeneral(games, username);
    const elo = analyzeElo(games, username);
    const openings = analyzeOpenings(games, username);
    const social = analyzeFriends(games, username);
    const matches = analyzeMatches(games, username);

    // Populate Avatars
    const { friendsWithAvatars, matchesWithAvatars } = await getAvatars(
        social.topFriends,
        matches
    );

    return {
        ...profile,
        ...general,
        ...elo,
        ...openings,
        topFriends: friendsWithAvatars,
        impressiveMatches: matchesWithAvatars,
        year: parseInt(TARGET_YEAR)
    };
}