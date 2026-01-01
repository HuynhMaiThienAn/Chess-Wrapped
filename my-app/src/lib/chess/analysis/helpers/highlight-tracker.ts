import { GameHighlight, UpsetHighlight, SpeedHighlight } from '../types';

/**
 * Tracks game highlights such as longest/shortest games, fastest wins, and biggest upsets.
 */
export class HighlightTracker {
    private longestGame: GameHighlight | undefined = undefined;
    private shortestGame: GameHighlight | undefined = undefined;
    private biggestUpset: UpsetHighlight | undefined = undefined;
    private fastestWin: SpeedHighlight | undefined = undefined;

    updateLongestGame(gameData: GameHighlight): void {
        if (!this.longestGame || gameData.moves > this.longestGame.moves) {
            this.longestGame = gameData;
        }
    }

    updateShortestGame(gameData: GameHighlight, result: string): void {
        const invalidShortResults = ['abandoned', 'aborted', 'unknown'];
        if (!invalidShortResults.includes(result) && gameData.moves > 0) {
            if (!this.shortestGame || gameData.moves < this.shortestGame.moves) {
                this.shortestGame = gameData;
            }
        }
    }

    updateFastestWin(speedData: SpeedHighlight): void {
        if (!this.fastestWin || speedData.moves < this.fastestWin.moves) {
            this.fastestWin = speedData;
        }
    }

    updateBiggestUpset(upsetData: UpsetHighlight): void {
        if (!this.biggestUpset || upsetData.ratingDiff > this.biggestUpset.ratingDiff) {
            this.biggestUpset = upsetData;
        }
    }

    getHighlights() {
        return {
            longestGame: this.longestGame,
            shortestGame: this.shortestGame,
            biggestUpset: this.biggestUpset,
            fastestWin: this.fastestWin
        };
    }
}
