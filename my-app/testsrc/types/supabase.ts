import { ChessGame } from './domain';

export interface Database {
    public: {
        Tables: {
            game_archives: {
                Row: {
                    id: number;
                    username: string;
                    year: string;
                    month: string;
                    games: ChessGame[];
                    updated_at: string;
                };
                Insert: {
                    id?: number;
                    username: string;
                    year: string;
                    month: string;
                    games: ChessGame[];
                    updated_at?: string;
                };
                Update: {
                    id?: number;
                    username?: string;
                    year?: string;
                    month?: string;
                    games?: ChessGame[];
                    updated_at?: string;
                };
            };
        };
    };
}