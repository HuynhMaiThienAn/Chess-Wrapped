export interface ChessGame {
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