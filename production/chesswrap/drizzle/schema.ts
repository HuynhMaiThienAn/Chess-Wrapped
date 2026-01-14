
import { pgTable, serial, varchar, integer, real } from "drizzle-orm/pg-core";

export const chessWrapped = pgTable("chess_wrapped", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 255 }).notNull(),
    accountType: integer("account_type").notNull(), // 0: chess.com, 1: lichess

    // 2024 comparison
    matches2024: integer("matches_2024"),
    winrate2024: real("winrate_2024"),

    // 2025 Stats
    matchesWin2025: integer("matches_win_2025"),
    matchesLost2025: integer("matches_lost_2025"),
    matchesDraw2025: integer("matches_draw_2025"),
    totalHours: real("total_hours"),

    // Elo
    eloMode: varchar("elo_mode", { length: 50 }),
    eloJan: integer("elo_jan"),
    eloFeb: integer("elo_feb"),
    eloMar: integer("elo_mar"),
    eloApr: integer("elo_apr"),
    eloMay: integer("elo_may"),
    eloJun: integer("elo_jun"),
    eloJul: integer("elo_jul"),
    eloAug: integer("elo_aug"),
    eloSep: integer("elo_sep"),
    eloOct: integer("elo_oct"),
    eloNov: integer("elo_nov"),
    eloDec: integer("elo_dec"),
    peakElo2025: integer("peak_elo_2025"),

    // Openings (Most played - 1 for each color)
    openingWhiteName: varchar("opening_white_name", { length: 255 }),
    openingWhiteMatches: integer("opening_white_matches"),
    openingWhiteWinrate: real("opening_white_winrate"),
    openingBlackName: varchar("opening_black_name", { length: 255 }),
    openingBlackMatches: integer("opening_black_matches"),
    openingBlackWinrate: real("opening_black_winrate"),

    // Interesting Stats
    queenBlunders: integer("queen_blunders"),
    rareMoveNotation: varchar("rare_move_notation", { length: 50 }), // e.g. "B2xe4#"
    smotherMateCount: integer("smother_mate_count"),
    longestMatchSeconds: integer("longest_match_seconds"),
    bestMatchEloDiff: integer("best_match_elo_diff"),
    bullyMatchEloDiff: integer("bully_match_elo_diff"),
    winStreak: integer("win_streak"),
    lossStreak: integer("loss_streak"),
});

export type ChessWrappedInsert = typeof chessWrapped.$inferInsert;
export type ChessWrappedSelect = typeof chessWrapped.$inferSelect;
