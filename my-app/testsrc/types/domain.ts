export interface User {
    username: string;
    avatarUrl: string;
    joinDate: number;
    status: string;
}

export interface ChessGame {
    initial_setup: string;
    fen: string;
    url: string;
    pgn: string;
    time_control: string;
    end_time: number;
    rated: boolean;
    time_class: 'bullet' | 'blitz' | 'rapid' | 'daily';
    white: { rating: number; result: string; username: string };
    black: { rating: number; result: string; username: string };
    tournament?: string;
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

export interface FriendStats {
    username: string;
    games: number;
    avatarUrl: string;
}

export interface GameStats {
    year: number;

    // General Activity
    totalGames: number;
    totalHours: number;
    gamesByVariant: { name: string; count: number }[];
    mostPlayedVariant: string;

    // Outcomes
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
    eloChange: {
        Blitz: number;
        Rapid: number;
        Bullet: number;
    };
    peakElo: number;

    // Specific Games
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

    // Streaks
    longestWinStreak: number;
    longestLossStreak: number;
    longestDailyStreak: number;

    // Analysis
    checkmateByPiece: { piece: string; count: number }[];

    // Openings
    uniqueWhiteVariants: number;
    uniqueBlackVariants: number;
    topOpeningsWhite: OpeningStat[];
    topOpeningsBlack: OpeningStat[];
    worstOpeningsWhite: OpeningStat[];
    worstOpeningsBlack: OpeningStat[];

    // Social & Highlights
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

    topFriends?: FriendStats[];

    tournamentCount: number;
    tournamentSummary?: TournamentStats[];
}