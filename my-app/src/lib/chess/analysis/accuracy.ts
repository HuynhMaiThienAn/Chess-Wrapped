import { ChessGame } from '@/types';
import { getPgnTag } from '../util';

interface AccuracyData {
    accuracy: number;
    timeControl: string;
    date: string;
    url: string;
}

export function analyzeAccuracy(games: ChessGame[], username: string) {
    const lowerUsername = username.toLowerCase();
    const normalize = (mode: string) => mode.charAt(0).toUpperCase() + mode.slice(1);

    const accuracyByTimeControl: Record<string, number[]> = {
        Blitz: [],
        Rapid: [],
        Bullet: [],
        Daily: []
    };

    const allAccuracyData: AccuracyData[] = [];

    games.forEach(game => {
        if (!game.pgn) return;

        const isWhite = game.white.username.toLowerCase() === lowerUsername;
        const userSide = isWhite ? game.white : game.black;
        
        // Try to get accuracy from PGN tags
        // Chess.com sometimes includes accuracy in PGN tags
        let accuracy: number | null = null;
        
        // Check for WhiteAccuracy/BlackAccuracy tags
        const accuracyTag = isWhite ? 'WhiteAccuracy' : 'BlackAccuracy';
        const accuracyStr = getPgnTag(game.pgn, accuracyTag);
        
        if (accuracyStr) {
            const parsed = parseFloat(accuracyStr);
            if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
                accuracy = parsed;
            }
        }

        // If no accuracy tag, try to estimate from game result and rating difference
        // This is a fallback - not as accurate but better than nothing
        if (accuracy === null && game.rated) {
            const userRating = isWhite ? game.white.rating : game.black.rating;
            const opponentRating = isWhite ? game.black.rating : game.white.rating;
            const won = userSide.result === 'win';
            const draw = ['repetition', 'stalemate', 'insufficient', 'agreed', 'time', '50move'].includes(userSide.result);
            
            // Rough estimation: base accuracy on result and rating gap
            if (won) {
                // Win against higher rated = higher accuracy
                const ratingDiff = opponentRating - userRating;
                accuracy = Math.max(60, Math.min(95, 70 + (ratingDiff / 20)));
            } else if (draw) {
                accuracy = Math.max(50, Math.min(85, 65 + ((opponentRating - userRating) / 30)));
            } else {
                // Loss - lower accuracy
                const ratingDiff = userRating - opponentRating;
                accuracy = Math.max(30, Math.min(70, 55 - (ratingDiff / 25)));
            }
        }

        if (accuracy !== null) {
            const timeControl = normalize(game.time_class);
            if (timeControl in accuracyByTimeControl) {
                accuracyByTimeControl[timeControl as keyof typeof accuracyByTimeControl].push(accuracy);
                allAccuracyData.push({
                    accuracy,
                    timeControl,
                    date: new Date(game.end_time * 1000).toISOString(),
                    url: game.url
                });
            }
        }
    });

    // Calculate averages per time control
    const averageAccuracy: Record<string, number> = {};
    Object.keys(accuracyByTimeControl).forEach(tc => {
        const accuracies = accuracyByTimeControl[tc as keyof typeof accuracyByTimeControl];
        if (accuracies.length > 0) {
            averageAccuracy[tc] = Math.round(
                accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length
            );
        }
    });

    // Find best and worst accuracy games
    const sortedByAccuracy = [...allAccuracyData].sort((a, b) => b.accuracy - a.accuracy);
    const bestGame = sortedByAccuracy[0] || null;
    const worstGame = sortedByAccuracy[sortedByAccuracy.length - 1] || null;

    // Calculate monthly averages for trends
    const monthlyAccuracy: Record<string, { date: string; monthIndex: number; accuracy: number }> = {};
    allAccuracyData.forEach(data => {
        const dateObj = new Date(data.date);
        const monthKey = `${dateObj.getFullYear()}-${dateObj.getMonth()}`;
        
        if (!monthlyAccuracy[monthKey]) {
            monthlyAccuracy[monthKey] = {
                date: dateObj.toLocaleDateString('en-US', { month: 'short' }),
                monthIndex: dateObj.getMonth(),
                accuracy: 0
            };
        }
    });

    // Calculate monthly averages
    Object.keys(monthlyAccuracy).forEach(monthKey => {
        const monthData = allAccuracyData.filter(data => {
            const dateObj = new Date(data.date);
            return `${dateObj.getFullYear()}-${dateObj.getMonth()}` === monthKey;
        });
        
        if (monthData.length > 0) {
            const avg = monthData.reduce((sum, d) => sum + d.accuracy, 0) / monthData.length;
            monthlyAccuracy[monthKey].accuracy = Math.round(avg);
        }
    });

    const accuracyHistory = Object.values(monthlyAccuracy).sort((a, b) => a.monthIndex - b.monthIndex);

    // Find best time control (highest average accuracy)
    const bestTimeControl = Object.entries(averageAccuracy)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    return {
        averageAccuracy,
        bestGame: bestGame ? {
            accuracy: Math.round(bestGame.accuracy),
            timeControl: bestGame.timeControl,
            date: new Date(bestGame.date).toLocaleDateString(),
            url: bestGame.url
        } : null,
        worstGame: worstGame ? {
            accuracy: Math.round(worstGame.accuracy),
            timeControl: worstGame.timeControl,
            date: new Date(worstGame.date).toLocaleDateString(),
            url: worstGame.url
        } : null,
        accuracyHistory,
        bestTimeControl
    };
}

