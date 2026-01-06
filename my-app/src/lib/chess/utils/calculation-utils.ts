/**
 * Calculates win rate as a percentage.
 */
export function calculateWinRate(wins: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((wins / total) * 100);
}
