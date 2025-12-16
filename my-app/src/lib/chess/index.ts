import { getUserProfile, fetchUserGames } from './data';
import { analyzeGeneral } from './analysis/general';
import { analyzeElo } from './analysis/elo';
import { analyzeOpenings } from './analysis/openings';
import { analyzeFriends } from './analysis/social';
import { analyzeMatches } from './analysis/matches';
import { getAvatars } from './avatarService';

const TARGET_YEAR = '2025';

export async function generateWrappedStats(username: string) {
    // 1. Fetch Main Data
    const [profile, games] = await Promise.all([
        getUserProfile(username),
        fetchUserGames(username, TARGET_YEAR)
    ]);

    // 2. Run Analysis
    const general = analyzeGeneral(games, username);
    const elo = analyzeElo(games, username);
    const openings = analyzeOpenings(games, username);
    const social = analyzeFriends(games, username);
    const impressiveMatches = analyzeMatches(games, username);

    // 3. Calculate Tournament Count (New Logic)
    // We count unique Event names that contain "Tournament" or "Arena"
    const uniqueTournaments = new Set<string>();
    games.forEach(game => {
        if (!game.pgn) return;
        const eventMatch = game.pgn.match(/\[Event "([^"]+)"\]/);
        if (eventMatch && eventMatch[1]) {
            const eventName = eventMatch[1].toLowerCase();
            if (eventName.includes('tournament') || eventName.includes('arena')) {
                // Use Name + Date to ensure unique tournament instances are counted
                const dateMatch = game.pgn.match(/\[Date "([^"]+)"\]/);
                const date = dateMatch ? dateMatch[1] : 'unknown';
                uniqueTournaments.add(`${eventName}|${date}`);
            }
        }
    });

    // 4. Populate Avatars
    const { friendsWithAvatars, matchesWithAvatars } = await getAvatars(
        social.topFriends,
        impressiveMatches
    );

    return {
        ...profile,
        ...general,
        ...elo,
        ...openings,
        topFriends: friendsWithAvatars,
        impressiveMatches: matchesWithAvatars,
        tournamentCount: uniqueTournaments.size,
        year: parseInt(TARGET_YEAR)
    };
}