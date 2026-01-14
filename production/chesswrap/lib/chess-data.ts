
import { ChessWrappedInsert } from "@/drizzle/schema";

export type Platform = "chess.com" | "lichess";

interface RawGame {
    // Define minimal structure we need (white, black, result, date, pgn/moves)
    white: { username: string; rating: number; result: string };
    black: { username: string; rating: number; result: string };
    pgn?: string;
    time_control: string;
    end_time: number; // timestamp
    rules: string; // chess, daily, etc.
}

export async function fetchChessData(
    username: string,
    platform: Platform
): Promise<ChessWrappedInsert> {
    const currentYear = 2025;
    const lastYear = 2024;

    // 1. Fetch Archives/Games for 2025
    // For simplicity MVP, let's fetch just a few months or try to get stats from profile endpoint if available.
    // Real implementation need to iterate all months of 2025.

    let games2025: RawGame[] = [];
    let games2024: RawGame[] = [];

    // Placeholder: In a real app, we'd fetch all archives.
    // console.log(`Fetching data for ${username} on ${platform}`);

    // Mocking data for now to ensure flow works without hitting API rate limits or complexity yet.
    // I will implement a basic "User Profile" fetch to show we connected.

    // TODO: Implement actual API calls to:
    // Chess.com: https://api.chess.com/pub/player/{username}/games/{yyyy}/{mm}
    // Lichess: https://lichess.org/api/games/user/{username}

    // Construct the result object
    const stats: ChessWrappedInsert = {
        username,
        accountType: platform === "lichess" ? 1 : 0,

        // 2024
        matches2024: 120, // Mock
        winrate2024: 45.5,

        // 2025
        matchesWin2025: 50,
        matchesLost2025: 40,
        matchesDraw2025: 10,
        totalHours: 12.5,

        // Elo
        eloMode: "Rapid",
        eloJan: 1200,
        eloFeb: 1210,
        eloMar: 1205,
        eloApr: 1220,
        eloMay: 1235,
        eloJun: 1240,
        eloJul: 1250,
        eloAug: 1255,
        eloSep: 1260,
        eloOct: 1270,
        eloNov: 1280,
        eloDec: 1300,
        peakElo2025: 1300,

        // Openings
        openingWhiteName: "Ruy Lopez",
        openingWhiteMatches: 30,
        openingWhiteWinrate: 55,
        openingBlackName: "Sicilian Defense",
        openingBlackMatches: 25,
        openingBlackWinrate: 48,

        // Interesting
        queenBlunders: 5,
        rareMoveNotation: "B2xe4#",
        smotherMateCount: 1,
        longestMatchSeconds: 3600,
        bestMatchEloDiff: 150,
        bullyMatchEloDiff: 200,
        winStreak: 8,
        lossStreak: 3,
    };

    return stats;
}
