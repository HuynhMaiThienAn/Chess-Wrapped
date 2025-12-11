export interface GameStats {
    year: number;

    // General Activity
    totalGames: number;
    totalHours: number;
    gamesByVariant: { name: string; count: number }[];
    mostPlayedVariant: string;

    // Elo
    eloHistory: { date: string; rating: number; monthIndex: number }[];
    eloChange: number;

    // Openings
    uniqueWhiteVariants: number;
    uniqueBlackVariants: number;
    topOpeningsWhite: OpeningStat[];
    topOpeningsBlack: OpeningStat[];

    // worse openings to play against
    worstOpeningsWhite: OpeningStat[];
    worstOpeningsBlack: OpeningStat[];

    // Highlights
    impressiveMatches: {
        opponent: string;
        opponentElo: number;
        eloGap: number;
        date: string;
        url: string;
        timeControl: string;
        opponentAvatarUrl: string;
        fen: string;
    }[];

    tournamentCount: number;
    tournamentSummary?: TournamentStats[];
}

export interface OpeningStat {
    name: string;
    count: number;
    winRate: number;
    highestWinElo: number;
    pgn?: string;
}

export interface TournamentStats {
    variant: string;
    count: number;
    winRate: number;
}