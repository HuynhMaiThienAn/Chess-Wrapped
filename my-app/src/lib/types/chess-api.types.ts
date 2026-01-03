/**
 * TypeScript types for Chess.com API responses
 */

export interface ChessComPlayerResponse {
    username: string;
    player_id: number;
    name?: string;
    avatar?: string;
    title?: string;
    followers?: number;
    country?: string;
    location?: string;
    last_online?: number;
    joined?: number;
    status?: string;
    is_streamer?: boolean;
    verified?: boolean;
    league?: string;
}

export interface ChessComArchivesResponse {
    archives: string[];
}

export interface ChessComGameResponse {
    url: string;
    pgn: string;
    time_control: string;
    end_time: number;
    rated: boolean;
    tcn?: string;
    uuid?: string;
    initial_setup?: string;
    fen?: string;
    time_class?: string;
    rules?: string;
    white: ChessComPlayer;
    black: ChessComPlayer;
    accuracies?: {
        white?: number;
        black?: number;
    };
}

export interface ChessComPlayer {
    rating: number;
    result: string;
    '@id': string;
    username: string;
    uuid?: string;
}

export interface ChessComGamesResponse {
    games: ChessComGameResponse[];
}

export interface ChessComStatsResponse {
    chess_rapid?: ChessComRating;
    chess_blitz?: ChessComRating;
    chess_bullet?: ChessComRating;
    chess_daily?: ChessComRating;
    puzzle_rush?: {
        best?: {
            total_attempts?: number;
            score?: number;
        };
    };
}

export interface ChessComRating {
    last?: {
        rating: number;
        date?: number;
        rd?: number;
    };
    best?: {
        rating: number;
        date?: number;
        game?: string;
    };
    record?: {
        win: number;
        loss: number;
        draw: number;
    };
}

/**
 * Type guards for runtime validation
 */

export function isChessComArchivesResponse(data: unknown): data is ChessComArchivesResponse {
    return (
        typeof data === 'object' &&
        data !== null &&
        'archives' in data &&
        Array.isArray((data as ChessComArchivesResponse).archives)
    );
}

export function isChessComPlayerResponse(data: unknown): data is ChessComPlayerResponse {
    return (
        typeof data === 'object' &&
        data !== null &&
        'username' in data &&
        typeof (data as ChessComPlayerResponse).username === 'string'
    );
}

export function isChessComGamesResponse(data: unknown): data is ChessComGamesResponse {
    return (
        typeof data === 'object' &&
        data !== null &&
        'games' in data &&
        Array.isArray((data as ChessComGamesResponse).games)
    );
}
