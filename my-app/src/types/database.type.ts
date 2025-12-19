import { ChessGame } from "@/types/game";

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            game_archives: {
                Row: {
                    id: number
                    username: string
                    year: string
                    month: string
                    games: ChessGame[]
                    updated_at: string
                }
                Insert: {
                    id?: number
                    username: string
                    year: string
                    month: string
                    games: ChessGame[]
                    updated_at?: string
                }
                Update: {
                    id?: number
                    username?: string
                    year?: string
                    month?: string
                    games?: ChessGame[]
                    updated_at?: string
                }
            }
        }
    }
}