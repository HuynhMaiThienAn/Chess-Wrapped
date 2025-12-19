import { z } from "zod";

// Sub-Schemas
const PlayerSchema = z.object({
    rating: z.number(),
    result: z.string(),
    username: z.string()
});

const GameSchema = z.object({
    url: z.string(),
    pgn: z.string().optional(),
    time_control: z.string(),
    end_time: z.number(),
    rated: z.boolean(),
    time_class: z.enum(['bullet', 'blitz', 'rapid', 'daily']),
    fen: z.string(),
    white: PlayerSchema,
    black: PlayerSchema,
    tournament: z.string().optional()
});

// API Response Schemas

export const RawProfileSchema = z.object({
    avatar: z.string().optional(),
    joined: z.number().optional(),
    status: z.string().default('basic'),
    url: z.string(),
    name: z.string().optional(),
});

export const RawArchivesSchema = z.object({
    archives: z.array(z.string())
});

export const RawMonthlyGamesSchema = z.object({
    games: z.array(GameSchema)
});