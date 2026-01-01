/**
 * Calculates the longest consecutive daily playing streak from a set of game dates.
 */
export function calculateLongestDailyStreak(uniqueDays: Set<string>): number {
    const sortedDays = Array.from(uniqueDays).sort();
    let longestDailyStreak = 0;
    let tempDaily = 0;

    for (let i = 0; i < sortedDays.length; i++) {
        if (i > 0) {
            const prev = new Date(sortedDays[i - 1]);
            const curr = new Date(sortedDays[i]);
            const diffTime = Math.abs(curr.getTime() - prev.getTime());
            const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                tempDaily++;
            } else {
                tempDaily = 1;
            }
        } else {
            tempDaily = 1;
        }
        longestDailyStreak = Math.max(longestDailyStreak, tempDaily);
    }

    return longestDailyStreak;
}

/**
 * Manages win and loss streaks during game analysis.
 */
export class StreakTracker {
    private currentWinStreak = 0;
    private longestWinStreak = 0;
    private currentLossStreak = 0;
    private longestLossStreak = 0;

    recordWin(): void {
        this.currentWinStreak++;
        this.currentLossStreak = 0;
        if (this.currentWinStreak > this.longestWinStreak) {
            this.longestWinStreak = this.currentWinStreak;
        }
    }

    recordLoss(): void {
        this.currentLossStreak++;
        this.currentWinStreak = 0;
        if (this.currentLossStreak > this.longestLossStreak) {
            this.longestLossStreak = this.currentLossStreak;
        }
    }

    recordDraw(): void {
        this.currentWinStreak = 0;
        this.currentLossStreak = 0;
    }

    getLongestWinStreak(): number {
        return this.longestWinStreak;
    }

    getLongestLossStreak(): number {
        return this.longestLossStreak;
    }
}
