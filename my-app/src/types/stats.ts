export interface GameStats {
    year: number;

    // General Activity
    totalGames: number;
    totalHours: number;
    gamesByVariant: { name: string; count: number }[];
    mostPlayedVariant: string;

    wins: number;
    losses: number;
    draws: number;
    winRate: number;

    winMethods: { name: string; count: number }[];
    lossMethods: { name: string; count: number }[];
    drawMethods: { name: string; count: number }[];

    // Elo
    eloHistory: {
        date: string;
        monthIndex: number;
        Blitz?: number;
        Rapid?: number;
        Bullet?: number;
    }[];

    longestGame?: {
        opponent: string;
        moves: number;
        result: string;
        date: string;
        url: string;
    };
    shortestGame?: {
        opponent: string;
        moves: number;
        result: string;
        date: string;
        url: string;
    };

    longestWinStreak: number;
    longestLossStreak: number;
    longestDailyStreak: number;

    checkmateByPiece: { piece: string; count: number }[];

    eloChange: {
        Blitz: number;
        Rapid: number;
        Bullet: number;
    };

    peakElo: number;

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