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

    // Elo
    eloHistory: {
        date: string;
        monthIndex: number;
        Blitz?: number;
        Rapid?: number;
        Bullet?: number;
    }[];

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

    // Accuracy
    averageAccuracy?: Record<string, number>;
    bestAccuracyGame?: {
        accuracy: number;
        timeControl: string;
        date: string;
        url: string;
    } | null;
    worstAccuracyGame?: {
        accuracy: number;
        timeControl: string;
        date: string;
        url: string;
    } | null;
    accuracyHistory?: {
        date: string;
        monthIndex: number;
        accuracy: number;
    }[];
    bestTimeControl?: string | null;

    // Time Control Breakdown
    timeControlBreakdown?: {
        timeControl: string;
        games: number;
        wins: number;
        losses: number;
        draws: number;
        winRate: number;
        averageElo: number;
        peakElo: number;
        averageGameDuration: number; // in seconds
    }[];
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